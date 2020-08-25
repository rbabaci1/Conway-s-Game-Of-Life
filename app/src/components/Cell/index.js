import React from "react";

import "./cell.scss";

export default function Cell({ cellClass, cellId, row, col, selectCell }) {
  return (
    <div
      className={cellClass}
      id={cellId}
      onClick={e => selectCell(row, col)}
    ></div>
  );
}
