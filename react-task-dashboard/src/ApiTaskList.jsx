import { useEffect, useState, useCallback } from "react";
import ConfirmDialog from "./components/ConfirmDialog";
import TaskForm from "./components/TaskForm";
import { listTasks, createTask, updateTask, removeTask } from "./api/taskApi";

export default function ApiTaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [actionError, setActionError] = useState("");
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError("");
    try {
      setTasks(await listTasks());
    } catch (e) {
      setLoadError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function handleSave(data) {
    setSaving(true);
    setActionError("");
    try {
      if (editing) await updateTask(editing.id, data);
      else await createTask(data);
      setFormKey((k) => k + 1);
      setEditing(null);
      await load();
    } catch (e) {
      setActionError(e.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    setDeleting(true);
    setActionError("");
    try {
      await removeTask(toDelete.id);
      if (editing && editing.id === toDelete.id) setEditing(null);
      setToDelete(null);
      await load();
    } catch (e) {
      setActionError(e.message);
      setToDelete(null);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div style={{ padding: 16 }}>
      <h2>Tasks</h2>
      <TaskForm key={formKey} editing={editing} onSubmit={handleSave} onCancel={() => setEditing(null)} saving={saving} />
      {actionError && <p style={{ color: "red" }}>{actionError}</p>}

      {loading && <p>Loading tasks...</p>}

      {!loading && loadError && (
        <div style={{ color: "red" }}>
          <p>Could not load tasks: {loadError}</p>
          <button onClick={load}>Retry</button>
        </div>
      )}

      {!loading && !loadError && tasks.length === 0 && <p>No tasks yet. Add your first task above.</p>}

      {!loading && !loadError && tasks.length > 0 && (
        <ul>
          {tasks.map((t) => (
            <li key={t.id} style={{ marginBottom: 6 }}>
              <strong>{t.title}</strong> [{t.status}] {t.description && `- ${t.description}`}{" "}
              <button onClick={() => setEditing(t)}>Edit</button>{" "}
              <button onClick={() => setToDelete(t)}>Delete</button>
            </li>
          ))}
        </ul>
      )}

      {toDelete && (
        <ConfirmDialog
          title="Delete task?"
          message={`"${toDelete.title}" will be permanently removed.`}
          onConfirm={handleDelete}
          onCancel={() => setToDelete(null)}
          busy={deleting}
        />
      )}
    </div>
  );
}
