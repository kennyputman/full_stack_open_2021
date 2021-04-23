import React from "react";

function CommentList({ comments }) {
  return (
    <div>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
    </div>
  );
}

export default CommentList;
