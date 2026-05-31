# PulseOps Animated SaaS Dashboard

A responsive animated SaaS dashboard built with plain HTML, CSS, and JavaScript. It includes live-feeling business metrics, interactive controls, modal actions, task management, pipeline updates, and a lightweight local server for previewing the app.

## Features

- Responsive sidebar and mobile menu
- Animated KPI cards and revenue bar chart
- Dashboard views for overview, analytics, billing, team, and automation
- Date range filters and workspace switching
- Search across deals and tasks
- Dark mode toggle
- Notifications, profile, upgrade, and report modals
- Add and advance deals
- Complete and clear tasks
- Pause and resume automation flows
- CSV export button

## Project Files

- `index.html` - dashboard markup
- `styles.css` - responsive layout, theme, and animations
- `script.js` - dashboard interactions and dynamic data updates
- `server.mjs` - small Node.js static server

## Run Locally

Open the folder:

```powershell
cd C:\dex\animation-saas-dashboard
```

Start the local server:

```powershell
node server.mjs
```

Then open:

```text
http://127.0.0.1:4173
```

You can also open `index.html` directly in a browser, but using the local server is recommended.

## Push To GitHub

If your GitHub repo is `healthcare-page`, use:

```powershell
git init
git add .
git commit -m "Add animated SaaS dashboard"
git branch -M main
git remote add origin https://github.com/Olicbest/healthcare-page.git
git push -u origin main
```

If the remote already exists, update it instead:

```powershell
git remote set-url origin https://github.com/Olicbest/healthcare-page.git
```

If GitHub already has files in the repo, pull before pushing:

```powershell
git pull origin main --allow-unrelated-histories
git push -u origin main
```
