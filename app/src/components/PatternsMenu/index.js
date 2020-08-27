import React, { useState } from "react";

import SelectMenu from "../SelectMenu";

export default function PatternsMenu({ generatePattern }) {
  const [pattern, setPattern] = useState("PATTERNS EXAMPLES");

  const handleChange = e => {
    setPattern(e.target.value);
    generatePattern(e.target.value);
  };

  return (
    <div className="select-menu">
      <SelectMenu
        handleChange={handleChange}
        values={["BLINKER", "TOAD"]}
        value={pattern}
        name="PATTERNS EXAMPLES"
        width="200px"
      />
    </div>
  );
}
