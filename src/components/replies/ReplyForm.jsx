import React, { useContext, useState } from "react";
import { UserContext } from "../context";
import SubmitButton from "../UI/buttons/SubmitButton";
import TextareaAutosize from "react-textarea-autosize";

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
      replyingTo: replyingTo,
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
    <form className="commentForm">
      <img
        className="commentForm__avatar"
        src={currentUser.image.png}
        alt="avatar"
      />
      <TextareaAutosize
        className="commentForm__textarea textarea"
        value={reply.content}
        placeholder="Add a reply..."
        onChange={(e) => setReply({ ...reply, content: e.target.value })}
      />
      <SubmitButton
        type="submit"
        submit={addReply}
        content={reply.content}
      >
        {btnName}
      </SubmitButton>
    </form>
  );
}

export default ReplyForm;
