# Internship Task Tracker

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

## Author

Suman S (@Suman748)
