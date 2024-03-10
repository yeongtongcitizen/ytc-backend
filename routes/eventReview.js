const router = require("express").Router();
const eventReviewController = require("../controllers/eventReviewController");
const {verifyTokenAndAuthorization} = require("../middlewares/verifyToken")

router.get('/list/:id', eventReviewController.getEventReviewListByEvent)
router.post("/", verifyTokenAndAuthorization, eventReviewController.addEventReview);
router.get("/:id", eventReviewController.getEventReviewById);
router.delete("/:id", eventReviewController.deleteEventReviewById);

module.exports = router