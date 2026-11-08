import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Footer = () => {
  const { isAuthenticated, isAdmin } = useAuth();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footgrid">
          <div>
            <div className="logo" style={{ color: "#fff" }}>
              <span className="mark">F</span>Foodie
            </div>
            <p>
              Smart food delivery frontend with personalised discovery, custom combos,
              role-based administration, interactive user ordering, and live-style tracking.
            </p>
          </div>

          <div>
            <b>Explore</b>
            <Link to="/restaurants">Restaurants</Link>
            <Link to="/offers">Offers</Link>
            <Link to="/user">Food Menu</Link>
          </div>

          <div>
            <b>Account</b>
            {isAuthenticated ? (
              <>
                {isAdmin ? (
                  <Link to="/admin">Admin Dashboard</Link>
                ) : (
                  <>
                    <Link to="/user">User Dashboard</Link>
                    <Link to="/orders">My Orders</Link>
                  </>
                )}
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
              </>
            )}
          </div>

          <div>
            <b>Features</b>
            <Link to="/order-tracking">Live tracking</Link>
            <Link to="/cart">Shopping Cart</Link>
            <Link to="/offers">Smart offers</Link>
          </div>
        </div>

        <div className="copy">
          © 2026 Foodie • Professional React & Vite Online Food Delivery Platform • All data persisted via Local Storage.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

