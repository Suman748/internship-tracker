const BASE = '/api/tasks';

export async function fetchTasks() {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}
