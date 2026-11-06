import { createContext, useContext, useEffect, useState } from 'react';
import { fetchTasks } from './api/tasks';

export const STATUSES = ['Not Started', 'In Progress', 'Done'];

// API sends DONE / IN_PROGRESS / NOT_STARTED; the UI uses readable labels
const toLabel = (s = '') => {
  const key = String(s).toUpperCase().replace(/[\s-]+/g, '_');
  return (
    { NOT_STARTED: 'Not Started', IN_PROGRESS: 'In Progress', DONE: 'Done' }[key] || s
  );
};

const TasksContext = createContext(null);
export const useTasks = () => useContext(TasksContext);

export function TasksProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetchTasks()
      .then((data) => {
        if (!cancelled) {
          setTasks(data.map((t) => ({ ...t, status: toLabel(t.status) })));
          setLoading(false);
        }
      })
      .catch((e) => {
        if (!cancelled) {
          setError(e.message);
          setLoading(false);
        }
      });
    return () => { cancelled = true; };
  }, []);

  const addTask = (task) => {
    const id = Math.max(0, ...tasks.map((t) => t.id)) + 1;
    setTasks([...tasks, { ...task, id }]);
    return id;
  };
  const updateTask = (id, changes) =>
    setTasks(tasks.map((t) => (t.id === id ? { ...t, ...changes } : t)));
  const deleteTask = (id) => setTasks(tasks.filter((t) => t.id !== id));

  if (loading) return <p className="loading">Loading tasks…</p>;
  if (error) return <p className="error">Could not load tasks: {error}</p>;

  return (
    <TasksContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TasksContext.Provider>
  );
}
