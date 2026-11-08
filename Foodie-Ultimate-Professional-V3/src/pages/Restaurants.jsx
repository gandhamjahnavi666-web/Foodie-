import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useFood } from "../context/FoodContext";
import { useCart } from "../context/CartContext";
import { INITIAL_RESTAURANTS } from "../data/initialData";

export const Restaurants = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialSearch = searchParams.get("search") || "";
  const selectedRestId = searchParams.get("id");

  const { foodItems } = useFood();
  const { addToCart } = useCart();

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [sortBy, setSortBy] = useState("");
  const [activeRestaurant, setActiveRestaurant] = useState(
    selectedRestId ? Number(selectedRestId) : null
  );

  const filteredRestaurants = INITIAL_RESTAURANTS.filter((r) => {
    const text = `${r.name} ${r.cuisine}`.toLowerCase();
    return text.includes(searchTerm.toLowerCase());
  }).sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "fast") return parseInt(a.time) - parseInt(b.time);
    return 0;
  });

  const selectedRest = INITIAL_RESTAURANTS.find((r) => r.id === activeRestaurant);
  const restaurantDishes = activeRestaurant
    ? foodItems.filter((item) => item.restaurantId === activeRestaurant || item.restaurantName === selectedRest?.name)
    : [];

  return (
    <main className="page">
      <div className="container">
        {activeRestaurant && selectedRest ? (
          <div>
            <button
              type="button"
              className="btn light"
              onClick={() => setActiveRestaurant(null)}
              style={{ marginBottom: "16px" }}
            >
              ← Back to all restaurants
            </button>

            <div className="pageTitle">
              <h1>{selectedRest.name}</h1>
              <p className="muted">
                {selectedRest.cuisine} • ★ {selectedRest.rating} • {selectedRest.time} •{" "}
                <span className="pill">{selectedRest.offer}</span>
              </p>
            </div>

            <div className="menuLayout">
              <section>
                <h2>Popular Dishes ({restaurantDishes.length || foodItems.length})</h2>
                <div style={{ marginTop: "16px" }}>
                  {(restaurantDishes.length > 0 ? restaurantDishes : foodItems.slice(0, 6)).map((item) => (
                    <div key={item.id} className="menuItem">
                      <div style={{ flex: 1, paddingRight: "14px" }}>
                        <b>{item.name}</b>
                        <div className="price" style={{ color: "var(--p)" }}>
                          ₹{item.price}
                        </div>
                        <div className="desc">{item.desc}</div>
                        <button
                          type="button"
                          className="add"
                          onClick={() => addToCart(item)}
                        >
                          ＋ Add
                        </button>
                      </div>
                      <img
                        src={item.img}
                        alt={item.name}
                        style={{
                          width: "125px",
                          height: "105px",
                          objectFit: "cover",
                          borderRadius: "12px"
                        }}
                      />
                    </div>
                  ))}
                </div>
              </section>

              <aside className="panel sticky">
                <h2>Restaurant Info</h2>
                <p className="muted" style={{ fontSize: "14px", marginTop: "8px" }}>
                  Serving authentic meals fresh to your door. All deliveries are sealed and contact-free.
                </p>
                <div style={{ marginTop: "16px" }}>
                  <div className="row">
                    <span>Average Delivery</span>
                    <b>{selectedRest.time}</b>
                  </div>
                  <div className="row" style={{ marginTop: "8px" }}>
                    <span>Rating</span>
                    <b>★ {selectedRest.rating} / 5</b>
                  </div>
                  <div className="row" style={{ marginTop: "8px" }}>
                    <span>Special Deal</span>
                    <b style={{ color: "var(--p)" }}>{selectedRest.offer}</b>
                  </div>
                </div>
                <Link
                  className="btn primary"
                  to="/cart"
                  style={{ width: "100%", marginTop: "20px" }}
                >
                  View My Cart →
                </Link>
              </aside>
            </div>
          </div>
        ) : (
          <div>
            <div className="pageTitle">
              <h1>Discover restaurants</h1>
              <p className="muted">Search, sort and find your next favourite meal.</p>
            </div>

            <div className="toolbar">
              <input
                id="search"
                className="input"
                placeholder="Search restaurants or cuisines (e.g. Biryani, Italian, Salads)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <select
                id="sort"
                className="select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="">Recommended</option>
                <option value="rating">Highest rated</option>
                <option value="fast">Fastest delivery</option>
              </select>

              <Link className="btn light" to="/offers">
                🎁 Offers
              </Link>
            </div>

            {filteredRestaurants.length === 0 ? (
              <div className="panel" style={{ textAlign: "center", padding: "50px" }}>
                <h2>No restaurants found</h2>
                <p className="muted">Try adjusting your search criteria.</p>
                <button
                  type="button"
                  className="btn primary"
                  onClick={() => setSearchTerm("")}
                  style={{ marginTop: "10px" }}
                >
                  Clear Search
                </button>
              </div>
            ) : (
              <div id="restGrid" className="grid">
                {filteredRestaurants.map((r) => (
                  <article
                    key={r.id}
                    className="rest"
                    onClick={() => setActiveRestaurant(r.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <div
                      className="restimg"
                      style={{ backgroundImage: `url('${r.img}')` }}
                    >
                      <span className="badge">{r.offer}</span>
                    </div>
                    <div className="restbody">
                      <h3>{r.name}</h3>
                      <div className="meta">{r.cuisine}</div>
                      <div className="row" style={{ marginTop: "13px" }}>
                        <span className="rating">★ {r.rating}</span>
                        <span className="meta">{r.time}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default Restaurants;

