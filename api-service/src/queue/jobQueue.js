const { Queue } = require("bullmq");
const IORedis = require("ioredis");

const connection = new IORedis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

const jobQueue = new Queue("job-queue", {
  connection,
});

module.exports = jobQueue;
