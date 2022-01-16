import React, { useContext, useEffect, useState } from "react";
import Button from "./UI/Button";
import { UserContext } from "./context";

function Reactions({ commentUsername, score }) {
  const [counter, setCounter] = useState(0);
  const { currentUser } = useContext(UserContext);
  const currentUsername = currentUser.username;

  useEffect(() => {
    setCounter(score);
  }, [score]);

  function increment() {
    if (
      commentUsername !== currentUsername &&
      (counter === score || counter === score - 1)
    ) {
      setCounter(counter + 1);
    }
  }

  function decrement() {
    if (
      commentUsername !== currentUsername &&
      (counter === score || counter === score + 1)
    ) {
      setCounter(counter - 1);
    }
  }

  return (
    <div className="comment__score">
      <Button
        type="button"
        buttonStyle="btn--neutral--icon"
        buttonIcon="./images/icon-plus.svg"
        handleClick={increment}
      />
      <span className="comment__score-counter">{counter}</span>
      <Button
        type="button"
        buttonStyle="btn--neutral--icon"
        buttonIcon="./images/icon-minus.svg"
        handleClick={decrement}
      />
    </div>
  );
}

export default Reactions;
