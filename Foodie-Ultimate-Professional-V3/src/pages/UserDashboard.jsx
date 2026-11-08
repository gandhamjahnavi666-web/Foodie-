import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useFood } from "../context/FoodContext";
import { useCart } from "../context/CartContext";
import { CATEGORIES } from "../data/initialData";

export const UserDashboard = () => {
  const { currentUser } = useAuth();
  const { foodItems } = useFood();
  const {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    cartCount,
    subtotal,
    delivery,
    platformFee,
    taxes,
    discount,
    total,
    checkout,
    reorder
  } = useCart();

  const [activeTab, setActiveTab] = useState("menu"); // "menu" | "orders"
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("recommended");

  // Checkout modal / inline form state
  const [showCheckout, setShowCheckout] = useState(false);
  const [deliveryName, setDeliveryName] = useState(currentUser?.name || "");
  const [deliveryPhone, setDeliveryPhone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [checkoutError, setCheckoutError] = useState("");
  const [orderSuccess, setOrderSuccess] = useState(null);

  // User's personal order history (filtered by currentUser.email)
  const [userOrders, setUserOrders] = useState([]);

  const loadPersonalOrders = () => {
    try {
      const allOrders = JSON.parse(localStorage.getItem("orders") || "[]");
      const filtered = allOrders.filter(
        (o) =>
          o.userEmail &&
          currentUser?.email &&
          o.userEmail.toLowerCase() === currentUser.email.toLowerCase()
      );
      setUserOrders(filtered);
    } catch (e) {
      console.error("Error reading user orders", e);
      setUserOrders([]);
    }
  };

  useEffect(() => {
    loadPersonalOrders();
  }, [currentUser, activeTab, orderSuccess]);

  // Filter & Search food items
  const filteredFoodItems = foodItems
    .filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.desc && item.desc.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
      return 0; // default order
    });

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    setCheckoutError("");

    if (!deliveryName.trim()) {
      setCheckoutError("Please provide your delivery recipient name.");
      return;
    }
    if (!deliveryPhone.trim() || deliveryPhone.replace(/\D/g, "").length < 10) {
      setCheckoutError("Please provide a valid 10-digit phone number.");
      return;
    }
    if (!deliveryAddress.trim() || deliveryAddress.trim().length < 6) {
      setCheckoutError("Please provide a complete delivery address.");
      return;
    }

    const res = checkout({
      address: deliveryAddress.trim(),
      phone: deliveryPhone.trim(),
      name: deliveryName.trim()
    });

    if (res.success) {
      setOrderSuccess(res.order);
      setShowCheckout(false);
      loadPersonalOrders();
      setActiveTab("orders");
    } else {
      setCheckoutError(res.message);
    }
  };

  return (
    <main className="page">
      <div className="container">
        {/* User Welcome Banner */}
        <div className="head" style={{ alignItems: "center" }}>
          <div>
            <span className="eyebrow">CUSTOMER ORDERING PORTAL</span>
            <h1 style={{ fontSize: "36px", margin: "6px 0" }}>
              Welcome, {currentUser?.name}! 👋
            </h1>
            <p className="muted">
              Browse chef-curated food items, build your cart, and track your delicious orders.
            </p>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              type="button"
              className={`btn ${activeTab === "menu" ? "primary" : "light"}`}
              onClick={() => setActiveTab("menu")}
            >
              🍽️ Browse Food Menu
            </button>
            <button
              type="button"
              className={`btn ${activeTab === "orders" ? "primary" : "light"}`}
              onClick={() => setActiveTab("orders")}
            >
              📜 Order History ({userOrders.length})
            </button>
          </div>
        </div>

        {/* ORDER SUCCESS ALERT */}
        {orderSuccess && (
          <div
            className="panel"
            style={{
              background: "linear-gradient(135deg, #ecfdf5, #fff)",
              borderColor: "#a7f3d0",
              marginBottom: "24px",
              padding: "20px 24px"
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <div>
                <span className="pill" style={{ background: "#d1fae5", color: "#065f46" }}>
                  Order Confirmed!
                </span>
                <h3 style={{ margin: "8px 0 4px", fontSize: "20px" }}>
                  Order #{orderSuccess.id} is being prepared 🍳
                </h3>
                <p className="muted" style={{ margin: 0, fontSize: "14px" }}>
                  Total: <b>₹{orderSuccess.total}</b> • Delivering to:{" "}
                  <b>{orderSuccess.address}</b>
                </p>
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <Link
                  className="btn primary"
                  to={`/order-tracking?id=${orderSuccess.id}`}
                  style={{ fontSize: "13px" }}
                >
                  🛵 Live Track
                </Link>
                <button
                  type="button"
                  className="btn light"
                  onClick={() => setOrderSuccess(null)}
                  style={{ fontSize: "13px" }}
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 1: BROWSE FOOD & SHOPPING CART */}
        {activeTab === "menu" && (
          <div>
            {/* Category Quick Pills */}
            <div
              style={{
                display: "flex",
                gap: "8px",
                overflowX: "auto",
                paddingBottom: "12px",
                marginBottom: "16px"
              }}
            >
              <button
                type="button"
                className={`btn ${selectedCategory === "All" ? "primary" : "light"}`}
                onClick={() => setSelectedCategory("All")}
                style={{ borderRadius: "99px", padding: "8px 16px", fontSize: "13px" }}
              >
                ✨ All Items ({foodItems.length})
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.name}
                  type="button"
                  className={`btn ${selectedCategory === cat.name ? "primary" : "light"}`}
                  onClick={() => setSelectedCategory(cat.name)}
                  style={{
                    borderRadius: "99px",
                    padding: "8px 16px",
                    fontSize: "13px",
                    whiteSpace: "nowrap"
                  }}
                >
                  {cat.emoji} {cat.name}
                </button>
              ))}
            </div>

            {/* Toolbar for Search & Sort */}
            <div className="toolbar">
              <input
                className="input"
                type="text"
                placeholder="Search food by name, keywords, or cuisine..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <select
                className="select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="recommended">Recommended</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>

              {searchTerm && (
                <button
                  type="button"
                  className="btn light"
                  onClick={() => setSearchTerm("")}
                >
                  Clear Search
                </button>
              )}
            </div>

            {/* Main Menu Layout: Left Dishes, Right Sticky Cart */}
            <div className="menuLayout">
              {/* Food Items Catalog */}
              <section>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "16px"
                  }}
                >
                  <h2 style={{ fontSize: "22px", margin: 0 }}>
                    {selectedCategory === "All" ? "All Dishes" : selectedCategory} ({filteredFoodItems.length})
                  </h2>
                </div>

                {filteredFoodItems.length === 0 ? (
                  <div className="panel" style={{ textAlign: "center", padding: "50px" }}>
                    <h3>No matching food items</h3>
                    <p className="muted">Try another category or search term.</p>
                    <button
                      type="button"
                      className="btn primary"
                      onClick={() => {
                        setSelectedCategory("All");
                        setSearchTerm("");
                      }}
                    >
                      Reset Filters
                    </button>
                  </div>
                ) : (
                  <div>
                    {filteredFoodItems.map((item) => {
                      const itemInCart = cart.find((i) => i.id === item.id);
                      return (
                        <div key={item.id} className="menuItem">
                          <div style={{ flex: 1, paddingRight: "12px" }}>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                flexWrap: "wrap"
                              }}
                            >
                              <b style={{ fontSize: "17px" }}>{item.name}</b>
                              <span className="rating" style={{ fontSize: "11px" }}>
                                ★ {item.rating || 4.6}
                              </span>
                              <span
                                className="pill"
                                style={{ padding: "2px 8px", fontSize: "11px" }}
                              >
                                {item.category}
                              </span>
                            </div>

                            <div
                              className="price"
                              style={{ color: "var(--p)", fontSize: "17px", marginTop: "4px" }}
                            >
                              ₹{item.price}
                            </div>
                            <div className="desc">{item.desc}</div>

                            <div style={{ marginTop: "10px" }}>
                              {itemInCart ? (
                                <div
                                  className="qty"
                                  style={{
                                    display: "inline-flex",
                                    background: "#fff5f0",
                                    padding: "4px 8px",
                                    borderRadius: "10px",
                                    border: "1px solid #ffd3c2"
                                  }}
                                >
                                  <button
                                    type="button"
                                    onClick={() => updateQuantity(item.id, -1)}
                                    title="Decrease quantity"
                                  >
                                    −
                                  </button>
                                  <span style={{ fontWeight: 800, minWidth: "20px", textAlign: "center" }}>
                                    {itemInCart.qty}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => updateQuantity(item.id, 1)}
                                    title="Increase quantity"
                                  >
                                    +
                                  </button>
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  className="add"
                                  onClick={() => addToCart(item)}
                                >
                                  ＋ Add
                                </button>
                              )}
                            </div>
                          </div>

                          <img
                            src={item.img}
                            alt={item.name}
                            loading="lazy"
                            style={{
                              width: "125px",
                              height: "105px",
                              objectFit: "cover",
                              borderRadius: "12px"
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>

              {/* Sticky Shopping Cart Sidebar */}
              <aside className="panel sticky">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: "1px solid var(--line)",
                    paddingBottom: "12px",
                    marginBottom: "12px"
                  }}
                >
                  <h2 style={{ margin: 0, fontSize: "19px" }}>
                    🛒 Shopping Cart
                  </h2>
                  <span className="cartcount" style={{ fontSize: "12px", padding: "3px 8px" }}>
                    {cartCount} items
                  </span>
                </div>

                {cart.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "30px 10px" }}>
                    <div style={{ fontSize: "36px", marginBottom: "8px" }}>🛒</div>
                    <b>Your cart is empty</b>
                    <p className="muted" style={{ fontSize: "13px", marginTop: "4px" }}>
                      Add delicious dishes from the menu to start your order.
                    </p>
                  </div>
                ) : (
                  <div>
                    {/* Cart Lines with quantity controls & remove */}
                    <div style={{ maxHeight: "280px", overflowY: "auto", paddingRight: "4px" }}>
                      {cart.map((item) => (
                        <div key={item.id} className="cartline">
                          <div className="row" style={{ alignItems: "flex-start" }}>
                            <div style={{ flex: 1 }}>
                              <b style={{ fontSize: "14px" }}>{item.name}</b>
                              <div className="muted" style={{ fontSize: "12px" }}>
                                ₹{item.price} each
                              </div>
                              <div className="qty" style={{ marginTop: "6px" }}>
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.id, -1)}
                                  title="Decrease quantity"
                                >
                                  −
                                </button>
                                <span style={{ fontWeight: 800 }}>{item.qty}</span>
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
                                  title="Remove item"
                                  style={{
                                    width: "auto",
                                    padding: "0 6px",
                                    background: "none",
                                    color: "#b42318",
                                    fontSize: "12px"
                                  }}
                                >
                                  ✕
                                </button>
                              </div>
                            </div>
                            <b style={{ fontSize: "14px" }}>₹{item.price * item.qty}</b>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Live Bill Breakdown */}
                    <div style={{ marginTop: "14px", borderTop: "1px solid var(--line)", paddingTop: "10px" }}>
                      <div className="sumrow">
                        <span>Subtotal</span>
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
                        <span>Taxes (5%)</span>
                        <b>₹{taxes}</b>
                      </div>
                      {discount > 0 && (
                        <div className="sumrow" style={{ color: "var(--green)" }}>
                          <span>Special Discount</span>
                          <b>−₹{discount}</b>
                        </div>
                      )}
                      <div className="sumrow total">
                        <span>Live Total</span>
                        <b style={{ color: "var(--p)", fontSize: "20px" }}>₹{total}</b>
                      </div>
                    </div>

                    {/* Checkout Trigger */}
                    {!showCheckout ? (
                      <button
                        type="button"
                        className="btn primary"
                        style={{ width: "100%", marginTop: "16px" }}
                        onClick={() => setShowCheckout(true)}
                      >
                        Proceed to Checkout (₹{total}) →
                      </button>
                    ) : (
                      <form
                        onSubmit={handleCheckoutSubmit}
                        style={{
                          marginTop: "16px",
                          padding: "14px",
                          background: "#fafafa",
                          borderRadius: "14px",
                          border: "1px solid var(--line)"
                        }}
                      >
                        <div
                          style={{
                            fontWeight: 800,
                            marginBottom: "10px",
                            display: "flex",
                            justifyContent: "space-between"
                          }}
                        >
                          <span>📍 Delivery Information</span>
                          <button
                            type="button"
                            onClick={() => setShowCheckout(false)}
                            style={{
                              background: "none",
                              border: 0,
                              color: "var(--muted)",
                              cursor: "pointer",
                              fontSize: "12px"
                            }}
                          >
                            Hide
                          </button>
                        </div>

                        <div className="field" style={{ margin: "8px 0" }}>
                          <label style={{ fontSize: "12px" }}>Recipient Name</label>
                          <input
                            className="input"
                            type="text"
                            value={deliveryName}
                            onChange={(e) => setDeliveryName(e.target.value)}
                            placeholder="Full Name"
                            style={{ padding: "8px 10px", fontSize: "13px" }}
                            required
                          />
                        </div>

                        <div className="field" style={{ margin: "8px 0" }}>
                          <label style={{ fontSize: "12px" }}>Phone Number</label>
                          <input
                            className="input"
                            type="tel"
                            value={deliveryPhone}
                            onChange={(e) => setDeliveryPhone(e.target.value)}
                            placeholder="10-digit mobile"
                            style={{ padding: "8px 10px", fontSize: "13px" }}
                            required
                          />
                        </div>

                        <div className="field" style={{ margin: "8px 0" }}>
                          <label style={{ fontSize: "12px" }}>Delivery Address</label>
                          <textarea
                            className="textarea"
                            rows="2"
                            value={deliveryAddress}
                            onChange={(e) => setDeliveryAddress(e.target.value)}
                            placeholder="House, Street, Area, City"
                            style={{ padding: "8px 10px", fontSize: "13px" }}
                            required
                          />
                        </div>

                        {checkoutError && (
                          <div className="error" style={{ fontSize: "12px", margin: "6px 0" }}>
                            {checkoutError}
                          </div>
                        )}

                        <button
                          type="submit"
                          className="btn primary"
                          style={{ width: "100%", marginTop: "10px" }}
                        >
                          Confirm & Place Order (₹{total})
                        </button>
                      </form>
                    )}
                  </div>
                )}
              </aside>
            </div>
          </div>
        )}

        {/* TAB 2: PERSONAL ORDER HISTORY */}
        {activeTab === "orders" && (
          <div>
            <div className="head" style={{ marginBottom: "16px" }}>
              <div>
                <h2>My Order History</h2>
                <p className="muted">
                  All past and active orders for <b>{currentUser?.email}</b>
                </p>
              </div>
            </div>

            {userOrders.length === 0 ? (
              <div className="panel" style={{ textAlign: "center", padding: "50px" }}>
                <h2>No orders placed yet 🍽️</h2>
                <p className="muted">
                  Discover tasty meals and place your first order right now!
                </p>
                <button
                  type="button"
                  className="btn primary"
                  onClick={() => setActiveTab("menu")}
                  style={{ marginTop: "12px" }}
                >
                  Browse Food Menu
                </button>
              </div>
            ) : (
              <div style={{ display: "grid", gap: "16px" }}>
                {userOrders.map((order) => (
                  <div key={order.id} className="order">
                    <div className="row">
                      <div>
                        <b>Order #{order.id}</b>
                        <div className="muted">{order.date}</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <span className="status">● {order.status || "Preparing"}</span>
                        <div
                          style={{
                            fontSize: "20px",
                            fontWeight: 900,
                            color: "var(--p)",
                            marginTop: "2px"
                          }}
                        >
                          ₹{order.total}
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        margin: "14px 0",
                        padding: "12px 14px",
                        background: "#fafafa",
                        borderRadius: "12px",
                        fontSize: "14px"
                      }}
                    >
                      <div style={{ fontWeight: 800, marginBottom: "6px", fontSize: "13px" }}>
                        Dishes Ordered:
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                        {order.items &&
                          order.items.map((it, idx) => (
                            <span
                              key={idx}
                              className="pill"
                              style={{ background: "#fff", border: "1px solid var(--line)" }}
                            >
                              {it.qty} × {it.name} (₹{it.price * it.qty})
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
                        Delivering to: <b>{order.address}</b>
                      </div>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <Link
                          className="btn light"
                          to={`/order-tracking?id=${order.id}`}
                          style={{ fontSize: "13px", padding: "8px 14px" }}
                        >
                          🛵 Track Live
                        </Link>
                        <button
                          type="button"
                          className="btn primary"
                          onClick={() => {
                            reorder(order);
                            setActiveTab("menu");
                          }}
                          style={{ fontSize: "13px", padding: "8px 14px" }}
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
        )}
      </div>
    </main>
  );
};

export default UserDashboard;

