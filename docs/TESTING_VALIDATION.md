# Testing y Validacion

## Checks tecnicos

- Validar JSON con `jq empty data/*.json`.
- Correr pruebas unitarias en `http://localhost:8000/tests/index.html`.
- Mantener specs en `tests/unit/` cuando cambie logica pura.
- Confirmar que rutas apuntan a actividades existentes.
- Confirmar que badges referenciados existen.
- Confirmar que `default_avatar_id` existe.
- Buscar dependencias externas activas en `index.html` y `data/`.

## Pruebas manuales

- Abrir la app desde un servidor estatico local.
- Completar una actividad y verificar puntos, nivel, estadisticas y badge de primer paso.
- Completar una ruta y verificar progreso al 100%.
- Completar seis y doce actividades para verificar badges.
- Recargar la pagina y confirmar persistencia local.
- Exportar progreso, reiniciar e importar el JSON exportado.
- Probar navegacion con teclado.
- Revisar vista movil.

## Validacion educativa

Preguntar a personas usuarias:

- Que creen que es el Mapa del Buen Vivir?
- Que ruta les resulta mas clara o relevante?
- Que actividad completarian primero?
- Donde el lenguaje parece demasiado clinico, tecnico o confuso?
- Los badges motivan sin presionar?

## Criterios de exito V1

- La persona entiende el proposito sin explicacion adicional.
- Puede completar una actividad en menos de 15 minutos.
- Comprende que el progreso es local.
- No interpreta Wellbe como diagnostico o tratamiento.
