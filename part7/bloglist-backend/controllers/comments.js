const commentsRouter = require("express").Router();
const Comment = require("../models/comment");

commentsRouter.get("/", async (request, response) => {
  const comments = await Comment.find({}).populate("comments", {
    id: 1,
    content: 1,
    blog: 1,
  });

  response.json(comments);
});

module.exports = commentsRouter;
