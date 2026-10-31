import { NavLink, Route, Routes } from 'react-router-dom';
import { TaskList, TaskDetail, TaskForm, NotFound } from './pages.jsx';

export default function App() {
  return (
    <>
      <header className="topbar">
        <h1>Task Dashboard</h1>
        <nav>
          <NavLink to="/" end>All tasks</NavLink>
          <NavLink to="/tasks/new">New task</NavLink>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/tasks/new" element={<TaskForm />} />
          <Route path="/tasks/:id" element={<TaskDetail />} />
          <Route path="/tasks/:id/edit" element={<TaskForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}
