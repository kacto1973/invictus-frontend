import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Equipment from "./views/Equipment";
import Inventory from "./views/Inventory";
import Configuration from "./views/Configuration";
import Reports from "./views/Reports";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/equipment" element={<Equipment />} />
          <Route path="/configuration" element={<Configuration />} />
          <Route path="/reports" element={<Reports />} />
          
        </Routes>
      </Router>
    </>
  );
}

export default App;
