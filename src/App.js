import "./App.css";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import { createContext, useEffect, useState } from "react";
import { boardDefault, generateWordsSet, todaysWord } from "./components/Words";
import Gameover from "./components/Gameover";

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAtt, setCurrAtt] = useState({ attempt: 0, letterPos: 0 });
  const [wordSet, setWordSet] = useState(new Set());
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [gameOver, setGameOver] = useState({
    guessedWord: false,
    gameOver: false,
  });
  const [correctWord, setCorrectWord] = useState("");

  useEffect(() => {
    generateWordsSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord);
    });
  }, []);

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

    let currWord = "";
    for (let i = 0; i < 5; i++) {
      currWord += board[currAtt.attempt][i];
    }

    if (wordSet.has(currWord.toLowerCase())) {
      setCurrAtt({ attempt: currAtt.attempt + 1, letterPos: 0 });
    } else {
      alert("Wrong word");
    }

    if (currWord === correctWord) {
      setGameOver({ guessedWord: true, gameOver: true });
      return;
    }

    if (currAtt.attempt === 5) {
      setGameOver({ gameOver: true, guessedWord: false });
    }
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
          setDisabledLetters,
          disabledLetters,
          gameOver,
          setGameOver,
        }}
      >
        <div className="game">
          <Board />
          {gameOver.gameOver ? <Gameover /> : <Keyboard />}
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
