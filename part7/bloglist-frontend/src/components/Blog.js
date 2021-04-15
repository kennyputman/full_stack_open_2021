import React, { useState } from "react";

const Blog = ({ blog, handleDeleteBlog, handleAddLike }) => {
  const [visible, setVisible] = useState(false);

  // >>>>>>> this should lifted up

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

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
        Likes: {blog.likes}
        <button onClick={() => handleAddLike(blog)} className="btn like">
          like
        </button>
        <br></br>
        {blog.user.username}
        <br></br>
        <button onClick={() => handleDeleteBlog(blog)} className="btn delete">
          delete
        </button>
      </div>
    </div>
  );
};

export default Blog;
