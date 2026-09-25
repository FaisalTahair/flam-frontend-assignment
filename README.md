# AI-Powered Trip Planner (Flam Frontend Assignment)

A responsive, interactive React application that takes free-form text input, queries a real LLM backend securely, parses and validates structured JSON data, and renders a fully interactive day-by-day travel itinerary.

---

## Features
- **Structured Data UI:** Transforms raw LLM output into checkable stops, category tags, budget summaries, and interactive day cards.
- **Robust Failure & Error Handling:** Validates data shape (`ValidResult.ts`) to prevent UI crashes, catches malformed JSON, and includes explicit loading and error states with retry options.
- **Stale Request Protection:** Uses `useRef` counters to ensure slower, outdated API requests never overwrite newer user generations.
- **Secure Backend Proxy:** Routes LLM calls through a Node/Express backend (`server/generate.ts`) so API keys are never exposed in the browser.
- **Interactive Itinerary:** Allows users to dynamically modify their trip by removing stops or resetting views.

---

## Tech Stack
- **Frontend:** React (Hooks, Functional Components), TypeScript, Tailwind CSS (or standard CSS styling).
- **Backend:** Node.js, Express, `@google/genai` (Gemini Flash model).
- **Tooling:** Vite / React Scripts, TypeScript compiler.

---

## Setup & Running Locally

### Prerequisites
- Node.js (v16+ recommended) installed on your machine.
- A Gemini API key from Google AI Studio.

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd flam-frontend-assignment