import React, { useEffect, useState } from "react";
import { IncrementButton, DecrementButton } from "./UI/buttons/ReactionsButtons";

function Reactions({ score }) {
  const [ counter, setCounter ] = useState(0);

  useEffect(() => {
    setCounter(score);
  }, [score]);

  function increment() {
    setCounter(counter + 1);
  }

  function decrement() {
    setCounter(counter - 1);
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
