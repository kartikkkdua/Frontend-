import React, { useState } from 'react';
import { X } from 'lucide-react';
import './styles/BookForm.css';

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
    coverUrl: initialBook?.coverUrl || '',
    rating: initialBook?.rating || 0,
    status: initialBook?.status || 'Available',
    pageCount: initialBook?.pageCount || 0,
    language: initialBook?.language || 'English',
    tags: initialBook?.tags || [],
  });

  const [tagInput, setTagInput] = useState('');

  const handleChange = (field, value) => setFormData({ ...formData, [field]: value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      handleChange('tags', [...formData.tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag) => handleChange('tags', formData.tags.filter(t => t !== tag));

  return (
    <div className="book-form-overlay">
      <div className="book-form-container">
        <div className="book-form-header">
          <h2>{initialBook ? 'Edit Book' : 'Add New Book'}</h2>
          <button onClick={onClose} className="book-form-close-button"><X size={24} /></button>
        </div>
        
        <form onSubmit={handleSubmit} className="book-form">
          <div className="book-form-grid">
            {['title', 'author', 'isbn', 'publishedYear', 'pageCount'].map((field) => (
              <div className="book-form-group" key={field}>
                <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <input
                  type="text"
                  value={formData[field]}
                  onChange={(e) => handleChange(field, e.target.value)}
                  required
                />
              </div>
            ))}
            {['category', 'language', 'status'].map((field) => (
              <div className="book-form-group" key={field}>
                <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <select
                  value={formData[field]}
                  onChange={(e) => handleChange(field, e.target.value)}
                >
                  {(field === 'category' ? categories : field === 'language' ? languages : statuses).map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            ))}
            <div className="book-form-group">
              <label>Cover URL</label>
              <input
                type="url"
                value={formData.coverUrl}
                onChange={(e) => handleChange('coverUrl', e.target.value)}
              />
            </div>
            <div className="book-form-group">
              <label>Description</label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
              />
            </div>
          </div>

          <div className="book-form-group">
            <label>Tags</label>
            <div className="book-form-tags-input">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                placeholder="Add a tag..."
              />
              <button type="button" onClick={handleAddTag}>Add</button>
            </div>
            <div className="book-form-tags-list">
              {formData.tags.map((tag, index) => (
                <span key={index}>
                  {tag} <button type="button" onClick={() => handleRemoveTag(tag)}>×</button>
                </span>
              ))}
            </div>
          </div>

          <div className="book-form-actions">
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit">{initialBook ? 'Update Book' : 'Add Book'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
