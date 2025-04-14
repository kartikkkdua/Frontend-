import React, { useState, useMemo } from 'react';
import { BookForm } from './BookForm';
import { BookCard } from './BookCard';
import { LoanForm } from './LoanForm';
import { Library, PlusCircle, Search, SlidersHorizontal, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './MainApp.css'; // Import CSS

const initialBooks = [
  {
    id: '1',
    title: 'The Design of Everyday Things',
    author: 'Don Norman',
    category: 'Technology',
    isbn: '978-0465050659',
    publishedYear: 2013,
    description: 'A powerful primer on how—and why—some products satisfy customers while others only frustrate them.',
    coverUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=300',
    rating: 4.5,
    status: 'Available',
    pageCount: 368,
    language: 'English',
    tags: ['Design', 'Psychology', 'UX'],
    dateAdded: '2024-03-10T12:00:00Z',
    lastModified: '2024-03-10T12:00:00Z'
  },
  {
    id: '2',
    title: 'Atomic Habits',
    author: 'James Clear',
    category: 'Non-Fiction',
    isbn: '978-1847941831',
    publishedYear: 2018,
    description: 'An easy and proven way to build good habits and break bad ones.',
    coverUrl: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=300',
    rating: 5,
    status: 'Reading',
    pageCount: 320,
    language: 'English',
    tags: ['Self-Help', 'Productivity', 'Psychology'],
    dateAdded: '2024-03-10T12:00:00Z',
    lastModified: '2024-03-10T12:00:00Z'
  }
];

const categories = ['Fiction', 'Non-Fiction', 'Science', 'Technology', 'History', 'Biography', 'Other'];
const statuses = ['Available', 'Loaned', 'Lost', 'Reading', 'Completed'];
const languages = ['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Other'];

export function MainApp() {
  const { user, logout } = useAuth();
  const [books, setBooks] = useState(initialBooks);
  const [showForm, setShowForm] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [loaningBook, setLoaningBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [minRating, setMinRating] = useState(0);

  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
      const matchesStatus = selectedStatus === 'All' || book.status === selectedStatus;
      const matchesLanguage = selectedLanguage === 'All' || book.language === selectedLanguage;
      const matchesRating = book.rating >= minRating;

      return matchesSearch && matchesCategory && matchesStatus && matchesLanguage && matchesRating;
    });
  }, [books, searchTerm, selectedCategory, selectedStatus, selectedLanguage, minRating]);

  const handleAddBook = (bookData) => {
    const newBook = {
      ...bookData,
      id: Date.now().toString(),
      dateAdded: new Date().toISOString(),
      lastModified: new Date().toISOString(),
    };
    setBooks(prev => [...prev, newBook]);
  };

  const handleEditBook = (bookData) => {
    if (!editingBook) return;
    setBooks(prev => prev.map(book =>
      book.id === editingBook.id
        ? {
            ...bookData,
            id: book.id,
            dateAdded: book.dateAdded,
            lastModified: new Date().toISOString(),
          }
        : book
    ));
    setEditingBook(null);
  };

  const handleDeleteBook = (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      setBooks(prev => prev.filter(book => book.id !== id));
    }
  };

  const handleStatusChange = (id, status) => {
    setBooks(prev => prev.map(book =>
      book.id === id
        ? { ...book, status, lastModified: new Date().toISOString() }
        : book
    ));
  };

  const handleLoanBook = (bookId, loanInfo) => {
    setBooks(prev => prev.map(book =>
      book.id === bookId
        ? {
            ...book,
            status: 'Loaned',
            loanInfo,
            lastModified: new Date().toISOString(),
          }
        : book
    ));
  };

  return (
    <div className="main-app-container">
      <header className="main-app-header">
        <div className="header-content">
          <div className="header-left">
            <Library className="header-logo" />
            <h1 className="header-title">Library Manager</h1>
          </div>
          <div className="header-right">
            <div className="user-info">
              <User className="user-icon" />
              <span>{user?.name}</span>
              <span className="user-role">{user?.role}</span>
            </div>
            {user?.role === 'admin' && (
              <button
                onClick={() => setShowForm(true)}
                className="add-book-button"
              >
                <PlusCircle className="add-book-icon" />
                Add Book
              </button>
            )}
            <button
              onClick={logout}
              className="logout-button"
            >
              <LogOut className="logout-icon" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="controls-container">
          <div className="search-container">
            <div className="search-icon-wrapper">
              <Search className="search-icon" />
            </div>
            <input
              type="text"
              placeholder="Search books..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="filter-button"
          >
            <SlidersHorizontal className="filter-icon" />
            Filters
          </button>
        </div>

        {showFilters && (
          <div className="filters-grid">
            <div className="filter-group">
              <label className="filter-label">Category</label>
              <select
                className="filter-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="All">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Status</label>
              <select
                className="filter-select"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="All">All Statuses</option>
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Language</label>
              <select
                className="filter-select"
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
              >
                <option value="All">All Languages</option>
                {languages.map(language => (
                  <option key={language} value={language}>{language}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Minimum Rating</label>
              <input
                type="number"
                min="0"
                max="5"
                step="0.5"
                className="filter-input"
                value={minRating}
                onChange={(e) => setMinRating(parseFloat(e.target.value))}
              />
            </div>
          </div>
        )}

        <div className="books-grid">
          {filteredBooks.map(book => (
            <BookCard
              key={book.id}
              book={book}
              onEdit={(book) => {
                if (user?.role === 'admin') {
                  setEditingBook(book);
                  setShowForm(true);
                }
              }}
              onDelete={user?.role === 'admin' ? handleDeleteBook : undefined}
              onStatusChange={user?.role === 'admin' ? handleStatusChange : undefined}
              onLoan={user?.role === 'admin' ? (book) => setLoaningBook(book) : undefined}
            />
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="no-books-message">
            <p>No books found matching your criteria.</p>
          </div>
        )}
      </main>

      {(showForm || editingBook) && user?.role === 'admin' && (
        <BookForm
          onSubmit={editingBook ? handleEditBook : handleAddBook}
          onClose={() => {
            setShowForm(false);
            setEditingBook(null);
          }}
          initialBook={editingBook || undefined}
        />
      )}

      {loaningBook && user?.role === 'admin' && (
        <LoanForm
          book={loaningBook}
          onSubmit={handleLoanBook}
          onClose={() => setLoaningBook(null)}
        />
      )}
    </div>
  );
}