require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const jobRoutes = require("./routes/jobRoutes");

const app = express();

// Middleware
app.use(express.json());

// Database
connectDB();

const metricsRoutes = require("./routes/metricsRoutes");
app.use("/api/metrics", metricsRoutes);

// Routes
app.use("/api", jobRoutes);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`API service running on port ${PORT}`);
});
