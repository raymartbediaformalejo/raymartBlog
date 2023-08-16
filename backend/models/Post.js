const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    category: {
      type: String,
    },
    topic: {
      type: [{ _id: String, name: String }],
    },
    title: {
      type: String,
    },
    summary: {
      type: String,
    },
    cover_photo: {
      type: String,
    },
    content: {
      type: String,
    },
    status: {
      type: String,
    },
    visibility: {
      type: String,
    },
    is_featured: {
      type: Boolean,
    },
    related_article: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
