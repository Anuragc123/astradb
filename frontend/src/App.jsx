import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Welcome from "./components/Welcome";
import Analytics from "./components/Analytics";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/analysis" element={<Analytics />} />
      </Routes>
    </Router>
  );
}

export default App;
