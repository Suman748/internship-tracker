export async function fetchTasks() {
  const res = await fetch(BASE);
  return res.json();

import { useEffect, useState } from 'react';
import { fetchTasks } from '../api/tasks';

export default function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetchTasks()
      .then((data) => {
      })
      .catch((e) => {
        if (!cancelled) { setError(e.message); setStatus('error'); }
      });
    return () => { cancelled = true; };
  }, []);
  return { tasks, status, error };
}
