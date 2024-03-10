const router = require("express").Router();
const memberController = require("../controllers/memberController");
const {verifyTokenAndAuthorization, verifyAdmin}= require("../middlewares/verifyToken")
 
router.get("/", verifyTokenAndAuthorization, memberController.getFinanceList);

module.exports = router