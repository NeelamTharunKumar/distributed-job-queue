const Job = require("../models/Job");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

module.exports = async (job) => {
  const { jobId, payload } = job.data;

  const dbJob = await Job.findOne({ jobId });
  if (!dbJob) return;

  try {
    console.log(`Processing job ${jobId}`);
   

  } catch (err) {
    dbJob.status = "FAILED";
    dbJob.attempts += 1;
    dbJob.error = err.message;
    await dbJob.save();
    throw err;
  }
};
