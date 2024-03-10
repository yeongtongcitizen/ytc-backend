const router = require("express").Router();
const configurationController = require("../controllers/configurationController");
const {verifyTokenAndAuthorization, verifyAdmin}= require("../middlewares/verifyToken")

// Add Configuration
router.post("/", verifyTokenAndAuthorization, configurationController.addConfiguration);

// UPADATE Configuration
router.put("/:id", verifyTokenAndAuthorization, configurationController.updateConfigurationById);

// DELETE Configuration
router.delete("/:id", verifyTokenAndAuthorization, configurationController.deleteConfigurationById);

// GET Configuration Detail
router.get("/:id", verifyTokenAndAuthorization, configurationController.getConfigurationById);

// GET Configuration Detail By Code
router.get("/code/:code", verifyTokenAndAuthorization, configurationController.getConfigurationByCode);


// GET Configuration List
router.get("/", verifyTokenAndAuthorization, configurationController.getConfigurationList);


module.exports = router