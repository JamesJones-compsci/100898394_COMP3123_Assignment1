# 100898394_COMP3123_Assignment1

## Project Description
This project is my COMP3123 Assignment 1 submission.  

The project demonstrates API endpoints, database integration, and Docker container usage.

---

## How to Run the Project

### Prerequisites
- Node.js (version 18.x recommended)  
- Docker Desktop (for MongoDB and Mongo Express containers)  
- Optional: Postman (for testing API endpoints)

### Steps
1. Ensure Docker Desktop is running.  
2. Start the MongoDB container (if not already running).  
3. Run the temporary Mongo Express container to view the database:
   ```bash
   docker run -d --name mongo-express-temp -p 8081:8081 \
     -e ME_CONFIG_MONGODB_ADMINUSERNAME=admin \
     -e ME_CONFIG_MONGODB_ADMINPASSWORD=password \
     -e ME_CONFIG_MONGODB_SERVER=comp3095-mongodb \
     -e ME_CONFIG_MONGODB_AUTH_DATABASE=admin \
     -e ME_CONFIG_BASICAUTH_USERNAME=admin \
     -e ME_CONFIG_BASICAUTH_PASSWORD=pass \
     --network mynetwork \
     mongo-express:latest

4. Start the Node.js application:

    bash
    Copy code
    npm install
    npm start

5. Use Postman to test API endpoints via the included collection.

### Comments / Notes
* Ensure the MongoDB container is running before starting the app.

* Ports 3000 (app) and 8081 (Mongo Express) must be available. If already in use, change them accordingly.

* The temporary mongo-express-temp container allows viewing the database without modifying the original Docker setup.

* The app implements basic authentication and CRUD API endpoints.

* Postman collection is included in the repository for API testing.