# P04 – React + Spring integration

**Acceptance:** working create/list/edit/delete from browser

## Stack
React (Vite, proxy to :8080) → Spring Boot `tracker-api` → PostgreSQL (Spring Data JPA)

## How to run
1. `cd tracker-api && ./mvnw spring-boot:run`
2. `cd react-task-dashboard && npm install && npm run dev`

## Evidence
- API output: [api-output.txt](api-output.txt)
- Screenshots: create.png, list.png, edit.png, delete.png
- Persistence: data survives a page refresh and a backend restart
