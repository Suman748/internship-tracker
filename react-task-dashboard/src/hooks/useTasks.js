
export default function useTasks() {
  const [tasks, setTasks] = useState([]);

    fetchTasks()
      .then((data) => {
        if (!cancelled) { setTasks(data); setStatus('success'); }
      })
      .catch((e) => {
        if (!cancelled) { setError(e.message); setStatus('error'); }
    return () => { cancelled = true; };

  return { tasks, status, error };
}
