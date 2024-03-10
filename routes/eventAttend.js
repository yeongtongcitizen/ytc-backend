const router = require("express").Router();
const eventAttendController = require("../controllers/eventAttendController");
const {verifyTokenAndAuthorization}= require("../middlewares/verifyToken")

router.get("/:eventId", verifyTokenAndAuthorization, eventAttendController.getEventAttendList);
router.post("/", verifyTokenAndAuthorization, eventAttendController.addEventAttend);
router.delete("/:id", verifyTokenAndAuthorization, eventAttendController.deleteEventAttendById);
router.get("/event/:eventId", verifyTokenAndAuthorization, eventAttendController.getEventAttendByEventId);

module.exports = router