// 1. Import dependencies
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db"); // Import DB connection function

// 2. Load environment variables
dotenv.config();

// 3. Initialize express app
const app = express();

// 4. Middleware to parse JSON
app.use(express.json());

// 5. Connect to MongoDB
connectDB(); // This will log success or error messages

// 6. Define a test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// 7. Setup server port from .env or default
const PORT = process.env.PORT || 5000;

// 8. Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});