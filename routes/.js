const router = require("express").Router();
const memberController = require("../controllers/memberController");
const {verifyTokenAndAuthorization, verifyAdmin}= require("../middlewares/verifyToken")


// UPADATE 
router.put("/",verifyTokenAndAuthorization, memberController.updateMember);

// DELETE USER
router.delete("/" , verifyTokenAndAuthorization, memberController.deleteMember);

// GET USER

router.get("/",verifyTokenAndAuthorization, memberController.getMember);

// Exists
router.post("/exists", memberController.exsisMember);


module.exports = router