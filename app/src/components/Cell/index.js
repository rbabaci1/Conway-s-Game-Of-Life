import React from "react";

import "./cell.scss";

export default function Cell({ cellClass, cellId, row, col, selectCell }) {
  return (
    <div
      className={cellClass}
      id={cellId}
      onClick={() => selectCell(row, col)}
    ></div>
  );
}
