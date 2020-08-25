import React from "react";

import Cell from "../Cell";
import "./grid.scss";

export default function Grid({ fullGrid, columns, selectCell }) {
  let cellClass = "";

  let rowsList = fullGrid.map((row, rowIndex) =>
    row.map((col, colIndex) => {
      cellClass = fullGrid[rowIndex][colIndex] ? "cell alive" : "cell dead";

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
