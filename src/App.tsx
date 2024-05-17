import "./App.css";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Grid from "./components/Grid";

function App() {
  const difficultyParams = {
    easy: [9, 9, 10],
    medium: [16, 16, 40],
    hard: [16, 30, 99],
  };
  const [gridParams, setGridParams] = useState(difficultyParams["easy"]);
  const [difficulty, setDifficulty] = useState("easy");
  // const [grid, setGrid] = useState(<Grid width={9} height={9} bombs={10} />);
  const [key, setKey] = useState(0);

  function newGame() {
    // setGrid(
    //   <Grid width={curParams[1]} height={curParams[0]} bombs={curParams[2]} />
    // );
    setGridParams(difficultyParams[difficulty]);
    setKey((prevKey) => prevKey + 1);
  }

  return (
    <div>
      <Navbar />
      <label>
        Select a Difficulty:
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </label>
      <button onClick={() => newGame()}>New Game</button>
      <Grid
        key={key}
        width={gridParams[1]}
        height={gridParams[0]}
        bombs={gridParams[2]}
      />
    </div>
  );
}

export default App;
