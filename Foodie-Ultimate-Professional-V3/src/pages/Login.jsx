import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }

    setLoading(true);
    const result = login(email, password);
    setLoading(false);

    if (result.success) {
      // Check query parameter for next redirect
      const queryParams = new URLSearchParams(location.search);
      const nextPath = queryParams.get("next");

      if (nextPath) {
        navigate(nextPath);
      } else if (result.user.role === "Admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } else {
      setError(result.message);
    }
  };

  const handleQuickFillAdmin = () => {
    setEmail("admin@test.com");
    setPassword("admin123");
    setError("");
  };

  return (
    <main className="page">
      <div className="container">
        <div className="panel form">
          <h1>Welcome back 👋</h1>
          <p className="muted">
            Sign in to access your orders, role-based dashboard, and food items.
          </p>

          <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
            <div className="field">
              <label htmlFor="login-email">Email Address</label>
              <input
                id="login-email"
                className="input"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="login-password">Password</label>
              <input
                id="login-password"
                className="input"
                type="password"
                placeholder="6+ characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
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
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>

          {/* Quick-seed demo credentials box */}
          <div
            style={{
              marginTop: "24px",
              padding: "14px 16px",
              background: "#fafafa",
              border: "1px dashed var(--line)",
              borderRadius: "14px",
              fontSize: "13px"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontWeight: 800, color: "var(--dark)" }}>
                ⚡ Default Admin Credentials:
              </span>
              <button
                type="button"
                className="btn light"
                onClick={handleQuickFillAdmin}
                style={{ padding: "4px 8px", fontSize: "11px", height: "auto" }}
              >
                Auto-fill Admin
              </button>
            </div>
            <div style={{ color: "var(--muted)", marginTop: "4px" }}>
              Email: <code>admin@test.com</code> | Password: <code>admin123</code>
            </div>
          </div>

          <p className="muted" style={{ textAlign: "center", marginTop: "24px" }}>
            New to Foodie?{" "}
            <Link to="/signup" style={{ color: "var(--p)", fontWeight: 900 }}>
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;

