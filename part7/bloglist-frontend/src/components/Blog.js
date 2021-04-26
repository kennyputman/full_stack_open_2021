import React, { useState } from "react";
import { likeBlog } from "../reducers/blogReducer";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import { createComment } from "../reducers/commentReducer";
import { Button, Typography } from "@material-ui/core";

const Blog = () => {
  const id = useParams().id;

  const [content, setContent] = useState("");

  const blogs = useSelector(({ blogs }) => blogs);
  const comments = useSelector(({ comments }) => comments);

  const blog = blogs.find((b) => b.id === id);
  const blogComments = comments.filter((comment) => comment.blog === id);

  const dispatch = useDispatch();

  const handleAddLike = async (targetBlog) => {
    try {
      const blogObject = {
        user: targetBlog.user,
        likes: targetBlog.likes + 1,
        author: targetBlog.author,
        title: targetBlog.title,
        url: targetBlog.url,
      };

      dispatch(likeBlog(blogObject, targetBlog.id));
    } catch (exception) {
      console.log(`Like button failed: ${exception}`);
    }
  };

  const handleAddComment = async (event) => {
    event.preventDefault();
    try {
      const commentObject = {
        content: content,
        blog: blog.id,
      };

      dispatch(createComment(commentObject));
      setContent("");
    } catch (exception) {
      console.log(`Create form failed: ${exception}`);
    }
  };

  if (!blog) {
    return null;
  }

  return (
    <div className="blog">
      <div className="blogHeader">
        {blog.title}: <br></br>
        by {blog.author}
      </div>

      <div className="extraInfo">
        {blog.url}
        <Typography gutterBottom>Likes: {blog.likes}</Typography>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={() => handleAddLike(blog)}
        >
          LIKE
        </Button>
        {blog.user.username}
      </div>
      <div>
        <CommentForm
          content={content}
          handleAddComment={handleAddComment}
          setContent={({ target }) => setContent(target.value)}
        ></CommentForm>
        <CommentList comments={blogComments}></CommentList>
      </div>
    </div>
  );
};

export default Blog;
