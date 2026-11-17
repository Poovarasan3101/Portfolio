import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { adminService, TOKEN_STORAGE } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(TOKEN_STORAGE.USER);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);

  const clearSession = useCallback(() => {
    localStorage.removeItem(TOKEN_STORAGE.ACCESS);
    localStorage.removeItem(TOKEN_STORAGE.REFRESH);
    localStorage.removeItem(TOKEN_STORAGE.USER);
    setUser(null);
  }, []);

  const verifySession = useCallback(async () => {
    const token = localStorage.getItem(TOKEN_STORAGE.ACCESS);
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      const me = await adminService.getMe();
      setUser(me);
      localStorage.setItem(TOKEN_STORAGE.USER, JSON.stringify(me));
    } catch {
      clearSession();
    } finally {
      setLoading(false);
    }
  }, [clearSession]);

  useEffect(() => {
    verifySession();
  }, [verifySession]);

  const login = async (username, password) => {
    const data = await adminService.login(username, password);
    localStorage.setItem(TOKEN_STORAGE.ACCESS, data.access);
    localStorage.setItem(TOKEN_STORAGE.REFRESH, data.refresh);
    localStorage.setItem(TOKEN_STORAGE.USER, JSON.stringify(data.user));
    setUser(data.user);
    return data.user;
  };

  const logout = async () => {
    await adminService.logout();
    clearSession();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        loading,
        login,
        logout,
        verifySession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
