import React, { createContext, useContext, useState, useEffect } from 'react';
const USERS = {
  'admin@library.com': {
    password: 'admin123',
    user: {
      id: '1',
      email: 'admin@library.com',
      role: 'admin',
      name: 'Admin User'
    }
  },
  'student@library.com': {
    password: 'student123',
    user: {
      id: '2',
      email: 'student@library.com',
      role: 'student',
      name: 'Student User'
    }
  }
};

const AuthContext = createContext({
  user: null,
  login: async () => {},
  logout: () => {}
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('libraryUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email, password) => {
    const userEntry = USERS[email];

    if (!userEntry || userEntry.password !== password) {
      throw new Error('Invalid credentials');
    }

    setUser(userEntry.user);
    localStorage.setItem('libraryUser', JSON.stringify(userEntry.user));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('libraryUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);