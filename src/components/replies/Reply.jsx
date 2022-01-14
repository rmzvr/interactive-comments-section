import React, { useEffect, useState, useContext } from "react";
import TextareaAutosize from "react-textarea-autosize";

import getTimeSince from "../Date";
import Reactions from "../Reactions";
import {
  RemoveButton,
  ReplyButton,
  EditButton,
} from "../UI/buttons/CommentButtons";
import SubmitButton from "../UI/buttons/SubmitButton";
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

  const classes = ["reply-textarea"];
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
                <RemoveButton
                  isEditing={isEditing}
                  remove={() => {
                    setSelectedComment(comment);
                    setSelectedReply(reply);
                    setModalVisible(true);
                  }}
                >
                  Delete
                </RemoveButton>
                <EditButton
                  isEditing={isEditing}
                  edit={() => setIsEditing(true)}
                >
                  Edit
                </EditButton>
              </>
            ) : (
              <ReplyButton
                replyTextareaVisible={replyTextareaVisible}
                reply={() => setReplyTextareaVisible(true)}
              >
                Reply
              </ReplyButton>
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
              <SubmitButton
                content={content}
                type="submit"
                submit={updateReply}
              >
                Update
              </SubmitButton>
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
