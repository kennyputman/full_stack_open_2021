import { Button, Paper, TextField } from "@material-ui/core";
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
            component={Paper}
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
            component={Paper}
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
            component={Paper}
            fullWidth
            required
            value={url}
            onChange={setUrl}
          ></TextField>
        </div>
        <Button
          id="submitBlog"
          type="submit"
          variant="contained"
          color="primary"
          style={{ margin: "10px" }}
        >
          create
        </Button>
      </form>
    </div>
  );
};

export default BlogForm;
