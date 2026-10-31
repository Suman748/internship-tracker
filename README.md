# internship-tracker

Internship deliverables, one folder per task.

| Week | Deliverable | Link | Status |
|------|-------------|------|--------|
| 1 | HTTP and REST contract | [API contract](docs/API_CONTRACT.md): CRUD endpoints and payloads | Done |
| 1 | React task dashboard (P01) | [Live demo](https://suman748.github.io/internship-tracker/) · [Code](react-task-dashboard) | Done |

## Repository structure

```
internship-tracker/
├── .github/workflows/deploy.yml   # builds and publishes the dashboard to GitHub Pages
├── docs/
│   └── API_CONTRACT.md            # Task API: endpoints, payloads, status codes, errors
├── react-task-dashboard/          # P01: React task dashboard (Vite + React Router)
└── README.md
```

## Week 1: HTTP and REST contract

Covers JSON, HTTP methods, status codes and API design. The contract defines a `Task` resource with:

- Create, read (list and single), update (`PUT`/`PATCH`) and delete endpoints
- Example request and response payloads
- The status codes used and a shared error format
- A review checklist for frontend/backend agreement

Read it here: [docs/API_CONTRACT.md](docs/API_CONTRACT.md)

## Week 1: React task dashboard (P01)

Responsive task list, detail view, create/edit form and routes, using mock data (no backend).

### Run it online (no install)

Open the live demo: **https://suman748.github.io/internship-tracker/**

It is rebuilt and published automatically every time `main` is updated.

### Run it in the browser with Codespaces

1. Click the green **Code** button, then the **Codespaces** tab, then **Create codespace on main**.
2. In the terminal that opens:
   ```bash
   cd react-task-dashboard
   npm install
   npm run dev
   ```
3. Click **Open in Browser** when the port 5173 pop-up appears.

### Run it on your computer

Requires [Node.js](https://nodejs.org) 18 or newer.

```bash
git clone https://github.com/Suman748/internship-tracker.git
cd internship-tracker/react-task-dashboard
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

### Routes

| Route | Screen |
|-------|--------|
| `/` | Task list with status filter |
| `/tasks/new` | New task form |
| `/tasks/:id` | Task detail |
| `/tasks/:id/edit` | Edit task form |

## Workflow

1. Create a branch per task: `git checkout -b weekN-topic`
2. Commit the deliverable with a clear message
3. Push the branch and open a pull request
4. Add the PR link to the tracker and address mentor feedback

## Author

GitHub: [@Suman748](https://github.com/Suman748)
