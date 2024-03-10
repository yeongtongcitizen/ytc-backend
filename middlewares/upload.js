const multer = require("multer");
const path = require("path");
const multerGoogleStorage = require('multer-google-storage');
const uuid4 = require("uuid4");
const dayjs = require('dayjs');

const { v4: uuidv4 } = require("uuid");
const uploadMiddleware = multer({
  limits: {
    fileSize: 1024 * 1024 * 1000000,
  },
  fileFilter: (req, file, done) => {
    console.log(" test fileFilter ");
    done(undefined, true); 
  },
  storage: multerGoogleStorage.storageEngine({
    bucket: 'yt-event',
    projectId: 'yt-people-409508',
    keyFilename: 'secure/yt-people-409508-c0a953c4af9a.json',
    filename: (req, file, done) => {
      console.log("=============================================");
      console.log(" file upload ======> " + JSON.stringify(file))
      console.log("=============================================");
      const randomID = uuid4();
      const ext = path.extname(file.originalname);
      const filename = randomID + ext;
      //cb(null, `${Date.now()}_${file.originalname}`);
      const d = dayjs();
      const dir = d.format("YYYY") + "/" + d.format("MM") + "/" + d.format("DD");
      done(null, `event/upload/${dir}/${filename}`);
    },
  }),
});

module.exports = { uploadMiddleware };
