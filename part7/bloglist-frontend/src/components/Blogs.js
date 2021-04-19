import React from "react";
import Blog from "./Blog";
import { useDispatch, useSelector } from "react-redux";

import { deleteBlog, likeBlog } from "../reducers/blogReducer";

const Blogs = () => {
  const dispatch = useDispatch();

  const blogs = useSelector(({ blogs }) => blogs);
  console.log(blogs);

  const handleDeleteBlog = async (targetBlog) => {
    try {
      const result = window.confirm(`Remove blog ${targetBlog.title}`);
      if (result) {
        dispatch(deleteBlog(targetBlog.id));
      }
    } catch (exception) {
      console.log(`blog delete button failed: ${exception}`);
    }
  };

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

  return (
    <div id="blogs">
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleDeleteBlog={handleDeleteBlog}
            handleAddLike={handleAddLike}
          ></Blog>
        ))}
    </div>
  );
};

export default Blogs;
