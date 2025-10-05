# 100898394_COMP3123_Assignment1

## Project Description
This project is my COMP3123 Assignment 1 submission.  
  
The project demonstrates API endpoints, database integration, and Docker container usage.

---

## Sample User Credentials
These credentials can be used by the marker to log in and test the application:

- **Email/Username:** testuser@example.com  
- **Password:** Test1234  

> Use these credentials in the login form or API requests to authenticate.

---

## How to Run the Project

### Prerequisites
- Node.js (version 18.x recommended)  
- Docker Desktop (for MongoDB and Mongo Express containers)  
- Optional: Postman (for testing API endpoints)

---

### Environment Variables
Create a `.env` file in the project root with the following:

DB_USER=admin
DB_PASSWORD=password
DB_NAME=assignment1_db
DB_HOST=localhost
PORT=3000

## Comments / Notes
- Ensure the MongoDB container is running before starting the app.  
- Ports 3000 (app) and 8081 (Mongo Express) must be available. If already in use, change them accordingly.  
- The temporary `mongo-express-temp` container allows viewing the database without modifying the original Docker setup.  
- The app implements basic authentication and CRUD API endpoints.  
- Postman collection is included in the repository for API testing.  