const express = require("express");
const router = express.Router();
const topicsController = require("../controllers/topicController");
const verifyJWT = require("../middleware/verifyJWT");

router.use(verifyJWT);

router
  .route("/")
  .get(topicsController.getTopics)
  .post(topicsController.createTopics);

router.put("/:id", topicsController.updateTopic);
router.delete("/:id", topicsController.deleteTopic);

module.exports = router;
