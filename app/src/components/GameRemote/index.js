import React, { useState } from "react";

import SelectMenu from "../SelectMenu";
import Button from "../Button";
import SpeedSlider from "../SpeedSlider";
import "./gameRemote.scss";

export default function Commands(commands) {
  const [value, setValue] = useState("GRID SIZE");

  const handleChange = e => {
    const [cols, rows] = e.target.value.split("_");
    commands.setGridSize(Number(cols), Number(rows));
    setValue(e.target.value);
  };

  return (
    <div className="commands">
      <Button
        onClick={() => {
          commands.running ? commands.pauseGame() : commands.startGame();
        }}
        text={commands.running ? "Pause" : "Start"}
      />

      <Button onClick={commands.clearGame} text="Clear" />

      <Button onClick={commands.generateCells} text="Random" />

      <Button
        onClick={() => {
          if (!commands.running) {
            commands.showGenerations();
          }
        }}
        text="Cell Generations"
      />

      {commands.windowWidth >= 900 ? (
        <SelectMenu
          handleChange={handleChange}
          values={["50_30", "70_50", "20_10"]}
          value={value}
          separator="x"
        />
      ) : undefined}

      <SpeedSlider
        updateSpeed={commands.updateSpeed}
        running={commands.running}
      />
    </div>
  );
}
