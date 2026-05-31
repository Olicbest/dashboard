# PulseOps Animated SaaS Dashboard

PulseOps is a responsive, animated SaaS operations dashboard built with plain HTML, CSS, and JavaScript. It presents revenue, usage, churn, support, pipeline, task, and automation data in a polished single-page interface with no build step required.

## Features

- Responsive dashboard layout with desktop sidebar and mobile drawer navigation
- Overview, analytics, billing, team, and automation view states
- Animated KPI counters for revenue, active users, churn risk, and resolved tickets
- Dynamic revenue velocity bar chart
- Workspace selector for Northstar AI, Atlas CRM, and Orbit Finance
- Date range controls for 7-day, 30-day, and 90-day views
- Search filtering for pipeline deals and team tasks
- Light and dark theme toggle
- Live animation toggle for reduced motion-style previewing
- Automation health controls with pause and resume behavior
- Interactive pipeline actions for adding and advancing deals
- Click-to-complete task management with clear-completed action
- Modal flows for notifications, account, upgrades, and report creation
- CSV export for current dashboard metrics
- Lightweight local Node.js static server

## Tech Stack

- HTML5
- CSS3 with responsive media queries, CSS variables, animations, and theme tokens
- Vanilla JavaScript for state, rendering, events, modals, toasts, and CSV export
- Node.js built-in `http` server for local previewing

No package manager, framework, bundler, or external dependency install is required.

## Project Structure

```text
animation-saas-dashboard/
|-- index.html    # Main dashboard markup
|-- styles.css    # Layout, themes, responsive styling, and animations
|-- script.js     # Dashboard state, rendering logic, and interactions
|-- server.mjs    # Local static file server
`-- README.md     # Project documentation
```

## Getting Started

Open the project folder:

```powershell
cd C:\dex\animation-saas-dashboard
```

Start the local server:

```powershell
node server.mjs
```

Then visit:

```text
http://127.0.0.1:4173
```

You can also open `index.html` directly in a browser, but the local server gives a cleaner preview environment.

## Configuration

The server uses port `4173` by default. To run it on another port, set the `PORT` environment variable before starting the server:

```powershell
$env:PORT = 3000
node server.mjs
```

## How The App Works

The dashboard stores its demo data in the `state` object inside `script.js`. UI sections are rendered from that state, then updated through event listeners.

Key areas to customize:

- `views` in `script.js` controls the text for each sidebar view.
- `workspaceMultipliers` changes how each workspace affects metrics.
- `state.tasks` controls the starting team task list.
- `state.deals` controls the starting sales pipeline.
- CSS variables in `:root` and `body.dark` inside `styles.css` control the color system.
- The hero image is set in `.hero-band` inside `styles.css`.

## Main Interactions

- Use the sidebar to switch dashboard views.
- Use the segmented date control to recalculate metrics and charts.
- Change the workspace selector to update metric values and chart captions.
- Type in search to filter deals and tasks.
- Toggle the theme button to switch between light and dark mode.
- Toggle live animation to disable dashboard transitions.
- Use `Add deal`, `Advance`, `Pause all`, and task rows to update dashboard state.
- Use `Export CSV` to download the currently displayed KPI values.

## Browser Support

The app targets modern browsers that support CSS variables, `color-mix()`, `Blob`, and `URL.createObjectURL()`. For best results, use the latest versions of Chrome, Edge, Firefox, or Safari.

## Deployment

Because this is a static frontend, you can deploy the project to any static hosting service.

Common options:

- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages
- Any basic web server that can serve `index.html`, `styles.css`, and `script.js`

For static hosting, upload these files:

```text
index.html
styles.css
script.js
```

`server.mjs` is only needed for local previewing.

## License

Use, modify, and adapt this dashboard for your own projects.
