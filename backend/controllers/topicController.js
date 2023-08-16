const Topic = require("../models/Topic");
const asyncHandler = require("express-async-handler");

const getTopics = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (id) {
    const topic = await Topic.findById(id).exec();

    if (!topic) {
      return res.status(400).json({ message: "No topic found!" });
    }
    res.json(topic);
  } else {
    const topics = await Topic.find().lean();

    if (!topics.length) {
      return res.status(400).json({ message: "No topics found!" });
    }
    res.json(topics);
  }
});

const createTopics = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Topic name required" });
  }

  const duplicateTopic = await Topic.findOne({ name }).lean().exec();

  if (duplicateTopic)
    return res.status(409).json({ message: "Duplicate topic name" });

  const topic = await Topic.create({ name });

  if (topic) {
    return res.status(201).json({ message: "New topic created" });
  } else {
    return res.status(400).json({ message: "Invalid topic data received" });
  }
});

const updateTopic = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  console.log(id);
  console.log(name);
  if (!id || !name) {
    return res.status(400).json({ message: "Topic name are required!" });
  }

  const topic = await Topic.findById(id).exec();

  if (!topic) return res.status(400).json({ message: "Topic not found!" });

  const duplicate = await Topic.findOne({ name }).lean().exec();

  if (duplicate && duplicate?._id.toString() !== id)
    return res.status(409).json({ message: "Duplicate topic name" });

  topic.name = name;

  const updateTopic = await topic.save();

  res.json(`'${updateTopic.name}' updated`);
});

const deleteTopic = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);

  if (!id) {
    return res.status(400).json({ message: "Topic ID required" });
  }

  const topic = await Topic.findById(id).exec();

  if (!topic) return res.status(400).json({ message: "Topic not found" });

  const result = await topic.deleteOne();

  const reply = `Topic '${result.name}' with ID ${result._id} deleted`;

  res.json(reply);
});

module.exports = {
  getTopics,
  createTopics,
  updateTopic,
  deleteTopic,
};
