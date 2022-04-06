const multer = require('multer');

const uploadLocal = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, 'src/public/uploads');
    },
    filename: (req, file, callback) => {
      callback(null, `${Date.now()}_${file.originalname}`);
    }
  })
});

module.exports = {uploadLocal};