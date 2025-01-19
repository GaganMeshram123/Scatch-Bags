const multer = require("multer");

const storage = multer.memoryStorage();//hum memory storage pe save kar rahe hai 

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
    fileFilter: function (req, file, cb) {
        if (!file.mimetype.startsWith("image/")) {
            return cb(new Error("Only image files are allowed!"), false);
        }
        cb(null, true);
    },
});

module.exports = upload;