const express = require("express");
const path = require("path");
const movieRoutes = require("./routes/movie"); // Import the movie routes
const cors = require("cors");

// Use CORS middleware to allow cross-origin requests
const app = express();
app.use(cors());

// Use express.json() middleware for parsing JSON requests
app.use(express.json());

// Serve the movie routes for the /api/movies endpoint
app.use("/api/movies", movieRoutes);

// Default route if no matching route found
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start the server on port 5000
app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
