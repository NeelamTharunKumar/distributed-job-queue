const Job = require("../models/Job");

exports.getQueueMetrics = async (req, res) => {
  const total = await Job.countDocuments();
  const pending = await Job.countDocuments({ status: "PENDING" });
  const completed = await Job.countDocuments({ status: "COMPLETED" });
  const failed = await Job.countDocuments({ status: "FAILED" });

  res.json({ total, pending, completed, failed });
};
