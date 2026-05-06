# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project identity

**WellBe Quest** (`wellbe-quest-mvp-1`) — a static, gamified learning platform exploring nutrition, agroecology, community health, and AI through a buen vivir lens. No backend, no build step, no npm — the entire application is a single `index.html` that loads JSON data files via `fetch`.

## Running locally

Because `index.html` uses `fetch` for JSON data, it requires a static server (not `file://`):

```bash
python3 -m http.server 8000
# or
npx serve .
```

Open `http://localhost:8000`.

## Architecture

```
index.html          # Full app: HTML + CSS + JS (single file, no framework)
data/
  routes.json       # Learning routes
  activities.json   # Interactive activities: quiz, claim_detector, branching_case, mind_map, simple_simulation, reflection
  badges.json       # Badges with unlock triggers
  avatars.json      # Learner avatars (no physical appearance)
  game_config.json  # Levels, points thresholds, WellBe messages, privacy commitments
tests/
  index.html        # Browser-based unit test runner (open via static server)
  unit/             # Unit runner, fixtures, and specs
docs/               # Architecture, data schema, privacy, roadmap
exports/            # Gitignored; for manual user exports only
.codex/skills/
  wellbe-quest/     # Local Codex skill for this static MVP
```

All game logic, rendering, and state live in `index.html`. There is no transpilation, bundler, or framework.

## Data + state model

- **Progress** stored in `localStorage` under key `wellbeQuestV1Progress`; exported/imported as JSON.
- `normalizeProgress()` is the canonical function for deriving state (points, badges, level, route progress) from a raw completed-activity list — always route mutations through it.
- JSON files in `data/` must remain editable by non-technical users (docentes, researchers). Use stable kebab-case IDs and keep schemas documented in `docs/DATA_SCHEMA.md`.
- Cross-references: `activities.json` → `route_id` → `routes.json`; `badges.json` → `trigger` evaluated against activity/route completion sets.

## Testing

Unit tests live in `tests/unit/` and are loaded by `tests/index.html`. They are browser-based (no test framework, no Node runner). Open via the static server:

```
http://localhost:8000/tests/index.html
```

The unit cartapacio uses plain scripts:

- `tests/unit/test-runner.js` — tiny assertion/render runner.
- `tests/unit/wellbe-logic.fixture.js` — mock data plus replicas of pure logic from `index.html`.
- `tests/unit/progress.spec.js` — progress, levels, routes, badges, and `normalizeProgress`.
- `tests/unit/security.spec.js` — escaping/render-safety helpers.

When editing core logic in `index.html`, keep the replicated functions in `tests/unit/wellbe-logic.fixture.js` in sync and add or update specs in `tests/unit/*.spec.js`.

## Activity modal

The modal uses the native `<dialog>` element with `showModal()`. Key implementation notes:

- Use `dialog[open] { display: flex; flex-direction: column; }` — NOT `dialog { display: flex; }`. The `open` selector is required for flex to apply reliably across browsers.
- Backdrop close uses `getBoundingClientRect()` on the dialog's click event to detect out-of-bounds clicks. The `e.target === e.currentTarget` pattern does NOT work for `showModal()` backdrops.

## Content and ethics constraints

- WellBe Quest is an educational co-pilot, not a clinical tool. Avoid diagnostic, prescriptive, or blame language.
- Privacy-first: no external requests, no telemetry, no personal data leaves the browser without explicit user action.
- Activity types: `quiz`, `claim_detector`, `branching_case`, `mind_map`, `simple_simulation`, `reflection`. New types require a renderer in `index.html` and schema documentation in `docs/DATA_SCHEMA.md`.
