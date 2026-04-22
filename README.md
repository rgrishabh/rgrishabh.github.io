# Portfolio site (GitHub Pages)

Personal portfolio for **Rishabh Gupta** — static HTML/CSS, no build step. Served from the default branch root as a [GitHub Pages user site](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages#types-of-github-pages-sites).

## Repository layout

| Path | Purpose |
|------|--------|
| [`index.html`](index.html) | Single-page site markup |
| [`css/styles.css`](css/styles.css) | All styles (dark/light themes) |
| [`js/`](js/) | Small scripts: theme UI, tenure copy, clipboard, scroll reveal |
| [`assets/`](assets/) | Images, CV PDF, and other binaries |
| [`favicon.svg`](favicon.svg) | Site icon |
| [`.nojekyll`](.nojekyll) | Disables Jekyll so static files are served as-is |
| [`docs/`](docs/) | Extra documentation for contributors (not the published site root) |

More detail: [`docs/STRUCTURE.md`](docs/STRUCTURE.md).

## Local preview

From the repository root:

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080`. Using a local server avoids `file://` quirks with some assets.

## GitHub Pages

For `username.github.io`, use **Settings → Pages → Build and deployment → Branch** and publish from **`main`** (or your default branch) with folder **`/` (root)**.

If you later move the site under a `/docs` folder, change the Pages “folder” setting to **`/docs`** accordingly.

## Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md).

## License

Site content and code are released under the [MIT License](LICENSE) unless noted otherwise. Third-party logos and fonts remain property of their respective owners.
