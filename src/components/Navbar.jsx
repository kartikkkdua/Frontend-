
import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Navbar.css';  // Linking to the corresponding CSS

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" className="navbar-logo-link">
          <h1>XYZ University</h1>
        </Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className="navbar-link">Home</Link>
        <Link to="/about" className="navbar-link">About</Link>
        <Link to="/help" className="navbar-link">Help</Link>
        <Link to="/contact" className="navbar-link">Contact</Link>
      </div>
    </nav>
  );
}