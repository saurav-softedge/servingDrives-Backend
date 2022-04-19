const multer = require("multer");
const path = require("path");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Server/uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG, JPG and PNG is supported"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 10 },
  fileFilter: fileFilter,
});

exports.uploadMultiple = upload.fields([
  { name: "ouletimage", maxCount: 1 },
  { name: "menuimage", maxCount: 1 },
  { name: "logoimage", maxCount: 1 },
  { name: "adhharcardimage", maxCount: 1 },
  { name: "pancardimage", maxCount: 1 },
  { name: "cancelledchequepic", maxCount: 1 },
]);
