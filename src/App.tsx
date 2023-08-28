import React from "react";

import "./App.css";
import MuTable from "./components/MuTable";
import { CharacterProvider } from "./tx/CharacterContext";
import { Toaster } from "react-hot-toast";

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
        <CharacterProvider debug={true}>
          <Toaster />
          <MuTable />
        </CharacterProvider>
      </header>
    </div>
  );
}

export default App;
