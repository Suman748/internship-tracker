# PostgreSQL Integration (P03)

## Setup
- Database: trackerdb (PostgreSQL)
- Config: src/main/resources/application.properties
  (spring.datasource.url, username, password, spring.jpa.hibernate.ddl-auto)
- Schema: db/schema.sql

## Schema
```sql
CREATE TABLE IF NOT EXISTS tasks (
    id          BIGSERIAL PRIMARY KEY,
    title       VARCHAR(255) NOT NULL,
    description TEXT,
    status      VARCHAR(30)  NOT NULL DEFAULT 'TODO',
    created_at  TIMESTAMP    NOT NULL DEFAULT NOW()
);
```

## JPA mapping
- Entity: Task (@Entity, @Table(name = "tasks"))
- Repository: TaskRepository extends JpaRepository<Task, Long>
- TaskService uses TaskRepository, no in-memory list

## Persistence evidence
Task created via POST /api/tasks, app restarted, then GET /api/tasks:
```json

```
