import React from "react";
import Blog from "./Blog";

const Blogs = ({ blogs }) => {
  return (
    <div>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog}></Blog>
        ))}
    </div>
  );
};

export default Blogs;
