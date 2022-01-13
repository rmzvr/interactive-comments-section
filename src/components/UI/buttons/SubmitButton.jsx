import React from "react";

function SubmitButton({ children, submit, content }) {
  return (
    <button
      className="btn-submit"
      type="submit"
      disabled={content.length >= 60 ? false : true}
      onClick={(e) => submit(e)}
    >
      {children}
    </button>
  );
}

export default SubmitButton;
