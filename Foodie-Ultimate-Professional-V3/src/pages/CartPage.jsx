import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export const CartPage = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    delivery,
    platformFee,
    taxes,
    discount,
    total,
    checkout
  } = useCart();

  const navigate = useNavigate();

  const [deliveryName, setDeliveryName] = useState(currentUser?.name || "");
  const [deliveryPhone, setDeliveryPhone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCheckout = (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!isAuthenticated) {
      navigate("/login?next=/cart");
      return;
    }

    if (!deliveryName.trim()) {
      setErrorMsg("Please enter the recipient's name.");
      return;
    }

    if (!deliveryPhone.trim() || deliveryPhone.replace(/\D/g, "").length < 10) {
      setErrorMsg("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!deliveryAddress.trim() || deliveryAddress.trim().length < 8) {
      setErrorMsg("Please enter a detailed delivery address (at least 8 characters).");
      return;
    }

    setIsSubmitting(true);
    const result = checkout({
      name: deliveryName.trim(),
      phone: deliveryPhone.trim(),
      address: deliveryAddress.trim()
    });
    setIsSubmitting(false);

    if (result.success) {
      navigate(`/order-tracking?id=${result.order.id}`);
    } else {
      setErrorMsg(result.message);
    }
  };

  if (cart.length === 0) {
    return (
      <main className="page">
        <div className="container">
          <div className="pageTitle">
            <h1>Your smart cart</h1>
            <p className="muted">Transparent pricing, automatic savings and easy quantity control.</p>
          </div>

          <div className="panel" style={{ textAlign: "center", padding: "60px 20px" }}>
            <div style={{ fontSize: "56px", marginBottom: "16px" }}>🛒</div>
            <h2>Your cart is currently empty</h2>
            <p className="muted" style={{ maxWidth: "460px", margin: "8px auto 24px" }}>
              Explore our chef-curated restaurants and food items to add your favourite dishes.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
              <Link className="btn primary" to="/user">
                Browse Food Menu
              </Link>
              <Link className="btn light" to="/restaurants">
                View Restaurants
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="page">
      <div className="container">
        <div className="pageTitle">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <h1>Your smart cart 🛒</h1>
              <p className="muted">Transparent pricing, automatic savings and live quantity controls.</p>
            </div>
            <button
              type="button"
              className="btn light"
              onClick={clearCart}
              style={{ color: "#b42318", fontSize: "13px" }}
            >
              Clear Cart
            </button>
          </div>
        </div>

        <div className="menuLayout">
          {/* Cart Items List */}
          <section>
            <div className="panel" style={{ padding: "16px 20px" }}>
              <h2 style={{ fontSize: "20px", marginBottom: "14px" }}>
                Items in Cart ({cart.reduce((c, i) => c + i.qty, 0)})
              </h2>

              {cart.map((item) => (
                <div key={item.id} className="cartline">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "14px"
                    }}
                  >
                    {item.img && (
                      <img
                        src={item.img}
                        alt={item.name}
                        style={{
                          width: "68px",
                          height: "68px",
                          borderRadius: "10px",
                          objectFit: "cover"
                        }}
                      />
                    )}

                    <div style={{ flex: 1 }}>
                      <b style={{ fontSize: "16px" }}>{item.name}</b>
                      <div className="muted" style={{ fontSize: "13px" }}>
                        ₹{item.price} each
                      </div>

                      <div className="qty" style={{ marginTop: "8px" }}>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, -1)}
                          title="Decrease quantity"
                        >
                          −
                        </button>
                        <span style={{ fontWeight: 800, minWidth: "22px", textAlign: "center" }}>
                          {item.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, 1)}
                          title="Increase quantity"
                        >
                          +
                        </button>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          style={{
                            width: "auto",
                            padding: "0 8px",
                            background: "none",
                            color: "#b42318",
                            fontSize: "12px",
                            marginLeft: "6px"
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    <div style={{ textAlign: "right" }}>
                      <b style={{ fontSize: "16px", color: "var(--p)" }}>
                        ₹{item.price * item.qty}
                      </b>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Delivery Address Section */}
            <div className="panel" style={{ marginTop: "20px" }}>
              <h2 style={{ fontSize: "20px", marginBottom: "12px" }}>
                📍 Delivery Information
              </h2>

              {!isAuthenticated && (
                <div
                  style={{
                    padding: "12px 14px",
                    background: "#fff7ed",
                    border: "1px solid #ffedd5",
                    borderRadius: "10px",
                    fontSize: "13px",
                    marginBottom: "14px",
                    color: "#9a3412"
                  }}
                >
                  ⚡ Please <Link to="/login?next=/cart" style={{ fontWeight: 800, textDecoration: "underline" }}>Login</Link> or <Link to="/signup" style={{ fontWeight: 800, textDecoration: "underline" }}>Sign Up</Link> to associate this order with your profile.
                </div>
              )}

              <form onSubmit={handleCheckout}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "14px"
                  }}
                >
                  <div className="field" style={{ margin: 0 }}>
                    <label>Recipient Name *</label>
                    <input
                      className="input"
                      type="text"
                      placeholder="e.g. Alex Johnson"
                      value={deliveryName}
                      onChange={(e) => setDeliveryName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="field" style={{ margin: 0 }}>
                    <label>10-Digit Mobile Number *</label>
                    <input
                      className="input"
                      type="tel"
                      placeholder="e.g. 9876543210"
                      value={deliveryPhone}
                      onChange={(e) => setDeliveryPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="field" style={{ marginTop: "14px" }}>
                  <label>Full Delivery Address *</label>
                  <textarea
                    className="textarea"
                    rows="3"
                    placeholder="House / Flat No., Apartment / Building Name, Street, Landmark, Area, City"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    required
                  />
                </div>

                {errorMsg && (
                  <div className="error" style={{ margin: "10px 0" }}>
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn primary"
                  style={{ width: "100%", marginTop: "16px", padding: "14px" }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Placing Order..." : `Place Order Securely (₹${total})`}
                </button>
              </form>
            </div>
          </section>

          {/* Bill Summary Sidebar */}
          <aside className="panel sticky">
            <h2>Bill Details</h2>

            <div style={{ marginTop: "16px" }}>
              <div className="sumrow">
                <span>Items Subtotal</span>
                <b>₹{subtotal}</b>
              </div>
              <div className="sumrow">
                <span>Delivery Fee</span>
                <b>{delivery === 0 ? "FREE" : `₹${delivery}`}</b>
              </div>
              <div className="sumrow">
                <span>Platform Fee</span>
                <b>₹{platformFee}</b>
              </div>
              <div className="sumrow">
                <span>Taxes & Charges (5%)</span>
                <b>₹{taxes}</b>
              </div>
              {discount > 0 && (
                <div className="sumrow" style={{ color: "var(--green)" }}>
                  <span>Special Feast Discount</span>
                  <b>−₹{discount}</b>
                </div>
              )}
              <div className="sumrow total">
                <span>To Pay</span>
                <b style={{ color: "var(--p)", fontSize: "22px" }}>₹{total}</b>
              </div>
            </div>

            <div
              style={{
                marginTop: "16px",
                padding: "12px",
                background: "#f0fdf4",
                borderRadius: "12px",
                border: "1px solid #bbf7d0",
                fontSize: "12px",
                color: "#166534"
              }}
            >
              🎉 Free delivery on orders above ₹499 • ₹50 OFF applied on orders above ₹500!
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default CartPage;

