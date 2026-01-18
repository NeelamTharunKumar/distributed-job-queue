const { v4: uuidv4 } = require("uuid");
const Job = require("../models/Job");
const jobQueue = require("../queue/jobQueue");

/* CREATE JOB */
exports.createJob = async (req, res) => {
  try {
    const { type, payload = {}, priority = 1 } = req.body;

    if (!type) {
      return res.status(400).json({ message: "Job type is required" });
    }

    const jobId = uuidv4();

    await Job.create({
      jobId,
      type,
      payload,
      status: "PENDING",
    });

    await jobQueue.add(
      "task",
      { jobId, type, payload },
      {
        priority,
        attempts: 3,
        backoff: {
          type: "exponential",
          delay: 2000,
        },
        removeOnComplete: false,
        removeOnFail: false,
      }
    );

    return res.status(201).json({ jobId, status: "PENDING" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

/* GET JOB STATUS */
exports.getJobStatus = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findOne({ jobId });
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    return res.status(200).json({
      jobId: job.jobId,
      status: job.status,
      attempts: job.attempts,
      error: job.error,
      createdAt: job.createdAt,
      updatedAt: job.updatedAt,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

/* CANCEL JOB */
exports.cancelJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findOne({ jobId });
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (["COMPLETED", "FAILED"].includes(job.status)) {
      return res.status(400).json({ message: "Job already finished" });
    }

    job.status = "FAILED";
    job.error = "Cancelled by user";
    await job.save();

    return res.status(200).json({ message: "Job cancelled" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
