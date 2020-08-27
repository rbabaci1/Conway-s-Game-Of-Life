import React, { useState } from "react";

import SelectMenu from "../SelectMenu";
import Button from "../Button";
import SpeedSlider from "../SpeedSlider";
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

      <SelectMenu
        handleChange={handleChange}
        values={["50_30", "70_50", "20_10"]}
        value={value}
      />

      <Button
        onClick={() => {
          if (!running) {
            commands.showGenerations();
          }
        }}
        text="Cell Generations"
      />

      <SpeedSlider updateSpeed={commands.updateSpeed} running={running} />
    </div>
  );
}
