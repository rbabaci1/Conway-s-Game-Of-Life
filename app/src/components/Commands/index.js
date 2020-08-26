import React, { useState } from "react";

import "./commands.scss";

export default function Commands(commands) {
  const [value, setValue] = useState("50_30");
  const [running, setRunning] = useState(false);

  const handleChange = e => {
    const [cols, rows] = e.target.value.split("_");
    commands.setGridSize(Number(cols), Number(rows));
    setValue(e.target.value);
  };

  return (
    <div className="commands">
      <button
        onClick={() => {
          running ? commands.pauseGame() : commands.startGame();
          setRunning(!running);
        }}
      >
        {running ? "Pause" : "Start"}
      </button>

      <button onClick={commands.clearGame}>Clear</button>
      <button onClick={commands.generateCells}>Generate</button>

      <button onClick={commands.gridSize}>Size</button>

      <select value={value} onChange={handleChange}>
        <option value="20_10">20x10</option>
        <option value="50_30">50x30</option>
        <option value="70_50">70x50</option>
      </select>

      <button onClick={commands.slow}>Slow</button>
      <button onClick={commands.fast}>Fast</button>
    </div>
  );
}
