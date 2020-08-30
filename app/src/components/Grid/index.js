import React from "react";

import Cell from "../Cell";
import "./grid.scss";

export default function Grid({
  grid,
  columns,
  selectCell,
  running,
  generationDisplayed,
}) {
  return (
    <div className="grid-container" style={{ maxWidth: columns * 17 }}>
      {!running && !generationDisplayed ? (
        <img
          src="https://cdn.pixabay.com/photo/2016/11/08/19/01/sunrise-1809178__480.jpg"
          alt="grid bg"
        />
      ) : undefined}

      {grid.map((row, rowIndex) =>
        row.map((col, colIndex) => (
          <Cell
            cellClass={grid[rowIndex][colIndex] ? "cell alive" : "cell dead"}
            cellId={`${rowIndex}_${colIndex}`}
            key={`${rowIndex}_${colIndex}`}
            row={rowIndex}
            col={colIndex}
            selectCell={selectCell}
          />
        ))
      )}
    </div>
  );
}
