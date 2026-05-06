# Primer de Seguimiento

Fecha: 2026-05-05

## Estado Actual

WellBe Quest v1 — Mapa del Buen Vivir está implementado como MVP estático funcional. El modal de actividad está corregido. Existe un panel lateral de guías por nivel con descarga. La suite de tests corre en el navegador. El repo está sincronizado con GitHub Pages.

Commit más reciente: `39575a9 — Fix backticks sin escapar en GUIDE_MARKDOWN n3 que rompían el app`

---

## Cómo Ejecutar la App

Desde la raíz del proyecto:

```bash
python3 -m http.server 8000
```

Abrir en el navegador:

```text
http://localhost:8000
```

No abrir `index.html` directamente con doble clic — el navegador bloquea `fetch` de archivos locales.

App en GitHub Pages:

```text
https://ricardojuanmorales.github.io/wellbe-quest-mvp-1/
```

---

## Cómo Ejecutar los Tests

Los tests son un runner HTML sin frameworks. Arrancar el servidor local y abrir:

```text
http://localhost:8000/tests/index.html
```

Se muestran los resultados de 40 assertions sobre las funciones puras del core. Verde = todo pasa. Si hay fallos, aparecen en rojo con el valor esperado vs obtenido.

Cuando se modifica lógica pura en `index.html`, mantener en sync las funciones replicadas en `tests/index.html`.

---

## Prioridades para la Próxima Sesión

### Alta prioridad

1. **Prueba manual de aceptación en navegador** — completar el checklist de validación abajo desde GitHub Pages.
2. **Accesibilidad básica:**
   - `aria-pressed` en tarjetas de avatar seleccionado y actividades completadas
   - Región viva (`aria-live="polite"`) para anunciar cambios de puntos y badges
   - Confirmación antes de reiniciar progreso (actualmente destruye sin preguntar)
   - Confirmación antes de sobrescribir progreso importado

### Media prioridad

3. **Mensajes contextuales de WellBe** por ruta o actividad (actualmente genéricos por nivel).
4. **README.md raíz** — actualizarlo para reflejar el estado real del MVP.
5. **Ampliar los tests** — añadir casos para `renderQuiz`, `normalizeProgress` completo, y `evaluateBadges` con triggers de las 12 actividades.

### Fuera de alcance (no agregar)

- Backend, Supabase, OAuth, APIs externas, telemetría, analytics, perfiles remotos
- Recomendaciones clínicas o dietas personalizadas
- Datos personales reales

---

## Checklist de Prueba Manual de Aceptación

Ejecutar desde GitHub Pages (`https://ricardojuanmorales.github.io/wellbe-quest-mvp-1/`) con Ctrl+Shift+R para limpiar caché:

### Carga y datos

- [ ] Carga de la app sin errores en consola
- [ ] Se muestran 4 rutas, 12 actividades, 6 badges, 4 avatares

### Flujo de juego

- [ ] Selección de avatar se persiste
- [ ] Completar una actividad → puntos y badge "Primer paso"
- [ ] Completar 3 actividades de una ruta → progreso de ruta al 100% y badge de ruta
- [ ] Completar 6 actividades → badge "Mitad del mapa"
- [ ] Completar actividad de comunidad → badge correspondiente
- [ ] Completar actividad de IA → badge correspondiente
- [ ] Completar 4 tipos distintos de actividad → badge de explorador de tipos
- [ ] Recargar la página → progreso persiste

### Gestión de progreso

- [ ] Exportar progreso → descarga JSON con nombre correcto
- [ ] Reiniciar progreso → queda en cero
- [ ] Importar el JSON exportado → restaura correctamente

### Modal de actividad

- [ ] Modal se abre, muestra contenido completo, se cierra con botón ×
- [ ] Clic en backdrop (zona oscura fuera del recuadro) lo cierra
- [ ] Tecla Escape lo cierra

### Panel de guías

- [ ] Botón 📚 Guías en la barra de navegación abre el panel lateral
- [ ] Los 4 tabs (N1–N4) cambian el contenido correctamente
- [ ] Botón "Descargar esta guía" descarga el MD del tab activo
- [ ] Botón "Descargar guía completa" descarga el MD de todos los niveles
- [ ] Botón × cierra el panel
- [ ] Clic en backdrop oscuro cierra el panel
- [ ] Tecla Escape cierra el panel

### Accesibilidad y UX

- [ ] Navegación por teclado → todos los botones son accesibles
- [ ] Vista móvil → no hay desbordamientos horizontales

---

## Comandos Útiles

```bash
# Servidor local
python3 -m http.server 8000

# Validar JSON
jq empty data/*.json

# Verificar que no hay servicios externos activos
grep -rn "supabase\|oauth\|analytics\|telemetry" index.html data/

# Estado Git
git status --short --branch

# Subir cambios
git add <archivos>
git commit -m "Mensaje claro"
git push origin main
```
