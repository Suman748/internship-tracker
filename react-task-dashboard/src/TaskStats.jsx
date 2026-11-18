import { useEffect, useState } from "react";

export default function TaskStats() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/tasks/stats")
      .then((r) => {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.json();
      })
      .then(setStats)
      .catch((e) => setError(e.message));
  }, []);

  if (error) return <p role="alert">Could not load stats: {error}</p>;
  if (!stats) return <p>Loading stats...</p>;
  if (stats.total === 0) return <p>No tasks yet.</p>;

  return (
    <section aria-label="Task statistics">
      <h3>Total tasks: {stats.total}</h3>
      <ul>
        {Object.entries(stats.byStatus).map(([status, count]) => (
          <li key={status}>
            {status}: {count}
          </li>
        ))}
      </ul>
    </section>
  );
}
