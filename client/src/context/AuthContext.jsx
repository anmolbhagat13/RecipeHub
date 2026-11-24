
import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../utils/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check existing authentication session
  const checkAuth = async () => {
    try {
      const data = await api("/auth/me");
      setUser(data.user);
    } catch (error) {
      console.error("Authentication check failed:", error.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (email, password) => {
    setLoading(true);

    try {
      const data = await api("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      setUser(data.user);
      return data;
    } finally {
      setLoading(false);
    }
  };

  // Register user
  const register = async (userData) => {
    setLoading(true);

    try {
      const data = await api("/auth/register", {
        method: "POST",
        body: JSON.stringify(userData),
      });

      return data;
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = async () => {
    try {
      await api("/auth/logout", {
        method: "POST",
      });
    } finally {
      setUser(null);
    }
  };

  // Restore authentication when app loads
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        checkAuth,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
