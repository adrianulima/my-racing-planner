# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start Vite dev server (http://localhost:5173)
npm run build        # TypeScript check + production build
npm run lint         # Run ESLint
npm run test         # Run Jest tests
npm run preview      # Preview production build

# iRacing data management
npm run fetch-data   # Fetch current season data from iRacing API
npm run parse-data   # Parse fetched data into JSON files
npm run fetch-past   # Fetch historical season data
npm run parse-past   # Parse historical data

npm run deploy       # Build and deploy to GitHub Pages
```

Requires Node.js v20+.

## Architecture

**racingplanner.com** — A React/TypeScript SPA for iRacing users to plan their season by analyzing which cars, tracks, and series they need to purchase.

### Tech Stack

- **React 18** + **Vite** + **TypeScript**
- **Chakra UI 3** for components/theming
- **Zustand** for state management (with localStorage persistence)
- **wouter** for hash-based routing (`#/path`)
- **@dnd-kit** for drag-and-drop

### State Management

Two persisted Zustand stores drive the app:

- `src/store/ir.ts` (`useIrStore`) — user content: `myCars`, `myTracks`, `wishCars`, `wishTracks`, `favoriteSeries`
- `src/store/ui.ts` (`useUiStorePersist`) — UI prefs: display toggles, discounts, timezone, car category filter

### Routing

Hash-based routes via `wouter` defined in `src/components/main-container/main-container.tsx`:

- `/` → Season page
- `/series` → Series page
- `/cars` → Cars page
- `/tracks` → Tracks page
- `/checkout` → Shop Guide
- `/history` → History

Dialogs (about, help, changelog, privacy) are separate modal routes using `ETabs` enum.

### Data Flow

Static iRacing data lives in `src/ir-data/` (cars, tracks, series as JSON). The `iracing-api/` scripts fetch live data from iRacing's API using OAuth 2.1 (credentials in `.env`) and write parsed results back to `src/ir-data/`.

### Path Alias

`@/*` maps to `./src/*` (configured in `tsconfig.app.json` and `vite.config.ts`).

### TypeScript Config

Three tsconfig files: `tsconfig.app.json` (app, strict), `tsconfig.node.json` (Vite tooling), `tsconfig.test.json` (Jest). Referenced from the root `tsconfig.json`.
