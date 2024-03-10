const router = require("express").Router();
const greatController = require("../controllers/greatController");
const {verifyTokenAndAuthorization}= require("../middlewares/verifyToken")

router.post("/", verifyTokenAndAuthorization, greatController.addGreat);
router.delete("/", verifyTokenAndAuthorization, greatController.deleteGreatById);
router.post("/user", verifyTokenAndAuthorization, greatController.getGreatByUser);
router.post("/sum", verifyTokenAndAuthorization, greatController.getGreatSum);

module.exports = router