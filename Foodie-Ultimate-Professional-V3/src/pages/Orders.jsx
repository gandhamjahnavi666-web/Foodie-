import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export const Orders = () => {
  const { currentUser, isAuthenticated, isAdmin } = useAuth();
  const { reorder } = useCart();
  const navigate = useNavigate();

  const [ordersList, setOrdersList] = useState([]);

  useEffect(() => {
    try {
      const allOrders = JSON.parse(localStorage.getItem("orders") || "[]");
      if (isAdmin) {
        setOrdersList(allOrders);
      } else if (currentUser?.email) {
        setOrdersList(
          allOrders.filter(
            (o) =>
              o.userEmail &&
              o.userEmail.toLowerCase() === currentUser.email.toLowerCase()
          )
        );
      } else {
        setOrdersList(allOrders);
      }
    } catch (e) {
      console.error("Error reading orders", e);
      setOrdersList([]);
    }
  }, [currentUser, isAdmin]);

  const handleReorder = (order) => {
    reorder(order);
    navigate("/cart");
  };

  return (
    <main className="page">
      <div className="container">
        <div className="pageTitle">
          <h1>{isAdmin ? "All Customer Orders" : "My Orders"}</h1>
          <p className="muted">Track, review and reorder your past favourite meals.</p>
        </div>

        {ordersList.length === 0 ? (
          <div className="panel" style={{ textAlign: "center", padding: "60px 20px" }}>
            <div style={{ fontSize: "50px", marginBottom: "14px" }}>📦</div>
            <h2>No orders yet</h2>
            <p className="muted" style={{ margin: "8px auto 20px", maxWidth: "420px" }}>
              Ready to enjoy some mouth-watering food? Browse our top restaurants and food items.
            </p>
            <Link className="btn primary" to="/user">
              Browse Food Menu
            </Link>
          </div>
        ) : (
          <div style={{ display: "grid", gap: "16px" }}>
            {ordersList.map((o) => (
              <div key={o.id} className="order">
                <div className="row">
                  <div>
                    <b>Order #{o.id}</b>
                    <div className="muted">{o.date}</div>
                    {isAdmin && (
                      <div style={{ fontSize: "12px", color: "var(--muted)", marginTop: "4px" }}>
                        Customer: <b>{o.userName}</b> ({o.userEmail})
                      </div>
                    )}
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span className="status">● {o.status || "Preparing"}</span>
                    <div
                      style={{
                        fontSize: "20px",
                        fontWeight: 900,
                        color: "var(--p)",
                        marginTop: "2px"
                      }}
                    >
                      ₹{o.total}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    margin: "12px 0",
                    padding: "10px 14px",
                    background: "#fafafa",
                    borderRadius: "12px",
                    fontSize: "14px"
                  }}
                >
                  <div style={{ fontWeight: 800, fontSize: "13px", marginBottom: "4px" }}>
                    Items:
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {o.items?.map((item, idx) => (
                      <span
                        key={idx}
                        className="pill"
                        style={{ background: "#fff", border: "1px solid var(--line)" }}
                      >
                        {item.qty} × {item.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "10px",
                    borderTop: "1px solid var(--line)",
                    paddingTop: "12px"
                  }}
                >
                  <div style={{ fontSize: "13px", color: "var(--muted)" }}>
                    📍 {o.address}
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <Link
                      className="btn light"
                      to={`/order-tracking?id=${o.id}`}
                    >
                      🛵 Track live
                    </Link>
                    <button
                      type="button"
                      className="btn primary"
                      onClick={() => handleReorder(o)}
                    >
                      ↻ Reorder
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Orders;

