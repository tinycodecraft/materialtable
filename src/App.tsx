import React from "react";

import "./App.css";
import MuTable from "./components/MuTable";
import { CharacterProvider } from "./tx/CharacterContext";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <CharacterProvider>
          <MuTable />
        </CharacterProvider>
      </header>
    </div>
  );
}

export default App;
