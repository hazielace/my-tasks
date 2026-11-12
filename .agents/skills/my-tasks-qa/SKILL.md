---
name: my-tasks-qa
description: Revisa y reporta la calidad de my-tasks mediante pruebas, reglas de progreso y flujos del tablero en escritorio y móvil. Usar para una revisión de QA del proyecto; no modifica archivos ni corrige problemas.
---

# Revisión de my-tasks

Aplica el checklist de [docs/checklist-qa.md](../../../docs/checklist-qa.md). Ejecuta los comandos desde la raíz del proyecto y consulta `AGENTS.md` y `docs/brief.md` para las reglas vigentes.

## Alcance

- Revisa y reporta; no edites código, pruebas, configuración ni documentación. Entrega el informe en la conversación, sin guardarlo en un archivo.
- No instales dependencias ni apliques correcciones. Si encuentras un problema, describe cómo reproducirlo.
- Para las operaciones que guardan datos, usa un contexto de navegador aislado de las tareas del usuario. No borres ni sobrescribas su localStorage. Si no hay un entorno aislado disponible, registra esos pasos como no comprobados.

## Pasos de verificación

1. Ejecuta `node --test`. Registra el comando, el código de salida y las cantidades de pruebas aprobadas y fallidas. Si no hay pruebas o no se pueden ejecutar, indícalo sin considerarlo una aprobación.
2. Revisa `calculateProgress` en `src/metrics.js` y sus pruebas: solo `done` cuenta como completada, `doing` no suma, tres completadas de ocho dan 38 % y la lista vacía da 0 %. Distingue la evidencia del código de la ejecución de pruebas.
3. Si hay acceso a Chrome, abre la aplicación en `http://localhost:5173`. Si es necesario, inicia el servidor con `node server.mjs`. En un contexto aislado, verifica:
   - Alta: crear una tarea aumenta el total y la coloca en «Por hacer».
   - Cambio de estado: pasar de `todo` a `doing` conserva el porcentaje; pasar a `done` lo actualiza según el total.
   - Búsqueda: muestra las coincidencias por título o descripción y permite volver a ver las tareas al vaciarla.
   - Filtros: `all`, `todo`, `doing` y `done` muestran las tareas correspondientes; comprueba su combinación con la búsqueda. El progreso general corresponde a todas las tareas.
4. Recarga la página tras crear una tarea y cambiar un estado. Confirma que ambos cambios persisten.
5. Revisa la consola durante los flujos anteriores. Comprueba el tablero a 390 px de ancho: controles utilizables, contenido legible y ausencia de desbordamiento horizontal. Distingue errores de la aplicación de problemas de las herramientas.
6. Si falta acceso al navegador, a la consola o a la vista móvil, continúa con las comprobaciones disponibles y especifica cuáles quedaron pendientes y por qué. No marques como verificado algo inferido o no ejecutado.

## Formato del informe

Presenta el resultado en español con estas secciones separadas:

- **Pruebas:** comando, código de salida, aprobadas y fallidas; añade omitidas si las hay.
- **Verificado:** comprobación y evidencia observada, indicando si proviene de pruebas, lectura del código o navegador. Incluye la URL y el ancho usado cuando corresponda.
- **Falló:** comportamiento esperado, resultado real y pasos mínimos para reproducir cada fallo.
- **No se pudo comprobar:** comprobación pendiente y bloqueo concreto.

Si una sección no tiene elementos, escribe «Ninguno». Cierra indicando si se modificaron archivos durante la revisión; esta Skill debe dejarlos sin cambios.
