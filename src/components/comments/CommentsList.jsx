import React, { useState, useEffect } from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import CommentService from "../API/CommentService";
import Reply from "../replies/Reply";
import Modal from "../UI/Modal";

function Comments() {
  const [comments, setComments] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedComment, setSelectedComment] = useState({});
  const [selectedReply, setSelectedReply] = useState({});

  async function fetchComments() {
    const fetchedComments = await CommentService.getAll();
    setComments(fetchedComments);
  }

  useEffect(() => {
    fetchComments();
  }, []);

  function addComment(newComment) {
    setComments([...comments, newComment]);
  }

  function removeComment(comment, reply) {
    if (Object.keys(reply).length !== 0) {
      setComments([
        ...comments.map((c) =>
          c.id === comment.id
            ? {
                ...comment,
                replies: comment.replies.filter((r) => r.id !== reply.id),
              }
            : c
        ),
      ]);
    } else {
      setComments(comments.filter((c) => c.id !== comment.id));
    }
  }

  function updateComment(comment, reply) {
    if (Object.keys(reply).length !== 0) {
      setComments([
        ...comments.map((c) =>
          c.id === comment.id
            ? {
                ...comment,
                replies: comment.replies.map((r) =>
                  r.id === reply.id ? reply : r
                ),
              }
            : c
        ),
      ]);
    } else {
      setComments([
        ...comments.map((c) => (c.id === comment.id ? comment : c)),
      ]);
    }
  }

  function addReply(comment, reply) {
    setComments([
      ...comments.map((c) =>
        c.id === comment.id
          ? {
              ...comment,
              replies: [...comment.replies, reply],
            }
          : c
      ),
    ]);
  }

  return (
    <>
      <Modal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleClick={() => {
          removeComment(selectedComment, selectedReply);
          setSelectedComment({});
          setSelectedReply({});
        }}
      />
      <ul className="comments">
        {comments.map((comment) => (
          <li className="comment-wrapper" key={comment.id}>
            <Comment
              comment={comment}
              setModalVisible={setModalVisible}
              setSelectedComment={setSelectedComment}
              update={updateComment}
              addReply={addReply}
            />

            {comment.replies.length > 0 ? (
              <ul className="replies">
                {comment.replies.map((reply) => (
                  <li className="comment-wrapper" key={reply.id}>
                    <Reply
                      comment={comment}
                      reply={reply}
                      addReply={addReply}
                      setModalVisible={setModalVisible}
                      setSelectedComment={setSelectedComment}
                      setSelectedReply={setSelectedReply}
                      update={updateComment}
                    />
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
        <CommentForm add={addComment} btnName="Send" />
      </ul>
    </>
  );
}

export default Comments;
