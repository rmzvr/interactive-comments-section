import React, { useContext, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import SubmitButton from "../UI/buttons/SubmitButton";
import { UserContext } from "../context";

function CommentForm({ add, btnName }) {
  const { currentUser } = useContext(UserContext);

  const [comment, setComment] = useState({
    content: "",
    createdAt: "",
    id: "",
    replies: [],
    score: 0,
    user: {},
  });

  function addComment(e) {
    e.preventDefault();

    const newComment = {
      ...comment,
      createdAt: Date.now(),
      id: Date.now(),
      user: currentUser,
    };

    add(newComment);

    setComment({
      content: "",
      createdAt: "",
      id: "",
      replies: [],
      score: 0,
      user: {},
    });
  }

  return (
    <form className="commentForm">
      <img
        className="commentForm__avatar"
        src={currentUser.image.png}
        alt="avatar"
      />
      <TextareaAutosize
        className="commentForm__textarea textarea"
        value={comment.content}
        placeholder="Add a comment…"
        onChange={(e) => setComment({ ...comment, content: e.target.value })}
      />
      <SubmitButton content={comment.content} type="submit" submit={addComment}>
        {btnName}
      </SubmitButton>
    </form>
  );
}

export default CommentForm;
