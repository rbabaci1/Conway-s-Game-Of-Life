import React from "react";

import Cell from "../Cell";
import "./grid.scss";

export default function Grid({ grid, columns, selectCell }) {
  let cellClass = "";

  let rowsList = grid.map((row, rowIndex) =>
    row.map((col, colIndex) => {
      cellClass = grid[rowIndex][colIndex] ? "cell alive" : "cell dead";

      return (
        <Cell
          cellClass={cellClass}
          cellId={`${rowIndex}_${colIndex}`}
          key={`${rowIndex}_${colIndex}`}
          row={rowIndex}
          col={colIndex}
          selectCell={selectCell}
        />
      );
    })
  );

  return (
    <div className="grid-container" style={{ width: columns * 16 }}>
      {rowsList}
    </div>
  );
}
