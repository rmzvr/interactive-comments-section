import React, { useContext, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import Button from "../UI/Button";
import { UserContext } from "../context";

function ReplyForm({
  comment,
  replyingTo,
  add,
  btnName,
  setReplyTextareaVisible,
}) {
  const { currentUser } = useContext(UserContext);

  const [reply, setReply] = useState({
    content: "",
    createdAt: "",
    id: "",
    replyingTo: "",
    score: 0,
    user: {},
  });

  function addReply(e) {
    e.preventDefault();

    const newReply = {
      ...reply,
      createdAt: Date.now(),
      id: Date.now(),
      user: currentUser,
      replyingTo,
    };

    add(comment, newReply);
    setReplyTextareaVisible(false);

    setReply({
      content: "",
      createdAt: "",
      id: "",
      replyingTo: "",
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
        value={reply.content}
        placeholder="Add a reply..."
        onChange={(e) => setReply({ ...reply, content: e.target.value })}
      />
      <Button
        type="submit"
        disabled={!(reply.content.length >= 40)}
        buttonSize="btn--large"
        buttonStyle="btn--primary--solid"
        handleClick={addReply}
      >
        {btnName}
      </Button>
    </form>
  );
}

export default ReplyForm;
