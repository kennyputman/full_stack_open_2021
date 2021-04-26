import { Button } from "@material-ui/core";
import React from "react";

const CommentForm = ({ handleAddComment, content, setContent }) => {
  return (
    <div>
      <h2>Add A Comment</h2>
      <form onSubmit={handleAddComment} className="newComment">
        <div>
          <input
            id="content"
            type="text"
            name="content"
            value={content}
            onChange={setContent}
          ></input>
        </div>
        <Button
          variant="outlined"
          color="primary"
          size="small"
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
