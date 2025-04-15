import React, { useState } from 'react';
import { X } from 'lucide-react';
import './styles/LoanForm.css'; // Import the CSS file

export function LoanForm({ book, onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    borrowerName: '',
    borrowerEmail: '',
    borrowDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    notes: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(book.id, formData);
    onClose();
  };

  return (
    <div className="loan-form-overlay">
      <div className="loan-form-container">
        <div className="loan-form-header">
          <h2 className="loan-form-title">Loan Book: {book.title}</h2>
          <button onClick={onClose} className="loan-form-close-button">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="loan-form">
          <div className="loan-form-group">
            <label className="loan-form-label">Borrower Name</label>
            <input
              type="text"
              required
              className="loan-form-input"
              value={formData.borrowerName}
              onChange={(e) => setFormData({ ...formData, borrowerName: e.target.value })}
            />
          </div>

          <div className="loan-form-group">
            <label className="loan-form-label">Borrower Email</label>
            <input
              type="email"
              required
              className="loan-form-input"
              value={formData.borrowerEmail}
              onChange={(e) => setFormData({ ...formData, borrowerEmail: e.target.value })}
            />
          </div>

          <div className="loan-form-group">
            <label className="loan-form-label">Borrow Date</label>
            <input
              type="date"
              required
              className="loan-form-input"
              value={formData.borrowDate}
              onChange={(e) => setFormData({ ...formData, borrowDate: e.target.value })}
            />
          </div>

          <div className="loan-form-group">
            <label className="loan-form-label">Due Date</label>
            <input
              type="date"
              required
              className="loan-form-input"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            />
          </div>

          <div className="loan-form-group">
            <label className="loan-form-label">Notes</label>
            <textarea
              rows={3}
              className="loan-form-textarea"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>

          <div className="loan-form-actions">
            <button
              type="button"
              onClick={onClose}
              className="loan-form-cancel-button"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="loan-form-submit-button"
            >
              Loan Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}