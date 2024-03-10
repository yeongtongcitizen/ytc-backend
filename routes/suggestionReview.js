const router = require("express").Router();
const suggestionReviewController = require("../controllers/suggestionReviewController");
const {verifyTokenAndAuthorization} = require("../middlewares/verifyToken")

router.get('/list/:id', suggestionReviewController.getSuggestionReviewListBySuggestion)
router.post("/", verifyTokenAndAuthorization, suggestionReviewController.addSuggestionReview);
router.get("/:id", suggestionReviewController.getSuggestionReviewById);
router.delete("/:id", suggestionReviewController.deleteSuggestionReviewById);

module.exports = router