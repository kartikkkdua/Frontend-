import React from 'react';
import '../components/styles/page.css';
export default function Help() {
  return (
    <div className="info-container">
      <h2 className="info-title">Help & Support</h2>
      <p className="info-text">Here are some quick tips to help you navigate the system:</p>
      <ul className="info-text">
        <li>🔍 Use the search bar to find books by title, author, or subject.</li>
        <li>📚 Go to the catalog section to browse and issue books.</li>
        <li>🧾 View your issued books and due dates in your profile.</li>
        <li>📆 Return books on time to avoid late fees.</li>
      </ul>
    </div>
  );
}