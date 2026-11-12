export function calculateProgress(tasks) {
  if (!tasks.length) return 0;
  const completedCount = tasks.filter(task => task.status === 'done').length;
  return Math.round((completedCount / tasks.length) * 100);
}

export function filterTasks(tasks, status) {
  return status === 'all' ? tasks : tasks.filter(task => task.status === status);
}
