import React from "react";

import "./commands.scss";

export default function Commands(features) {
  return (
    <div className="commands">
      <button onClick={features.playGame}>Play</button>
      <button onClick={features.pauseGame}>Pause</button>
      <button onClick={features.clearGame}>Clear</button>
      <button onClick={features.generateCells}>Generate</button>
      <button onClick={features.gridSize}>Size</button>
      <button onClick={features.slow}>Slow</button>
      <button onClick={features.fast}>Fast</button>
    </div>
  );
}
