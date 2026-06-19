# CloudFront + Accept-Negotiation für elastic-loop.robert-glaser.de

Status: PLAN (noch nicht umgesetzt). Erstellt 2026-06-19.

## Warum überhaupt

Die Seite hat den Discovery-Layer bereits sauber: pro Seite ein
`<link rel="alternate" type="text/markdown" href="/<slug>.md">` im `<head>`
(siehe `src/layouts/BaseLayout.astro`), plus `/llms.txt` und `/llms-full.txt`.
Die `.md`-Endpoints liefern korrekt `Content-Type: text/markdown; charset=utf-8`.

Das **ungelöste** Problem: GitHub Pages macht **keine** Content-Negotiation.
Verifiziert am 2026-06-19 — ein Request auf die kanonische URL `/why` mit
`Accept: text/markdown` (genau das, was Claude Code / Cursor / OpenCode nativ
senden) liefert trotzdem `text/html`. Die kanonische URL bleibt für jeden
Client HTML. Der `rel="alternate"`-Hinweis hilft nur den wenigen Tools, die
den HTML-Head aktiv parsen und einen zweiten Request wagen — die Mehrheit
zieht stumpf das HTML.

CloudFront davor löst genau das: bei `Accept: text/markdown` den Request
intern von `/why` auf `/why.md` umschreiben. Dann kriegen Accept-fähige
Agents Markdown auf der URL, die sie ohnehin haben — ohne Head-Parsing,
ohne zweiten Request.

## Gewählte Variante

**Konservativ (Variante 1):** Nur bei explizitem `Accept: text/markdown`
auf `.md` umschreiben. Browser und alles andere bekommen unverändert HTML.
Risikoarm, keine User-Agent-Heuristik, keine False Positives.

(Variante 2 — zusätzlich bekannte AI-Bot-User-Agents erkennen — wurde
verworfen, weil fehleranfällig und wartungsintensiv. Kann später als
Function-Update nachgezogen werden, falls gewünscht.)

## Ist-Zustand (verifiziert 2026-06-19)

- AWS-Account: `199014371774`, Standard-Region `eu-central-1`
  (CloudFront/ACM-Arbeit läuft aber zwingend in `us-east-1`, s.u.)
- Route-53 Hosted Zone: `robert-glaser.de.` → `Z2G2UIRQJDQFG0`
- Aktueller Record: `elastic-loop.robert-glaser.de.` **CNAME** → `youngbrioche.github.io`
- `public/CNAME` enthält `elastic-loop.robert-glaser.de` ✓ (GitHub Pages kennt die Domain)
- `astro.config.mjs`: `site: 'https://elastic-loop.robert-glaser.de'` ✓
- Live: `/why` → text/html | `/why.md` → text/markdown | `/llms.txt` → text/plain

## Architektur (Ziel)

```
Route 53 (elastic-loop.robert-glaser.de, A/AAAA-Alias)
   → CloudFront Distribution
       - Origin: youngbrioche.github.io (HTTPS only)
       - Viewer Cert: ACM (us-east-1) für elastic-loop.robert-glaser.de
       - Viewer-Request Function: Accept: text/markdown → Pfad .md
   → Origin GitHub Pages (liefert HTML bzw. .md statisch)
```

Wichtig: Der **Origin-Host-Header** muss `youngbrioche.github.io` bleiben,
sonst weiß GitHub Pages nicht, welches Projekt gemeint ist → 404.
GitHub Pages identifiziert die Site über den Host-Header, nicht über die IP.

## Umsetzungsschritte (in dieser Reihenfolge)

### 1. ACM-Zertifikat in us-east-1 anfordern
- Region **us-east-1** (CloudFront zieht Certs ausschließlich aus N. Virginia)
- Domain: `elastic-loop.robert-glaser.de`
- Validierung: DNS (CNAME), automatisch über Route 53 in Zone `Z2G2UIRQJDQFG0`
- Warten bis Status `ISSUED` (wenige Minuten)

### 2. CloudFront Function anlegen (viewer-request)
Name z.B. `el-accept-markdown`. Code:

```javascript
function handler(event) {
    var request = event.request;
    var headers = request.headers;
    var uri = request.uri;

    // Nur GET/HEAD, nur wenn Accept text/markdown bevorzugt
    var accept = headers.accept && headers.accept.value || '';
    if (accept.indexOf('text/markdown') === -1) {
        return request;
    }

    // Schon eine .md / Datei mit Endung / Asset? Dann nichts tun.
    if (uri.endsWith('.md') || uri.endsWith('.txt') || uri.endsWith('.xml')) {
        return request;
    }
    // Statische Assets (haben einen Punkt im letzten Pfadsegment) auslassen
    var last = uri.substring(uri.lastIndexOf('/') + 1);
    if (last.indexOf('.') !== -1) {
        return request;
    }

    // Root → /index.md, sonst /<pfad>.md
    if (uri === '/' ) {
        request.uri = '/index.md';
    } else {
        // trailing slash normalisieren
        if (uri.endsWith('/')) uri = uri.slice(0, -1);
        request.uri = uri + '.md';
    }
    return request;
}
```

Anschließend `publish` (sonst greift nur die DEVELOPMENT-Stage).

### 3. CloudFront-Distribution anlegen
- Origin Domain: `youngbrioche.github.io`
- Origin Protocol: **HTTPS only**, Origin SSL TLSv1.2+
- Alternate Domain Name (CNAME): `elastic-loop.robert-glaser.de`
- Custom SSL Cert: das ACM-Cert aus Schritt 1
- Viewer Protocol Policy: Redirect HTTP → HTTPS
- Cache Policy: CachingOptimized (oder Managed-CachingDisabled zum Testen)
- **Origin Request Policy:** Host-Header NICHT an Origin überschreiben lassen,
  GitHub Pages braucht Host = youngbrioche.github.io. Mit Managed-Policies:
  KEINE Policy nehmen, die den Viewer-Host weiterreicht. Default ist ok.
- Function Association: **Viewer Request** → `el-accept-markdown`
- Default Root Object: leer lassen (Astro liefert / korrekt)
- Warten bis `Deployed` (5–15 Min)

### 4. Vor dem DNS-Switch testen (gegen die *.cloudfront.net-Domain)
```bash
DIST=dXXXXXX.cloudfront.net
# Muss HTML liefern:
curl -sI "https://$DIST/why" -H "Host: elastic-loop.robert-glaser.de" | grep -i content-type
# Muss text/markdown liefern (Accept-Negotiation greift):
curl -sI "https://$DIST/why" -H "Host: elastic-loop.robert-glaser.de" \
     -H "Accept: text/markdown" | grep -i content-type
```
Hinweis: Test über Host-Header nur sinnvoll, sobald das Cert dranhängt.
Notfalls erst nach DNS-Switch testen. Erst grün, dann Schritt 5.

### 5. Route-53-Record umstellen (DER risikobehaftete Schritt)
- Aktuell: `elastic-loop.robert-glaser.de` CNAME → `youngbrioche.github.io`
- Neu: **A-Record (Alias)** → CloudFront-Distribution
  (plus AAAA-Alias für IPv6, CloudFront hat beides)
- CNAME muss weg, weil Alias auf Subdomain den CNAME ersetzt
- Zone: `Z2G2UIRQJDQFG0`
- Propagation: meist Minuten (TTL beachten)

### 6. Verifizieren nach Switch
```bash
curl -sI https://elastic-loop.robert-glaser.de/why | grep -i content-type
# → text/html
curl -sI https://elastic-loop.robert-glaser.de/why -H "Accept: text/markdown" | grep -i content-type
# → text/markdown   ← das ist der Erfolg
curl -sI https://elastic-loop.robert-glaser.de/ -H "Accept: text/markdown" | grep -i content-type
# → text/markdown (index.md)
```

## Rollback
DNS-Record zurück auf CNAME → `youngbrioche.github.io`. Sofort wieder
direkt GitHub Pages, CloudFront aus dem Pfad. Distribution/Cert/Function
können danach in Ruhe gelöscht werden (additive Anlage, nichts überschrieben).

## Risiken / Caveats
- **DNS-Downtime-Fenster:** Zwischen CNAME-Entfernen und Alias-Aktivwerden
  kurze Inkonsistenz möglich. Außerhalb Stoßzeiten machen.
- **HTTPS-Enforce in GitHub Pages:** Sobald CloudFront davor hängt und der
  Origin youngbrioche.github.io ist, bleibt GitHub-Pages-HTTPS intakt.
  "Enforce HTTPS" im Repo-Setting kann anbleiben.
- **Caching:** CloudFront cached HTML und .md unter derselben URL. Da die
  Unterscheidung über den Accept-Header läuft und die Function VOR dem Cache
  den URI umschreibt, cached CloudFront tatsächlich zwei verschiedene URIs
  (/why und /why.md) — sauber getrennt, kein Vary-Problem. ✓
- **Kosten:** Bei diesem Traffic praktisch null (CloudFront Free Tier +
  CloudFront Functions Free Tier decken das vollständig).

## Aufwand
Reine Bauzeit ~30 Min, plus 5–15 Min CloudFront-Deploy-Wartezeit.
Umsetzbar in einem Rutsch via boto3 (CLI nicht nötig). Credentials liegen
als Env-Vars vor (Root-Account-Keys).
