const router = require("express").Router();
const auth = require("../middleware/auth");
const jobController = require("../controllers/jobController");

router.post("/jobs", auth, jobController.createJob);
router.get("/jobs/:jobId", auth, jobController.getJobStatus);
router.delete("/jobs/:jobId", auth, jobController.cancelJob);

module.exports = router;
