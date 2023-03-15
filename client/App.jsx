import React from "react";
import { BrowserRouter as Switch, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import LBar from "./components/LBar.jsx";
import Basepage from "./components/Basepage.jsx";
import "./stylesheets/styles.css";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Basepage/>} />
        <Route path="/window" element={<LBar/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
      </Routes>
    </div>
  );
}

export default App;
