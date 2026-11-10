import { useEffect, useState, useCallback } from "react";
import ConfirmDialog from "./components/ConfirmDialog";
import { deleteTask } from "./api/tasks";

export default function ApiTaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/tasks");
      if (!res.ok) throw new Error(`Load failed (${res.status})`);
      setTasks(await res.json());
      setError("");
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function handleConfirm() {
    setDeleting(true);
    try {
      await deleteTask(toDelete.id);
      setToDelete(null);
      await load();
    } catch (e) {
      setError(e.message);
      setToDelete(null);
    } finally {
      setDeleting(false);
    }
  }

  if (loading) return <p>Loading tasks...</p>;

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        <ul>
          {tasks.map((t) => (
            <li key={t.id}>
              {t.title} {t.status ? `(${t.status})` : ""}{" "}
              <button onClick={() => setToDelete(t)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
      {toDelete && (
        <ConfirmDialog
          title="Delete task?"
          message={`"${toDelete.title}" will be permanently removed.`}
          onConfirm={handleConfirm}
          onCancel={() => setToDelete(null)}
          busy={deleting}
        />
      )}
    </div>
  );
}
