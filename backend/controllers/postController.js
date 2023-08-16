const Post = require("../models/Post");
const asyncHandler = require("express-async-handler");

const getPosts = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (id) {
    const post = await Post.findById(id).exec();

    if (!post) {
      return res.status(400).json({ message: "No post found!" });
    }
    res.json(post);
  } else {
    const posts = await Post.find().lean();

    if (!posts.length) {
      return res.status(400).json({ message: "No posts found!" });
    }
    res.json(posts);
  }
});

const createPosts = asyncHandler(async (req, res) => {
  const {
    category,
    topic,
    title,
    summary,
    coverPhoto,
    content,
    status,
    visibility,
    isFeatured,
    relatedArticle,
  } = req.body;

  console.log(req.body);

  // const parseTopic = JSON.parse(topic);

  if (!category || !topic || !title || !summary || !content) {
    return res.status(400).json({
      message:
        "Post category, topic, title, summary, cover photo, and content are required",
    });
  }

  const duplicatePost = await Post.findOne({ title }).lean().exec();

  if (duplicatePost)
    return res.status(409).json({ message: "Duplicate Post title" });

  const post = await Post.create({
    category,
    topic,
    title,
    summary,
    cover_photo: coverPhoto,
    content,
    status,
    visibility,
    is_featured: isFeatured,
    related_article: relatedArticle,
  });

  if (post) {
    return res.status(201).json({ message: "New Post created" });
  } else {
    return res.status(400).json({ message: "Invalid Post data received" });
  }
});

const updatePost = asyncHandler(async (req, res) => {
  const {
    id,
    category,
    topic,
    title,
    summary,
    coverPhoto,
    content,
    status,
    visibility,
    isFeatured,
    relatedArticle,
  } = req.body;
  if (!id) {
    return res.status(400).json({
      message: "Post id is required",
    });
  }

  const post = await Post.findById(id).exec();

  if (!post) return res.status(400).json({ message: "Post not found!" });

  const duplicate = await Post.findOne({ id }).lean().exec();

  if (duplicate && duplicate?._id.toString() !== id)
    return res.status(409).json({ message: "Duplicate Post title" });

  post.category = category;
  post.topic = topic;
  post.title = title;
  post.summary = summary;
  post.cover_photo = coverPhoto;
  post.content = content;
  post.status = status;
  post.visibility = visibility;
  post.is_featured = isFeatured;
  post.related_article = relatedArticle;

  const updatePost = await post.save();

  res.json(`'${updatePost.title}' updated`);
});

const deletePost = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Post ID required" });
  }

  const post = await Post.findById(id).exec();

  if (!post) return res.status(400).json({ message: "Post not found" });

  const result = await post.deleteOne();

  const reply = `Post '${result.title}' with ID ${result._id} deleted`;

  res.json(reply);
});

module.exports = {
  getPosts,
  createPosts,
  updatePost,
  deletePost,
};
