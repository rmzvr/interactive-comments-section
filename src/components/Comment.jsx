import React from "react";
import Reactions from "./Reactions";
import ReplyButton from "./UI/buttons/ReplyButton";

function Comment({ comment }) {
  return (
    <div className="comment">
      <Reactions score={comment.score} />
      <div className="comment__header">
        <img className="comment__avatar" src={comment.user.image.png} alt="avatar" />
        <h2 className="comment__username">{comment.user.username}</h2>
        <span className="comment__date">{comment.createdAt}</span>
        <ReplyButton />
      </div>
      <div className="comment__body">
        <p>{comment.content}</p>
      </div>
    </div>
  );
}

export default Comment;
