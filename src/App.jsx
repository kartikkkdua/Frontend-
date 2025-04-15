// App.jsx

import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { MainApp } from './components/MainApp';
import { LoginForm } from './components/LoginForm';
import { useAuth } from './context/AuthContext';
// import Header from './components/Header';
// import Footer from './components/Footer';
function AppContent() {
  // <Header />
  const { user } = useAuth();
  return user ? <MainApp /> : <LoginForm />
  ;
  // <Footer />
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
