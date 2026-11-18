# Regression checklist (Days 1-21)

- [ ] API starts on :8080 and connects to PostgreSQL
- [ ] GET /api/tasks returns a JSON array
- [ ] POST /api/tasks creates a task; invalid body returns 400
- [ ] PUT /api/tasks/{id} updates; DELETE removes; unknown id returns 404
- [ ] GET /api/tasks/search?status=&q= filters correctly
- [ ] GET /api/tasks/stats totals match the list
- [ ] Data survives an application restart
- [ ] React list shows loading, empty, error and success states
- [ ] Create, edit, delete (with confirm dialog) work from the browser
- [ ] No CORS errors in the browser console
- [ ] `mvn test` passes
- [ ] `npm run build` succeeds
