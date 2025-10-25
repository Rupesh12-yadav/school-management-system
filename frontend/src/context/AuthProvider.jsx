import React, { createContext, useState, useEffect, useContext } from "react";

// Context
const AuthContext = createContext();

// Custom hook
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

// Provider
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On page load, get user from localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const email = localStorage.getItem("email");
    if (token && role && email) setUser({ token, role, email });
    setLoading(false);
  }, []);

  const login = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);
    localStorage.setItem("email", data.email);
    setUser({ token: data.token, role: data.role, email: data.email });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider; // ✅ default export
