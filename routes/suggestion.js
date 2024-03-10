const router = require("express").Router();
const suggestionController = require("../controllers/suggestionController");
const {verifyTokenAndAuthorization, verifyAdmin}= require("../middlewares/verifyToken")

// Add 
router.post("/", verifyTokenAndAuthorization, suggestionController.addSuggestion);

// UPADATE 
router.put("/:id", verifyTokenAndAuthorization, suggestionController.updateSuggestionById);

// DELETE USER
router.delete("/:id", verifyTokenAndAuthorization, suggestionController.deleteSuggestionById);

// GET USER Detail
router.get("/:id", verifyTokenAndAuthorization, suggestionController.getSuggestionById);

// GET USER List
router.get("/list", verifyTokenAndAuthorization, suggestionController.getSuggestionList);
router.get("/type/:type", verifyTokenAndAuthorization, suggestionController.getSuggestionList);

module.exports = router