import React, { useState, useMemo } from "react";
import { BookForm } from "./BookForm";
import { BookCard } from "./BookCard";
import { LoanForm } from "./LoanForm";
import {
  Library,
  PlusCircle,
  Search,
  SlidersHorizontal,
  LogOut,
  User,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import "./styles/MainApp.css";

const initialBooks = [
  {
    id: "1",
    title: "The Design of Everyday Things",
    author: "Don Norman",
    category: "Technology",
    isbn: "978-0465050659",
    publishedYear: 2013,
    description:
      "A powerful primer on how—and why—some products satisfy customers while others only frustrate them.",
    coverUrl:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=300",
    rating: 4.5,
    status: "Available",
    pageCount: 368,
    language: "English",
    tags: ["Design", "Psychology", "UX"],
    dateAdded: "2024-03-10T12:00:00Z",
    lastModified: "2024-03-10T12:00:00Z",
  },
  {
    id: "2",
    title: "Atomic Habits",
    author: "James Clear",
    category: "Non-Fiction",
    isbn: "978-1847941831",
    publishedYear: 2018,
    description:
      "An easy and proven way to build good habits and break bad ones.",
    coverUrl:
      "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=300",
    rating: 5,
    status: "Reading",
    pageCount: 320,
    language: "English",
    tags: ["Self-Help", "Productivity", "Psychology"],
    dateAdded: "2024-03-10T12:00:00Z",
    lastModified: "2024-03-10T12:00:00Z",
  },
];

const categories = [
  "Fiction",
  "Non-Fiction",
  "Science",
  "Technology",
  "History",
  "Biography",
  "Other",
];
const statuses = ["Available", "Loaned", "Lost", "Reading"];
const languages = [
  "English",
  "Spanish",
  "French",
  "German",
  "Chinese",
  "Japanese",
  "Other",
];

export function MainApp() {
  const { user, logout } = useAuth();

  const [books, setBooks] = useState(initialBooks);
  const [editingBook, setEditingBook] = useState(null);
  const [loaningBook, setLoaningBook] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [language, setLanguage] = useState("All");
  const [minRating, setMinRating] = useState(0);

  const filteredBooks = useMemo(() => {
    return books.filter(
      ({
        title,
        author,
        description,
        tags,
        category: cat,
        status: stat,
        language: lang,
        rating,
      }) => {
        const matchSearch =
          [title, author, description].some((field) =>
            field.toLowerCase().includes(search.toLowerCase())
          ) ||
          tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));
        return (
          matchSearch &&
          (category === "All" || cat === category) &&
          (status === "All" || stat === status) &&
          (language === "All" || lang === language) &&
          rating >= minRating
        );
      }
    );
  }, [books, search, category, status, language, minRating]);

  const handleAdd = (book) => {
    const newBook = {
      ...book,
      id: Date.now().toString(),
      dateAdded: new Date().toISOString(),
      lastModified: new Date().toISOString(),
    };
    setBooks((prev) => [...prev, newBook]);
  };

  const handleEdit = (book) => {
    setBooks((prev) =>
      prev.map((b) =>
        b.id === editingBook.id
          ? {
              ...book,
              id: b.id,
              dateAdded: b.dateAdded,
              lastModified: new Date().toISOString(),
            }
          : b
      )
    );
    setEditingBook(null);
  };

  const handleDelete = (id) =>
    window.confirm("Delete this book?") &&
    setBooks((prev) => prev.filter((b) => b.id !== id));
  const handleStatus = (id, status) =>
    setBooks((prev) =>
      prev.map((b) =>
        b.id === id
          ? { ...b, status, lastModified: new Date().toISOString() }
          : b
      )
    );
  const handleLoan = (id, loanInfo) =>
    setBooks((prev) =>
      prev.map((b) =>
        b.id === id
          ? {
              ...b,
              status: "Loaned",
              loanInfo,
              lastModified: new Date().toISOString(),
            }
          : b
      )
    );

  return (
    <div className="main-app-container">
      <header className="main-app-header">
        <div className="header-left">
          <Library className="header-logo" />
          <h1>Library Management</h1>
        </div>
        <div className="header-right">
          <div className="user-info">
            <User className="user-icon" />
            <span>{user?.name}</span>
            <span className="user-role">{user?.role}</span>
          </div>
          {user?.role === "admin" && (
            <button
              onClick={() => setShowForm(true)}
              className="add-book-button"
            >
              <PlusCircle /> Add Book
            </button>
          )}
          <button onClick={logout} className="logout-button">
            <LogOut /> Logout
          </button>
        </div>
      </header>

      <main className="main-content">
        <div className="controls-container">
          <div className="search-container">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search books..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="filter-button"
          >
            <SlidersHorizontal /> Filters
          </button>
        </div>

        {showFilters && (
          <div className="filters-grid">
            {[
              {
                label: "Category",
                value: category,
                set: setCategory,
                options: categories,
              },
              {
                label: "Status",
                value: status,
                set: setStatus,
                options: statuses,
              },
              {
                label: "Language",
                value: language,
                set: setLanguage,
                options: languages,
              },
            ].map(({ label, value, set, options }) => (
              <div key={label} className="filter-group">
                <label>{label}</label>
                <select
                  value={value}
                  onChange={(e) => set(e.target.value)}
                  className="filter-select"
                >
                  <option value="All">All {label}s</option>
                  {options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            ))}
            <div className="filter-group">
              <label>Min Rating</label>
              <input
                type="number"
                min="0"
                max="5"
                step="0.5"
                value={minRating}
                onChange={(e) => setMinRating(+e.target.value)}
                className="filter-input"
              />
            </div>
          </div>
        )}

        <div className="books-grid">
          {filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onEdit={
                user?.role === "admin"
                  ? () => {
                      setEditingBook(book);
                      setShowForm(true);
                    }
                  : undefined
              }
              onDelete={user?.role === "admin" ? handleDelete : undefined}
              onStatusChange={user?.role === "admin" ? handleStatus : undefined}
              onLoan={
                user?.role === "admin" ? () => setLoaningBook(book) : undefined
              }
            />
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <p className="no-books-message">No books found.</p>
        )}
      </main>

      {(showForm || editingBook) && user?.role === "admin" && (
        <BookForm
          onSubmit={editingBook ? handleEdit : handleAdd}
          onClose={() => {
            setShowForm(false);
            setEditingBook(null);
          }}
          initialBook={editingBook}
        />
      )}

      {loaningBook && user?.role === "admin" && (
        <LoanForm
          book={loaningBook}
          onSubmit={handleLoan}
          onClose={() => setLoaningBook(null)}
        />
      )}
      
    </div>
  );
}
