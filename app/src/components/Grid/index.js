import React from "react";

import Cell from "../Cell";
import "./grid.scss";

export default function Grid({ grid, columns, selectCell }) {
  return (
    <div className="grid-container" style={{ width: columns * 18 }}>
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
