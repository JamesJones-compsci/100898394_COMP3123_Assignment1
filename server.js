// 1. Import dependencies
const express = require("express");
const dotenv = require("dotenv");

// 2. Load environment variables
dotenv.config();

// 3. Initialize express app
const app = express();

// 4. Middleware to parse JSON
app.use(express.json());

// 5. Define a test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// 6. Setup server port from .env or default
const PORT = process.env.PORT || 5000;

// 7. Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});