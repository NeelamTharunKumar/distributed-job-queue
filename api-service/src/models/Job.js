const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    jobId: { type: String, unique: true },
    type: String,
    payload: Object,
    status: {
      type: String,
      enum: ["PENDING", "COMPLETED", "FAILED"],
      default: "PENDING",
    },
    attempts: { type: Number, default: 0 },
    error: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
