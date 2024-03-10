const router = require("express").Router();
const memberController = require("../controllers/memberController");
const {verifyTokenAndAuthorization, verifyAdmin}= require("../middlewares/verifyToken")

// Add 
router.post("/", verifyTokenAndAuthorization, memberController.addMember);

// UPADATE 
router.put("/:id", verifyTokenAndAuthorization, memberController.updateMemberById);

// DELETE USER
router.delete("/:id", verifyTokenAndAuthorization, memberController.deleteMemberById);

// GET USER Detail
router.get("/:id", verifyTokenAndAuthorization, memberController.getMemberById);

// GET USER List
router.get("/type/:type", verifyTokenAndAuthorization, memberController.getMemberList);


module.exports = router