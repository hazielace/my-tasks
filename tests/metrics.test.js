import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { calculateProgress, filterTasks } from '../src/metrics.js';

function createTasks() {
  return [
    { id: '1', status: 'todo' },
    { id: '2', status: 'doing' },
    { id: '3', status: 'done' },
    { id: '4', status: 'todo' },
    { id: '5', status: 'done' },
    { id: '6', status: 'doing' },
    { id: '7', status: 'todo' },
    { id: '8', status: 'done' },
  ];
}

describe('calculateProgress', () => {
  it('redondea tres completadas de ocho a 38 %', () => {
    assert.equal(calculateProgress(createTasks()), 38);
  });

  it('devuelve 0 para una lista vacía', () => {
    assert.equal(calculateProgress([]), 0);
  });

  it('no cuenta las tareas en progreso como completadas', () => {
    const tasks = [{ status: 'todo' }, { status: 'doing' }];

    assert.equal(calculateProgress(tasks), 0);
  });
});

describe('filterTasks', () => {
  it('devuelve todas las tareas para all', () => {
    const tasks = createTasks();

    assert.deepEqual(filterTasks(tasks, 'all'), tasks);
  });

  const expectedIds = {
    todo: ['1', '4', '7'],
    doing: ['2', '6'],
    done: ['3', '5', '8'],
  };

  for (const [status, ids] of Object.entries(expectedIds)) {
    it(`devuelve solo las tareas con estado ${status}`, () => {
      const tasks = createTasks();
      const expected = ids.map(id => tasks.find(task => task.id === id));

      assert.deepEqual(filterTasks(tasks, status), expected);
    });
  }

  for (const status of ['all', 'todo', 'doing', 'done']) {
    it(`devuelve una lista vacía al filtrar una lista vacía por ${status}`, () => {
      assert.deepEqual(filterTasks([], status), []);
    });

    it(`no altera el arreglo original al filtrar por ${status}`, () => {
      const tasks = createTasks();
      const original = structuredClone(tasks);

      filterTasks(tasks, status);

      assert.deepEqual(tasks, original);
    });
  }
});
