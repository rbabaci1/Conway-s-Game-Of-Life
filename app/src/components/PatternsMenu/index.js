import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

export default function PatternsMenu() {
  return (
    <FormControl className="patterns-menu">
      <InputLabel id="demo-simple-select-label">PATTERNS EXAMPLES</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        onChange={handleChange}
      >
        <MenuItem value="20_10">20x10</MenuItem>
      </Select>
    </FormControl>
  );
}
