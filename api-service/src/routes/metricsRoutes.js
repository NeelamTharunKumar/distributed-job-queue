const express = require("express");
const router = express.Router();
const { Queue } = require("bullmq");
const IORedis = require("ioredis");

const connection = new IORedis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

const queue = new Queue("job-queue", { connection });

router.get("/", async (req, res) => {
  const counts = await queue.getJobCounts(
    "waiting",
    "active",
    "completed",
    "failed"
  );

  res.json(counts);
});

module.exports = router;
