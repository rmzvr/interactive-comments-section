import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./context";
import { IncrementButton, DecrementButton } from "./UI/buttons/ReactionButtons";

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
      <IncrementButton increment={increment} />
      <span className="comment__score-counter">{counter}</span>
      <DecrementButton decrement={decrement} />
    </div>
  );
}

export default Reactions;
