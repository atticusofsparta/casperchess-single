import { Outlet, Link } from "react-router-dom";
import React from "react"
import '../style.css';

const Layout = () => {
  return (
    <ul className="navbar-nav me-auto">
      <li className="nav-item">   
        <Link to="/" className="nav-link">Home</Link>
        </li>
     
      <li className="nav-item">
        <Link to="/Game" className="nav-link">Game</Link>
      </li>
      </ul>
    
  );
};

export default Layout;