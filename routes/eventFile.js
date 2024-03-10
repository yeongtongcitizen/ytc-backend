const router = require("express").Router();
const eventFileController = require("../controllers/eventFileController");
const { verifyTokenAndAuthorization } = require("../middlewares/verifyToken")
const { uploadMiddleware } = require("../middlewares/upload");

router.get('/event/:id', eventFileController.getEventFileListByEvent)
router.get('/all', eventFileController.getEventFileList)
router.post("/", verifyTokenAndAuthorization, eventFileController.addEventFile);
router.get("/:id", eventFileController.getEventFileById);
router.delete("/:id", verifyTokenAndAuthorization, eventFileController.deleteEventFileById);
router.post('/upload', uploadMiddleware.array("files", 12) , eventFileController.uploadEventFiles)
module.exports = router