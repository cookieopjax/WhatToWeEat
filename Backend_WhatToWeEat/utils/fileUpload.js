const multer = require("multer");

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 限制檔案大小為 5 MB
  fileFilter(req, file, cb) {
    // 只允許上傳 .jpg, .jpeg, .png 的檔案
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file.mimetype)) {
      const error = new Error(
        "Invalid file type. Only JPEG, JPG, and PNG files are allowed.",
      );
      error.code = "LIMIT_FILE_TYPES";
      return cb(error);
    }
    cb(null, true);
  },
});

const restImg = upload.single("restImg");

exports.uploadRestImg = async (req, res, next) => {
  await restImg(req, res, (err) => {
    if (err) {
      res.status(400).send({ message: err.message });
    } else {
      next();
    }
  });
};
