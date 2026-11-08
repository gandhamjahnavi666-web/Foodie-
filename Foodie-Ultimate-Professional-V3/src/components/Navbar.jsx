import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export const Navbar = () => {
  const { currentUser, isAuthenticated, isAdmin, isUser, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("fd_theme") === "dark";
  });

  useEffect(() => {
    if (isDark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      localStorage.setItem("fd_theme", next ? "dark" : "light");
      return next;
    });
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="nav">
      <div className="container navin">
        <Link className="logo" to="/">
          <span className="mark">F</span>Foodie
        </Link>

        <div className="links">
          <Link to="/" style={{ color: location.pathname === "/" ? "var(--p)" : undefined }}>
            Home
          </Link>
          <Link
            to="/restaurants"
            style={{ color: location.pathname === "/restaurants" ? "var(--p)" : undefined }}
          >
            Restaurants
          </Link>

          {/* Role specific navigation */}
          {isAdmin && (
            <Link
              to="/admin"
              style={{
                color: location.pathname.startsWith("/admin") ? "var(--p)" : "var(--p)",
                fontWeight: 900
              }}
            >
              ⚡ Admin Dashboard
            </Link>
          )}

          {isUser && (
            <>
              <Link
                to="/user"
                style={{
                  color: location.pathname === "/user" ? "var(--p)" : undefined,
                  fontWeight: 800
                }}
              >
                Food Menu
              </Link>
              <Link
                to="/orders"
                style={{ color: location.pathname === "/orders" ? "var(--p)" : undefined }}
              >
                Orders
              </Link>
              <Link
                to="/order-tracking"
                style={{ color: location.pathname === "/order-tracking" ? "var(--p)" : undefined }}
              >
                Live Track
              </Link>
            </>
          )}

          <Link
            to="/offers"
            style={{ color: location.pathname === "/offers" ? "var(--p)" : undefined }}
          >
            Offers
          </Link>
        </div>

        <div className="navright">
          <button
            type="button"
            className="btn light"
            onClick={toggleTheme}
            title="Toggle Light/Dark Theme"
            style={{ fontSize: "15px" }}
          >
            ◐
          </button>

          {isAuthenticated ? (
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "0 6px"
                }}
              >
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: 800,
                    color: "var(--dark)"
                  }}
                >
                  {currentUser.name}
                </span>
                <span
                  className="pill"
                  style={{
                    background: isAdmin ? "#fee2e2" : "#e0f2fe",
                    color: isAdmin ? "#b91c1c" : "#0369a1"
                  }}
                >
                  {currentUser.role}
                </span>
              </div>
              <button
                type="button"
                className="btn light"
                onClick={handleLogout}
                style={{ color: "#b42318", fontWeight: 800 }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn light" to="/login">
                Login
              </Link>
              <Link className="btn primary" to="/signup" style={{ padding: "10px 14px" }}>
                Sign Up
              </Link>
            </>
          )}

          <Link className="btn light" to="/cart" title="Shopping Cart">
            🛒 <span className="cartcount">{cartCount}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

