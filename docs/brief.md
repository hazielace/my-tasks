# my-tasks — brief funcional para la demostración

my-tasks es un tablero web para que un equipo pequeño organice pendientes sin cuentas ni backend. Durante la sesión construiremos la aplicación desde cero y probaremos el resultado en el navegador.

## Primera versión visual
- Interfaz moderna, clara y responsive, con barra superior, tarjetas de resumen y tres columnas: Por hacer, En progreso y Completadas.
- Ocho tareas iniciales: **3 por hacer, 2 en progreso y 3 completadas**.
- Cada tarjeta muestra título, breve descripción, etiqueta, prioridad y acción para avanzar de estado.
- Permitir crear una tarea, buscar por texto y guardar cambios en localStorage.
- Textos de interfaz en español. No usar backend, login ni APIs externas.

## Comportamiento que probaremos con TDD
- `calculateProgress(tasks)`: solo las tareas con `status === 'done'` cuentan como completadas.
- Tres completadas de ocho dan **38 %**, tras redondear al entero más cercano. Una lista vacía da 0 %.
- `filterTasks(tasks, status)` recibe `all`, `todo`, `doing` o `done` y no altera el arreglo original.
- La interfaz debe mostrar el progreso y permitir filtrar después de implementar ambas funciones.

## Criterios de demostración
1. Se muestra el tablero con las ocho tareas y tres columnas.
2. Agregar una tarea aumenta el total y persiste al actualizar.
3. Avanzar una tarea de `todo` a `doing` no aumenta el porcentaje completado.
4. Avanzar una tarea a `done` sí aumenta el porcentaje.
5. Los filtros y la búsqueda muestran solo tareas correspondientes.
6. La aplicación se ve correctamente a 390 px de ancho.

**Orden de desarrollo para el taller:** primero la interfaz y las operaciones esenciales. Deja `calculateProgress` y `filterTasks` como funciones pendientes y toleradas por la interfaz. Después las implementaremos con RED–GREEN–REFACTOR. Este orden es intencional para la demostración.
