const router = require("express").Router();
const postController = require("../controllers/postController");
const adminAuth = require("../middleware/adminAuth");

// সব route এ middleware


router.get("/", postController.getAll);
router.get("/create", adminAuth, postController.createForm);
router.post("/create", postController.createPost);
router.get("/edit", adminAuth, postController.editForm);
router.put("/edit/:id", postController.updatePost);
router.get("/delete", adminAuth, postController.delete);
router.delete("/delete/:id", postController.deletePost);
router.get("/videos/:routeName", postController.singleVideo);
router.post("/play", postController.play);
router.post("/ok/:id", postController.updateViwe);
router.get("/sitemap.xml", postController.getSitemap);

module.exports = router;