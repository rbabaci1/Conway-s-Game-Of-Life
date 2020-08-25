import React, { useState } from "react";

import Grid from "./components/Grid";
import "./App.scss";

function App() {
  const [generation, setGeneration] = useState(0);

  return (
    <div className="App">
      <h1>Game Of Life!</h1>
      <h2>Generations: {generation}</h2>
      <Grid />
    </div>
  );
}

export default App;
