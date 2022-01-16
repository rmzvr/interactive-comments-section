import React, { useContext, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import Button from "../UI/Button";
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
    <form className="comment-form">
      <img
        className="comment-form__avatar"
        src={currentUser.image.png}
        alt="avatar"
      />
      <TextareaAutosize
        className="comment-form__textarea textarea"
        value={comment.content}
        placeholder="Add a comment…"
        onChange={(e) => setComment({ ...comment, content: e.target.value })}
      />
      <Button
        type="submit"
        disabled={!(comment.content.length >= 40)}
        buttonSize="btn--large"
        buttonStyle="btn--primary--solid"
        handleClick={addComment}
      >
        {btnName}
      </Button>
    </form>
  );
}

export default CommentForm;
