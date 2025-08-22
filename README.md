# Translate Lab (CDN Tailwind)
Vite + React app using Tailwind via CDN (no tailwind.config.js / postcss.config.js).

## Setup
1) Install deps
```
npm install
```
2) Create `.env` and add:
```
VITE_RAPID_API_KEY=YOUR_RAPIDAPI_KEY
```
3) Run
```
npm run dev
```

## Notes
- Translator uses RapidAPI Google Translate endpoint.
- Tailwind is loaded via CDN in index.html.
