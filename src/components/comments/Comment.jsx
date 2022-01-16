import React, { useEffect, useState, useContext } from "react";
import TextareaAutosize from "react-textarea-autosize";
import getTimeSince from "../Date";
import Button from "../UI/Button";
import Reactions from "../Reactions";
import ReplyForm from "../replies/ReplyForm";

import { UserContext } from "../context";

function Comment({
  comment,
  update,
  setModalVisible,
  setSelectedComment,
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
    setContent(comment.content);
  }, [comment.content]);

  function updateComment(e) {
    e.preventDefault();

    const updatedComment = {
      ...comment,
      content,
    };

    update(updatedComment, {});
    setIsEditing(false);
  }

  return (
    <>
      <div className="comment">
        <Reactions
          commentUsername={comment.user.username}
          score={comment.score}
        />
        <div className="comment__header">
          <img
            className="comment__avatar"
            src={comment.user.image.png}
            alt="avatar"
          />
          <h2 className="comment__username">{comment.user.username}</h2>
          {comment.user.username === currentUser.username ? (
            <div className="comment__owner">You</div>
          ) : null}
          <span className="comment__date">
            {getTimeSince(new Date(parseInt(comment.createdAt, 10)))}
          </span>
          <div className="comment__btns">
            {comment.user.username === currentUser.username ? (
              <>
                <Button
                  type="button"
                  disabled={isEditing}
                  buttonStyle="btn--danger--text"
                  buttonIcon="./images/icon-delete.svg"
                  handleClick={() => {
                    setSelectedComment(comment);
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
                disabled={!(comment.content.length >= 40)}
                buttonSize="btn--large"
                buttonStyle="btn--primary--solid"
                handleClick={updateComment}
              >
                Update
              </Button>
            </form>
          ) : (
            <p>{comment.content}</p>
          )}
        </div>
      </div>
      <div className={classes.join(" ")}>
        <ReplyForm
          setReplyTextareaVisible={setReplyTextareaVisible}
          comment={comment}
          replyingTo={comment.user.username}
          add={addReply}
          btnName="Reply"
        />
      </div>
    </>
  );
}

export default Comment;
