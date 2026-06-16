/* @ds-bundle: {"format":3,"namespace":"RobertGlaserDesignSystem_4d2cdf","components":[],"sourceHashes":{"ui_kits/blog/ArticlePage.jsx":"bc168bc5c752","ui_kits/blog/Footer.jsx":"5da93fb01531","ui_kits/blog/Header.jsx":"194a189e70aa","ui_kits/blog/PostList.jsx":"f1d710f10d45","ui_kits/blog/Primitives.jsx":"353107205969","ui_kits/blog/data.js":"6fb23da082e6"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.RobertGlaserDesignSystem_4d2cdf = window.RobertGlaserDesignSystem_4d2cdf || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// ui_kits/blog/ArticlePage.jsx
try { (() => {
/* Article page — kicker, hero H1, deck, byline + Share, feature image, prose, pull quote */
function ArticlePage({
  post,
  onShare,
  shared
}) {
  return React.createElement('article', null, React.createElement('div', {
    style: {
      maxWidth: 740,
      margin: '0 auto',
      padding: '40px 24px 0',
      textAlign: 'center'
    }
  }, React.createElement('div', {
    style: {
      fontSize: 14,
      fontWeight: 700,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--rg-accent)',
      marginBottom: 22
    }
  }, post.tag), React.createElement('h1', {
    style: {
      fontSize: 58,
      fontWeight: 800,
      lineHeight: 1.08,
      letterSpacing: '-0.02em',
      color: 'var(--rg-fg-1)',
      margin: '0 0 24px',
      textWrap: 'balance'
    }
  }, post.title), React.createElement('p', {
    style: {
      fontSize: 23,
      fontWeight: 400,
      lineHeight: 1.45,
      color: 'var(--rg-fg-2)',
      margin: '0 auto 36px',
      maxWidth: 660
    }
  }, post.deck), React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      maxWidth: 660,
      margin: '0 auto 40px'
    }
  }, React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, React.createElement(Avatar, {
    size: 46
  }), React.createElement('div', {
    style: {
      textAlign: 'left'
    }
  }, React.createElement('div', {
    style: {
      fontWeight: 700,
      fontSize: 15
    }
  }, 'Robert Glaser'), React.createElement('div', {
    style: {
      fontSize: 13,
      color: 'var(--rg-fg-3)'
    }
  }, `${post.date} \u2014 ${post.read}`))), React.createElement(OutlineButton, {
    onClick: onShare
  }, shared ? 'Link copied' : 'Share'))), React.createElement(Photo, {
    tone: post.tone,
    angle: post.angle,
    radius: 0,
    style: {
      width: '100%',
      maxWidth: 1200,
      height: 520,
      margin: '0 auto 12px',
      display: 'block'
    },
    label: 'feature image — B&W'
  }), React.createElement('div', {
    style: {
      maxWidth: 740,
      margin: '0 auto',
      padding: '36px 24px 72px'
    }
  }, post.body.map((para, i) => [React.createElement('p', {
    key: 'p' + i,
    style: {
      fontSize: 19,
      lineHeight: 1.65,
      color: 'var(--rg-fg-1)',
      margin: '0 0 28px'
    }
  }, para), i === 0 && post.pull && React.createElement('blockquote', {
    key: 'q',
    style: {
      margin: '8px 0 32px',
      padding: '4px 0 4px 24px',
      borderLeft: '3px solid var(--rg-accent)',
      fontSize: 26,
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
      color: 'var(--rg-fg-1)'
    }
  }, post.pull)])));
}
window.ArticlePage = ArticlePage;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/blog/ArticlePage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/blog/Footer.jsx
try { (() => {
/* Newsletter CTA band + footer */
function NewsletterCTA() {
  const [email, setEmail] = React.useState('');
  const [sent, setSent] = React.useState(false);
  return React.createElement('section', {
    style: {
      borderTop: '1px solid var(--rg-border)',
      background: 'var(--rg-bg-2)'
    }
  }, React.createElement('div', {
    style: {
      maxWidth: 640,
      margin: '0 auto',
      padding: '56px 24px',
      textAlign: 'center'
    }
  }, React.createElement('h2', {
    style: {
      fontSize: 30,
      fontWeight: 700,
      letterSpacing: '-0.02em',
      margin: '0 0 12px'
    }
  }, 'Newsletter'), React.createElement('p', {
    style: {
      fontSize: 18,
      color: 'var(--rg-fg-2)',
      lineHeight: 1.5,
      margin: '0 0 28px'
    }
  }, 'Thoughts on applied AI, agentic engineering, agents, and loops that actually close.'), sent ? React.createElement('div', {
    style: {
      fontSize: 17,
      fontWeight: 500,
      color: 'var(--rg-accent)'
    }
  }, '\u2713 Email sent \u2014 check your inbox to confirm.') : React.createElement('form', {
    onSubmit: e => {
      e.preventDefault();
      if (email.includes('@')) setSent(true);
    },
    style: {
      display: 'flex',
      gap: 10,
      maxWidth: 480,
      margin: '0 auto'
    }
  }, React.createElement('input', {
    type: 'email',
    value: email,
    placeholder: 'Your email address',
    onChange: e => setEmail(e.target.value),
    style: {
      flex: 1,
      fontFamily: 'var(--rg-font-sans)',
      fontSize: 16,
      padding: '12px 16px',
      border: '1px solid #D5D9DC',
      borderRadius: 999,
      outline: 'none',
      color: 'var(--rg-fg-1)'
    }
  }), React.createElement(PrimaryButton, {}, 'Subscribe'))));
}
function Footer() {
  return React.createElement('footer', {
    style: {
      borderTop: '1px solid var(--rg-border)',
      maxWidth: 1200,
      margin: '0 auto',
      padding: '28px 32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 16
    }
  }, React.createElement('span', {
    style: {
      fontWeight: 700,
      fontSize: 16
    }
  }, 'Robert Glaser'), React.createElement('div', {
    style: {
      display: 'flex',
      gap: 22,
      fontSize: 14,
      color: 'var(--rg-fg-3)'
    }
  }, React.createElement('span', null, 'Privacy'), React.createElement('span', null, 'Legal notice'), React.createElement('span', null, 'Powered by Ghost')));
}
Object.assign(window, {
  NewsletterCTA,
  Footer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/blog/Footer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/blog/Header.jsx
try { (() => {
/* Site header — wordmark, nav, search, Sign in, Subscribe */
function Header({
  onHome,
  onSubscribe,
  active = 'Home'
}) {
  const nav = ['Home', 'Newsletter', 'Talks', 'Podcast', 'About'];
  return React.createElement('header', {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      maxWidth: 1200,
      margin: '0 auto',
      padding: '26px 32px'
    }
  }, React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 34
    }
  }, React.createElement('span', {
    onClick: onHome,
    style: {
      fontSize: 23,
      fontWeight: 700,
      letterSpacing: '-0.01em',
      color: 'var(--rg-fg-1)',
      cursor: 'pointer'
    }
  }, 'Robert Glaser'), React.createElement('nav', {
    style: {
      display: 'flex',
      gap: 24
    }
  }, nav.map(n => React.createElement(NavLink, {
    key: n,
    label: n,
    active: n === active,
    onClick: n === 'Home' ? onHome : undefined
  })))), React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 20
    }
  }, React.createElement('span', {
    style: {
      display: 'flex',
      cursor: 'pointer'
    }
  }, React.createElement(SearchIcon)), React.createElement(NavLink, {
    label: 'Sign in'
  }), React.createElement(PrimaryButton, {
    small: true,
    onClick: onSubscribe
  }, 'Subscribe')));
}
function NavLink({
  label,
  active,
  onClick
}) {
  const [h, setH] = React.useState(false);
  return React.createElement('span', {
    onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      fontSize: 16,
      fontWeight: 500,
      cursor: 'pointer',
      transition: 'color 180ms',
      color: h || active ? 'var(--rg-accent)' : 'var(--rg-fg-1)'
    }
  }, label);
}
window.Header = Header;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/blog/Header.jsx", error: String((e && e.message) || e) }); }

// ui_kits/blog/PostList.jsx
try { (() => {
/* Homepage post list — "Latest", thumbnail-left rows with hairline dividers */
function PostList({
  posts,
  onOpen
}) {
  return React.createElement('main', {
    style: {
      maxWidth: 1000,
      margin: '0 auto',
      padding: '24px 32px 64px'
    }
  }, React.createElement('h2', {
    style: {
      fontSize: 15,
      fontWeight: 700,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--rg-fg-3)',
      margin: '12px 0 8px'
    }
  }, 'Latest'), posts.map((p, i) => React.createElement(PostRow, {
    key: p.id,
    post: p,
    onOpen,
    last: i === posts.length - 1
  })));
}
function PostRow({
  post,
  onOpen,
  last
}) {
  const [h, setH] = React.useState(false);
  return React.createElement('article', {
    onClick: () => onOpen(post),
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      display: 'flex',
      gap: 32,
      alignItems: 'flex-start',
      cursor: 'pointer',
      padding: '32px 0',
      borderBottom: last ? 'none' : '1px solid var(--rg-border)'
    }
  }, React.createElement(Photo, {
    tone: post.tone,
    angle: post.angle,
    style: {
      width: 232,
      height: 150,
      flex: 'none'
    }
  }), React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      paddingTop: 4
    }
  }, React.createElement('h3', {
    style: {
      fontSize: 30,
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
      margin: 0,
      color: h ? 'var(--rg-accent)' : 'var(--rg-fg-1)',
      transition: 'color 180ms'
    }
  }, post.title), React.createElement('p', {
    style: {
      fontSize: 17,
      lineHeight: 1.5,
      color: 'var(--rg-fg-2)',
      margin: 0,
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden'
    }
  }, post.deck), React.createElement('span', {
    style: {
      fontSize: 14,
      color: 'var(--rg-fg-3)',
      marginTop: 2
    }
  }, post.date)));
}
window.PostList = PostList;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/blog/PostList.jsx", error: String((e && e.message) || e) }); }

// ui_kits/blog/Primitives.jsx
try { (() => {
/* Shared primitives: Photo placeholder, Avatar, buttons, search icon */
const {
  useState
} = React;

// B&W moody photo placeholder (brand motif — no real imagery shipped)
function Photo({
  tone = ['#5b6066', '#1c1e21'],
  angle = '160deg',
  radius = 4,
  style = {},
  label
}) {
  return React.createElement('div', {
    style: {
      background: `linear-gradient(${angle}, ${tone[0]}, ${tone[1]})`,
      filter: 'grayscale(1)',
      borderRadius: radius,
      position: 'relative',
      overflow: 'hidden',
      ...style
    }
  }, React.createElement('div', {
    style: {
      position: 'absolute',
      inset: 0,
      backgroundImage: 'radial-gradient(circle at 28% 32%, rgba(255,255,255,0.22), transparent 42%)'
    }
  }), label && React.createElement('span', {
    style: {
      position: 'absolute',
      left: 10,
      bottom: 8,
      fontFamily: 'var(--rg-font-mono)',
      fontSize: 10,
      color: 'rgba(255,255,255,0.55)'
    }
  }, label));
}
function Avatar({
  size = 44,
  initials = 'RG'
}) {
  return React.createElement('div', {
    style: {
      width: size,
      height: size,
      borderRadius: 999,
      background: '#D8F2E8',
      color: '#1E8763',
      fontWeight: 700,
      fontSize: size * 0.34,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 'none'
    }
  }, initials);
}
function PrimaryButton({
  children,
  onClick,
  small
}) {
  const [h, setH] = useState(false);
  return React.createElement('button', {
    onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      fontFamily: 'var(--rg-font-sans)',
      fontWeight: 500,
      fontSize: small ? 15 : 16,
      color: '#fff',
      background: h ? '#259E79' : '#2DC093',
      border: 'none',
      borderRadius: 999,
      padding: small ? '9px 20px' : '11px 24px',
      cursor: 'pointer',
      transition: 'background 180ms',
      whiteSpace: 'nowrap'
    }
  }, children);
}
function OutlineButton({
  children,
  onClick
}) {
  const [h, setH] = useState(false);
  return React.createElement('button', {
    onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      fontFamily: 'var(--rg-font-sans)',
      fontWeight: 500,
      fontSize: 16,
      color: 'var(--rg-fg-1)',
      background: h ? '#F7F8F9' : 'transparent',
      border: '1px solid #D5D9DC',
      borderRadius: 999,
      padding: '9px 22px',
      cursor: 'pointer',
      transition: 'background 180ms'
    }
  }, children);
}
function SearchIcon({
  size = 19
}) {
  return React.createElement('svg', {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: '#15171A',
    strokeWidth: 2,
    strokeLinecap: 'round'
  }, React.createElement('circle', {
    cx: 11,
    cy: 11,
    r: 7
  }), React.createElement('line', {
    x1: 21,
    y1: 21,
    x2: 16.65,
    y2: 16.65
  }));
}
Object.assign(window, {
  Photo,
  Avatar,
  PrimaryButton,
  OutlineButton,
  SearchIcon
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/blog/Primitives.jsx", error: String((e && e.message) || e) }); }

// ui_kits/blog/data.js
try { (() => {
/* Shared data for the Robert Glaser blog UI kit.
   Real post titles, decks and dates from robert-glaser.de. */
window.RG_POSTS = [{
  id: 'learns-nothing',
  tag: 'AI Adoption',
  title: 'When everyone has AI and the company still learns nothing',
  deck: 'Are people using AI, or is the organization learning from it? What changed because we spent those tokens? And who moves discoveries from individuals to teams to organizational capabilities?',
  date: '05 May 2026',
  read: '9 min read',
  tone: ['#5b6066', '#1c1e21'],
  angle: '160deg',
  body: ['There is a comfortable story going around. Adoption is up. Everyone has a license. The dashboards are green. And yet, six months in, nobody can point to a single capability the organization did not have before.', 'The mistake is to measure usage and call it learning. Usage is an individual event. Learning is an organizational one. The gap between them is where most of the value quietly disappears.', 'Ask a sharper question: what did we discover this quarter that we did not know before, and who carried that discovery from one person to a team to the way we actually work?'],
  pull: 'Usage is an individual event. Learning is an organizational one.'
}, {
  id: 'training-program',
  tag: 'Agentic Engineering',
  title: 'You banned OpenClaw. Now make it your training program for agentic AI.',
  deck: 'Running a personal agent breaks every comfortable assumption about what "agent-ready" means. When enterprise platforms show up, who on your team will actually know how agents fail?',
  date: '23 Mar 2026',
  read: '11 min read',
  tone: ['#6b7176', '#2a2c2f'],
  angle: '200deg',
  body: ['A ban is a decision to stop learning in public and start learning in private. People will run agents either way. The only question is whether the knowledge accrues to your team or evaporates into a thousand personal laptops.', 'The teams that will win the enterprise-platform era are the ones who already felt an agent fail in a hundred small, instructive ways.'],
  pull: 'A ban is a decision to stop learning in public.'
}, {
  id: 'should-not-ban',
  tag: 'Strategy',
  title: 'Why companies shouldn\u2019t ban OpenClaw',
  deck: 'Your employees will run agents anyway. A ban just pushes the learning into the shadows. Enable it and you get people who can integrate AI with real systems and argue for sane guardrails.',
  date: '02 Mar 2026',
  read: '7 min read',
  tone: ['#7d8388', '#26282b'],
  angle: '20deg',
  body: ['Shadow IT was never about tools. It was about the distance between what people needed and what they were allowed to use. Agents are about to make that distance very visible.', 'Enable it deliberately, with guardrails people helped design, and you get advocates instead of fugitives.'],
  pull: 'Shadow IT was never about tools.'
}, {
  id: 'iteration',
  tag: 'Process',
  title: 'What if iteration is all we need?',
  deck: 'What if every ceremony in software development was a workaround for expensive human iteration? What happens when juniors learn architecture on day one and spec-driven development turns out to be waterfall in disguise?',
  date: '24 Feb 2026',
  read: '13 min read',
  tone: ['#54585d', '#202225'],
  angle: '135deg',
  body: ['Most process exists because iterating was expensive. Estimation, sign-off, the long review \u2014 each is a hedge against the cost of doing it again.', 'Drop the cost of iteration toward zero and the hedges look less like discipline and more like superstition.'],
  pull: 'Most process exists because iterating was expensive.'
}, {
  id: 'pelican',
  tag: 'Benchmarks',
  title: 'Agentic Pelican on a Bicycle',
  deck: 'The agentic loop\u2014generate, assess, improve\u2014seems like a natural fit for iterating on pelicans on bicycles.',
  date: '11 Nov 2025',
  read: '6 min read',
  tone: ['#60666b', '#1e2023'],
  angle: '110deg',
  body: ['Simon\u2019s benchmark is a joke that turned out to be serious. A pelican. A bicycle. An SVG. It is a perfect little harness for watching a model iterate.', 'Give it a loop \u2014 generate, render, look, improve \u2014 and the drawing gets better in ways that are genuinely interesting to watch.'],
  pull: 'A joke that turned out to be serious.'
}];
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/blog/data.js", error: String((e && e.message) || e) }); }

})();
