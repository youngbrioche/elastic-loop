# Robert Glaser — Design System

A design system extracted from **[robert-glaser.de](https://www.robert-glaser.de)**, the personal blog of **Robert Glaser** — Head of Applied AI at **Exxeta**, conference speaker, and co-host of the **und jetzt?!** podcast. The blog publishes essays on applied AI, agentic engineering, and "what happens when loops actually close."

The site runs on **Ghost** with a clean, editorial theme: a white canvas, very bold **Inter** headlines, a single mint-emerald accent, and moody black-and-white photography. There is no logo graphic — the brand mark is simply the name *Robert Glaser* set in bold Inter.

This system captures that visual language so design agents can produce on-brand articles, talk pages, newsletters, slides, and mocks.

---

## Sources

| Source | Reference |
|---|---|
| Live site | https://www.robert-glaser.de |
| Platform | Ghost 6.x (editorial / "Source"-style theme) |
| Typeface | Inter (self-hosted in `fonts/`, OFL) — confirmed by the user |
| Podcast | https://undjetzt.ai |
| Newsletter | Ghost native portal (Subscribe / Sign in) |
| Reference shots | `assets/reference/homepage.png`, `assets/reference/article.png` |

Tokens (colors, type scale, radii) were sampled directly from the homepage and an article page. No private codebase or Figma was provided — everything here is derived from the public site plus the user's screenshots.

---

## Content fundamentals

**Voice.** First-person, opinionated, and conversational — an experienced practitioner thinking out loud. Robert writes the way he speaks at conferences: provocative framing, a clear thesis, and a willingness to argue against the consensus. He addresses the reader directly as **"you"** and frequently the organization ("your team," "your company").

**Headlines are arguments, not labels.** They state a position or pose a sharp question rather than describe a topic:
- *"When everyone has AI and the company still learns nothing"*
- *"You banned OpenClaw. Now make it your training program for agentic AI."*
- *"Why companies shouldn't ban OpenClaw"*
- *"What if iteration is all we need?"*

**Question-led decks.** Sub-headlines (the article "deck") stack rhetorical questions to set up the piece: *"Are people using AI, or is the organization learning from it? What changed because we spent those tokens? And who moves discoveries from individuals to teams to organizational capabilities?"*

**Bilingual.** Most posts are in English; some are in German (*"Der Assistent ist tot: Zweitausend Agenten bauen einen Browser"*, *"90% von allem ist Schrott — und das war schon immer so"*). German posts keep the same tone and typographic treatment.

**Casing.** Sentence case for body and decks. Headlines are sentence case (not title case). Section kickers / tags are **UPPERCASE** and letter-spaced (e.g. `AI ADOPTION`).

**Recurring motifs & vocabulary.** "the loop" / "loops that actually close" / "the elastic loop," "agentic engineering," "applied AI," "agents," "iteration," "tokens." A running series: *"Agentic Pelican on a Bicycle"* (benchmarking models). Punchy, concrete, slightly contrarian.

**Emoji.** None. The brand never uses emoji. Tone is carried by the writing, not decoration.

**Numbers & stats** appear only when they make a point (e.g. "100 vs. 53 percent accuracy," "1500 papers") — never as decorative dashboards.

---

## Visual foundations

**Overall feel.** Quiet, confident, editorial. Lots of white space; the page is a reading surface. Nothing competes with the headline and the photograph. It reads like a well-set magazine, not a SaaS marketing site.

**Color.** A near-monochrome system: near-black text (`#15171A`) on pure white (`#FFFFFF`), greys for secondary and meta text, and **one** saturated accent — mint emerald `#2DC093`. The accent is used sparingly and consistently: the Subscribe pill, section kickers/tags, inline links, and the author-avatar tint. There are no secondary brand colors and no gradients in the UI.

**Typography.** Inter everywhere. The personality comes from **weight and scale contrast**: extra-bold (800) hero headlines at ~64px with tight tracking and ~1.08 line-height, set against light-grey regular-weight decks. List titles are bold (700) ~32px. Body is regular 18px at a generous 1.65 line-height. Nav and buttons are medium (500). Kickers are bold uppercase 14px with `0.08em` tracking.

**Photography.** The signature image motif is **black-and-white / desaturated, moody, atmospheric photography** — fog, sea, stone, long-exposure light. Cool and contemplative, never bright or stocky. Feature images sit full-width under the article header; list thumbnails are ~4px-rounded rectangles to the left of each post. When real photography isn't available, use neutral grey placeholders (`--rg-bg-3`) rather than inventing color imagery.

**Backgrounds.** Plain white. No textures, no patterns, no full-bleed gradients. Section separation is done with generous spacing and hairline dividers (`#E6E9EB`), not background fills.

**Layout.** Centered, max-width columns. Reading column ~740px; header / list / feature media ~1200px. Header is a single row: bold wordmark left; horizontal nav (Home · Newsletter · Talks · Podcast · About); search icon, "Sign in" text link, and green "Subscribe" pill right. The post list is a vertical stack of thumbnail-left / text-right rows separated by hairlines.

**Borders & radii.** Hairline 1px borders in `#E6E9EB`. Radii are restrained: ~4px on thumbnails and code, ~8px on cards/inputs, and full pills (999px) on buttons and tags. Author avatars are circular.

**Shadows.** Mostly **flat**. Elevation is rare — used only for overlays/menus (subtle, low-opacity, soft). Cards in the editorial layout use dividers and spacing instead of shadows.

**Buttons.** Two patterns. *Primary* = solid green pill, white medium text (Subscribe). *Secondary* = outlined pill, 1px `#D5D9DC` border, dark text, transparent fill (Share). Both fully rounded.

**Motion.** Subtle and quick. Color/opacity transitions on hover (~180ms, standard ease). No bounces, no large slides, no parallax. Links shift to the accent green on hover; the primary pill darkens to `#25A37C`. Press = slight darken (no big scale change).

**Hover / press states.** Nav and links → accent green on hover. Primary pill → darken. Outlined buttons → light grey fill (`#F7F8F9`) on hover. Post rows → title goes green on hover; the row itself stays flat.

**Transparency & blur.** Used minimally — only for a sticky header backdrop (subtle white blur) if needed. Not a defining trait.

---

## Iconography

The site is **extremely icon-light** — consistent with its editorial restraint. The only chrome icon visible is a **search (magnifier)** glyph in the header. Social/share actions use a text "Share" button rather than an icon row.

- **Style.** Where icons appear, they are **thin, single-stroke, monochrome line icons** in the primary text color — the family that ships with Ghost's themes (a Feather/Lucide-style 1.5–2px stroke set).
- **Recommended set:** **[Lucide](https://lucide.dev)** (CDN-linked). It matches the existing search-icon weight and is the closest open equivalent to Ghost's built-in icons. *This is a documented substitute for Ghost's internal icon assets, which were not provided.*
- **Emoji:** never used.
- **Unicode glyphs:** the em-dash `—` and middle-dot `·` appear as separators in meta lines ("05 May 2026 — 9 min read"); these are typographic, not icons.
- **Avatars:** circular author images with a soft mint-tint background.

Use icons only for genuine UI affordances (search, close, chevrons, share). Do not decorate content with icons.

---

## Index — what's in this system

| File / folder | Contents |
|---|---|
| `README.md` | This document — context, content & visual foundations, iconography, index. |
| `colors_and_type.css` | All design tokens as CSS variables + semantic `.rg-*` classes. **Start here.** |
| `SKILL.md` | Agent-Skill manifest for using this system in Claude Code. |
| `preview/` | Small specimen cards (colors, type, spacing, components) shown in the Design System tab. |
| `fonts/` | Self-hosted **Inter** woff2 files (weights 400–800, OFL). Referenced by `colors_and_type.css`. |
| `assets/reference/` | Source screenshots of the live site. |
| `ui_kits/blog/` | High-fidelity recreation of the Ghost blog: header, post list, article page, newsletter, buttons, forms, footer. `index.html` is an interactive walkthrough. |

### Quick start
1. Link `colors_and_type.css` (or copy its `:root` block).
2. Set body font to `var(--rg-font-sans)` (Inter).
3. White background, `--rg-fg-1` text, `--rg-accent` for the single accent.
4. Headlines: heavy weight, tight tracking. Body: 18px / 1.65.
5. Photography: black & white, atmospheric. No emoji, no gradients.

---

## Caveats / substitutions

- **Icons:** Ghost's internal icon assets weren't provided; **Lucide** is linked as the closest match. Flag if you have the originals.
- **Imagery:** the blog's photographs are Robert's own; this system uses neutral grey placeholders in recreations rather than redistributing them. Drop in real B&W photography for production.
- **Exact accent:** `#2DC093` (confirmed by Robert).
