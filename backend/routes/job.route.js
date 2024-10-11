const express = require("express");
const router = express.Router();

const isAuthenticated = require("../middlewares/isAuthenticated.js");
const {
  postJob,
  getAllJob,
  getAdminJobs,
  getJobById,
} = require("../controllers/job.controller.js");

router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(isAuthenticated, getAllJob);
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);
router.route("/get/:id").get(isAuthenticated, getJobById);

module.exports = router;
