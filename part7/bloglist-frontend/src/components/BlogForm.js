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
      <form onSubmit={handleAddBlog} className="newBlog">
        <div>
          title:
          <input
            id="title"
            type="text"
            name="title"
            value={title}
            onChange={setTitle}
          ></input>
        </div>
        <div>
          author:
          <input
            id="author"
            type="text"
            name="author"
            value={author}
            onChange={setAuthor}
          ></input>
        </div>
        <div>
          url:
          <input
            id="url"
            type="text"
            name="url"
            value={url}
            onChange={setUrl}
          ></input>
        </div>
        <button id="submitBlog" type="submit" className="btn submit">
          create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
