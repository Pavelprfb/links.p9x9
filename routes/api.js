const router = require("express").Router();
const postController = require("../controllers/postController");

router.get("/data/all", postController.getAllJSON);
router.get("/data/:routeName", postController.singleData);

module.exports = router;