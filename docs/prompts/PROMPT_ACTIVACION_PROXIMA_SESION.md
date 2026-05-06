# Prompt de Activación para Próxima Sesión

Actúa como agente de desarrollo dentro del workspace de VS Code del repositorio:

```text
/Users/ricardomoralesdejesus/wellbe-quest-mvp-1
```

Proyecto:

```text
WellBe Quest v1 — Mapa del Buen Vivir
```

Repositorio GitHub:

```text
https://github.com/ricardojuanmorales/wellbe-quest-mvp-1
```

App publicada:

```text
https://ricardojuanmorales.github.io/wellbe-quest-mvp-1/
```

---

## Estado al Inicio de Esta Sesión

El MVP V1 está implementado, corregido y desplegado. Usa:

- `index.html` — monolito HTML/CSS/JS sin framework ni build step
- `data/` — JSON editable (rutas, actividades, badges, avatares, config)
- `docs/` — documentación Markdown completa
- `tests/index.html` — suite de 40 tests unitarios ejecutable en el navegador
- `CLAUDE.md` — guía de contexto para Claude Code
- `AGENTS.md` — guía de restricciones para agentes
- Progreso local con `localStorage` bajo la clave `wellbeQuestV1Progress`
- Sin backend, Supabase, OAuth, APIs externas, telemetría ni dependencias instaladas

Funcionalidades completadas en sesiones anteriores:

- Modal de actividad: `dialog[open] { display: flex }` + `getBoundingClientRect()` para backdrop
- Panel lateral 📚 Guías: 4 tabs por nivel, descarga MD, cierre con ×/backdrop/Escape
- Bug crítico resuelto: backticks sin escapar en `GUIDE_MARKDOWN.n3` — fix en `39575a9`

---

## Antes de Cambiar Código

1. Ejecuta `git status --short --branch`
2. Lee estos archivos en orden:
   - `CLAUDE.md`
   - `AGENTS.md`
   - `docs/session/COMPENDIO_SESION.md`
   - `docs/followup/PRIMER_SEGUIMIENTO.md`
3. Arranca el servidor local: `python3 -m http.server 8000`
4. Verifica los tests en `http://localhost:8000/tests/index.html` — deben mostrar 40/40 verde
5. No agregues backend ni servicios externos
6. No cambies el esquema JSON sin actualizar `docs/DATA_SCHEMA.md`
7. No introduzcas datos personales reales

---

## Primera Tarea Recomendada

Ejecutar la prueba manual de aceptación completa desde GitHub Pages (con Ctrl+Shift+R para limpiar caché). El checklist está en `docs/followup/PRIMER_SEGUIMIENTO.md`. Incluye validación del panel 📚 Guías.

---

## Prioridades si la Prueba Manual Pasa

1. Accesibilidad: `aria-pressed` en avatar y actividades completadas
2. Accesibilidad: región `aria-live="polite"` para anunciar puntos y badges
3. UX: confirmación antes de reiniciar progreso
4. UX: confirmación antes de sobrescribir progreso al importar
5. Contenido: mensajes contextuales de WellBe por ruta o actividad
6. Docs: actualizar `README.md` raíz

---

## Criterio de Cierre de Sesión

Cada sesión debe terminar con:

- cambios validados (tests pasan, prueba manual ejecutada si aplica)
- documentación actualizada si se modificó lógica o esquema
- commit claro con co-autoría de Claude
- push a `main`
- documentos de cierre actualizados (`COMPENDIO_SESION.md`, `PRIMER_SEGUIMIENTO.md`, este archivo)
