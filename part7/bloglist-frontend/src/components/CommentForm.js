import { Button, Paper, TextField } from "@material-ui/core";
import React from "react";

const CommentForm = ({ handleAddComment, content, setContent }) => {
  return (
    <div>
      <h2>Add A Comment</h2>
      <form onSubmit={handleAddComment} className="newComment">
        <div>
          <TextField
            id="content"
            type="text"
            name="content"
            component={Paper}
            value={content}
            onChange={setContent}
          ></TextField>
        </div>
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ margin: "8px" }}
          id="submitComment"
          type="submit"
        >
          create
        </Button>
      </form>
    </div>
  );
};

export default CommentForm;
