# Internship Tracker

Weekly deliverables for my internship, one folder or document per task, each reviewed by my mentor through GitHub.

## Progress

| Week | Topic | Deliverable | Status |
|------|-------|-------------|--------|
| 1 | HTTP and REST contract | [API contract](docs/API_CONTRACT.md): CRUD endpoints and payloads | Done |

## Repository structure

```
internship-tracker/
├── docs/
│   └── API_CONTRACT.md   # Task API: endpoints, payloads, status codes, errors
└── README.md
```

## Week 1: HTTP and REST contract

Covers JSON, HTTP methods, status codes and API design. The contract defines a `Task` resource with:

- Create, read (list and single), update (`PUT`/`PATCH`) and delete endpoints
- Example request and response payloads
- The status codes used and a shared error format
- A review checklist for frontend/backend agreement

Read it here: [docs/API_CONTRACT.md](docs/API_CONTRACT.md)

## Workflow

1. Create a branch per task: `git checkout -b weekN-topic`
2. Commit the deliverable with a clear message
3. Push the branch and open a pull request
4. Add the PR link to the tracker and address mentor feedback

## Author

GitHub: [@Suman748](https://github.com/Suman748)

## Previous notes


A full-stack task management app built during my Web Development internship at Sketchverse Innovations. Create tasks, update their status, search and filter them, and view task stats.

## Tech Stack

- **Frontend:** React (`react-task-dashboard`)
- **Backend:** Spring Boot, Spring Data JPA (`tracker-api`)
- **Database:** PostgreSQL
- **Deployment:** GitHub Pages (frontend) via GitHub Actions

## Features

- Create, edit and delete tasks (with a delete confirmation dialog)
- Update task status from a dropdown
- Search tasks and filter by status
- Task stats summary
- Responsive layout (1 column on mobile, 2 on desktop)

## Project Structure

- `react-task-dashboard/` React frontend
- `tracker-api/` Spring Boot REST API
- `postman/` Postman collection and screenshots
- `docs/` Integration tests, regression checklist, QA log
- `capstone/` Capstone scope and acceptance criteria

## Getting Started

### 1. Database

Create a PostgreSQL database and set its credentials in
`tracker-api/src/main/resources/application.properties`.

### 2. Backend

    cd tracker-api
    ./mvnw spring-boot:run

The API runs at http://localhost:8080.

### 3. Frontend

    cd react-task-dashboard
    npm install
    npm run dev

## API Endpoints

| Method | Endpoint          | Description    |
|--------|-------------------|----------------|
| GET    | /api/tasks        | List all tasks |
| POST   | /api/tasks        | Create a task  |
| PUT    | /api/tasks/{id}   | Update a task  |
| DELETE | /api/tasks/{id}   | Delete a task  |

## Testing

    cd tracker-api && ./mvnw clean verify
    cd react-task-dashboard && npm test

## Capstone

Full scope and acceptance criteria: [`capstone/SCOPE.md`](capstone/SCOPE.md) and [`capstone/ACCEPTANCE.md`](capstone/ACCEPTANCE.md).
Tickets: https://github.com/Suman748/internship-tracker/issues

## Progress Log

| Days  | Work |
|-------|------|
| 6-9   | Controller/service layer, POST/PUT/DELETE, PostgreSQL, Task entity, Spring Data JPA |
| 11-12 | Persistence fixes, Postgres integration |
| 13    | Create and edit with API calls |
| 14    | Delete with confirmation, end-to-end CRUD demo |
| 15    | Status filter and task search endpoint |
| 16-17 | Error handling, client validation, CORS, responsive CSS |
| 18    | Full-stack demo walkthrough, PostgreSQL row checks |
| 19    | Capstone scope and acceptance criteria |
| 20    | Final full-stack feature (task stats) |
| 21    | Integration tests, regression checklist, QA log |

## Author

Suman S (@Suman748)
