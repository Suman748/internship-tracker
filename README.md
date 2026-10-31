# Internship Tracker

Weekly deliverables for my internship, one folder or document per task, each reviewed by my mentor through GitHub.

## Progress

| Week | Topic | Deliverable | Status |
|------|-------|-------------|--------|
| 1 | HTTP and REST contract | [API contract](docs/API_CONTRACT.md): CRUD endpoints and payloads | Done |

## Repository structure

```
internship-tracker/
├── docs/
│   └── API_CONTRACT.md   # Task API: endpoints, payloads, status codes, errors
└── README.md
```

## Week 1: HTTP and REST contract

Covers JSON, HTTP methods, status codes and API design. The contract defines a `Task` resource with:

- Create, read (list and single), update (`PUT`/`PATCH`) and delete endpoints
- Example request and response payloads
- The status codes used and a shared error format
- A review checklist for frontend/backend agreement

Read it here: [docs/API_CONTRACT.md](docs/API_CONTRACT.md)

## Workflow

1. Create a branch per task: `git checkout -b weekN-topic`
2. Commit the deliverable with a clear message
3. Push the branch and open a pull request
4. Add the PR link to the tracker and address mentor feedback

## Author

GitHub: [@Suman748](https://github.com/Suman748)
