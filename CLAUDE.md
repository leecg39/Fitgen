# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Run from the repository root; npm workspaces fan commands out to `apps/*` via `concurrently`.

- `npm install` — install all workspace deps.
- `npm run dev` — starts both servers in parallel: `apps/api` (Node `--watch`, port 4000) and `apps/web` (Vite, port 3000). The web dev server proxies `/api` → `http://localhost:4000`.
- `npm run build` — builds the web bundle into `dist/apps/web/`. The build script first invokes `node tools/generate-llms.js || true`, so a missing `tools/` directory is tolerated silently.
- `npm run start` — runs both workspaces' `start` scripts (preview web + production api).
- `npm run lint` — `eslint . --quiet` inside `apps/web` only.

Per-workspace commands: `npm --prefix apps/api run dev`, `npm --prefix apps/web run preview`, etc.

There is no test runner configured; do not claim tests pass.

## Architecture

npm-workspaces monorepo with two apps:

- `apps/web` — Vite + React 18 SPA ("FitGen", a fitness questionnaire → workout generator).
- `apps/api` — Fastify 4 (ESM) JSON API that owns the workout-generation logic.

### Frontend app state machine (`apps/web`)

`src/App.jsx` is the entire navigation layer. It holds four pieces of state (`showQuestionnaire`, `workoutPlan`, `initialGender`, `isGenerating`) and uses `framer-motion`'s `AnimatePresence` to swap between three mutually exclusive views:

1. Landing — `Hero`, `Features`, `WorkoutTypes`, `Trainers`, `BentoGrid`, `LogoCloud`, `CallToAction`.
2. `QuestionnaireForm` (entered by calling `onStart(gender)` from `Hero`/`CallToAction`). Receives `isSubmitting` to disable the "Generate Workout" button while the request is in flight.
3. `WorkoutResults` (entered when `generateWorkoutPlan()` resolves).

`src/pages/HomePage.jsx` exists but is **not** rendered by `App.jsx`; the landing composition is inlined into `App` directly. Prefer editing `App.jsx` unless you are intentionally wiring up routing.

The thin API client lives at `src/lib/api.js` (`generateWorkoutPlan(formData)`). It posts to `/api/workouts/generate` and unwraps `{ plan }`. Errors surface as `Error` instances with server-provided messages.

### Backend (`apps/api`)

Fastify server in `src/server.js`. CORS is permissive (`origin: true`) for dev convenience. Current routes:

- `GET  /api/health` — liveness probe.
- `POST /api/workouts/generate` — validates body with `zod` (`src/workouts/schema.js`), runs `generateWorkout()` (`src/workouts/generate.js`), returns `{ plan }`. Validation failures return 400 with a `{ error, issues }` body.

The exercise catalog and cardio presets live in `src/workouts/exercise-library.js` as **in-memory mock data**. When adding exercises, goals, fitness levels, or recommendation rules, edit those three files — there is no database or external data source. Keep the enums (`FOCUS_AREAS`, `FITNESS_LEVELS`, `GOALS`) synced between `exercise-library.js` and the frontend's questionnaire options.

Weight/height unit conversion (`lbs→kg`, `ft→cm`) happens server-side in `generate.js`; the frontend passes raw form values.

### UI system (`apps/web`)

Shadcn-style layout: Radix UI primitives wrapped in `src/components/ui/*` (button, carousel, checkbox, input, label, select, slider, toast, toaster). Compose classes with `cn(...)` from `@/lib/utils` (clsx + tailwind-merge). Tailwind is configured with CSS-variable-driven semantic tokens (`--border`, `--primary`, etc.) in `tailwind.config.js`, but the current `src/index.css` does **not** define those variables — components that reference them render against Tailwind defaults plus the hard-coded `bg-[#0C0C0C]` / white palette on `body`. If you introduce new Radix-based components that depend on the token system, you also need to add the CSS variable definitions.

Toast: there are two copies of `use-toast.js` (`src/hooks/` and `src/components/ui/`). Imports in the codebase point at the one under `components/ui/`; keep them in sync or consolidate.

### Path aliases and config gotchas

- Imports use `@/...` to mean `apps/web/src/...`. The alias is configured in `apps/web/vite.config.js`.
- `apps/web/vite.config.js` also owns the dev-server proxy: `/api` → `VITE_API_TARGET` (default `http://localhost:4000`).
- There is **no committed ESLint config** despite the `eslint` script and several ESLint plugins in devDeps; `eslint .` will either pick up a locally generated config or need one created (`eslint-config-react-app` is available).
- JSX files use `.jsx` exclusively; there is no TypeScript in the tree even though `@types/react*` is installed.
- `react-helmet` handles `<title>` / meta in `App.jsx` — do not assume any other head management.

### Build output path

`vite build --outDir ../../dist/apps/web` means the bundle lands **outside** `apps/web`, at the repository root's `dist/`. The API does not currently produce a build artifact.
