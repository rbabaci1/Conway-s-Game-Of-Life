import React, { useState } from "react";

import Button from "../Button";
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
      <Button
        onClick={() => {
          running ? commands.pauseGame() : commands.startGame();
          setRunning(!running);
        }}
        text={running ? "Pause" : "Start"}
      />

      <Button
        onClick={() => {
          commands.clearGame();
          setRunning(false);
        }}
        text="Clear"
      />

      <Button
        onClick={() => {
          commands.generateCells();
          setRunning(true);
        }}
        text="Random"
      />

      <Button onClick={commands.gridSize} text="Size" />

      <select value={value} onChange={handleChange}>
        <option value="20_10">20x10</option>
        <option value="50_30">50x30</option>
        <option value="70_50">70x50</option>
      </select>

      <Button onClick={commands.slow} text="Slow" />
      <Button onClick={commands.fast} text="Fast" />
    </div>
  );
}
