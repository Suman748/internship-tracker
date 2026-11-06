import useTasks from './hooks/useTasks';

export default function ApiTaskList() {
  const { tasks, status, error } = useTasks();

  if (status === 'loading') return <p>Loading tasks…</p>;
  if (status === 'error') return <p>Could not load tasks: {error}</p>;
  if (tasks.length === 0) return <p>No tasks yet.</p>;

  return (
    <ul>
      {tasks.map((t) => (
        <li key={t.id}>
          <strong>{t.title}</strong> – {t.description} [{t.status}]
        </li>
      ))}
    </ul>
  );
}
