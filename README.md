# Internship Tracker

Task manager built during the internship: a **React (Vite)** front end and a **Spring Boot + PostgreSQL** REST API.

## Project structure

```
internship-tracker/
├── react-task-dashboard/   React + Vite front end (port 5173)
├── tracker-api/            Spring Boot REST API (port 8080)
├── docs/                   Contracts, test output and daily evidence
├── postman/                Postman collection and screenshots
└── .github/workflows/      GitHub Pages deploy workflow
```

## Features

- Create, list, edit and delete tasks (CRUD) from the browser, stored in PostgreSQL
- Status filter and task search: `GET /api/tasks/search?status=&q=`
- Server-side validation and JSON error responses (400 invalid input, 404 unknown id)
- Client-side validation that mirrors the server rules (`utils/validate.js`)
- Error banner with Retry for server and network errors (`ErrorBanner.jsx`)
- CORS enabled for the React dev server (`CorsConfig.java`)
- Responsive layout for tablet and phone widths (`styles/responsive.css`)

## API endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/tasks` | List all tasks |
| GET | `/api/tasks/{id}` | Get one task |
| POST | `/api/tasks` | Create a task |
| PUT | `/api/tasks/{id}` | Update a task |
| DELETE | `/api/tasks/{id}` | Delete a task |
| GET | `/api/tasks/search?status=&q=` | Filter by status and search text |

## Validation rules

- `title`: required, 3 to 100 characters
- `description`: up to 500 characters

## How to run

Open two Git Bash windows.

**1. API (backend)** – PostgreSQL must be running first.

```bash
cd ~/internship-tracker/tracker-api
./mvnw spring-boot:run
```

Check it: open `http://localhost:8080/api/tasks` and you should see JSON.

**2. Website (React)**

```bash
cd ~/internship-tracker/react-task-dashboard
npm install
npm run dev
```

Open `http://localhost:5173`.

## Day 16 – Server errors and validation on both sides

- Server returns JSON errors using Bean Validation and the exception handler.
- Client validation in `react-task-dashboard/src/utils/validate.js`.
- `ErrorBanner.jsx` shows server and network errors with a Retry button.
- Evidence: `docs/day16/error-tests-output.txt` (empty title, short title, malformed JSON, unknown id on GET and DELETE).

## Day 17 – CORS, state refresh and responsive fixes

- `CorsConfig.java` allows `http://localhost:5173` for `/api/**` (GET, POST, PUT, DELETE, OPTIONS).
- After create, update and delete the list should refetch from the API so the UI matches the database.
- `styles/responsive.css` adds breakpoints at 768px and 480px.
- Evidence: `docs/day17/cors-preflight-output.txt`.
- Merged through pull request #11 (`day16-17-errors-cors`).

## Testing checklist

1. Submit an empty title and see the validation error.
2. Stop the API and see the error banner with Retry.
3. Resize the browser to phone width and check the layout.
4. Run the curl commands in `docs/day16` and `docs/day17` with the API running.

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Compilation error in `TaskSearchController.java` | Leftover merge conflict markers. Remove every `<<<<<<<`, `=======`, `>>>>>>>` line. |
| `./mvnw: No such file` | Run `mvn spring-boot:run` instead. |
| Port 8080 or 5173 in use | Close the old window that is still running it. |
| Database connection error | Start PostgreSQL and check the password in `application.properties`. |

## Author

Suman S, GitHub: [Suman748](https://github.com/Suman748)
