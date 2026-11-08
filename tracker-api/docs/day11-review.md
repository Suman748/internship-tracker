# Day 11: API review and DB demo

## Review finding and fix
TaskService stored tasks in an in-memory ArrayList, so nothing reached PostgreSQL.
Fixed by switching TaskService to Spring Data JPA (TaskRepository).

## Endpoint checks
- POST invalid status ("Not Started"): {"status":"status must be TODO, IN_PROGRESS or DONE"} [HTTP 400]
- POST valid status (TODO): {"id":1,"title":"Day 11 demo","description":"DB demo","status":"TODO"} [HTTP 201]

## DB demo (trackerdb, table tasks) after POST
```
 id |    title    | description | status |         created_at         
----+-------------+-------------+--------+----------------------------
  1 | Day 11 demo | DB demo     | TODO   | 2026-11-06 11:16:54.930581
(1 row)
```

## Persistence after restart
GET /api/tasks after restart: [{"id":1,"title":"Day 11 demo","description":"DB demo","status":"TODO"}]

DB after restart:
```
 id |    title    | description | status |         created_at         
----+-------------+-------------+--------+----------------------------
  1 | Day 11 demo | DB demo     | TODO   | 2026-11-06 11:16:54.930581
(1 row)
```
