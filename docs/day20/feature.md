# Day 20 - Task statistics (full-stack feature)

**Spring:** `GET /api/tasks/stats` (TaskStatsController) returns total tasks and a count per status.
**React:** `TaskStats.jsx` fetches the endpoint via the Vite proxy and shows loading, error, empty and success states.

To show it in the UI, add to your task list page:

    import TaskStats from "./TaskStats";
    ...
    <TaskStats />

Evidence: `docs/day20/stats-output.txt`.
