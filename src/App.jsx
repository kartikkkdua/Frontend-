// App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoginForm } from './components/LoginForm';
import { MainApp } from './components/MainApp';
import About from './components/About'; // Correct import for default export
import Navbar from './components/Navbar';
import  Help  from './components/Help';
import  Contact  from './components/Contact';
import Footer from './components/Footer';

function AppContent() {
  const { user } = useAuth();

  return (
    <Routes>
      {user ? (
        <Route path="/*" element={<MainApp />} />
      ) : (
        <Route path="/*" element={<LoginForm />} />
      )}
  
      <Route path="/about" element={<About />} />
      <Route path="/help" element={<Help />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
      <Navbar />
        <AppContent />
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
