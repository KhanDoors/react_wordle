import "./App.css";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import { createContext, useState } from "react";
import { boardDefault } from "./components/Words";

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAtt, setCurrAtt] = useState({ attempt: 0, letterPos: 0 });

  const correctWord = "RIGHT";

  const onSelectLetter = (key) => {
    if (currAtt.letterPos > 4) return;
    const newBoard = [...board];
    newBoard[currAtt.attempt][currAtt.letterPos] = key;
    setBoard(newBoard);
    setCurrAtt({ attempt: currAtt.attempt, letterPos: currAtt.letterPos + 1 });
  };

  const onDelete = () => {
    if (currAtt.letterPos === 0) return;
    const newBoard = [...board];
    newBoard[currAtt.attempt][currAtt.letterPos - 1] = "";
    setBoard(newBoard);
    setCurrAtt({ ...currAtt, letterPos: currAtt.letterPos - 1 });
  };

  const onEnter = () => {
    if (currAtt.letterPos !== 5) return;
    setCurrAtt({ attempt: currAtt.attempt + 1, letterPos: 0 });
  };

  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>
      <AppContext.Provider
        value={{
          board,
          setBoard,
          currAtt,
          setCurrAtt,
          onSelectLetter,
          onDelete,
          onEnter,
          correctWord,
        }}
      >
        <div className="game">
          <Board />
          <Keyboard />
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
