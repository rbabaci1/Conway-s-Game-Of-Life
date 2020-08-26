import React from "react";

import Button from "@material-ui/core/Button";

export default function Btn({ onClick, text }) {
  return (
    <Button variant="contained" onClick={onClick}>
      {text}
    </Button>
  );
}
