// components/Footer.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Footer.css';

export default function Footer() {
  return (
    <footer className="main-footer">
      <p>&copy; {new Date().getFullYear()} UPES Library Management System</p>
      <div className="footer-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/help">Help</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </footer>
  );
}
