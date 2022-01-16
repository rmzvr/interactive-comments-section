import React from "react";

const styles = [
  "btn--primary--solid",
  "btn--primary--text",
  "btn--danger--text",
  "btn--neutral--icon",
  "btn--danger--solid",
  "btn--success--solid",
];
const sizes = ["btn--large", "btn--long"];

function Button({
  children,
  handleClick,
  buttonStyle,
  buttonSize,
  buttonIcon,
  disabled,
  ...attrs
}) {
  const checkButtonStyle = styles.includes(buttonStyle) ? buttonStyle : "";
  const checkButtonSize = sizes.includes(buttonSize) ? buttonSize : "";

  return (
    // eslint-disable-next-line react/button-has-type
    <button
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...attrs}
      className={`btn ${checkButtonStyle} ${checkButtonSize}`}
      disabled={disabled}
      onClick={(e) => handleClick(e)}
    >
      {buttonIcon && <img className="btn__icon" src={buttonIcon} alt="btn" />}
      <span className="btn__text">{children}</span>
    </button>
  );
}

export default Button;
