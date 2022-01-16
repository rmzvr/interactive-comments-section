import React, { useEffect, useState, useContext } from "react";
import TextareaAutosize from "react-textarea-autosize";
import getTimeSince from "../Date";
import Button from "../UI/Button";
import Reactions from "../Reactions";
import ReplyForm from "./ReplyForm";
import { UserContext } from "../context";

function Reply({
  comment,
  reply,
  update,
  setModalVisible,
  setSelectedComment,
  setSelectedReply,
  addReply,
}) {
  const { currentUser } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState("");
  const [replyTextareaVisible, setReplyTextareaVisible] = useState(false);

  const classes = ["reply-form"];
  if (replyTextareaVisible) {
    classes.push("active");
  }

  useEffect(() => {
    setContent(reply.content);
  }, [reply.content]);

  function updateReply(e) {
    e.preventDefault();

    const updatedReply = {
      ...reply,
      content,
    };

    update(comment, updatedReply);
    setIsEditing(false);
  }

  return (
    <>
      <div className="comment">
        <Reactions commentUsername={reply.user.username} score={reply.score} />
        <div className="comment__header">
          <img
            className="comment__avatar"
            src={reply.user.image.png}
            alt="avatar"
          />
          <h2 className="comment__username">{reply.user.username}</h2>
          {reply.user.username === currentUser.username ? (
            <div className="comment__owner">You</div>
          ) : null}
          <span className="comment__date">
            {getTimeSince(new Date(parseInt(reply.createdAt, 10)))}
          </span>
          <div className="comment__btns">
            {reply.user.username === currentUser.username ? (
              <>
                <Button
                  type="button"
                  disabled={isEditing}
                  buttonStyle="btn--danger--text"
                  buttonIcon="./images/icon-delete.svg"
                  handleClick={() => {
                    setSelectedComment(comment);
                    setSelectedReply(reply);
                    setModalVisible(true);
                  }}
                >
                  Delete
                </Button>
                <Button
                  type="button"
                  disabled={isEditing}
                  buttonStyle="btn--primary--text"
                  buttonIcon="./images/icon-edit.svg"
                  handleClick={() => {
                    setIsEditing(true);
                  }}
                >
                  Edit
                </Button>
              </>
            ) : (
              <Button
                type="button"
                disabled={replyTextareaVisible}
                buttonStyle="btn--primary--text"
                buttonIcon="./images/icon-reply.svg"
                handleClick={() => setReplyTextareaVisible(true)}
              >
                Reply
              </Button>
            )}
          </div>
        </div>
        <div className="comment__body">
          {isEditing ? (
            <form>
              <TextareaAutosize
                className="textarea"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <Button
                type="submit"
                disabled={!(content.length >= 40)}
                buttonSize="btn--large"
                buttonStyle="btn--primary--solid"
                handleClick={updateReply}
              >
                Update
              </Button>
            </form>
          ) : (
            <p>
              <span className="comment__replyingTo">{`@${reply.replyingTo} `}</span>
              {reply.content}
            </p>
          )}
        </div>
      </div>
      <div className={classes.join(" ")}>
        <ReplyForm
          setReplyTextareaVisible={setReplyTextareaVisible}
          comment={comment}
          replyingTo={reply.user.username}
          add={addReply}
          btnName="Reply"
        />
      </div>
    </>
  );
}

export default Reply;
