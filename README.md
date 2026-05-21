# Auditoo 🔍✨

Auditoo is a premium, high-fidelity website audit tool powered by Google Gemini. It analyzes any public URL for UX/UI design anomalies, mobile responsiveness, performance latency, and conversion funnels, generating actionable checklist reports in seconds.

---

## 🚀 Features

- **Instant URL Auditing**: Enter any domain name to trigger a deep diagnostic analysis.
- **Sequential Diagnostic HUD**: Watch live checklist diagnostics step-by-step as the AI sandbox crawls and runs heuristics.
- **Comprehensive Scorecards**: Get precise grades out of 100 for UX Design, SEO, Load Speed, Conversion Funnels, and Mobile Responsiveness.
- **Targeted Action Checklists**: Structured recommendations categorized by priority (High, Medium, Low) to optimize conversion rates.
- **Sleek Premium Design**: Modern dark mode interface with neon accent lines, responsive grids, custom vector logo, and fluid animations.
- **Live Activity Feed**: Real-time ticker showing recent audit domains and their scores.

---

## 🛠️ Technology Stack

- **Core UI**: React, Vite
- **Styling**: Modern Vanilla CSS, Glassmorphic overlays, and custom smooth micro-animations.
- **AI Core**: Google Gemini API via Vercel serverless API routing (ensuring client-side API keys are completely hidden).

---

## 💻 Local Development Setup

To run Auditoo locally on your machine, follow these steps:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18 or higher recommended).

### 1. Clone the Repository
```bash
git clone https://github.com/Robin239105/Auditoo.git
cd Auditoo
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Serverless Environment Variable
Auditoo uses a Vercel serverless function (`/api/audit`) to safely call Google Gemini. If running/testing the API routes locally with Vercel CLI:
Create a `.env` or `.env.local` file:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Run the Dev Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

---

## 📦 Deployment to Vercel

Auditoo is pre-configured to be deployed directly to [Vercel](https://vercel.com).

1. Import the repository into your Vercel Dashboard.
2. In the project settings, add the following **Environment Variable**:
   - `GEMINI_API_KEY`: Your official Gemini API Key from [Google AI Studio](https://aistudio.google.com/).
3. Deploy! Vercel will automatically host both the React/Vite frontend and the serverless Node.js functions in `api/`.

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

Developed with 💜 by [Al Amin Robin](https://alaminrobin.com)
