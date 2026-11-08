import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export const OrderTracking = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const targetId = searchParams.get("id");

  const [order, setOrder] = useState(null);
  const [partnerPos, setPartnerPos] = useState({ left: 68, top: 34 });
  const [eta, setEta] = useState(18);

  useEffect(() => {
    try {
      const allOrders = JSON.parse(localStorage.getItem("orders") || "[]");
      const found = targetId
        ? allOrders.find((o) => o.id === targetId)
        : allOrders[0];
      setOrder(found || null);
    } catch (e) {
      console.error("Error reading order for tracking", e);
    }
  }, [targetId]);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 20000; // 20s animation cycle

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(1, elapsed / duration);

      // Rider moves from (68%, 34%) to (26%, 58%)
      const currentLeft = 68 - progress * 42;
      const currentTop = 34 + progress * 24;
      setPartnerPos({ left: currentLeft, top: currentTop });

      const remainingMin = Math.max(1, Math.ceil((1 - progress) * 18));
      setEta(remainingMin);

      if (progress >= 1) {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="page">
      <div className="container">
        <div className="pageTitle">
          <h1>Live delivery tracking 🛵</h1>
          <p className="muted">
            Order #{order?.id || "FD248910"} • ETA <b>{eta} min</b>
          </p>
        </div>

        <div className="panel">
          {/* Simulated Map */}
          <div className="map">
            <div className="road" />
            <div className="pin userPin" title="Your delivery point" />
            <div
              className="pin partnerPin"
              title="Delivery partner"
              style={{
                left: `${partnerPos.left}%`,
                top: `${partnerPos.top}%`,
                transition: "left 0.1s linear, top 0.1s linear"
              }}
            />
            <div className="mapcard">
              🛵 <b>Partner is on the move</b>
              <br />
              <span className="muted">ETA: ~{eta} min to your doorstep</span>
            </div>
          </div>

          {/* Progress Timeline */}
          <div className="timeline">
            <div className="step done">
              <div className="dot" />
              <small>Order placed</small>
            </div>
            <div className="step done">
              <div className="dot" />
              <small>Preparing food</small>
            </div>
            <div className={`step ${eta <= 12 ? "done" : ""}`}>
              <div className="dot" />
              <small>Picked up</small>
            </div>
            <div className={`step ${eta <= 1 ? "done" : ""}`}>
              <div className="dot" />
              <small>Delivered</small>
            </div>
          </div>

          {/* Delivery Partner Details */}
          <div
            className="row"
            style={{
              borderTop: "1px solid var(--line)",
              paddingTop: "18px",
              marginTop: "10px"
            }}
          >
            <div>
              <b>Assigned Delivery Partner</b>
              <p className="muted" style={{ margin: "4px 0 0" }}>
                Ramesh Kumar • ★ 4.9 • Electric Vehicle • Helmet Verified
              </p>
              {order?.address && (
                <small style={{ color: "var(--muted)", display: "block", marginTop: "4px" }}>
                  Destination: {order.address}
                </small>
              )}
            </div>

            <div style={{ textAlign: "right" }}>
              {order && (
                <div style={{ fontSize: "20px", fontWeight: 900, color: "var(--p)" }}>
                  ₹{order.total}
                </div>
              )}
              <Link className="btn light" to="/orders" style={{ marginTop: "6px" }}>
                View all orders
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default OrderTracking;

