require("dotenv").config();
const { Worker } = require("bullmq");
const IORedis = require("ioredis");
const connectDB = require("./config/db");
const processor = require("./processor/jobProcessor");

connectDB();

const connection = new IORedis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  maxRetriesPerRequest: null,
});

new Worker(
  "job-queue",
  processor,
  {
    connection,
    concurrency: 2,
  }
);

console.log("Worker service started");
