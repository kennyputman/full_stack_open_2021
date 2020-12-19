import React from "react";

const BlogForm = ({
  handleAddBlog,
  title,
  author,
  url,
  setTitle,
  setAuthor,
  setUrl,
}) => {
  return (
    <div>
      <h2>Create a New Blog</h2>
      <form onSubmit={handleAddBlog}>
        <div>
          title:
          <input
            type="text"
            name="title"
            value={title}
            onChange={setTitle}
          ></input>
        </div>
        <div>
          author:
          <input
            type="text"
            name="author"
            value={author}
            onChange={setAuthor}
          ></input>
        </div>
        <div>
          url:
          <input type="text" name="url" value={url} onChange={setUrl}></input>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
