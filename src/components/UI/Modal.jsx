import React from "react";
import Button from "./Button";

function Modal({ modalVisible, setModalVisible, handleClick }) {
  const classes = ["modal"];
  if (modalVisible) {
    classes.push("active");
  }

  return (
    <div className={classes.join(" ")} onClick={() => setModalVisible(false)}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal__title">Delete comment</h2>
        <p className="modal__text">
          Are you sure you want to delete this comment? This will remove the
          comment and can’t be undone.
        </p>
        <div className="modal__btns">
          <Button
            type="button"
            buttonStyle="btn--success--solid"
            buttonSize="btn--long"
            handleClick={() => {
              setModalVisible(false);
            }}
          >
            NO, CANCEL
          </Button>

          <Button
            type="button"
            buttonStyle="btn--danger--solid"
            buttonSize="btn--long"
            handleClick={() => {
              handleClick();
              setModalVisible(false);
            }}
          >
            YES, DELETE
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Modal;

/* <button
className="modal__btn modal__btn--theme--grass"
type="button"
onClick={() => setModalVisible(false)}
>
NO, CANCEL
</button> */
