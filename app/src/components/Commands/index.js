import React, { useState } from "react";

import "./commands.scss";

export default function Commands(features) {
  const [value, setValue] = useState("50_30");

  const handleChange = e => {
    const [cols, rows] = e.target.value.split("_");
    features.setGridSize(Number(cols), Number(rows));
    setValue(e.target.value);
  };

  return (
    <div className="commands">
      <button onClick={features.playGame}>Play</button>
      <button onClick={features.pauseGame}>Pause</button>
      <button onClick={features.clearGame}>Clear</button>
      <button onClick={features.generateCells}>Generate</button>

      <button onClick={features.gridSize}>Size</button>

      <select value={value} onChange={handleChange}>
        <option value="20_10">20x10</option>
        <option value="50_30">50x30</option>
        <option value="70_50">70x50</option>
      </select>

      <button onClick={features.slow}>Slow</button>
      <button onClick={features.fast}>Fast</button>
    </div>
  );
}
