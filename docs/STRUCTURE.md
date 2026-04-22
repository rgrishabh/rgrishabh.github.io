# Project structure

This document describes how the portfolio repository is organized. The **published site** is everything at the **repository root** that GitHub Pages serves (`index.html`, `css/`, `js/`, `assets/`, etc.). The `docs/` folder here is **only** markdown for humans reading the repo on GitHub — it is **not** the GitHub Pages `/docs` publishing target unless you explicitly configure Pages that way.

```
.
├── README.md                 # Overview and how to run locally
├── LICENSE                   # MIT
├── CONTRIBUTING.md           # How to propose changes
├── index.html                # Single-page site
├── favicon.svg
├── .nojekyll                 # Let GitHub Pages serve static files unchanged
├── .gitignore
├── css/
│   └── styles.css            # Global styles + light/dark tokens
├── js/
│   ├── theme-ui.js           # Theme toggle, theme-color meta, copyright year
│   ├── nav-mobile.js         # Hamburger menu (≤767px): open/close, backdrop, Escape
│   ├── tenure.js             # Hero / bento / contact tenure strings
│   ├── clipboard.js          # Copy email + status message
│   └── reveal.js             # IntersectionObserver scroll reveals
├── assets/
│   ├── aws-certified-saa-badge.png
│   └── Rishabh_DevOps_4.pdf  # CV download
├── docs/
│   └── STRUCTURE.md          # This file
└── .github/
    ├── CODEOWNERS            # Default review routing (optional)
    └── pull_request_template.md
```

The `.github/` folder is metadata for GitHub only; it is not part of the static site served to visitors.
