# Acceptance criteria

## Project setup and CI (~3h)
- Given a fresh clone, when I follow the README setup steps, then both frontend and API start locally.

## Task data model (~4h)
- Given the schema, when migrations run, then the tasks table is created without errors.

## Task REST API (~6h)
- Given valid input, when I POST a task, then I get 201 and the task is saved in PostgreSQL.

## Task list and detail UI (~6h)
- Given tasks exist in the database, when I open the list page, then they are all shown.

## Task form with validation (~4h)
- Given a missing title, when I submit the form, then I see an error and nothing is saved.

## Status filter and progress summary (~4h)
- Given mixed statuses, when I choose Done, then only completed tasks are listed.

## Demo and documentation (~3h)
- Given the README, when a reviewer follows it, then they can run and demo the app.
