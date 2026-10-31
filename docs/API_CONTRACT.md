# Task API: HTTP and REST Contract

Week 1 deliverable: document CRUD endpoints and payloads.
This contract is shared by the frontend (React) and backend (Spring).

## 1. Conventions

- **Base URL:** `/api/v1`
- **Format:** JSON for all request and response bodies
- **Header:** `Content-Type: application/json`
- **Dates:** ISO 8601 UTC, e.g. `2026-10-31T09:30:00Z`
- **IDs:** positive integers, assigned by the server

## 2. Task resource

| Field         | Type    | Required on create | Notes                                   |
|---------------|---------|--------------------|-----------------------------------------|
| `id`          | integer | no (server-set)    | Read-only                               |
| `title`       | string  | yes                | 1 to 100 characters                     |
| `description` | string  | no                 | Up to 500 characters                    |
| `status`      | string  | no                 | `TODO`, `IN_PROGRESS`, `DONE` (default `TODO`) |
| `createdAt`   | string  | no (server-set)    | Read-only                               |
| `updatedAt`   | string  | no (server-set)    | Read-only                               |

## 3. Endpoints

| Operation | Method   | Path          | Success         |
|-----------|----------|---------------|-----------------|
| Create    | `POST`   | `/tasks`      | `201 Created`   |
| Read all  | `GET`    | `/tasks`      | `200 OK`        |
| Read one  | `GET`    | `/tasks/{id}` | `200 OK`        |
| Update    | `PUT`    | `/tasks/{id}` | `200 OK`        |
| Partial update | `PATCH` | `/tasks/{id}` | `200 OK`     |
| Delete    | `DELETE` | `/tasks/{id}` | `204 No Content`|

### 3.1 Create a task

`POST /api/v1/tasks`

Request:
```json
{
  "title": "Finish React task list",
  "description": "Use mock data for now",
  "status": "TODO"
}
```

Response `201 Created` (with `Location: /api/v1/tasks/1`):
```json
{
  "id": 1,
  "title": "Finish React task list",
  "description": "Use mock data for now",
  "status": "TODO",
  "createdAt": "2026-10-31T09:30:00Z",
  "updatedAt": "2026-10-31T09:30:00Z"
}
```

### 3.2 List tasks

`GET /api/v1/tasks?status=TODO&page=0&size=20`

Query parameters are optional: `status` filters, `page` and `size` paginate.

Response `200 OK`:
```json
{
  "items": [
    {
      "id": 1,
      "title": "Finish React task list",
      "description": "Use mock data for now",
      "status": "TODO",
      "createdAt": "2026-10-31T09:30:00Z",
      "updatedAt": "2026-10-31T09:30:00Z"
    }
  ],
  "page": 0,
  "size": 20,
  "totalItems": 1
}
```

### 3.3 Get one task

`GET /api/v1/tasks/1` returns `200 OK` with a single task object (same shape as 3.1 response).
Returns `404 Not Found` if the task does not exist.

### 3.4 Replace a task

`PUT /api/v1/tasks/1` replaces all editable fields, so `title` is required.

Request:
```json
{
  "title": "Finish React task list",
  "description": "Mock data done, routing next",
  "status": "IN_PROGRESS"
}
```

Response `200 OK`: the updated task object.

### 3.5 Partially update a task

`PATCH /api/v1/tasks/1` accepts only the fields to change.

Request:
```json
{ "status": "DONE" }
```

Response `200 OK`: the updated task object.

### 3.6 Delete a task

`DELETE /api/v1/tasks/1` returns `204 No Content` with an empty body.
Returns `404 Not Found` if the task does not exist.

## 4. Status codes used

| Code | Meaning                | When                                         |
|------|------------------------|----------------------------------------------|
| 200  | OK                     | Successful read or update                    |
| 201  | Created                | Successful create                            |
| 204  | No Content             | Successful delete                            |
| 400  | Bad Request            | Malformed JSON or validation failure         |
| 404  | Not Found              | Task id does not exist                       |
| 405  | Method Not Allowed     | Wrong method for the path                    |
| 415  | Unsupported Media Type | Content-Type is not `application/json`       |
| 500  | Internal Server Error  | Unexpected server failure                    |

## 5. Error format

All errors use one shape so the frontend can handle them uniformly.

```json
{
  "status": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "details": [
    { "field": "title", "message": "must not be blank" }
  ],
  "timestamp": "2026-10-31T09:30:00Z"
}
```

## 6. Method semantics

- `GET`: safe and idempotent, never changes data.
- `PUT`, `DELETE`: idempotent, repeating the call gives the same end state.
- `POST`: not idempotent, repeating creates duplicates.
- `PATCH`: partial update, changes only the fields sent.

## 7. Review checklist (frontend/backend contract)

- [ ] Field names and types agreed (camelCase JSON)
- [ ] Status enum values agreed
- [ ] Error format agreed
- [ ] Pagination shape agreed
- [ ] Frontend mock data matches the Task shape above
