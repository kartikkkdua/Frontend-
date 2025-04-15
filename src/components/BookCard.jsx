import React from 'react';
import {
  Pencil, Trash2, Star, StarHalf,
  BookOpen, Users, Calendar
} from 'lucide-react';
import './styles/BookCard.css';

const statusColors = {
  Available: 'status-available',
  Loaned: 'status-loaned',
  Lost: 'status-lost',
  Reading: 'status-reading',
};

const renderRatingStars = (rating) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return [
    ...Array(fullStars).fill().map((_, i) => <Star key={`full-${i}`} className="star" />),
    hasHalfStar && <StarHalf key="half" className="star" />,
  ];
};

const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

export function BookCard({ book, onEdit, onDelete, onStatusChange, onLoan }) {
  return (
    <div className="book-card">
      <div className="book-image-wrapper">
        <img
          src={book.coverUrl}
          alt={book.title}
          className="book-image"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=300';
          }}
        />
        <div className="rating-stars">{renderRatingStars(book.rating)}</div>
      </div>

      <div className="book-content">
        <div className="book-header">
          <div>
            <h3 className="book-title">{book.title}</h3>
            <p className="book-author">by {book.author}</p>
          </div>
          <span className={`book-status ${statusColors[book.status]}`}>{book.status}</span>
        </div>

        <div className="book-tags">
          {book.tags.map((tag, i) => (
            <span key={i} className="book-tag">{tag}</span>
          ))}
        </div>

        <p className="book-description">{book.description}</p>

        <div className="book-meta">
          <div className="meta-item"><BookOpen className="icon" /><span>{book.pageCount} pages</span></div>
          <div className="meta-item"><Calendar className="icon" /><span>{book.publishedYear}</span></div>
          <div className="meta-item"><Users className="icon" /><span>{book.language}</span></div>
          <div className="meta-item"><span className="isbn">ISBN: {book.isbn}</span></div>
        </div>

        {book.loanInfo && (
          <div className="loan-info">
            <p><strong>On loan to:</strong> {book.loanInfo.borrowerName}</p>
            <p>Due: {formatDate(book.loanInfo.dueDate)}</p>
          </div>
        )}

        {(onStatusChange || onEdit || onDelete || onLoan) && (
          <div className="book-actions">
            {onStatusChange && (
              <select
                value={book.status}
                onChange={(e) => onStatusChange(book.id, e.target.value)}
                className="status-select"
              >
                {Object.keys(statusColors).map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            )}
            <div className="action-buttons">
              {onLoan && book.status === 'Available' && (
                <button onClick={() => onLoan(book)} title="Loan book" className="btn-loan">
                  <Users size={20} />
                </button>
              )}
              {onEdit && (
                <button onClick={() => onEdit(book)} title="Edit book" className="btn-edit">
                  <Pencil size={20} />
                </button>
              )}
              {onDelete && (
                <button onClick={() => onDelete(book.id)} title="Delete book" className="btn-delete">
                  <Trash2 size={20} />
                </button>
              )}
            </div>
          </div>
        )}

        <div className="timestamps">
          <p>Added: {formatDate(book.dateAdded)}</p>
          <p>Last modified: {formatDate(book.lastModified)}</p>
        </div>
      </div>
    </div>
  );
}
