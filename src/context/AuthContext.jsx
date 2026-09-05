import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const STORAGE_KEY = 'scamshield_user';

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [authNotification, setAuthNotification] = useState(null);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [currentUser]);

  const login = (userData) => {
    // Simulated login: accept email, assign name or fallback
    const user = {
      name: userData.name || userData.email.split('@')[0],
      email: userData.email,
      joinedDate: new Date().toISOString().split('T')[0],
      role: 'Community Defender'
    };
    setCurrentUser(user);
    setAuthNotification(`Welcome back, ${user.name}!`);
    setTimeout(() => setAuthNotification(null), 5000);
    return user;
  };

  const signup = (userData) => {
    const user = {
      name: userData.name,
      email: userData.email,
      joinedDate: new Date().toISOString().split('T')[0],
      role: 'Community Defender'
    };
    setCurrentUser(user);
    setAuthNotification(`Account created! Welcome to ScamShieldAI, ${user.name}.`);
    setTimeout(() => setAuthNotification(null), 5000);
    return user;
  };

  const logout = () => {
    setCurrentUser(null);
    setAuthNotification('You have logged out successfully.');
    setTimeout(() => setAuthNotification(null), 4000);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        login,
        signup,
        logout,
        authNotification,
        clearNotification: () => setAuthNotification(null)
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
