export const initialTasks = [
  { id: 'sample-1', title: 'Diseñar la página de inicio', description: 'Explorar una propuesta visual clara y cercana para dar la bienvenida.', tag: 'Diseño', priority: 'high', status: 'todo' },
  { id: 'sample-2', title: 'Preparar el calendario de contenido', description: 'Organizar las ideas y publicaciones de las próximas dos semanas.', tag: 'Contenido', priority: 'medium', status: 'todo' },
  { id: 'sample-3', title: 'Revisar ideas del equipo', description: 'Reunir las propuestas y elegir los próximos pasos del proyecto.', tag: 'Equipo', priority: 'low', status: 'todo' },
  { id: 'sample-4', title: 'Construir los componentes base', description: 'Dar forma a botones, campos y tarjetas que usaremos en la interfaz.', tag: 'Desarrollo', priority: 'high', status: 'doing' },
  { id: 'sample-5', title: 'Definir la identidad visual', description: 'Elegir una paleta de colores y una tipografía con personalidad.', tag: 'Diseño', priority: 'medium', status: 'doing' },
  { id: 'sample-6', title: 'Acordar los objetivos del proyecto', description: 'Dejar claro qué queremos lograr y cómo sabremos que lo conseguimos.', tag: 'Equipo', priority: 'high', status: 'done' },
  { id: 'sample-7', title: 'Organizar el espacio de trabajo', description: 'Preparar la estructura y tener todo listo para empezar a crear.', tag: 'Desarrollo', priority: 'medium', status: 'done' },
  { id: 'sample-8', title: 'Escribir el mensaje de bienvenida', description: 'Encontrar las palabras para presentar el proyecto al equipo.', tag: 'Contenido', priority: 'low', status: 'done' },
];

export const statuses = ['todo', 'doing', 'done'];
export const priorityLabels = { low: 'Baja', medium: 'Media', high: 'Alta' };

export function isTaskList(value) {
  return Array.isArray(value) && value.every(task => task &&
    typeof task.id === 'string' && typeof task.title === 'string' &&
    typeof task.description === 'string' && typeof task.tag === 'string' &&
    Object.hasOwn(priorityLabels, task.priority) && statuses.includes(task.status)) &&
    new Set(value.map(task => task.id)).size === value.length;
}

export function searchTasks(tasks, query) {
  const text = query.trim().toLocaleLowerCase('es');
  return tasks.filter(task => `${task.title} ${task.description}`.toLocaleLowerCase('es').includes(text));
}

export function advanceTask(tasks, id) {
  return tasks.map(task => task.id === id && task.status !== 'done'
    ? { ...task, status: statuses[statuses.indexOf(task.status) + 1] }
    : task);
}
