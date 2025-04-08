import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  // 🔹 Load user from token when app starts
  useEffect(() => {
    if (token) {
      axios.get("http://localhost:5000/dashboard", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => setUser(response.data.user))
      .catch(() => handleLogout()); // Logout if token is invalid
    }
  }, [token]);

  const updateUser = (props) => {
    setUser(props.email)
  }

  // 🔹 Login function
  const login = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:5000/login", { email, password });
      setToken(res.data.token);
      
      localStorage.setItem("token", res.data.token);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  // 🔹 Logout function
  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, handleLogout, token, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
