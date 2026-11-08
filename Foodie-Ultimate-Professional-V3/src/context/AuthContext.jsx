import React, { createContext, useContext, useState, useEffect } from "react";
import { DEFAULT_ADMIN, INITIAL_FOOD_ITEMS } from "../data/initialData";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    try {
      const stored = localStorage.getItem("users");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error("Failed to parse users from localStorage", e);
    }
    // Seed default admin account if users array is empty
    const initialUsers = [DEFAULT_ADMIN];
    localStorage.setItem("users", JSON.stringify(initialUsers));
    return initialUsers;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const stored = localStorage.getItem("currentUser");
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      console.error("Failed to parse currentUser from localStorage", e);
      return null;
    }
  });

  // Seed foodItems if not already seeded
  useEffect(() => {
    try {
      const storedFood = localStorage.getItem("foodItems");
      if (!storedFood || JSON.parse(storedFood).length === 0) {
        localStorage.setItem("foodItems", JSON.stringify(INITIAL_FOOD_ITEMS));
      }
    } catch (e) {
      console.error("Failed to seed foodItems", e);
    }
  }, []);

  // Sync users to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem("users", JSON.stringify(users));
    } catch (e) {
      console.error("Failed to sync users to localStorage", e);
    }
  }, [users]);

  // Sync currentUser to localStorage whenever state changes
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
      } else {
        localStorage.removeItem("currentUser");
      }
    } catch (e) {
      console.error("Failed to sync currentUser to localStorage", e);
    }
  }, [currentUser]);

  const login = (email, password) => {
    const cleanEmail = email.trim().toLowerCase();
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const user = existingUsers.find(
      (u) => u.email.toLowerCase() === cleanEmail && u.password === password
    );

    if (user) {
      const sessionUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      };
      setCurrentUser(sessionUser);
      localStorage.setItem("currentUser", JSON.stringify(sessionUser));
      return { success: true, user: sessionUser };
    } else {
      return { success: false, message: "Invalid email or password. Please try again." };
    }
  };

  const signup = ({ name, email, password, role = "User" }) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();

    if (!cleanName || cleanName.length < 2) {
      return { success: false, message: "Name must be at least 2 characters long." };
    }
    if (!cleanEmail.includes("@")) {
      return { success: false, message: "Please provide a valid email address." };
    }
    if (!password || password.length < 6) {
      return { success: false, message: "Password must be at least 6 characters long." };
    }

    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const emailExists = existingUsers.some(
      (u) => u.email.toLowerCase() === cleanEmail
    );

    if (emailExists) {
      return { success: false, message: "An account with this email already exists." };
    }

    const newUser = {
      id: "user-" + Date.now(),
      name: cleanName,
      email: cleanEmail,
      password,
      role: role === "Admin" ? "Admin" : "User",
      createdAt: new Date().toISOString()
    };

    const updatedUsers = [...existingUsers, newUser];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    const sessionUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role
    };
    setCurrentUser(sessionUser);
    localStorage.setItem("currentUser", JSON.stringify(sessionUser));

    return { success: true, user: sessionUser };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  const getAllUsers = () => {
    try {
      return JSON.parse(localStorage.getItem("users") || "[]");
    } catch {
      return users;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        users,
        login,
        signup,
        logout,
        getAllUsers,
        isAuthenticated: !!currentUser,
        isAdmin: currentUser?.role === "Admin",
        isUser: currentUser?.role === "User"
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;

