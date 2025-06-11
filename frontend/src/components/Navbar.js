import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-warning">
    <div className="container">
      <Link className="navbar-brand" to="/">Smart Recipe</Link>
      <div>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link" to="/recetas">Recetas</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/perfil">Perfil</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);
