# my-tasks — instrucciones del repositorio

Aplicación de tareas de demostración sin backend, cuentas ni servicios externos.

## Tecnología y estructura
- Node.js 20+, HTML, CSS y JavaScript ES modules, sin frameworks ni paquetes de terceros.
- `index.html`: interfaz. `src/app.js`: interacciones. `src/metrics.js`: cálculos y filtros. `tests/`: pruebas.
- `docs/brief.md`: reglas funcionales y criterios de aceptación.

## Comandos
- Abrir la app: `node server.mjs` y visitar `http://localhost:5173`.
- Pruebas: `node --test` una vez creada la suite.

## Convenciones
- Interfaz en español, nombres de código en inglés y funciones pequeñas.
- Mantén separadas la lógica del negocio y la interacción con el DOM.
- Prioriza legibilidad, responsive y accesibilidad básica.

## Reglas del dominio
- Solo `done` cuenta como tarea completada; `doing` no suma al progreso.
- `calculateProgress([])` devuelve 0 y el porcentaje se redondea al entero más cercano.
- No borres tareas de localStorage por accidente.

## Cómo trabajar
- Modifica únicamente lo necesario para la tarea solicitada.
- En lógica de negocio, utiliza pruebas antes de implementar cuando se solicite TDD.
- Explica decisiones relevantes y qué pruebas o comprobaciones ejecutaste.

## Límites
- No añadas frameworks, dependencias, backend ni APIs externas sin aprobación.
- No incluyas credenciales ni información privada.

## Verificación
- Ejecuta las pruebas disponibles y comprueba en Chrome el flujo afectado y la vista móvil.
