const multer = require("multer");

// Configure multer to use memory storage
const storage = multer.memoryStorage();
const singleUpload = multer({ storage }).single("file");

// Export the upload middleware
module.exports = singleUpload;
