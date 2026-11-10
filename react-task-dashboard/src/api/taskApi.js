const BASE = "/api/tasks";

async function request(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) {
    let msg = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      if (body.message) msg = body.message;
      else if (body.errors) msg = JSON.stringify(body.errors);
    } catch {}
    throw new Error(msg);
  }
  return res.status === 204 ? null : res.json().catch(() => null);
}

const json = (method, data) => ({
  method,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
});

export const listTasks = () => request(BASE);
export const createTask = (task) => request(BASE, json("POST", task));
export const updateTask = (id, task) => request(`${BASE}/${id}`, json("PUT", task));
export const removeTask = (id) => request(`${BASE}/${id}`, { method: "DELETE" });
