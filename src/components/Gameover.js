import React, { useContext } from "react";
import { AppContext } from "../App";

const Gameover = () => {
  const { gameOver, currAtt, correctWord } = useContext(AppContext);
  return (
    <div className="gameOver">
      <h3>{gameOver.guessedWord ? " You Guessed Correctly" : " You Missed"}</h3>
      <h1>Correct: {correctWord}</h1>
      {gameOver.guessedWord && (
        <h3>You guessed in {currAtt.attempt} attempts</h3>
      )}
    </div>
  );
};

export default Gameover;
