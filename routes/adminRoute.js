const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");
const adminAuth = require("../middleware/adminAuth");

router.get("/login", adminController.adminLoginPage);

// protected
router.get("/dashboard", adminAuth, adminController.adminDashboard);
router.get("/logout", adminAuth, adminController.adminLogout);

router.post("/login", adminController.adminLogin);

module.exports = router;