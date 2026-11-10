# Day 14: Delete and confirmation UI

- Delete button on each task opens a confirmation dialog
- Confirm calls DELETE /api/tasks/{id}; Cancel closes with no change
- List reloads after delete; errors show inline
- End-to-end CRUD verified against PostgreSQL: see docs/day14/crud-demo-output.txt
