# Internship Tracker

A task manager built during the Full Stack Internship: a **React (Vite)** front end and a **Spring Boot + PostgreSQL** REST API.

**Author:** Suman S ([@Suman748](https://github.com/Suman748))

---

## Features

- Create, view, edit and delete tasks (full CRUD) from the browser
- Search tasks by text and filter them by status
- Loading, empty and error states in the UI
- Confirmation dialog before deleting a task
- Server-side validation with proper HTTP error codes (400 for invalid input)
- Client-side validation before requests are sent
- CORS configured for the React dev server
- Data persisted in PostgreSQL through Spring Data JPA (survives restarts)
- Front end deployed to GitHub Pages through GitHub Actions

---

## Tech stack

| Layer      | Technology                                   |
|------------|----------------------------------------------|
| Front end  | React, Vite, JavaScript                      |
| Back end   | Java, Spring Boot, Spring Data JPA           |
| Database   | PostgreSQL                                   |
| Testing    | JUnit (`TaskControllerTest`), Postman, curl  |
| CI/CD      | GitHub Actions (deploy to GitHub Pages)      |

---

## Project structure

```
internship-tracker/
├── react-task-dashboard/   React + Vite front end (port 5173)
├── tracker-api/            Spring Boot REST API (port 8080)
│   ├── db/schema.sql       PostgreSQL schema (tasks table)
│   ├── docs/               Evidence, API notes and demo output per day/week
│   └── src/                Controllers, services, entities, repositories
├── postman/                Postman collection and screenshots
├── docs/                   Project documentation (REST contract, error handling)
├── .github/workflows/      GitHub Actions workflow (deploy to Pages)
├── day6-output.json        Day 6 sample GET /api/tasks output
└── README.md
```

---

## Prerequisites

- Java 17 or later
- Maven (or use the included `./mvnw` wrapper if present)
- Node.js 18 or later and npm
- PostgreSQL 14 or later
- Git

---

## Getting started

### 1. Clone the repository

```bash
git clone https://github.com/Suman748/internship-tracker.git
cd internship-tracker
```

### 2. Set up the database

Create the database, then load the schema:

```bash
psql -U postgres -c "CREATE DATABASE tracker;"
psql -U postgres -d tracker -f tracker-api/db/schema.sql
```

Check the connection settings in
`tracker-api/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/tracker
spring.datasource.username=postgres
spring.datasource.password=<your-password>
```

### 3. Run the API

```bash
cd tracker-api
./mvnw spring-boot:run      # or: mvn spring-boot:run
```

The API starts on **http://localhost:8080**. Quick check:

```bash
curl -i http://localhost:8080/api/tasks
```

### 4. Run the front end

In a second terminal:

```bash
cd react-task-dashboard
npm install
npm run dev
```

Open **http://localhost:5173**. Vite proxies `/api` requests to the Spring API.

---

## API reference

Base URL: `http://localhost:8080/api/tasks`

| Method | Endpoint                        | Description                          | Success |
|--------|---------------------------------|--------------------------------------|---------|
| GET    | `/api/tasks`                    | List all tasks                       | 200     |
| GET    | `/api/tasks/{id}`               | Get one task                         | 200     |
| POST   | `/api/tasks`                    | Create a task                        | 200/201 |
| PUT    | `/api/tasks/{id}`               | Update a task                        | 200     |
| DELETE | `/api/tasks/{id}`               | Delete a task                        | 204     |
| GET    | `/api/tasks/search?status=&q=`  | Filter by status and/or search text  | 200     |

### Task object

```json
{
  "id": 1,
  "title": "Demo task",
  "description": "full stack demo",
  "status": "TODO"
}
```

Status values include `TODO` and `IN_PROGRESS`. Check the `Task` entity for the full list.

### Example requests

```bash
# Create
curl -X POST http://localhost:8080/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Demo task","description":"full stack demo","status":"TODO"}'

# Update
curl -X PUT http://localhost:8080/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Demo task","description":"full stack demo","status":"IN_PROGRESS"}'

# Search and filter
curl "http://localhost:8080/api/tasks/search?status=TODO&q=demo"

# Delete
curl -X DELETE http://localhost:8080/api/tasks/1
```

### Error responses

| Case                          | Status |
|-------------------------------|--------|
| Missing or empty title        | 400    |
| Invalid status value          | 400    |
| Task id not found             | 404    |

---

## Database

Table: `tasks` (created by `tracker-api/db/schema.sql`)

| Column        | Description                      |
|---------------|----------------------------------|
| `id`          | Primary key, auto generated      |
| `title`       | Task title (required)            |
| `description` | Task details                     |
| `status`      | `TODO`, `IN_PROGRESS`, ...       |

Verify rows directly:

```bash
psql -U postgres -d tracker -c "SELECT * FROM tasks;"
```

---

## Testing

- **Unit/controller tests:** `cd tracker-api && ./mvnw test`
- **Postman:** import the collection from `postman/`
- **Scripted demo:** a bash script runs POST, GET, PUT and DELETE with curl and checks the row in PostgreSQL (output saved in `tracker-api/docs/day18-demo-output.txt`)

---

## Internship progress

| Phase | Focus | Highlights |
|-------|-------|-----------|
| 1 | Foundations | React task list, REST contract, Spring controller and service (Day 6) |
| 2 | Backend | POST/PUT/DELETE with validation, PostgreSQL + Task entity, Spring Data JPA persistence, error handling and JUnit tests |
| 3 | Integration | Connect React to the API, create/edit/delete UI, delete confirmation, search and status filter, CORS and error handling, full-stack demo |

Detailed evidence for each day is in `tracker-api/docs/` and `docs/`.

---

## Deployment

The React front end is deployed to GitHub Pages by the workflow in
`.github/workflows/`. Every push to `main` triggers a build and deploy.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `curl` returns status `000` | The API isn't running. Start it with `./mvnw spring-boot:run` |
| `relation "tasks" does not exist` | Run `schema.sql` against the same database named in `application.properties` |
| UI shows an error state | Check the API is up and the Vite proxy in `vite.config.js` points to port 8080 |
| CORS errors in the console | Confirm the CORS config allows `http://localhost:5173` |

---

## License

Created for learning purposes during an internship. Add a license here if you plan to share the code.
