import { initialTasks, isTaskList } from './tasks.js';

export const storageKey = 'my-tasks.tasks.v1';
let writesAllowed = true;

export function loadTasks() {
  try {
    const stored = localStorage.getItem(storageKey);
    if (stored === null) return { tasks: structuredClone(initialTasks), notice: '' };
    const tasks = JSON.parse(stored);
    if (!isTaskList(tasks)) throw new Error('Datos no válidos');
    return { tasks, notice: '' };
  } catch {
    writesAllowed = false;
    return {
      tasks: [],
      notice: 'No se pudieron cargar las tareas guardadas. Tus datos originales se conservarán. Puedes usar el tablero, pero los cambios de esta sesión no se guardarán.',
    };
  }
}

export function saveTasks(tasks) {
  if (!writesAllowed) return false;
  try {
    localStorage.setItem(storageKey, JSON.stringify(tasks));
    return true;
  } catch {
    return false;
  }
}
