import React, { useState } from "react";
const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };
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
        Likes: {blog.likes}
        <button class="btn">like</button>
        <br></br>
        {blog.user.username}
        <br></br>
      </div>
    </div>
  );
};

export default Blog;
