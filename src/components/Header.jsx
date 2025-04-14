import React from 'react';
import './styles.css';  // Make sure to import your CSS file

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <h1>Library Manager</h1>
      </div>
      <nav>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#books">Books</a></li>
          <li><a href="#add-book">Add Book</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
