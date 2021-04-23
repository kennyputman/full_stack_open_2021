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
        <button id="submitComment" type="submit" className="btn submit">
          create
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
