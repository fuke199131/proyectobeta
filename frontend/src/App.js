import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Recetas } from "./components/Recetas";
import Home from "./components/Home";
import { Perfil } from "./components/Perfil";
import { Navbar } from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recetas" element={<Recetas />} />
          <Route path="/perfil" element={<Perfil />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;