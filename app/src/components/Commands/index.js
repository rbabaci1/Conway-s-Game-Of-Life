import React, { useState } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

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

      <FormControl className="select-form">
        <InputLabel id="demo-simple-select-label">SIZE</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          onChange={handleChange}
        >
          <MenuItem value="20_10">20x10</MenuItem>
          <MenuItem value="50_30">50x30</MenuItem>
          <MenuItem value="70_50">70x50</MenuItem>
        </Select>
      </FormControl>

      {/* <Button onClick={commands.slow} text="Slow" />
      <Button onClick={commands.fast} text="Fast" /> */}
      <Button
        onClick={() => {
          if (!running) {
            commands.showGenerations();
          }
        }}
        text="Cell Generations"
      />

      <SpeedSlider />
    </div>
  );
}
