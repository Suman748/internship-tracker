import { createContext, useContext, useState } from 'react';

export const STATUSES = ['Not Started', 'In Progress', 'Done'];

const MOCK_TASKS = [
  { id: 1, title: 'Set up React project', description: 'Create the Vite app and install react-router-dom.', status: 'Done', owner: 'Suman S', dueDate: '2026-11-02' },
  { id: 2, title: 'Build task list page', description: 'Show all tasks from mock data with status filter.', status: 'In Progress', owner: 'Suman S', dueDate: '2026-11-04' },
  { id: 3, title: 'Build task detail page', description: 'Open one task by id from the URL.', status: 'Not Started', owner: 'Suman S', dueDate: '2026-11-05' },
  { id: 4, title: 'Add task form', description: 'Create and edit tasks with validation.', status: 'Not Started', owner: 'Suman S', dueDate: '2026-11-06' },
  { id: 5, title: 'Push to GitHub', description: 'Commit the project and open a pull request.', status: 'Not Started', owner: 'Suman S', dueDate: '2026-11-07' },
];

const TasksContext = createContext(null);
export const useTasks = () => useContext(TasksContext);

export function TasksProvider({ children }) {
  const [tasks, setTasks] = useState(MOCK_TASKS);

  const addTask = (task) => {
    const id = Math.max(0, ...tasks.map((t) => t.id)) + 1;
    setTasks([...tasks, { ...task, id }]);
    return id;
  };
  const updateTask = (id, changes) =>
    setTasks(tasks.map((t) => (t.id === id ? { ...t, ...changes } : t)));
  const deleteTask = (id) => setTasks(tasks.filter((t) => t.id !== id));

  return (
    <TasksContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TasksContext.Provider>
  );
}
