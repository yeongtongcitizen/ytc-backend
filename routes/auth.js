const router = require("express").Router();
const authController = require("../controllers/authContoller");


// REGISTRATION 

router.post("/register", authController.createUser);


// LOGIN 
router.post("/login", authController.loginUser);

// LOGIN 
router.post("/snslogin", authController.snsLoginUser);



module.exports = router