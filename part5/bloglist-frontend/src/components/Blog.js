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

  const handleDeleteBlog = async (event) => {
    event.preventDefault();
    console.log("deleting", blog.id);

    try {
      const result = window.confirm(`Remove blog ${blog.title}`);
      if (result) {
        blogService.remove(blog.id);
      }
    } catch (exception) {
      console.log(`blog delete button failed: ${exception}`);
    }
  };

  const increaseLikes = () => setLikes(likes + 1);

  return (
    <div className="blog">
      <div className="blogHeader">
        {blog.title}: <br></br>
        by {blog.author}
      </div>

      <div className="toggleVisibility">
        <button
          onClick={toggleVisibility}
          className="btn view"
          style={hideWhenVisible}
        >
          view
        </button>
        <button
          onClick={toggleVisibility}
          className="btn hide"
          style={showWhenVisible}
        >
          hide
        </button>
      </div>

      <div style={showWhenVisible} className="extraInfo">
        {blog.url}
        <br></br>
        Likes: {likes}
        <button
          onClick={(event) => {
            console.log("hello");
            handleAddLike(event);
            increaseLikes();
          }}
          className="btn"
        >
          like
        </button>
        <br></br>
        {blog.user.username}
        <br></br>
        <button
          onClick={(event) => {
            handleDeleteBlog(event);
          }}
          className="btn"
        >
          delete
        </button>
      </div>
    </div>
  );
};

export default Blog;
