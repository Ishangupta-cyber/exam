import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const session = localStorage.getItem('session');
    if (session) {
      setUser(JSON.parse(session));
    }
  }, []);

  function login(username, password) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find(u => u.username === username && u.password === password);
    
    if (foundUser) {
      const sessionUser = { username: foundUser.username, role: foundUser.role };
      setUser(sessionUser);
      localStorage.setItem('session', JSON.stringify(sessionUser));
      return { success: true, role: foundUser.role };
    }
    return { success: false, message: "Invalid username or password" };
  }

  function signup(username, password, confirmPassword, role) {
    if (!username || !password || !confirmPassword || !role) {
      return { success: false, message: "All fields are required" };
    }

    if (password !== confirmPassword) {
      return { success: false, message: "Passwords do not match" };
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const exists = users.find(u => u.username === username);

    if (exists) {
      return { success: false, message: "Username already exists" };
    }

    const newUser = { username, password, role };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    return { success: true };
  }

  function logout() {
    setUser(null);
    localStorage.removeItem('session');
    navigate('/login');
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
