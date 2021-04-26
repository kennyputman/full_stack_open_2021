import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { likeBlog } from "../reducers/blogReducer";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import { createComment } from "../reducers/commentReducer";
import { Avatar, Button, Typography, Link } from "@material-ui/core";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";

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
      <Link
        display="inline"
        underline="none"
        component={RouterLink}
        to={`/users/${blog.user.id}`}
      >
        <Avatar color="primary">
          {blog.user.username.charAt(0).toUpperCase()}
        </Avatar>
        {blog.user.username}
      </Link>
      <div className="blogHeader">
        {blog.title}: <br></br>
        by {blog.author}
      </div>

      <div className="extraInfo">
        <Typography>{blog.url}</Typography>

        <Button
          color="primary"
          size="medium"
          startIcon={<ThumbUpAltOutlinedIcon />}
          onClick={() => handleAddLike(blog)}
        >
          {blog.likes} Likes
        </Button>
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
