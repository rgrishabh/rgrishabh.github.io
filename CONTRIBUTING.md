# Contributing

This repository is a personal portfolio. Small fixes (typos, accessibility, broken links) are welcome.

## Workflow

1. Fork the repository or open a branch if you have write access.
2. Make focused changes; match existing HTML/CSS/JS style (vanilla ES5-style JS for broad browser support).
3. Test locally with `python3 -m http.server` from the repo root.
4. Open a pull request with a short description of what changed and why.

## Scope

- Prefer minimal diffs over large refactors unless discussed first.
- Do not commit secrets, API keys, or private contact data that should not be public.
- Binary assets (PDFs, badge images): keep file sizes reasonable; optimize images when possible.

## JavaScript layout

Scripts live under `js/` and load in this order from `index.html`:

1. `theme-ui.js` — theme toggle and footer year  
2. `tenure.js` — experience duration text  
3. `clipboard.js` — copy-email button  
4. `reveal.js` — scroll animations  

The small boot script in `<head>` avoids a flash of the wrong theme; leave it inline unless you have a strong reason to change it.
