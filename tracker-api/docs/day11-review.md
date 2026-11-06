# Day 11: API review and DB demo

## Endpoint checks
- POST invalid status ("Not Started"): {"status":"status must be TODO, IN_PROGRESS or DONE"} [HTTP 400]
- POST valid status (TODO): {"id":101,"title":"Day 11 demo","description":"DB demo","status":"TODO"} [HTTP 201]

## DB demo (trackerdb, table tasks)
```
 id | title | description | status | created_at 
----+-------+-------------+--------+------------
(0 rows)
```

## Persistence after restart
GET /api/tasks after restart: [{"id":1,"title":"Set up project","description":"Spring Boot setup","status":"DONE"},{"id":2,"title":"Build GET endpoint","description":"Day 6","status":"DONE"}]
