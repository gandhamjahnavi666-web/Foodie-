import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFood } from "../context/FoodContext";
import { useCart } from "../context/CartContext";
import { INITIAL_RESTAURANTS, CATEGORIES } from "../data/initialData";

export const Home = () => {
  const { foodItems } = useFood();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [moodType, setMoodType] = useState(null);
  const [moodResults, setMoodResults] = useState([]);
  const [surpriseItem, setSurpriseItem] = useState(null);

  // Combo Builder State
  const [comboMain, setComboMain] = useState(101); // Chicken Biryani
  const [comboSide, setComboSide] = useState(103); // Chicken 65
  const [comboDrink, setComboDrink] = useState("soda"); // Fresh Lime Soda

  const drinks = [
    { id: "soda", name: "Fresh Lime Soda", price: 60 },
    { id: "coffee", name: "Cold Coffee", price: 90 },
    { id: "chaas", name: "Masala Chaas", price: 55 }
  ];

  // Foodie Rewards State
  const [rewardsPoints, setRewardsPoints] = useState(() => {
    return Number(localStorage.getItem("fd_points") || "250");
  });
  const [dailyClaimed, setDailyClaimed] = useState(() => {
    return localStorage.getItem("fd_daily") === new Date().toDateString();
  });

  // Group Room State
  const [groupRoom, setGroupRoom] = useState(null);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/restaurants?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleMoodSelect = (type) => {
    setMoodType(type);
    setSurpriseItem(null);

    const moodMap = {
      Hungry: ["Biryani", "Burger", "Pizza"],
      Spicy: ["Biryani", "Curry", "Noodles", "Chicken"],
      Healthy: ["Healthy", "Salad"],
      Sweet: ["Desserts", "Sweet", "Jamun"],
      Quick: ["Burger", "Fries", "Noodles"],
      Chill: ["Desserts", "Naan", "Salad"]
    };

    const keywords = moodMap[type] || [];
    const matches = foodItems.filter((item) => {
      const text = `${item.name} ${item.desc} ${item.category}`.toLowerCase();
      return keywords.some((k) => text.includes(k.toLowerCase()));
    });

    setMoodResults(matches.length > 0 ? matches.slice(0, 6) : foodItems.slice(0, 6));
  };

  const handleSurpriseMe = () => {
    const random = foodItems[Math.floor(Math.random() * foodItems.length)];
    setSurpriseItem(random);
    setMoodType(null);
  };

  const handleClaimDaily = () => {
    const today = new Date().toDateString();
    if (localStorage.getItem("fd_daily") === today) {
      alert("Daily bonus already claimed today! ✨");
      return;
    }
    const newPoints = rewardsPoints + 20;
    setRewardsPoints(newPoints);
    localStorage.setItem("fd_points", String(newPoints));
    localStorage.setItem("fd_daily", today);
    setDailyClaimed(true);
  };

  const handleCreateGroup = () => {
    const code = "FD-" + Math.random().toString(36).slice(2, 7).toUpperCase();
    setGroupRoom(code);
  };

  // Calculate Combo
  const selectedMain = foodItems.find((i) => i.id === Number(comboMain)) || foodItems[0];
  const selectedSide = foodItems.find((i) => i.id === Number(comboSide)) || foodItems[2];
  const selectedDrink = drinks.find((d) => d.id === comboDrink) || drinks[0];

  const comboOriginal = (selectedMain?.price || 0) + (selectedSide?.price || 0) + (selectedDrink?.price || 0);
  const comboSavings = Math.min(80, Math.round(comboOriginal * 0.12));
  const comboTotal = comboOriginal - comboSavings;

  const handleAddComboToCart = () => {
    const comboItem = {
      id: "combo-" + Date.now(),
      name: `Custom Combo: ${selectedMain.name} + ${selectedSide.name} + ${selectedDrink.name}`,
      price: comboTotal,
      desc: "Custom built meal combo with special 12% discount",
      img: selectedMain.img,
      category: "Combos"
    };
    addToCart(comboItem);
  };

  return (
    <>
      {/* Hero Section */}
      <header className="hero">
        <div className="container heroGrid">
          <div>
            <div className="eyebrow">SMART • PERSONAL • DELICIOUS</div>
            <h1>
              Food delivery,<br />
              <span>your way.</span>
            </h1>
            <p className="lead">
              Discover food by mood, build your own combo, order together, earn rewards,
              and follow your delivery in simulated real-time.
            </p>

            <form className="search" onSubmit={handleSearchSubmit}>
              <input
                name="q"
                id="mainSearch"
                autoComplete="off"
                placeholder="Search biryani, pizza, burgers or restaurants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="btn primary">
                Search
              </button>
            </form>

            <div className="stats">
              <div>
                <strong>{foodItems.length}+</strong>
                <small> dishes</small>
              </div>
              <div>
                <strong>{INITIAL_RESTAURANTS.length}</strong>
                <small> partner restaurants</small>
              </div>
              <div>
                <strong>4.8★</strong>
                <small> best rating</small>
              </div>
            </div>
          </div>

          <div
            className="heroPhoto"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1100&q=85')"
            }}
          >
            <div className="floating f1">
              ⚡ <b>24 min</b>
              <br />
              <small>smart ETA</small>
            </div>
            <div className="floating f2">
              🎁 <b>₹50 OFF</b>
              <br />
              <small>orders above ₹500</small>
            </div>
          </div>
        </div>
      </header>

      {/* Mood Selector Section */}
      <section className="section">
        <div className="container">
          <div className="head">
            <div>
              <h2>What's your mood today?</h2>
              <p className="muted">Foodie matches your current mood with matching dishes.</p>
            </div>
            <button type="button" className="btn primary" onClick={handleSurpriseMe}>
              🎲 Surprise Me
            </button>
          </div>

          <div className="moodGrid">
            <button type="button" className="mood" onClick={() => handleMoodSelect("Hungry")}>
              😋<b>Hungry</b>
              <small>Big & filling</small>
            </button>
            <button type="button" className="mood" onClick={() => handleMoodSelect("Spicy")}>
              🌶️<b>Spicy</b>
              <small>Bring the heat</small>
            </button>
            <button type="button" className="mood" onClick={() => handleMoodSelect("Healthy")}>
              🥗<b>Healthy</b>
              <small>Fresh & light</small>
            </button>
            <button type="button" className="mood" onClick={() => handleMoodSelect("Sweet")}>
              🍰<b>Sweet</b>
              <small>Dessert time</small>
            </button>
            <button type="button" className="mood" onClick={() => handleMoodSelect("Quick")}>
              ⚡<b>Quick Bite</b>
              <small>Under 25 min</small>
            </button>
            <button type="button" className="mood" onClick={() => handleMoodSelect("Chill")}>
              ☕<b>Chill</b>
              <small>Snacks & drinks</small>
            </button>
          </div>

          {/* Surprise Me Result */}
          {surpriseItem && (
            <div className="surprise" style={{ marginTop: "24px" }}>
              <div className="surpriseEmoji">🎉</div>
              <div>
                <small style={{ fontWeight: 800, color: "var(--p)" }}>FOODIE PICKED FOR YOU</small>
                <h2>{surpriseItem.name}</h2>
                <p>
                  {surpriseItem.restaurantName || "Foodie Special"} • ₹{surpriseItem.price} • ★{" "}
                  {surpriseItem.rating || 4.7}
                </p>
                <button
                  type="button"
                  className="btn primary"
                  onClick={() => addToCart(surpriseItem)}
                >
                  ＋ Add this surprise to cart
                </button>
              </div>
            </div>
          )}

          {/* Mood Results */}
          {moodType && (
            <div className="smartResult">
              <div className="smartResultHead">
                <b>{moodType} mode activated ✨</b>
                <span>{moodResults.length} matches</span>
              </div>
              <div className="smartFoodGrid">
                {moodResults.map((x) => (
                  <article key={x.id} className="smartFood">
                    <div
                      className="smartFoodImg"
                      style={{ backgroundImage: `url('${x.img}')` }}
                    >
                      <span className="pill">★ {x.rating || 4.5}</span>
                    </div>
                    <div className="smartFoodBody">
                      <b>{x.name}</b>
                      <small>
                        {x.restaurantName || "Foodie Kitchen"} • ₹{x.price}
                      </small>
                      <button
                        type="button"
                        className="btn primary miniBtn"
                        onClick={() => addToCart(x)}
                      >
                        ＋ Add
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Foodie Lab: Custom Combo Section */}
      <section className="section alt">
        <div className="container">
          <div className="featureHero">
            <div>
              <span className="eyebrow">FOODIE LAB</span>
              <h2>Build your perfect meal 🍱</h2>
              <p className="muted">
                Choose a main, side, and drink. Foodie automatically calculates your custom combo and savings.
              </p>

              <div className="comboControls">
                <select
                  className="input"
                  value={comboMain}
                  onChange={(e) => setComboMain(e.target.value)}
                >
                  {foodItems
                    .filter((x) => /biryani|burger|pizza|curry|dosa|noodles/i.test(x.name))
                    .map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name} — ₹{item.price}
                      </option>
                    ))}
                </select>

                <select
                  className="input"
                  value={comboSide}
                  onChange={(e) => setComboSide(e.target.value)}
                >
                  {foodItems
                    .filter((x) => /65|fries|naan|salad|masala/i.test(x.name))
                    .map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name} — ₹{item.price}
                      </option>
                    ))}
                </select>

                <select
                  className="input"
                  value={comboDrink}
                  onChange={(e) => setComboDrink(e.target.value)}
                >
                  {drinks.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} — ₹{d.price}
                    </option>
                  ))}
                </select>
              </div>

              <div className="comboResult">
                <div>
                  <b>Custom Combo</b>
                  <span>Original ₹{comboOriginal}</span>
                  <strong>₹{comboTotal}</strong>
                  <small>Save ₹{comboSavings}</small>
                </div>
              </div>

              <button
                type="button"
                className="btn primary"
                onClick={handleAddComboToCart}
              >
                Add custom combo to cart
              </button>
            </div>

            <div className="labCard">
              <div className="labIcon">🍱</div>
              <b>Custom Combo Engine</b>
              <p className="muted">Mix & match your cravings with a combo discount.</p>
              <span className="pill">Save up to ₹80</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Showcase Cards */}
      <section className="section">
        <div className="container">
          <div className="featureCards">
            <div className="feature bigFeature">
              <div className="icon">👥</div>
              <h3>Order Together</h3>
              <p>
                Create a group room and share a code with friends. Everyone can choose their food before one combined checkout.
              </p>
              <button type="button" className="btn light" onClick={handleCreateGroup}>
                {groupRoom ? `Room: ${groupRoom}` : "Create group room"}
              </button>
              {groupRoom && (
                <div className="groupBox">
                  <b>Room {groupRoom}</b>
                  <small>Share this code with your friends</small>
                </div>
              )}
            </div>

            <div className="feature bigFeature">
              <div className="icon">🏆</div>
              <h3>Foodie Rewards</h3>
              <p>Earn points from orders, reviews and referrals. Use your points for discounts.</p>
              <div className="rewardBar">
                <span id="pointsValue">{rewardsPoints} pts</span>
                <div>
                  <i style={{ width: `${Math.min(100, (rewardsPoints % 1000) / 10)}%` }} />
                </div>
              </div>
              <button
                type="button"
                className="btn light"
                onClick={handleClaimDaily}
                disabled={dailyClaimed}
              >
                {dailyClaimed ? "✓ Daily Bonus Claimed" : "Claim daily bonus (+20 pts)"}
              </button>
            </div>

            <div className="feature bigFeature">
              <div className="icon">🌱</div>
              <h3>Eco Delivery</h3>
              <p>Choose an eco-friendly delivery option at checkout and earn extra reward points.</p>
              <span className="pill">+15 points</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section alt">
        <div className="container">
          <div className="head">
            <div>
              <h2>What are you craving?</h2>
              <p className="muted">Explore by category.</p>
            </div>
          </div>
          <div className="categories">
            {CATEGORIES.map((cat) => (
              <Link key={cat.name} className="cat" to={`/user`}>
                <div className="emoji">{cat.emoji}</div>
                <b>{cat.name}</b>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Deal Banner */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="deal">
            <div>
              <h2>🔥 Flash Feast is live</h2>
              <p>Limited-time deals designed to make your next order irresistible.</p>
            </div>
            <Link className="btn light" to="/offers">
              Unlock offers
            </Link>
          </div>
        </div>
      </section>

      {/* Top Restaurants Grid */}
      <section className="section">
        <div className="container">
          <div className="head">
            <div>
              <h2>Top restaurants</h2>
              <p className="muted">Fast, highly rated and ready for your next craving.</p>
            </div>
            <Link className="btn light" to="/restaurants">
              See all
            </Link>
          </div>

          <div className="grid">
            {INITIAL_RESTAURANTS.slice(0, 6).map((r) => (
              <article key={r.id} className="rest">
                <Link to={`/restaurants?id=${r.id}`}>
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
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Features Showcase */}
      <section className="section alt">
        <div className="container">
          <div className="head">
            <div>
              <h2>Why Foodie feels different</h2>
              <p className="muted">
                Designed as a full-featured, professional food delivery application.
              </p>
            </div>
          </div>
          <div className="features">
            <div className="feature">
              <div className="icon">🧠</div>
              <h3>Role-Based Access</h3>
              <p>Dedicated Admin and User modules backed by Local Storage authentication.</p>
            </div>
            <div className="feature">
              <div className="icon">🛒</div>
              <h3>Live Smart Cart</h3>
              <p>Instant quantity adjustments, live price calculations, and seamless checkout.</p>
            </div>
            <div className="feature">
              <div className="icon">🛵</div>
              <h3>Live-style tracking</h3>
              <p>Animated rider, route simulation, ETA countdown, and status timeline.</p>
            </div>
            <div className="feature">
              <div className="icon">📦</div>
              <h3>Persistent Storage</h3>
              <p>Food items, user accounts, and order history persist across browser reloads.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;

