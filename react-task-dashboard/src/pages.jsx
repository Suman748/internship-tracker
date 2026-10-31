import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { STATUSES, useTasks } from './tasks.jsx';

const badge = (status) => <span className={`badge s-${status.replace(' ', '').toLowerCase()}`}>{status}</span>;

export function TaskList() {
  const { tasks } = useTasks();
  const [filter, setFilter] = useState('All');
  const shown = filter === 'All' ? tasks : tasks.filter((t) => t.status === filter);

  return (
    <section>
      <div className="row">
        <h2>All tasks ({shown.length})</h2>
        <label>
          Show
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option>All</option>
            {STATUSES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </label>
      </div>
      {shown.length === 0 ? (
        <p className="empty">No tasks with this status. <Link to="/tasks/new">Add a task</Link></p>
      ) : (
        <ul className="list">
          {shown.map((t) => (
            <li key={t.id}>
              <Link to={`/tasks/${t.id}`}>
                <strong>{t.title}</strong>
                <span className="meta">Due {t.dueDate || 'not set'}</span>
                {badge(t.status)}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export function TaskDetail() {
  const { id } = useParams();
  const { tasks, deleteTask } = useTasks();
  const navigate = useNavigate();
  const task = tasks.find((t) => t.id === Number(id));
  if (!task) return <NotFound />;

  return (
    <section className="card">
      <h2>{task.title}</h2>
      {badge(task.status)}
      <p>{task.description || 'No description.'}</p>
      <dl>
        <dt>Owner</dt><dd>{task.owner}</dd>
        <dt>Due date</dt><dd>{task.dueDate || 'Not set'}</dd>
      </dl>
      <div className="actions">
        <Link className="btn" to={`/tasks/${task.id}/edit`}>Edit task</Link>
        <button className="btn danger" onClick={() => { deleteTask(task.id); navigate('/'); }}>Delete task</button>
        <Link to="/">Back to list</Link>
      </div>
    </section>
  );
}

export function TaskForm() {
  const { id } = useParams();
  const { tasks, addTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const existing = id ? tasks.find((t) => t.id === Number(id)) : null;
  const [form, setForm] = useState(
    existing || { title: '', description: '', status: 'Not Started', owner: 'Suman S', dueDate: '' }
  );
  const [error, setError] = useState('');

  if (id && !existing) return <NotFound />;

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return setError('Enter a title for the task.');
    if (existing) { updateTask(existing.id, form); navigate(`/tasks/${existing.id}`); }
    else navigate(`/tasks/${addTask(form)}`);
  };

  return (
    <form className="card" onSubmit={submit} noValidate>
      <h2>{existing ? 'Edit task' : 'New task'}</h2>
      <label>Title
        <input name="title" value={form.title} onChange={change} aria-invalid={!!error} />
      </label>
      {error && <p className="error" role="alert">{error}</p>}
      <label>Description
        <textarea name="description" rows="3" value={form.description} onChange={change} />
      </label>
      <label>Status
        <select name="status" value={form.status} onChange={change}>
          {STATUSES.map((s) => <option key={s}>{s}</option>)}
        </select>
      </label>
      <label>Owner
        <input name="owner" value={form.owner} onChange={change} />
      </label>
      <label>Due date
        <input type="date" name="dueDate" value={form.dueDate} onChange={change} />
      </label>
      <div className="actions">
        <button className="btn" type="submit">{existing ? 'Save changes' : 'Add task'}</button>
        <Link to={existing ? `/tasks/${existing.id}` : '/'}>Cancel</Link>
      </div>
    </form>
  );
}

export function NotFound() {
  return (
    <section className="card">
      <h2>Page not found</h2>
      <p>This task or page doesn't exist. <Link to="/">Go to all tasks</Link></p>
    </section>
  );
}
