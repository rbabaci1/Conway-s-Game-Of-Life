import React from "react";

import Button from "@material-ui/core/Button";

export default function Button({ onClick, text }) {
  return <Button onClick={onClick}>{text}</Button>;
}
