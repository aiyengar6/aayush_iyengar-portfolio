# Aayush Iyengar — Personal Portfolio

A dark, aerospace-industrial portfolio website built for GitHub Pages. Zero dependencies, zero build step — pure HTML, CSS, and JavaScript.

**Live URL after publishing:** `https://<your-github-username>.github.io/<repo-name>/`

---

## Table of Contents

1. [Quick Start](#1-quick-start)
2. [File Structure](#2-file-structure)
3. [How to Update Content](#3-how-to-update-content)
   - [Your name & headline](#31-your-name--headline)
   - [About section](#32-about-section)
   - [Adding & editing projects](#33-adding--editing-projects)
   - [Experience / timeline](#34-experience--timeline)
   - [Skills](#35-skills)
   - [Contact links](#36-contact-links)
   - [Resume PDF](#37-resume-pdf)
   - [Profile photo](#38-profile-photo)
4. [Publish to GitHub Pages](#4-publish-to-github-pages)
5. [Custom Domain (optional)](#5-custom-domain-optional)
6. [Design Tokens — Colors & Fonts](#6-design-tokens--colors--fonts)
7. [Adding a New Section](#7-adding-a-new-section)
8. [Troubleshooting](#8-troubleshooting)

---

## 1. Quick Start

```bash
# Clone (or fork) the repo
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>

# Open locally — no server needed
open index.html          # macOS
start index.html         # Windows
xdg-open index.html      # Linux
```

Every `<!-- ✏️ UPDATE -->` comment in `index.html` marks something you need to fill in. Search for that string to find all placeholders at once.

---

## 2. File Structure

```
portfolio/
├── index.html            ← All content lives here (single-page site)
├── css/
│   └── style.css         ← All styles and design tokens
├── js/
│   └── main.js           ← Canvas animation, scroll effects, filtering
├── assets/
│   ├── photo.jpg         ← Your headshot (replace this file)
│   └── resume.pdf        ← Your resume (replace this file)
└── README.md             ← This file
```

---

## 3. How to Update Content

All content is in **`index.html`**. Search for `✏️ UPDATE` to jump to each editable section.

### 3.1 Your name & headline

Find the `<header id="hero">` section:

```html
<!-- Change "Aayush Iyengar" to your name in two places: -->
<h1 class="hero-name">Aayush<br/>Iyengar</h1>

<!-- Update your roles / tagline: -->
<p class="hero-tagline">
  GNC · Trajectory Optimization · Spacecraft Structures<br/>
  <span class="hero-sub">Purdue '26 · Relativity Space</span>
</p>
```

Also update the `<title>` and `<meta name="description">` tags at the top of the file.

---

### 3.2 About section

Find `<section id="about">` and update:

| Element | What to change |
|---|---|
| `<p>` paragraphs | Your bio (2–3 paragraphs) |
| `.stat-num` values | Your stats (internship count, project count, etc.) |
| `.stat-label` values | Labels next to each stat |
| `.badge` spans | Degree, minor, club memberships, etc. |

---

### 3.3 Adding & editing projects

Each project is an `<article class="project-card">` block inside `<div class="projects-grid">`.

**To edit an existing card**, find its `<article>` and change:

| Field | Where |
|---|---|
| Category pill | `<span class="proj-tag">` |
| GitHub link | First `<a href="#">` inside `.proj-links` |
| Report/PDF link | Second `<a href="#">` inside `.proj-links` (delete the `<a>` if no report) |
| Title | `<h3>` |
| Subtitle / date | `<p class="proj-meta">` |
| Description | `<p class="proj-desc">` |
| Key result | Text inside `<div class="proj-result">` (after `<span class="result-label">`) |
| Tech stack | `<span class="proj-stack">` |
| Filter tags | `data-tags` attribute on the `<article>` — space-separated, must match filter button values |

**To add a new project**, copy this template and paste it before the closing `</div>` of `projects-grid`:

```html
<article class="project-card" data-tags="GNC Python">
  <!-- data-tags: space-separated, controls which filter button shows this card -->
  <!-- Valid tag values: GNC  Structures  ML  Astrodynamics  Python  MATLAB  Robotics -->
  <!-- Add your own by also adding a <button class="filter-btn" data-filter="YourTag"> -->

  <div class="proj-header">
    <span class="proj-tag">Your Category</span>
    <div class="proj-links">
      <a href="https://github.com/you/repo" target="_blank" rel="noopener" aria-label="GitHub">
        <!-- GitHub icon — keep as-is -->
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
      </a>
    </div>
  </div>

  <h3>Project Title</h3>
  <p class="proj-meta">Course / Organization · Institution · Date</p>
  <p class="proj-desc">
    2–4 sentences describing the problem, your approach, and what you built.
  </p>
  <div class="proj-result">
    <span class="result-label">Key Result</span>
    Your quantitative outcome or main contribution here.
  </div>
  <div class="proj-footer">
    <span class="proj-stack">Python · NumPy · MATLAB</span>
  </div>
</article>
```

**To add a new filter button**, add to the `.projects-filter` div:

```html
<button class="filter-btn" data-filter="YourTag">Your Tag</button>
```

The `data-filter` value must match one of the words in a card's `data-tags` attribute.

---

### 3.4 Experience / timeline

Find `<section id="experience">`. Each role is a `.tl-item` block. Update:

| Field | Where |
|---|---|
| Job title | `<h3>` inside `.tl-header` |
| Company name | `<span class="tl-company">` |
| Dates | `<span class="tl-date">` |
| Description | `<p class="tl-desc">` |
| Skill tags | `<span>` elements inside `.tl-tags` |

**To add a new role**, copy a `.tl-item` block and paste it in chronological order (most recent first).

**To remove a role**, delete the entire `<div class="tl-item">...</div>` block.

---

### 3.5 Skills

Find `<section id="skills">`. Each column is a `.skill-group` div.

- **Change a category heading:** edit the `<h4>` inside `.skill-group`
- **Add a skill:** add a `<li>Your Skill</li>` inside the `<ul>`
- **Add a column:** copy a full `.skill-group` div and paste inside `.skills-grid`
- **Remove a column:** delete the `.skill-group` div

---

### 3.6 Contact links

Find `<section id="contact">` and update the three `<a class="contact-card">` links:

```html
<!-- Email -->
<a href="mailto:your.real@email.com" class="contact-card">
  ...
  <span>your.real@email.com</span>
</a>

<!-- LinkedIn -->
<a href="https://linkedin.com/in/your-actual-profile" ...>
  ...
  <span>LinkedIn</span>
</a>

<!-- GitHub -->
<a href="https://github.com/your-actual-username" ...>
  ...
  <span>GitHub</span>
</a>
```

---

### 3.7 Resume PDF

1. Name your resume file `resume.pdf`
2. Place it at `assets/resume.pdf`
3. That's it — the "Resume ↗" button in the hero already points there

---

### 3.8 Profile photo

1. Name your photo `photo.jpg` (JPEG recommended; PNG also works — just update the filename in `index.html`)
2. Place it at `assets/photo.jpg`
3. Recommended size: **800 × 1000 px** (4:5 portrait ratio), under 500 KB

The site gracefully shows a placeholder until the photo is added, so it works without a photo too.

---

## 4. Publish to GitHub Pages

### Step 1 — Create a GitHub repository

1. Go to [github.com/new](https://github.com/new)
2. Name it `portfolio` (or any name you like)
3. Set visibility to **Public** (required for free GitHub Pages)
4. Do **not** initialize with a README (you already have one)
5. Click **Create repository**

### Step 2 — Push your files

```bash
cd portfolio/          # the root folder containing index.html

git init
git add .
git commit -m "Initial portfolio commit"

git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages

1. In your repository, click **Settings** (top tab bar)
2. In the left sidebar, click **Pages**
3. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
4. Click **Save**
5. GitHub will show: *"Your site is live at `https://<username>.github.io/<repo-name>/`"*

It takes **1–5 minutes** to go live. Refresh the Pages settings tab until you see the green checkmark.

### Step 4 — Updating the site later

Every time you push a change to `main`, GitHub Pages automatically rebuilds within ~1 minute:

```bash
git add .
git commit -m "Update projects section"
git push
```

---

## 5. Custom Domain (optional)

To use `yourname.com` instead of `github.io`:

1. Buy a domain from Namecheap, Google Domains, Cloudflare, etc.
2. In your domain registrar's DNS settings, add:
   ```
   Type: CNAME
   Name: www
   Value: <your-username>.github.io
   ```
   And four A records pointing to GitHub's IPs:
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```
3. In GitHub Pages settings, enter your domain in the **Custom domain** field
4. Check **Enforce HTTPS** (takes a few minutes to provision the certificate)

Full guide: [docs.github.com/pages/configuring-a-custom-domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

---

## 6. Design Tokens — Colors & Fonts

All visual design variables live at the top of `css/style.css`:

```css
:root {
  --bg:       #0a0b0e;    /* Main background */
  --bg-2:     #10131a;    /* Alternate section background */
  --bg-3:     #161c26;    /* Deeper surface */
  --surface:  #1a2030;    /* Card backgrounds */
  --amber:    #f5a623;    /* Accent color — change to match your preference */
  --text:     #e8eaf0;    /* Primary text */
  --text-dim: rgba(232,234,240,0.55);  /* Secondary text */
}
```

**To change the accent color** (currently amber/gold), replace every `#f5a623` and `245,166,35` with your preferred color. A blue like `#4a9eff` / `74,158,255` or green like `#3ecf8e` / `62,207,142` work well for aerospace portfolios.

**Fonts** are loaded from Google Fonts:
- `Syne` (display / headings)
- `DM Mono` (monospace labels)
- `Literata` (body text)

To change fonts, update the `<link>` tag in `<head>` and the `--display`, `--mono`, `--body` variables in `:root`.

---

## 7. Adding a New Section

To add a completely new section (e.g., Publications, Awards):

1. Add a `<section id="your-id">` block in `index.html` after the existing sections
2. Add a nav link: `<li><a href="#your-id">Your Section</a></li>` in both `.nav-links` and `.mobile-menu ul`
3. Style it using the existing section pattern — your new section will automatically alternate background colors

---

## 8. Troubleshooting

| Problem | Fix |
|---|---|
| Site not showing after enabling Pages | Wait 5 minutes, then hard-refresh (`Cmd+Shift+R` / `Ctrl+Shift+R`) |
| Photo not showing | Confirm the file is at `assets/photo.jpg` and the filename matches exactly (case-sensitive on Linux) |
| Filter buttons not working | Make sure the `data-filter` value on the button exactly matches one of the words in `data-tags` on the card |
| Canvas animation laggy | Shrink your browser window or check for GPU acceleration settings |
| Custom domain HTTPS not working | Wait up to 24 hours for DNS propagation; also make sure the CNAME file exists in your repo root |
| Fonts not loading | You need an internet connection; fonts load from Google Fonts CDN |

---

## Credits

- Fonts: [Syne](https://fonts.google.com/specimen/Syne), [DM Mono](https://fonts.google.com/specimen/DM+Mono), [Literata](https://fonts.google.com/specimen/Literata) via Google Fonts
- Hosting: [GitHub Pages](https://pages.github.com) (free)
- No frameworks, no build tools, no dependencies
