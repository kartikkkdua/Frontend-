import React from 'react';
import '../components/styles/page.css';

function About() {
  return (
    <div className="info-container">
      <h2 className="info-title">About the Library Management System</h2>
      <p className="info-text">
        Our Library Management System at UPES  offers an efficient platform for managing academic resources. Whether you're a student looking to borrow books or a faculty member managing library records, this system is built to streamline your experience.
      </p>
      <p className="info-text">
        With features like real-time availability, issue tracking, and user-friendly interfaces, we aim to modernize and simplify library interactions for everyone at the university.
      </p>
    </div>
  );
}

export default About;
