# Cloud-Native DevOps Engineer Portfolio

A high-performance, responsive, and visually stunning developer portfolio tailored for **Rishabh Gupta (Lead DevOps Engineer & AWS Solutions Architect)**. Built from the ground up to showcase container orchestration scale, automated CI/CD pipelines, production operations metrics, and enterprise-grade infrastructure systems.

Live site: [rgrishabh.github.io](https://rgrishabh.github.io/)

---

## 🚀 Key Product Features

### 1. Cloud-Native Design & Aesthetic
- **Visual Excellence**: Crafted with dark and light themes using a professional HSL-based palette (deep space blue backgrounds, glowing cyan/green interactive accents, and glassmorphic cards).
- **Responsive Bento Layout**: Incorporates high-density dashboard layouts containing metric highlights (MTTR, scale, developer velocity, experience tenure) for quick, impactful scanning.
- **Custom Vector Branding**: Utilizes fully-custom SVG assets, including a premium 3D glowing infinity loop brandmark ([`assets/devops-logo.svg`](assets/devops-logo.svg)) and a matching optimized browser [favicon](favicon.svg) representing CI/CD.

### 2. High-Performance Static Architecture
- **Zero-Dependency Core**: Built using pure semantic HTML5, Vanilla CSS, and lightweight native JavaScript modules for sub-millisecond load times.
- **Ultra-Light Footprint**: Avoids heavy utility frameworks (like Tailwind) and bulky bundlers, ensuring it remains fully server-independent and highly portable.
- **SEO & Schema Integration**: Automatically implements SEO best practices, structural heading hierarchies, metadata tags, and standardized JSON-LD structured data schemas for high search-engine indexing.

### 3. Accessible & Interactive Interface
- **Mobile Navigation Drawer**: Highly accessible hamburger-toggle drawer featuring backdrop-overlay tap closures, screen-reader visibility landmarks (`aria-expanded`, `aria-hidden`), and Escape-key escape routes.
- **Micro-Animations**: Features custom lazy scroll reveal hooks (`reveal.js`) and physics-based toggle feedback.
- **Interactive Copy Utilities**: Integrated native clipboard manager allowing recruiters to copy contact details smoothly with dynamic status feedback.

---

## 🛠️ Architecture & Tech Stack

The workspace is organized with simplicity and zero build steps:

| Technology | Purpose |
|------------|---------|
| **HTML5 / JSON-LD** | Structure, accessibility landmarks, and search engine schema metadata. |
| **Vanilla CSS** | Deep custom properties, layout logic, themes, and animations. |
| **Vanilla JS** | Modular handlers for UI logic: theme, mobile nav, metrics, and reveals. |
| **Vector (SVG)** | High-fidelity branding elements optimized for Retina/4K displays. |

### Directory Hierarchy

```
.
├── index.html                 # Main portfolio markup & semantic sections
├── favicon.svg                # Modern high-density SVG brand favicon
├── css/
│   └── styles.css             # Main styling, layout system & dark/light design tokens
├── js/
│   ├── theme-ui.js            # Theme controller (syncs preference, color meta, and footer)
│   ├── nav-mobile.js          # Accessibility-compliant mobile navigation drawer
│   ├── tenure.js              # Real-time metrics calculations (tenure and scale highlights)
│   ├── clipboard.js           # Clipboard utility for direct email-copy triggers
│   └── reveal.js              # IntersectionObserver-based lazy scroll animations
├── assets/
│   ├── devops-logo.svg        # Custom premium 3D glowing infinity loop logo
│   ├── aws-certified-saa-badge.png # SAA Badge
│   └── Rishabh_DevOps_4.pdf   # Resumé download asset
└── docs/
    └── STRUCTURE.md           # Developer onboarding folder guide
```

---

## 💻 Local Preview

Since the portfolio utilizes native ES modules and absolute asset routes, previewing it using a simple local HTTP server is recommended to avoid origin policy quirks:

```bash
# Start a simple python HTTP server
python3 -m http.server 8080
```

Once started, open [http://localhost:8080](http://localhost:8080) in your browser.

---

## ☁️ Deployment (GitHub Pages)

This project is optimized for direct hosting on **GitHub Pages**:

1. In the repository settings, go to **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. Select the default branch (**`main`**) and set the folder path to **`/` (root)**.
4. The site will compile and deploy automatically at `https://<username>.github.io/`.

---

## 📄 License

This repository is released under the [MIT License](LICENSE). Third-party certifications, logos, and fonts are the property of their respective owners.
