import { useState, useEffect } from "react";

const EMPTY = { title: "", description: "", status: "TODO" };

export default function TaskForm({ editing, onSubmit, onCancel, saving }) {
  const [form, setForm] = useState(EMPTY);
  const [err, setErr] = useState("");

  useEffect(() => {
    setForm(editing ? { title: editing.title || "", description: editing.description || "", status: editing.status || "TODO" } : EMPTY);
    setErr("");
  }, [editing]);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  function submit(e) {
    e.preventDefault();
    if (!form.title.trim()) return setErr("Title is required");
    setErr("");
    onSubmit({ ...form, title: form.title.trim() });
  }

  return (
    <form onSubmit={submit} style={{ margin: "16px 0", display: "grid", gap: 8, maxWidth: 420 }}>
      <h3>{editing ? "Edit task" : "Add task"}</h3>
      <input name="title" placeholder="Title" value={form.title} onChange={change} />
      <textarea name="description" placeholder="Description" value={form.description} onChange={change} />
      <select name="status" value={form.status} onChange={change}>
        <option value="TODO">TODO</option>
        <option value="DONE">DONE</option>
      </select>
      {err && <p style={{ color: "red", margin: 0 }}>{err}</p>}
      <div>
        <button type="submit" disabled={saving}>{saving ? "Saving..." : editing ? "Update" : "Create"}</button>{" "}
        {editing && <button type="button" onClick={onCancel}>Cancel edit</button>}
      </div>
    </form>
  );
}
