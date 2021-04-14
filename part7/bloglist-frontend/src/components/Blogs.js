import React from "react";
import Blog from "./Blog";

const Blogs = ({ blogs }) => {
  return (
    <div id="blogs">
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            // handleDeleteBlog={handleDeleteBlog}
            // handleAddLike={handleAddLike}
          ></Blog>
        ))}
    </div>
  );
};

export default Blogs;
