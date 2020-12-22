import React, { useState } from "react";
import blogService from "../services/blogs";
const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleAddLike = async (event) => {
    event.preventDefault();
    console.log("liking", blog.id);
    try {
      const blogObject = {
        user: blog.user.id,
        likes: likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url,
      };

      blogService.change(blogObject, blog.id);
    } catch (exception) {
      console.log(`Like button failed: ${exception}`);
    }
  };

  const increaseLikes = () => setLikes(likes + 1);

  return (
    <div class="blog">
      {blog.title} {blog.author}
      <button onClick={toggleVisibility} class="btn" style={hideWhenVisible}>
        view
      </button>
      <button onClick={toggleVisibility} class="btn" style={showWhenVisible}>
        hide
      </button>
      <div style={showWhenVisible} class="extraInfo">
        {blog.url}
        <br></br>
        Likes: {likes}
        <button
          onClick={(event) => {
            handleAddLike(event);
            increaseLikes();
          }}
          class="btn"
        >
          like
        </button>
        <br></br>
        {blog.user.username}
        <br></br>
      </div>
    </div>
  );
};

export default Blog;