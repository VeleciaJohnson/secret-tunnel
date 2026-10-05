import { createContext, useContext, useEffect, useState } from "react";

const API = "https://fsa-jwt-practice.herokuapp.com";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [location, setLocation] = useState("GATE");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const savedToken = sessionStorage.getItem("token");

    if (savedToken) {
      setToken(savedToken);
      setLocation("TABLET");
    }
  }, []);

  const signup = async (username) => {
    setError("");
    setMessage("");

    try {
      const response = await fetch(`${API}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to register.");
      }

      setToken(data.token);
      sessionStorage.setItem("token", data.token);
      setMessage(data.message);
      setLocation("TABLET");
    } catch (error) {
      setError(error.message);
    }
  };

  const authenticate = async () => {
    if (!token) {
      throw new Error("No authentication token found. Please register again.");
    }

    setError("");
    setMessage("");

    try {
      const response = await fetch(`${API}/authenticate`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Authentication failed.");
      }

      setMessage(data.message);
      setLocation("TUNNEL");
    } catch (error) {
      setError(error.message);
    }
  };

  const value = {
    token,
    location,
    message,
    error,
    signup,
    authenticate,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}