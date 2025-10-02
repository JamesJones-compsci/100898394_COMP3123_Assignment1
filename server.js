// 1. Import dependencies
const express = require("express");
const mongoose = require('mongoose');
const connectDB = require("./config/db"); // Import DB connection function
const userRoutes = require('./routes/userRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const errorHandler = require('./middleware/errorHandler');
const dotenv = require("dotenv");

// 2. Initialize express app
const app = express();

// 3. Setup server port from .env or default
const PORT = process.env.PORT || 5000;

// 4. Middleware to parse JSON
app.use(express.json());

// 5. Load environment variables
dotenv.config();

// 6. Connect to MongoDB
connectDB(); // This will log success or error messages



// 7. Define a test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// 8. Routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp/employees', employeeRoutes);

app.use(errorHandler);  // Error Handler must be the last 'Route'


// 9. Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});











