import React from "react";
import Blog from "./Blog";
import { useSelector } from "react-redux";

const Blogs = () => {
  const blogs = useSelector((state) => state);
  console.log(blogs);

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
