import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    const result = signup({ name, email, password, role });
    setLoading(false);

    if (result.success) {
      if (result.user.role === "Admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } else {
      setError(result.message);
    }
  };

  return (
    <main className="page">
      <div className="container">
        <div className="panel form">
          <h1>Join Foodie ✨</h1>
          <p className="muted">
            Create an account with role-based access for Customers and Administrators.
          </p>

          <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
            <div className="field">
              <label htmlFor="signup-name">Full Name</label>
              <input
                id="signup-name"
                className="input"
                type="text"
                placeholder="e.g. Alex Johnson"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="signup-email">Email Address</label>
              <input
                id="signup-email"
                className="input"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="signup-password">Password</label>
              <input
                id="signup-password"
                className="input"
                type="password"
                placeholder="6+ characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="signup-role">Select Account Role</label>
              <select
                id="signup-role"
                className="select"
                style={{ width: "100%", background: "#fff" }}
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="User">User (Customer - Browse, Cart & Order)</option>
                <option value="Admin">Admin (Manager - Manage Food, Orders & Users)</option>
              </select>
              <small className="muted" style={{ display: "block", marginTop: "5px" }}>
                {role === "Admin"
                  ? "Admin permissions: Add/Edit/Delete food items, inspect all orders, and view users."
                  : "User permissions: Browse catalog, filter by category, manage shopping cart, and place orders."}
              </small>
            </div>

            {error && (
              <div id="msg" className="error" role="alert">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="btn primary"
              style={{ width: "100%", marginTop: "12px" }}
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="muted" style={{ textAlign: "center", marginTop: "24px" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "var(--p)", fontWeight: 900 }}>
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Signup;

