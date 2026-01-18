const express = require("express");
const router = express.Router();
const { getQueueMetrics } = require("../controllers/metricsController");
const auth = require("../middleware/auth");

router.get("/metrics/queue", auth, getQueueMetrics);

module.exports = router;
