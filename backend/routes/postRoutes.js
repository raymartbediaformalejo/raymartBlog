const express = require("express");
const router = express.Router();
const postsController = require("../controllers/postController");
const verifyJWT = require("../middleware/verifyJWT");

router.use(verifyJWT);

router
  .route("/")
  .get(postsController.getPosts)
  .post(postsController.createPosts)
  .patch(postsController.updatePost)
  .delete(postsController.deletePost);

module.exports = router;
