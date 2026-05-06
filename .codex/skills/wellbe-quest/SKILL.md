---
name: wellbe-quest
description: Use when working in the WellBe Quest MVP repository, especially for static app changes, data schema edits, local-first privacy constraints, activity renderers, and browser-based unit tests.
---

# WellBe Quest

## Guardrails

- Keep the MVP static: `index.html`, JSON in `data/`, Markdown in `docs/`.
- Do not add a backend, auth, external APIs, remote telemetry, heavy frameworks, or dependencies without explicit approval.
- Keep user-facing product language in clear Spanish. Avoid clinical, diagnostic, prescriptive, or blame-oriented language.
- Preserve local-first privacy: progress lives in `localStorage`; reflections are not stored in V1.

## Data

- JSON files must stay editable by non-technical collaborators.
- Use stable kebab-case IDs.
- Verify cross-references between routes, activities, badges, and avatars.
- Update `docs/DATA_SCHEMA.md` whenever a JSON schema changes.

## Testing

- Unit tests live in `tests/unit/`.
- `tests/index.html` is the browser runner and loads unit files with plain `<script>` tags.
- Run tests through a local static server because the app uses `fetch`:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000/tests/index.html`.

- Keep `tests/unit/wellbe-logic.fixture.js` synchronized with pure logic in `index.html`.
- Add or update specs when changing progress normalization, badge evaluation, route progress, escaping/render safety, or activity completion rules.

## Modal

- The activity modal uses native `<dialog>` with `showModal()`.
- Keep flex layout on `dialog[open]`, not plain `dialog`.
- Backdrop close uses `getBoundingClientRect()` on the dialog click event.
