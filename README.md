Internship Task Tracker
=======================

A full-stack task management app built during my internship.
One place to create tasks, update their status, search and filter them,
and review progress.

Stack: React (frontend) + Spring Boot (REST API) + PostgreSQL (database)


--------------------------------------------------------------------
1. PROBLEM
--------------------------------------------------------------------
Interns and mentors track daily assignments in spreadsheets, which makes
status, links and feedback hard to follow. This app gives one place to
manage tasks, update status and review progress.


--------------------------------------------------------------------
2. FEATURES
--------------------------------------------------------------------
- Create, view, edit and delete tasks
- Delete with a confirmation dialog
- Update task status
- Filter tasks by status
- Search tasks
- Client-side form validation with clear error messages
- Server-side error handling and CORS configuration
- Responsive layout
- Data stored in PostgreSQL using Spring Data JPA


--------------------------------------------------------------------
3. PROJECT STRUCTURE
--------------------------------------------------------------------
internship-tracker/
  react-task-dashboard/   React frontend
  tracker-api/            Spring Boot REST API
  capstone/               Capstone scope and acceptance criteria
    SCOPE.md
    ACCEPTANCE.md
  docs/                   Documentation and evidence
  postman/                Postman collection for API testing
  day6-output.json        Sample API output
  README.md / README.txt  This file


--------------------------------------------------------------------
4. PREREQUISITES
--------------------------------------------------------------------
- Node.js 18 or later and npm
- Java 17 or later
- PostgreSQL 14 or later (running locally)
- Git


--------------------------------------------------------------------
5. SETUP AND RUN
--------------------------------------------------------------------

Step 1: Clone the repository

    git clone https://github.com/Suman748/internship-tracker.git
    cd internship-tracker

Step 2: Create the database

    psql -U postgres
    CREATE DATABASE tracker;
    \q

    (Use the database name, username and password that match
     tracker-api/src/main/resources/application.properties.)

Step 3: Start the API

    cd tracker-api
    ./mvnw spring-boot:run

    The API starts on http://localhost:8080 by default.
    On Windows PowerShell use:  .\mvnw spring-boot:run

Step 4: Start the frontend (in a new terminal)

    cd react-task-dashboard
    npm install
    npm run dev

    Open the URL shown in the terminal (for example http://localhost:5173).
    If the project uses Create React App, run "npm start" instead.

Note: The frontend must point at the API URL. If you changed the API port,
update the API base URL in the frontend config or .env file.


--------------------------------------------------------------------
6. API ENDPOINTS
--------------------------------------------------------------------
(Adjust paths if your controller uses different ones.)

    GET     /api/tasks           List all tasks (supports filter and search)
    GET     /api/tasks/{id}      Get one task
    POST    /api/tasks           Create a task
    PUT     /api/tasks/{id}      Update a task
    DELETE  /api/tasks/{id}      Delete a task

Example task JSON:

    {
      "title": "Write README",
      "description": "Document setup and API",
      "status": "IN_PROGRESS",
      "dueDate": "2026-11-20"
    }

A Postman collection is available in the postman/ folder.


--------------------------------------------------------------------
7. TESTING
--------------------------------------------------------------------
- API: import the collection from postman/ and run the requests
- Frontend: create, edit, delete, filter and search tasks in the browser
- Database: check rows with
      SELECT * FROM task;
  (table name may differ depending on the entity mapping)


--------------------------------------------------------------------
8. CAPSTONE SCOPE
--------------------------------------------------------------------
In scope:
- Task CRUD, status updates, filtering, form validation, README and demo

Out of scope:
- User login and roles
- Notifications and email
- File uploads

Full details: capstone/SCOPE.md and capstone/ACCEPTANCE.md
Tickets: https://github.com/Suman748/internship-tracker/issues


--------------------------------------------------------------------
9. PROGRESS LOG (from commit history)
--------------------------------------------------------------------
- Days 6-9   : Controller/service layer, POST/PUT/DELETE, PostgreSQL,
               Task entity, Spring Data JPA
- Days 11-12 : Persistence fixes, Postgres integration
- Day 13     : Create and edit with API calls
- Day 14     : Delete with confirmation, end-to-end CRUD demo
- Day 15     : Status filter and task search endpoint
- Days 16-17 : Error handling, client validation, CORS, responsive CSS
- Day 18     : Full-stack demo walkthrough, PostgreSQL row checks
- Day 19     : Capstone scope and acceptance criteria


--------------------------------------------------------------------
10. AUTHOR
--------------------------------------------------------------------
Suman748 (GitHub)
Repository: https://github.com/Suman748/internship-tracker
