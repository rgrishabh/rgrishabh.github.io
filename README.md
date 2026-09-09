# Rishabh Gupta — DevOps Engineer Portfolio

A high-performance, responsive portfolio for **Rishabh Gupta (Senior Software Engineer, DevOps | AWS Solutions Architect)** built to showcase AI workload infrastructure, production Kubernetes operations, CI/CD automation, and observability at scale.

Live site: [rgrishabh.github.io](https://rgrishabh.github.io/)

---

## 🚀 What's Inside

### Design & Aesthetic — "Terminal Ops" Theme
- **DevOps-first palette**: Near-black terminal background (`#06090f`) with electric cyan (`#06b6d4`) primary accents and pipeline green (`#10b981`) — matching the visual language of Kubernetes dashboards and Grafana
- **Cyan grid scanlines** + dual radial glows (cyan top-left, sky-blue top-right, green bottom) — ops console feel
- **CI/CD Pipeline logo**: Custom SVG icon depicting a 3-stage pipeline (Source → Build → Deploy) with branch lines and a Kubernetes hexagon — used for both the browser tab favicon and the page header mark
- **Dark / Light theme toggle** — both modes tuned to the DevOps colour system

### Sections
| Section | Content |
|---|---|
| **Hero** | Name, title, eyebrow label, contact strip, CTA buttons |
| **Impact** | 6 cards — AI inference on GPU K8s, GitOps automation, K8s governance, observability, enterprise systems, AI-assisted ops |
| **AI platform** | Lead card on the Bhashini serving stack (models → serving → GPU compute → sovereign cloud → signals) plus GPU capacity, model-container delivery, and AI-assisted operations |
| **Tools I work with** | 6 category cards (AI Infra & GPU Ops, AI-Assisted Engineering, Cloud & Infra, DevOps & CI/CD, Containers & IaC, Monitoring) with text chips |
| **Experience** | Chronological timeline — Tarento / Bhashini (Jul 2026–Present), Persistent / Intuit, Payomatix, Freelance, Codewalla / 1Huddle, Purchasing Power |
| **Credentials** | AWS SAA-C03 badge + education |
| **Contact** | Email, LinkedIn, GitHub, phone |

### Current Role
- **Company**: [Tarento Group](https://www.tarento.com/)
- **Title**: Senior Software Engineer, DevOps
- **Client**: [Bhashini — Govt. of India](https://bhashini.gov.in/)
- **Start**: July 2026 (Present)
- **Stack**: GPU-backed Kubernetes · Yotta sovereign cloud · ASR/TTS/NMT model serving · ArgoCD · Jenkins · Docker · Prometheus · Grafana

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **HTML5 / JSON-LD** | Semantic structure, accessibility, SEO schema |
| **Vanilla CSS** | Custom properties, dark/light themes, layout, animations |
| **Vanilla JS** | Theme toggle, mobile nav, tenure metrics, clipboard, scroll reveals |
| **SVG** | CI/CD pipeline favicon + logo, company logos (Tarento, Bhashini) |

### File Structure

```
.
├── index.html                      # Main portfolio markup
├── favicon.svg                     # CI/CD pipeline icon (browser tab)
├── css/
│   └── styles.css                  # Design tokens, layout, Terminal Ops theme
├── js/
│   ├── theme-ui.js                 # Theme controller (dark/light sync)
│   ├── nav-mobile.js               # Accessible mobile navigation drawer
│   ├── tenure.js                   # Real-time tenure metric (hero)
│   ├── clipboard.js                # Email clipboard copy utility
│   └── reveal.js                   # IntersectionObserver scroll animations
└── assets/
    ├── devops-logo.svg             # CI/CD pipeline header logo
    ├── company-logos/
    │   ├── tarento.svg             # Tarento brand icon
    │   ├── bhashini.svg            # Bhashini tricolor wheel (Govt. of India)
    │   └── persistent.svg         # Persistent Systems logo
    └── aws-certified-saa-badge.png # AWS SAA-C03 certification badge
```

---

## 💻 Local Preview

```bash
python3 -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000) in your browser.

---

## ☁️ Deployment (GitHub Pages)

1. Go to **Settings → Pages**
2. Source: **Deploy from a branch** → `main` → `/ (root)`
3. Site auto-deploys at `https://rgrishabh.github.io/`

---

## 📄 License

Released under the [MIT License](LICENSE). Third-party logos, certifications, and fonts are property of their respective owners.
