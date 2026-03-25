const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

router.post("/add", commentController.commentPost);

module.exports = router;