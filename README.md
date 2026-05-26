# Portfolio site (GitHub Pages)

Personal portfolio for **Rishabh Gupta** — static HTML/CSS, no build step. Served from the default branch root as a [GitHub Pages user site](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages#types-of-github-pages-sites).

## Repository layout

| Path | Purpose |
|------|--------|
| [`index.html`](index.html) | Single-page site markup |
| [`css/styles.css`](css/styles.css) | All styles (dark/light themes) |
| [`js/`](js/) | Theme UI, mobile nav, tenure copy, clipboard, scroll reveal |
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

The CV PDF is served at **`/assets/Rishabh_DevOps_4.pdf`** (not the repository root). Update any external bookmarks or links that still point to `/Rishabh_DevOps_4.pdf`.

If you later move the site under a `/docs` folder, change the Pages “folder” setting to **`/docs`** accordingly.

## Design & Asset Modernization

This repository employs modern web design and clean-code best practices:

- **SVG Vector Branding**: Replaced legacy raster PNG files with fully scalable, premium vector graphics:
  - [`assets/devops-logo.svg`](assets/devops-logo.svg): A custom-designed 3D glowing infinity loop representing CI/CD continuous delivery, stylized in the site's native accent colors (Cyan, Green, and Amber/Orange) alongside tech orbit guides representing platform orchestration.
  - [`favicon.svg`](favicon.svg): A matching high-resolution vector icon optimized to render crisply as a browser tab favicon.
- **Clean Asset Imports**: All versioning cache-buster query parameters (e.g., `?v=...`) were removed from script and stylesheet imports within `index.html` to ensure standard, robust, and clean relative URLs.

## Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md).

## License

Site content and code are released under the [MIT License](LICENSE) unless noted otherwise. Third-party logos and fonts remain property of their respective owners.
