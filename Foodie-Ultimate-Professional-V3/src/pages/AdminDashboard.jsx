import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useFood } from "../context/FoodContext";
import { CATEGORIES } from "../data/initialData";

export const AdminDashboard = () => {
  const { currentUser, getAllUsers } = useAuth();
  const { foodItems, addFoodItem, updateFoodItem, deleteFoodItem } = useFood();

  const [activeTab, setActiveTab] = useState("items"); // "items" | "orders" | "users"
  const [orders, setOrders] = useState([]);
  const [usersList, setUsersList] = useState([]);

  // Form State for Food Item (Add/Edit)
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "Biryani",
    price: "",
    desc: "",
    img: "",
    restaurantName: "Spice Route",
    rating: 4.7
  });
  const [formMsg, setFormMsg] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  // Search and filter within Admin items view
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Load orders and users from LocalStorage
  const loadOrdersAndUsers = () => {
    try {
      const storedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
      setOrders(storedOrders);
    } catch (e) {
      console.error("Error reading orders", e);
      setOrders([]);
    }

    try {
      const users = getAllUsers();
      setUsersList(users);
    } catch (e) {
      console.error("Error reading users", e);
      setUsersList([]);
    }
  };

  useEffect(() => {
    loadOrdersAndUsers();
  }, [activeTab]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStartAdd = () => {
    setIsEditing(false);
    setEditId(null);
    setFormData({
      name: "",
      category: "Biryani",
      price: "",
      desc: "",
      img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80",
      restaurantName: "Spice Route",
      rating: 4.8
    });
    setFormMsg("");
    setFormSuccess("");
  };

  const handleStartEdit = (item) => {
    setIsEditing(true);
    setEditId(item.id);
    setFormData({
      name: item.name,
      category: item.category || "Biryani",
      price: item.price,
      desc: item.desc || "",
      img: item.img || "",
      restaurantName: item.restaurantName || "Spice Route",
      rating: item.rating || 4.7
    });
    setFormMsg("");
    setFormSuccess("");
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  const handleCancelForm = () => {
    setIsEditing(false);
    setEditId(null);
    setFormData({
      name: "",
      category: "Biryani",
      price: "",
      desc: "",
      img: "",
      restaurantName: "Spice Route",
      rating: 4.7
    });
    setFormMsg("");
    setFormSuccess("");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormMsg("");
    setFormSuccess("");

    if (!formData.name.trim()) {
      setFormMsg("Item name is required.");
      return;
    }
    if (!formData.price || Number(formData.price) <= 0) {
      setFormMsg("Please enter a valid price greater than 0.");
      return;
    }

    if (isEditing && editId !== null) {
      updateFoodItem(editId, {
        name: formData.name.trim(),
        category: formData.category,
        price: Number(formData.price),
        desc: formData.desc.trim(),
        img: formData.img.trim() || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80",
        restaurantName: formData.restaurantName.trim(),
        rating: Number(formData.rating) || 4.7
      });
      setFormSuccess("Food item updated successfully!");
      setIsEditing(false);
      setEditId(null);
    } else {
      addFoodItem({
        name: formData.name.trim(),
        category: formData.category,
        price: Number(formData.price),
        desc: formData.desc.trim(),
        img: formData.img.trim() || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80",
        restaurantName: formData.restaurantName.trim() || "Foodie Central",
        rating: Number(formData.rating) || 4.8
      });
      setFormSuccess("New food item added to inventory!");
      handleStartAdd();
    }
  };

  const handleDeleteItem = (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}" from food items?`)) {
      deleteFoodItem(id);
      setFormSuccess(`"${name}" was deleted successfully.`);
      if (editId === id) {
        handleCancelForm();
      }
    }
  };

  const filteredItems = foodItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.desc && item.desc.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.category && item.category.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory =
      categoryFilter === "All" || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="page">
      <div className="container">
        {/* Admin Header Banner */}
        <div className="head" style={{ alignItems: "center" }}>
          <div>
            <span className="eyebrow">ADMINISTRATION CONTROL PANEL</span>
            <h1 style={{ fontSize: "36px", margin: "6px 0" }}>Admin Dashboard</h1>
            <p className="muted">
              Logged in as <b>{currentUser?.name}</b> ({currentUser?.email}) • Role:{" "}
              <span className="pill" style={{ background: "#fee2e2", color: "#b91c1c" }}>
                Admin
              </span>
            </p>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              type="button"
              className={`btn ${activeTab === "items" ? "primary" : "light"}`}
              onClick={() => setActiveTab("items")}
            >
              🍲 Food Items ({foodItems.length})
            </button>
            <button
              type="button"
              className={`btn ${activeTab === "orders" ? "primary" : "light"}`}
              onClick={() => setActiveTab("orders")}
            >
              📦 Customer Orders ({orders.length})
            </button>
            <button
              type="button"
              className={`btn ${activeTab === "users" ? "primary" : "light"}`}
              onClick={() => setActiveTab("users")}
            >
              👥 Registered Users ({usersList.length})
            </button>
          </div>
        </div>

        {/* TAB 1: FOOD ITEMS MANAGEMENT */}
        {activeTab === "items" && (
          <div>
            {/* Add / Edit Food Item Panel */}
            <div className="panel" style={{ marginBottom: "26px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "1px solid var(--line)",
                  paddingBottom: "12px",
                  marginBottom: "16px"
                }}
              >
                <h2 style={{ fontSize: "20px", margin: 0 }}>
                  {isEditing ? `✏️ Edit Food Item #${editId}` : "➕ Add New Food Item"}
                </h2>
                {isEditing && (
                  <button
                    type="button"
                    className="btn light"
                    onClick={handleCancelForm}
                    style={{ fontSize: "12px", padding: "6px 12px" }}
                  >
                    Cancel Edit
                  </button>
                )}
              </div>

              {formSuccess && (
                <div
                  className="success"
                  style={{
                    padding: "10px 14px",
                    background: "#ecfdf5",
                    borderRadius: "10px",
                    marginBottom: "14px"
                  }}
                >
                  ✓ {formSuccess}
                </div>
              )}
              {formMsg && (
                <div
                  className="error"
                  style={{
                    padding: "10px 14px",
                    background: "#fef2f2",
                    borderRadius: "10px",
                    marginBottom: "14px"
                  }}
                >
                  ⚠ {formMsg}
                </div>
              )}

              <form onSubmit={handleFormSubmit}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                    gap: "16px"
                  }}
                >
                  <div className="field" style={{ margin: 0 }}>
                    <label>Item Name *</label>
                    <input
                      name="name"
                      className="input"
                      type="text"
                      placeholder="e.g. Special Hyderabadi Biryani"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="field" style={{ margin: 0 }}>
                    <label>Category *</label>
                    <select
                      name="category"
                      className="select"
                      style={{ width: "100%", background: "#fff" }}
                      value={formData.category}
                      onChange={handleInputChange}
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat.name} value={cat.name}>
                          {cat.emoji} {cat.name}
                        </option>
                      ))}
                      <option value="Seafood">🦐 Seafood</option>
                      <option value="Fast Food">🍟 Fast Food</option>
                    </select>
                  </div>

                  <div className="field" style={{ margin: 0 }}>
                    <label>Price (₹) *</label>
                    <input
                      name="price"
                      className="input"
                      type="number"
                      min="1"
                      placeholder="e.g. 240"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="field" style={{ margin: 0 }}>
                    <label>Restaurant Name</label>
                    <input
                      name="restaurantName"
                      className="input"
                      type="text"
                      placeholder="e.g. Spice Route"
                      value={formData.restaurantName}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="field" style={{ margin: 0 }}>
                    <label>Rating (1.0 - 5.0)</label>
                    <input
                      name="rating"
                      className="input"
                      type="number"
                      step="0.1"
                      min="1"
                      max="5"
                      value={formData.rating}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="field" style={{ margin: 0 }}>
                    <label>Image URL</label>
                    <input
                      name="img"
                      className="input"
                      type="url"
                      placeholder="https://..."
                      value={formData.img}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="field" style={{ marginTop: "14px", marginBottom: "16px" }}>
                  <label>Description</label>
                  <textarea
                    name="desc"
                    className="textarea"
                    rows="2"
                    placeholder="Short description of ingredients and taste..."
                    value={formData.desc}
                    onChange={handleInputChange}
                  />
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                  <button type="submit" className="btn primary">
                    {isEditing ? "Save Changes" : "＋ Add Item to FoodItems"}
                  </button>
                  {isEditing && (
                    <button
                      type="button"
                      className="btn light"
                      onClick={handleCancelForm}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Toolbar for Searching and Filtering Items */}
            <div className="toolbar">
              <input
                className="input"
                type="text"
                placeholder="Search food items by name, category, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <select
                className="select"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="All">All Categories ({foodItems.length})</option>
                {CATEGORIES.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.emoji} {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Food Items Display */}
            {filteredItems.length === 0 ? (
              <div className="panel" style={{ textAlign: "center", padding: "40px" }}>
                <h3>No food items found matching your filters</h3>
                <p className="muted">Try adjusting your search query or add a new item.</p>
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                  gap: "18px"
                }}
              >
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="menuItem"
                    style={{
                      flexDirection: "column",
                      justifyContent: "space-between",
                      position: "relative"
                    }}
                  >
                    <div style={{ display: "flex", gap: "14px" }}>
                      <img
                        src={item.img}
                        alt={item.name}
                        style={{
                          width: "95px",
                          height: "95px",
                          borderRadius: "12px",
                          objectFit: "cover"
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start"
                          }}
                        >
                          <b style={{ fontSize: "16px" }}>{item.name}</b>
                          <span className="rating" style={{ fontSize: "11px" }}>
                            ★ {item.rating || 4.5}
                          </span>
                        </div>
                        <div
                          style={{
                            fontSize: "12px",
                            color: "var(--muted)",
                            marginTop: "3px"
                          }}
                        >
                          {item.restaurantName || "Foodie Special"} •{" "}
                          <span
                            className="pill"
                            style={{
                              padding: "2px 8px",
                              fontSize: "10px",
                              verticalAlign: "middle"
                            }}
                          >
                            {item.category || "General"}
                          </span>
                        </div>
                        <div className="price" style={{ color: "var(--p)", fontSize: "17px" }}>
                          ₹{item.price}
                        </div>
                      </div>
                    </div>

                    <p
                      className="desc"
                      style={{
                        margin: "10px 0",
                        fontSize: "13px",
                        lineHeight: 1.4,
                        minHeight: "36px"
                      }}
                    >
                      {item.desc || "No description provided."}
                    </p>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: "8px",
                        borderTop: "1px solid var(--line)",
                        paddingTop: "10px"
                      }}
                    >
                      <button
                        type="button"
                        className="btn light"
                        onClick={() => handleStartEdit(item)}
                        style={{ padding: "6px 12px", fontSize: "12px" }}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        type="button"
                        className="btn light"
                        onClick={() => handleDeleteItem(item.id, item.name)}
                        style={{
                          padding: "6px 12px",
                          fontSize: "12px",
                          color: "#b42318",
                          borderColor: "#fecaca"
                        }}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: ALL CUSTOMER ORDERS */}
        {activeTab === "orders" && (
          <div>
            <div className="head" style={{ marginBottom: "16px" }}>
              <div>
                <h2>Customer Orders Log</h2>
                <p className="muted">
                  Showing all orders placed through the user module ({orders.length} total)
                </p>
              </div>
            </div>

            {orders.length === 0 ? (
              <div className="panel" style={{ textAlign: "center", padding: "50px" }}>
                <h2>No customer orders yet 📦</h2>
                <p className="muted">
                  Orders placed by customers through the cart will appear here in real-time.
                </p>
              </div>
            ) : (
              <div style={{ display: "grid", gap: "16px" }}>
                {orders.map((order) => (
                  <div key={order.id} className="order">
                    <div className="row">
                      <div>
                        <b>Order #{order.id}</b>
                        <div className="muted">{order.date}</div>
                        <div style={{ fontSize: "13px", marginTop: "4px" }}>
                          Customer: <b>{order.userName}</b> ({order.userEmail})
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <span className="status">● {order.status || "Preparing"}</span>
                        <div
                          style={{
                            fontSize: "19px",
                            fontWeight: 900,
                            color: "var(--p)",
                            marginTop: "4px"
                          }}
                        >
                          ₹{order.total}
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        margin: "12px 0",
                        padding: "10px 14px",
                        background: "#fafafa",
                        borderRadius: "10px",
                        fontSize: "13px"
                      }}
                    >
                      <div style={{ fontWeight: 800, marginBottom: "4px" }}>Items Ordered:</div>
                      {order.items && order.items.length > 0 ? (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                          {order.items.map((it, idx) => (
                            <span
                              key={idx}
                              className="pill"
                              style={{ background: "#fff", border: "1px solid var(--line)" }}
                            >
                              {it.qty} × {it.name} (₹{it.price * it.qty})
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="muted">No item details</span>
                      )}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        fontSize: "12px",
                        color: "var(--muted)"
                      }}
                    >
                      <div>
                        📍 Address: <b>{order.address || "Standard Delivery"}</b> • Phone:{" "}
                        <b>{order.phone || "N/A"}</b>
                      </div>
                      <div>
                        Subtotal: ₹{order.subtotal} | Tax: ₹{order.taxes} | Delivery: ₹
                        {order.delivery}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: REGISTERED USERS */}
        {activeTab === "users" && (
          <div>
            <div className="head" style={{ marginBottom: "16px" }}>
              <div>
                <h2>Registered Users Directory</h2>
                <p className="muted">
                  Stored inside "users" in Local Storage ({usersList.length} total)
                </p>
              </div>
            </div>

            <div className="panel" style={{ padding: 0, overflow: "hidden" }}>
              <div style={{ overflowX: "auto" }}>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: "14px",
                    textAlign: "left"
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        background: "#fafafa",
                        borderBottom: "1px solid var(--line)",
                        fontWeight: 800,
                        color: "var(--dark)"
                      }}
                    >
                      <th style={{ padding: "14px 18px" }}>User Name</th>
                      <th style={{ padding: "14px 18px" }}>Email</th>
                      <th style={{ padding: "14px 18px" }}>Role</th>
                      <th style={{ padding: "14px 18px" }}>User ID</th>
                      <th style={{ padding: "14px 18px" }}>Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersList.map((u, i) => (
                      <tr
                        key={u.id || i}
                        style={{
                          borderBottom:
                            i < usersList.length - 1 ? "1px solid var(--line)" : "none"
                        }}
                      >
                        <td style={{ padding: "14px 18px", fontWeight: 800 }}>{u.name}</td>
                        <td style={{ padding: "14px 18px", color: "var(--muted)" }}>{u.email}</td>
                        <td style={{ padding: "14px 18px" }}>
                          <span
                            className="pill"
                            style={{
                              background: u.role === "Admin" ? "#fee2e2" : "#e0f2fe",
                              color: u.role === "Admin" ? "#b91c1c" : "#0369a1"
                            }}
                          >
                            {u.role}
                          </span>
                        </td>
                        <td style={{ padding: "14px 18px", fontSize: "12px", color: "#9ca3af" }}>
                          <code>{u.id}</code>
                        </td>
                        <td style={{ padding: "14px 18px", fontSize: "12px", color: "var(--muted)" }}>
                          {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "Default Seed"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default AdminDashboard;

