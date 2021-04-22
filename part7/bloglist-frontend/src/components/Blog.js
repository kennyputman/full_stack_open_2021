import React from "react";
import { likeBlog } from "../reducers/blogReducer";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

const Blog = () => {
  const id = useParams().id;
  const blogs = useSelector(({ blogs }) => blogs);
  const blog = blogs.find((b) => b.id === id);

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
        <br></br>
        Likes: {blog.likes}
        <button onClick={() => handleAddLike(blog)} className="btn like">
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
