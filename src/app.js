import { advanceTask, priorityLabels, searchTasks, statuses } from './tasks.js';
import { loadTasks, saveTasks } from './storage.js';
import { calculateProgress, filterTasks } from './metrics.js';

const $ = selector => document.querySelector(selector);
const loaded = loadTasks();
let tasks = loaded.tasks;
const search = $('#search');
const statusFilter = $('#status-filter');
const dialog = $('#task-dialog');
const form = $('#task-form');
const notice = $('#storage-notice');
const statusNames = { todo: 'Por hacer', doing: 'En progreso', done: 'Completadas' };

function showNotice(message) {
  notice.textContent = message;
  notice.hidden = !message;
}

function element(tag, className, text) {
  const node = document.createElement(tag);
  node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function taskCard(task) {
  const card = element('article', 'task-card');
  const meta = element('div', 'card-meta');
  meta.append(element('span', 'tag', task.tag), element('span', `priority ${task.priority}`, `● ${priorityLabels[task.priority]}`));
  const title = element('h4', '', task.title);
  card.append(meta, title, element('p', 'task-description', task.description || 'Sin descripción.'));
  const footer = element('div', 'card-footer');
  if (task.status === 'done') {
    footer.append(element('span', 'completed-label', '✓ Tarea completada'));
  } else {
    const next = task.status === 'todo' ? 'doing' : 'done';
    const button = element('button', 'advance-button', task.status === 'todo' ? 'Empezar tarea →' : 'Completar tarea ✓');
    button.type = 'button';
    button.dataset.advance = task.id;
    button.setAttribute('aria-label', `${task.title}: mover a ${statusNames[next]}`);
    footer.append(button);
  }
  card.append(footer);
  return card;
}

function render() {
  const visible = filterTasks(searchTasks(tasks, search.value), statusFilter.value);
  const isFiltered = search.value.trim() || statusFilter.value !== 'all';
  $('#total-count').textContent = tasks.length;
  $('#doing-count').textContent = tasks.filter(task => task.status === 'doing').length;
  $('#done-count').textContent = tasks.filter(task => task.status === 'done').length;
  $('#progress-percentage').textContent = `${calculateProgress(tasks)} %`;
  $('#results').textContent = isFiltered
    ? `${visible.length} de ${tasks.length} tareas coinciden con los filtros.`
    : `${tasks.length} tareas · Tu próximo paso empieza aquí.`;
  for (const status of statuses) {
    const list = $(`#${status}-list`);
    const items = visible.filter(task => task.status === status);
    const countId = status === 'todo' ? '#todo-count' : `#${status}-column-count`;
    $(countId).textContent = items.length;
    list.replaceChildren(...items.map(taskCard));
    if (!items.length) list.append(element('p', 'empty-state', isFiltered ? 'No hay coincidencias en esta columna.' : 'Todo despejado por aquí.'));
  }
}

function commit(message) {
  if (!saveTasks(tasks) && !loaded.notice) {
    showNotice('No se pudieron guardar los cambios en este navegador. Las tareas siguen disponibles en esta sesión.');
  }
  render();
  $('#announcement').textContent = message;
}

$('#new-task').addEventListener('click', () => {
  form.reset();
  $('#task-title').setCustomValidity('');
  dialog.showModal();
});
for (const selector of ['#close-dialog', '#cancel-dialog']) {
  $(selector).addEventListener('click', () => dialog.close());
}
$('#task-title').addEventListener('input', () => $('#task-title').setCustomValidity(''));
form.addEventListener('submit', event => {
  event.preventDefault();
  const values = new FormData(form);
  const title = values.get('title').trim();
  if (!title) {
    $('#task-title').setCustomValidity('Escribe un título para la tarea.');
    $('#task-title').reportValidity();
    return;
  }
  tasks = [...tasks, {
    id: crypto.randomUUID(), title,
    description: values.get('description').trim(),
    tag: values.get('tag'), priority: values.get('priority'), status: 'todo',
  }];
  dialog.close();
  commit(`Tarea «${title}» creada en Por hacer.${search.value.trim() ? ' La búsqueda actual sigue activa.' : ''}`);
});
$('.board').addEventListener('click', event => {
  const button = event.target.closest('button[data-advance]');
  if (!button) return;
  const task = tasks.find(item => item.id === button.dataset.advance);
  const oldColumn = button.closest('.column');
  tasks = advanceTask(tasks, task.id);
  commit(`Tarea «${task.title}» movida a ${statusNames[tasks.find(item => item.id === task.id).status]}.`);
  // Mantener un punto de foco útil cuando la tarjeta cambia de columna.
  const movedButton = [...document.querySelectorAll('[data-advance]')].find(item => item.dataset.advance === task.id);
  const nextFocus = movedButton || oldColumn.querySelector('button') || $('#new-task');
  nextFocus.focus({ preventScroll: true });
});
search.addEventListener('input', render);
statusFilter.addEventListener('change', render);
showNotice(loaded.notice);
render();
