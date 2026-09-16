import React, { createContext, useContext, useState, useEffect } from 'react';
import portfolioService from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('portfolio_token'));
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('portfolio_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);

  const isAuthenticated = Boolean(token);

  const login = async (username, password) => {
    setLoading(true);
    try {
      const res = await portfolioService.login({ username, password });
      const { token: receivedToken, user: receivedUser } = res.data;
      
      setToken(receivedToken);
      setUser(receivedUser);
      localStorage.setItem('portfolio_token', receivedToken);
      localStorage.setItem('portfolio_user', JSON.stringify(receivedUser));
      
      return { success: true };
    } catch (err) {
      const errorMsg =
        err.response?.data?.error ||
        err.response?.data?.non_field_errors?.[0] ||
        'Invalid username or password.';
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      if (token) {
        await portfolioService.logout();
      }
    } catch (err) {
      console.warn('Logout API error, clearing local state anyway');
    } finally {
      setToken(null);
      setUser(null);
      localStorage.removeItem('portfolio_token');
      localStorage.removeItem('portfolio_user');
    }
  };

  const changePassword = async (currentPassword, newPassword, confirmNewPassword) => {
    try {
      const res = await portfolioService.changePassword({
        current_password: currentPassword,
        new_password: newPassword,
        confirm_new_password: confirmNewPassword,
      });

      // User needs to re-login with the new password
      logout();
      return { success: true, message: res.data.message };
    } catch (err) {
      let errorMsg = 'Failed to change password.';
      if (err.response?.data) {
        if (typeof err.response.data === 'string') {
          errorMsg = err.response.data;
        } else if (err.response.data.error) {
          errorMsg = err.response.data.error;
        } else if (err.response.data.new_password) {
          errorMsg = Array.isArray(err.response.data.new_password)
            ? err.response.data.new_password[0]
            : err.response.data.new_password;
        } else if (err.response.data.confirm_new_password) {
          errorMsg = Array.isArray(err.response.data.confirm_new_password)
            ? err.response.data.confirm_new_password[0]
            : err.response.data.confirm_new_password;
        }
      }
      return { success: false, error: errorMsg };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated,
        loading,
        login,
        logout,
        changePassword,
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
