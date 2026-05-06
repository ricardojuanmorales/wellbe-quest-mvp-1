# Primer de Seguimiento

Fecha: 2026-05-05

## Estado Actual

WellBe Quest v1 — Mapa del Buen Vivir está implementado como MVP estático funcional. El modal de actividad fue corregido (bugs de display y cierre). Existe una suite de tests unitarios. El repo está sincronizado con GitHub.

Commit más reciente: `d75ec91 — Fix modal display y backdrop, añadir suite de tests y CLAUDE.md`

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

1. **Prueba manual de aceptación en navegador** — completar el checklist de validación abajo.
2. **Accesibilidad básica:**
   - `aria-pressed` en tarjetas de avatar seleccionado y actividades completadas
   - Región viva (`aria-live="polite"`) para anunciar cambios de puntos y badges
   - Confirmación antes de reiniciar progreso (actualmente destruye sin preguntar)
   - Confirmación antes de sobrescribir progreso importado

### Media prioridad

3. **Mensajes contextuales de WellBe** por ruta o actividad (actualmente genéricos por nivel).
4. **README.md raíz** — actualizarlo para reflejar el estado real del MVP.
5. **Ampliar los tests** — añadir casos para `renderQuiz`, `normalizeProgress` completo, y `evaluateBadges` con triggers de 12 actividades.

### Fuera de alcance (no agregar)

- Backend, Supabase, OAuth, APIs externas, telemetría, analytics, perfiles remotos
- Recomendaciones clínicas o dietas personalizadas
- Datos personales reales

---

## Checklist de Prueba Manual de Aceptación

Ejecutar desde el servidor local o desde GitHub Pages:

- [ ] Carga de la app sin errores en consola
- [ ] Se muestran 4 rutas, 12 actividades, 6 badges, 4 avatares
- [ ] Selección de avatar se persiste
- [ ] Completar una actividad → puntos y badge "Primer paso"
- [ ] Completar 3 actividades de una ruta → progreso de ruta al 100% y badge de ruta
- [ ] Completar 6 actividades → badge "Mitad del mapa"
- [ ] Completar actividad de comunidad → badge correspondiente
- [ ] Completar actividad de IA → badge correspondiente
- [ ] Completar 4 tipos distintos de actividad → badge de explorador de tipos
- [ ] Recargar la página → progreso persiste
- [ ] Exportar progreso → descarga JSON con nombre correcto
- [ ] Reiniciar progreso → queda en cero
- [ ] Importar el JSON exportado → restaura correctamente
- [ ] Modal de actividad: se abre, muestra contenido completo, se cierra con botón
- [ ] Modal: clic en backdrop (zona oscura fuera del recuadro) lo cierra
- [ ] Modal: tecla Escape lo cierra
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
grep -r "https\?://\|supabase\|oauth\|analytics\|telemetry\|cdn" index.html data/

# Estado Git
git status --short --branch

# Subir cambios
git add <archivos>
git commit -m "Mensaje claro"
git push origin main
```
