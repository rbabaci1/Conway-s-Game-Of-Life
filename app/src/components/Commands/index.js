import React, { useState } from "react";

import "./commands.scss";

import Button from "@material-ui/core/Button";

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
      <Button
        variant="contained"
        onClick={() => {
          running ? commands.pauseGame() : commands.startGame();
          setRunning(!running);
        }}
      >
        {running ? "Pause" : "Start"}
      </Button>

      <Button
        variant="contained"
        onClick={() => {
          commands.clearGame();
          setRunning(false);
        }}
      >
        Clear
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          commands.generateCells();
          setRunning(true);
        }}
      >
        Random
      </Button>
      <Button variant="contained" onClick={commands.gridSize}>
        Size
      </Button>

      <select value={value} onChange={handleChange}>
        <option value="20_10">20x10</option>
        <option value="50_30">50x30</option>
        <option value="70_50">70x50</option>
      </select>

      <Button variant="contained" onClick={commands.slow}>
        Slow
      </Button>
      <Button variant="contained" onClick={commands.fast}>
        Fast
      </Button>
    </div>
  );
}
