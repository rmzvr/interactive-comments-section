import React, { useEffect, useState, useContext } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { UserContext } from "../context";
import getTimeSince from "../Date";
import Reactions from "../Reactions";

import {
  RemoveButton,
  ReplyButton,
  EditButton,
} from "../UI/buttons/CommentButtons";
import SubmitButton from "../UI/buttons/SubmitButton";
import ReplyForm from "../replies/ReplyForm";

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

  const classes = ["reply-textarea"];
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
                <RemoveButton
                  isEditing={isEditing}
                  remove={() => {
                    setSelectedComment(comment);
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
                submit={updateComment}
              >
                Update
              </SubmitButton>
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
