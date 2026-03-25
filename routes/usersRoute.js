const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const upload = require("../middleware/uploadUserImage");
const checkAuth = require("../middleware/checkAuth");

router.get("/signup", checkAuth, usersController.UsersSignup);
router.post("/signup", upload.single("profilePic"), usersController.UsersSignupPost);

router.get("/login", checkAuth, usersController.UsersLogin);
router.post("/login", usersController.UsersLoginPost);
router.get("/logout", usersController.logout);

module.exports = router;