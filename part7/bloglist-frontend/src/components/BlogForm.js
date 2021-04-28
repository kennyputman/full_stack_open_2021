import { Button, TextField } from "@material-ui/core";
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
          <TextField
            id="title"
            type="text"
            name="title"
            fullWidth
            required
            value={title}
            onChange={setTitle}
          ></TextField>
        </div>
        <div>
          author:
          <TextField
            id="author"
            type="text"
            name="author"
            fullWidth
            required
            value={author}
            onChange={setAuthor}
          ></TextField>
        </div>
        <div>
          url:
          <TextField
            id="url"
            type="text"
            name="url"
            fullWidth
            required
            value={url}
            onChange={setUrl}
          ></TextField>
        </div>
        <Button id="submitBlog" type="submit" className="btn submit">
          create
        </Button>
      </form>
    </div>
  );
};

export default BlogForm;
