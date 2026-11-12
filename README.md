# my-tasks

Tablero de tareas en español para una capacitación práctica. Node.js 20+, HTML, CSS y JavaScript ES modules, sin dependencias.

## Abrir la aplicación

Desde la carpeta del proyecto, ejecutar `node server.mjs` y visitar **http://localhost:5173** en Chrome. Detener el servidor con Ctrl+C. No hace falta instalar paquetes.

## Primera etapa

- Ocho tareas iniciales, tres columnas, alta de tareas y avance de estado.
- Búsqueda por título y descripción, sin distinguir mayúsculas.
- Persistencia en localStorage bajo `my-tasks.tasks.v1`, por navegador y origen. Los ejemplos solo se cargan si la clave no existe; una lista vacía guardada se respeta. Si los datos no se pueden leer, no se sobrescriben.
- Los resúmenes muestran todas las tareas; los contadores de columna muestran los resultados de la búsqueda.
- Sin edición ni eliminación. Las tareas completadas no avanzan de estado.

`calculateProgress` y `filterTasks` permanecen pendientes en `src/metrics.js`. El tablero funciona sin invocarlas; el indicador de progreso y el filtro de estado se habilitarán al implementarlas mediante TDD.

## Comprobación

Ejecutar `node --test`. La suite de progreso y filtros se creará en la siguiente etapa. Revisar también en Chrome altas, cambios, búsqueda y persistencia tras recargar, así como el formulario y el tablero a 390 px de ancho.
