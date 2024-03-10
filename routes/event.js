const router = require("express").Router();
const eventController = require("../controllers/eventController");
const {verifyTokenAndAuthorization}= require("../middlewares/verifyToken")

router.get('/', eventController.getEventList)
router.post("/", verifyTokenAndAuthorization, eventController.addEvent);
router.put("/:id", verifyTokenAndAuthorization, eventController.updateEventById);
router.get("/:id", eventController.getEventById);
router.delete("/:id", eventController.deleteEventById);

module.exports = router