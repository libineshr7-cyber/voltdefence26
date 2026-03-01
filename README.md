# VoltDefence – Dynamic Session Trust Monitoring

VoltDefence is a modern, responsive Security Operations Platform built entirely with Vanilla HTML, CSS, and JavaScript. It serves as a dashboard to proactively monitor session trust, detect anomalies, analyze risks, and visualize live security stream data.

## 🚀 Features

- **Interactive Dashboard:** Access varied security insights through a dynamic sidebar, with sections such as "Active Sessions", "Trust Analytics", "Alerts & Risks", and more.
- **Dynamic Data Visualization:** Leverages [Chart.js](https://www.chartjs.org/) to render real-time trust score trends, comparing Normal and Compromised session scenarios seamlessly.
- **Real-Time Activity Stream:** A live, auto-updating terminal-style view that logs session events with criticality-based color-coding and status indicators.
- **Simulated Risk Detection Engine:** Evaluates navigation patterns, request behaviors, and geographic shifts—highlighting progress using an animated, asynchronous progress bar framework.
- **Active Session Monitoring:** A comprehensive table sorting active user sessions along with their trust scores, statuses, locations, and real-time behavioral insights.
- **Responsive Layout:** Beautiful modern dark-theme user interface crafted rapidly using [Tailwind CSS](https://tailwindcss.com/) (imported via CDN).
- **Clean Iconography:** Uses [Lucide](https://lucide.dev/) for crisp, scalable icon design.

## 📂 Project Structure

```text
📁 vanilla
├── 📄 index.html  # Main application layout, styles, and structural containers
├── 📄 style.css   # Custom base styles, fonts (Inter), and custom scrollbars
└── 📄 app.js      # Core application logic, mock data generation, and DOM manipulation
```

## 🛠️ Built With

- **HTML5**: Semantic and structural layout.
- **CSS3 / Tailwind CSS**: Rapid utility-class styling directly in the browser.
- **Vanilla JavaScript (ES6)**: Full dynamic behavior including fake data simulation without external frameworks.
- **Chart.js**: Render rich statistical graphs.
- **Lucide Icons**: Simple and consistent vector illustrations.

## ⚙️ Getting Started

Because this project is built using purely static browser technologies, there are no build steps or bundlers required to get it up and running!

1. Clone or download the repository to your local machine.
2. Open the `vanilla` folder.
3. Simply launch `index.html` in your favorite modern web browser.
   - *Alternatively, use an extension like **Live Server** in VS Code for a better development experience with hot-reloading.*

## 🎨 UI/UX Highlights

- **Gradient Effects and Glassmorphism:** Subtle background textures and blurs on monitoring modules create a distinctly premium, "cyber-security" aesthetic.
- **Animated Components:** Heartbeats, pulse circles, smooth progress bars, and scrolling live streams emphasize exactly where the user needs to look.
- **State Handling:** Switch between context views (e.g. Normal vs. Compromised scenarios) with immediate, fluid UI reactions.

## 👨‍💻 Development notes

- The data flow operates entirely in the DOM using standard HTML elements. 
- Real-time updates utilize standard `setInterval` approaches to push objects into visual trees without refreshing the page.
- Modifying UI components only requires altering the `app.js` render methods or HTML templates.

## 🛡️ License

This project is open-sourced and freely available. Feel free to fork, adapt, and use it in your next dashboard project!
