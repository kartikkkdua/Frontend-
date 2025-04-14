import React, { useState } from 'react';
import { X } from 'lucide-react';
import './BookForm.css'; // Import the CSS file

const categories = ['Fiction', 'Non-Fiction', 'Science', 'Technology', 'History', 'Biography', 'Other'];
const languages = ['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Other'];
const statuses = ['Available', 'Loaned', 'Lost', 'Reading', 'Completed'];

export function BookForm({ onSubmit, onClose, initialBook }) {
  const [formData, setFormData] = useState({
    title: initialBook?.title || '',
    author: initialBook?.author || '',
    category: initialBook?.category || 'Fiction',
    isbn: initialBook?.isbn || '',
    publishedYear: initialBook?.publishedYear || new Date().getFullYear(),
    description: initialBook?.description || '',
    coverUrl: initialBook?.coverUrl || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=300',
    rating: initialBook?.rating || 0,
    status: initialBook?.status || 'Available',
    pageCount: initialBook?.pageCount || 0,
    language: initialBook?.language || 'English',
    tags: initialBook?.tags || [],
    loanInfo: initialBook?.loanInfo,
  });

  const [tagInput, setTagInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()],
      });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove),
    });
  };

  return (
    <div className="book-form-overlay">
      <div className="book-form-container">
        <div className="book-form-header">
          <h2 className="book-form-title">{initialBook ? 'Edit Book' : 'Add New Book'}</h2>
          <button onClick={onClose} className="book-form-close-button">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="book-form">
          <div className="book-form-grid">
            <div className="book-form-group">
              <label className="book-form-label">Title</label>
              <input
                type="text"
                required
                className="book-form-input"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="book-form-group">
              <label className="book-form-label">Author</label>
              <input
                type="text"
                required
                className="book-form-input"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              />
            </div>

            <div className="book-form-group">
              <label className="book-form-label">Category</label>
              <select
                className="book-form-select"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="book-form-group">
              <label className="book-form-label">Language</label>
              <select
                className="book-form-select"
                value={formData.language}
                onChange={(e) => setFormData({ ...formData, language: e.target.value })}
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>

            <div className="book-form-group">
              <label className="book-form-label">ISBN</label>
              <input
                type="text"
                required
                className="book-form-input"
                value={formData.isbn}
                onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
              />
            </div>

            <div className="book-form-group">
              <label className="book-form-label">Published Year</label>
              <input
                type="number"
                required
                min="1800"
                max={new Date().getFullYear()}
                className="book-form-input"
                value={formData.publishedYear}
                onChange={(e) => setFormData({ ...formData, publishedYear: parseInt(e.target.value) })}
              />
            </div>

            <div className="book-form-group">
              <label className="book-form-label">Page Count</label>
              <input
                type="number"
                required
                min="1"
                className="book-form-input"
                value={formData.pageCount}
                onChange={(e) => setFormData({ ...formData, pageCount: parseInt(e.target.value) })}
              />
            </div>

            <div className="book-form-group">
              <label className="book-form-label">Rating</label>
              <input
                type="number"
                min="0"
                max="5"
                step="0.5"
                className="book-form-input"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
              />
            </div>

            <div className="book-form-group">
              <label className="book-form-label">Status</label>
              <select
                className="book-form-select"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            <div className="book-form-group">
              <label className="book-form-label">Cover URL</label>
              <input
                type="url"
                className="book-form-input"
                value={formData.coverUrl}
                onChange={(e) => setFormData({ ...formData, coverUrl: e.target.value })}
              />
            </div>
          </div>

          <div className="book-form-group">
            <label className="book-form-label">Description</label>
            <textarea
              rows={3}
              className="book-form-textarea"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="book-form-group">
            <label className="book-form-label">Tags</label>
            <div className="book-form-tags-input-container">
              <input
                type="text"
                className="book-form-tag-input"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                placeholder="Add a tag..."
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="book-form-add-tag-button"
              >
                Add
              </button>
            </div>
            <div className="book-form-tags-list">
              {formData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="book-form-tag"
                >
                  {tag}
                  <button
                    type="button"
                    className="book-form-remove-tag-button"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="book-form-actions">
            <button
              type="button"
              onClick={onClose}
              className="book-form-cancel-button"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="book-form-submit-button"
            >
              {initialBook ? 'Update Book' : 'Add Book'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}