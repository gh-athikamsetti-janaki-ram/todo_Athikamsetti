# Todo List Application

## Project Description

The Todo List Application is a full-stack web application for managing tasks. Users can create, edit, delete, and mark tasks as completed, with filtering options by status, category, and due date. The application features a responsive frontend built with React and Bootstrap, a robust backend powered by Spring Boot, and data persistence using a MySQL database (`todolist`). It provides a user-friendly interface with gradient styling and date picker functionality for task management.

## Installation Instructions

### Prerequisites

- **Java 17 or later:** For the Spring Boot backend
- **Node.js 18.x or later:** For the React frontend
- **MySQL 8.0 or later:** For the database
- **Maven 3.8.x or later:** For backend dependency management
- **VS Code (optional):** For editing and running the project
- **Git:** To clone the repository

### Steps

1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   cd todo_Athikamsetti
   ```

2. **Set Up the Backend:**
   - Navigate to the backend directory:
     ```bash
     cd backend
     ```
   - Ensure MySQL is running:
     ```bash
     net start mysql
     ```
   - Create the `todolist` database:
     ```bash
     mysql -u root -p
     CREATE DATABASE todolist;
     EXIT;
     ```
   - Update `application.properties` (replace password as needed):

     ```
     # backend/src/main/resources/application.properties
     spring.datasource.url=jdbc:mysql://localhost:3306/todolist?createDatabaseIfNotExist=true
     spring.datasource.username=root
     spring.datasource.password=MySQLPass123!
     spring.jpa.hibernate.ddl-auto=update
     spring.jpa.show-sql=true
     server.port=8080
     ```

   - Install backend dependencies:
     ```bash
     mvn clean install
     ```

3. **Set Up the Frontend:**
   - Navigate to the frontend directory:
     ```bash
     cd ../frontend
     ```
   - Install frontend dependencies:
     ```bash
     npm install
     ```

4. **Verify Project Structure:**
   ```
   todo_Athikam_setti/
   ├── backend/
   │   ├── src/main/java/com/example/todo_backend/
   │   │   ├── config/
   │   │   │   ├── CorsConfig.java
   │   │   │   ├── SecurityConfig.java
   │   │   ├── controller/
   │   │   │   ├── TaskController.java
   │   │   ├── model/
   │   │   │   ├── Task.java
   │   │   ├── repository/
   │   │   │   ├── TaskRepository.java
   │   │   ├── service/
   │   │   │   ├── TaskService.java
   │   ├── src/main/resources/
   │   │   ├── application.properties
   │   ├── pom.xml
   ├── frontend/
   │   ├── src/
   │   │   ├── components/
   │   │   │   ├── TaskList.js
   │   │   │   ├── TaskForm.js
   │   │   ├── App.js
   │   │   ├── index.js
   │   │   ├── index.css
   │   ├── package.json
   ├── todolist-project.code-workspace
   ├── README.md
   ```

## How to Run the Project

### Start the Backend

```bash
cd backend
mvn clean spring-boot:run
```
- Expected: `Started TodoBackendApplication in X seconds.`
- Access: [http://localhost:8080/api/tasks](http://localhost:8080/api/tasks)

### Start the Frontend

```bash
cd frontend
npm start
```
- Expected: Opens [http://localhost:3000](http://localhost:3000) in your browser.

### Test the Application

- Open [http://localhost:3000](http://localhost:3000) to view the Todo List.
- Use Postman to test backend endpoints:
  - `GET http://localhost:8080/api/tasks`
  - `POST http://localhost:8080/api/tasks` (with JSON payload)
    ```json
    {
      "title": "Test Task",
      "description": "Description",
      "dueDate": "2025-06-24T10:00:00",
      "priority": 3,
      "category": "Work",
      "completed": false
    }
    ```

### Troubleshooting

- **Backend Fails:** Check logs for database or port issues (`netstat -aon | findstr :8080`).
- **Frontend Errors:** Check browser console (F12) for `ERR_CONNECTION_REFUSED` or CORS issues.

## Features

- **Add New Tasks:** Create tasks with title, description, due date, priority, and category using a form with react-datepicker.
- **Edit Tasks:** Update existing tasks via an edit button.
- **Delete Tasks:** Remove tasks with a delete button.
- **Mark Tasks as Completed:** Toggle task completion status.
- **Filter Tasks:** Filter by status (completed/incomplete), category, or due date.
- **Responsive Design:** Bootstrap-based UI adapts to mobile and desktop screens.
- **Data Persistence:** Tasks are stored in a MySQL database (`todolist`).
- **Error Handling:** Displays user-friendly error messages (e.g., "Failed to fetch tasks").

## Usage

1. Open [http://localhost:3000](http://localhost:3000).
2. Click **Add New Task** to create a task.
3. Use the filter form to view tasks by status, category, or due date.
4. Click **Complete**, **Edit**, or **Delete** on a task row.
5. The table displays tasks with a star rating for priority and formatted due dates.

> **Note:** Screenshots or GIFs can be added to showcase the UI (e.g., task form, table).

## Technologies Used

### Frontend

- React 18.2.0
- Bootstrap 5.3.7
- React-Bootstrap 2.10.10
- React-Datepicker 8.4.0
- Axios 1.10.0
- React-Router-Dom 7.6.3

### Backend

- Spring Boot 3.5.3
- Spring Data JPA
- MySQL Connector
- JJWT (for future authentication)

### Database

- MySQL 8.0 (`todolist` database)

### Tools

- Maven, Node.js, VS Code, Git

## How GitHub Copilot Was Used

GitHub Copilot was used to:

- Generate boilerplate code for React components (`TaskList.js`, `TaskForm.js`) and Spring Boot classes (`TaskController.java`, `TaskService.java`).
- Suggest implementations for REST endpoints, JPA repository methods, and React hooks (`useEffect`, `useCallback`).
- Provide naming conventions and error-handling logic.
- Speed up debugging by suggesting fixes for `useEffect`
Speed up debugging by suggesting fixes for useEffect dependencies and Axios error handling.
Assist in writing this README.md with consistent Markdown formatting.
