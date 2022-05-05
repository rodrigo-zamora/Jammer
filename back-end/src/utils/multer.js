const multer = require('multer');
const multerGoogleStorage = require('multer-google-storage');

const uploadCloud = multer({
  storage: multerGoogleStorage.storageEngine({
    autoRetry: true,
    bucket: 'jammer-app',
    credentials: JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS),
    projectId: 'our-episode-349306',
    filename: (req, file, cb) => {
      cb(null, `profileImages/${Date.now()}_${file.originalname}`);
    },
    acl: 'publicRead'
  })
})

module.exports = {uploadCloud};