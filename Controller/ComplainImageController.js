const multer = require("multer");

const mystorage = multer.diskStorage({
  destination: "./public/complaints/",

  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

module.exports.upload = multer({
  storage: mystorage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      // cb(null,false)
      cb(new Error("valid extension are jpeg/png"));
    }
  },
});

// module.exports = {upload,mystorage}
