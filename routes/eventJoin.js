const router = require("express").Router();
const eventJoinController = require("../controllers/eventJoinController");
const {verifyTokenAndAuthorization}= require("../middlewares/verifyToken")

router.get("/:eventId", verifyTokenAndAuthorization, eventJoinController.getEventJoinList);
router.post("/", verifyTokenAndAuthorization, eventJoinController.addEventJoin);
router.delete("/:id", verifyTokenAndAuthorization, eventJoinController.deleteEventJoinById);
router.get("/event/:eventId", verifyTokenAndAuthorization, eventJoinController.getEventJoinByEventId);

module.exports = router