const fs = require("fs");
const path = require("path");
const multer = require("multer");

function createStorage(destinationPath) {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      fs.mkdirSync(destinationPath, { recursive: true });
      cb(null, destinationPath);
    },
    filename: function (req, file, cb) {
      const schemaName = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + schemaName + path.extname(file.originalname));
    },
  });
}

function createUploadMiddleware(destinationPath, fileSizeLimit) {
  const storage = createStorage(destinationPath);
  return multer({
    storage: storage,
    limits: {
      fileSize: fileSizeLimit,
    },
  });
}

const uploadCourse = createUploadMiddleware("public/images/course", 10000000);
const uploadMateri = createUploadMiddleware("public/images/materi", 10000000);
const uploadTools = createUploadMiddleware("public/images/tools", 10000000);

module.exports = { uploadCourse, uploadMateri, uploadTools };
