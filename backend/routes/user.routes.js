const express = require("express");
const router = express.Router();
const {
  register,
  login,
  updateProfile,
  logout,
} = require("../controllers/user.controller.js");
const isAuthenticated = require("../middlewares/isAuthenticated.js");
const singleUpload = require("../middlewares/multer.js");
router.post("/register", singleUpload, register);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.post("/profile/update", singleUpload, isAuthenticated, updateProfile);

module.exports = router;
