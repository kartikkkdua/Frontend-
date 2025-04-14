import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Library } from 'lucide-react';
import './LoginForm.css'; // Import the CSS file

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await login(email, password);
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card-outer">
        <div className="login-logo-container">
          <Library className="login-logo" />
        </div>
        <h2 className="login-title">
          Library Management System
        </h2>
        <p className="login-subtitle">
          Please sign in to continue
        </p>
      </div>

      <div className="login-card-inner">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-form-group">
            <label htmlFor="email" className="login-form-label">
              Email address
            </label>
            <div className="login-form-input-container">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="login-form-input"
              />
            </div>
          </div>

          <div className="login-form-group">
            <label htmlFor="password" className="login-form-label">
              Password
            </label>
            <div className="login-form-input-container">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-form-input"
              />
            </div>
          </div>

          {error && (
            <div className="login-error-message">{error}</div>
          )}

          <div>
            <button
              type="submit"
              className="login-button"
            >
              Sign in
            </button>
          </div>
        </form>

        <div className="login-demo-credentials">
          <div className="login-credentials-separator">
            <div className="login-separator-line" />
            <span className="login-separator-text">
              Demo Credentials
            </span>
          </div>
          <div className="login-credentials-list">
            <p>Admin: admin@library.com / admin123</p>
            <p>Student: student@library.com / student123</p>
          </div>
        </div>
      </div>
    </div>
  );
}