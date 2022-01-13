import React, { useState, useEffect } from "react";
import Comment from "../comments/Comment";

function RepliesList({ comment }) {
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    setReplies(comment.replies);
  }, [comment.replies]);

  function removeReply(reply) {
    setReplies(replies.filter((r) => r.id !== reply.id));
  }

  function updateReply(reply) {
    setReplies([...replies.map((r) => (r.id === reply.id ? reply : r))]);
  }

  return (
    <div className="replies">
      {replies.map((reply) => (
        <Comment
          key={reply.id}
          type="reply"
          comment={reply}
          remove={removeReply}
          update={updateReply}
        />
      ))}
    </div>
  );
}

export default RepliesList;
