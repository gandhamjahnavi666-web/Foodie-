# 🍔 Foodie Ultimate Professional V3

> A modern, responsive, high-performance online food delivery web application built with **React 18**, **Vite**, and **React Router v6**. Features **Role-Based Access Control (Admin & User Dashboards)**, persistent state management, interactive meal builders, gamified rewards, and live-style order tracking.

---

## 🌟 Overview

**Foodie Ultimate Professional V3** is a full-featured frontend single-page application (SPA) replicating an end-to-end food delivery marketplace. Built for rapid performance and offline-ready reliability, it runs client-side with persistent `localStorage` synchronization for user sessions, shopping carts, catalog items, and order workflows.

---

## 🚀 Key Features

### 🛡️ Role-Based Access Control (RBAC)
- **Admin Dashboard (`/admin`)**:
  - **Menu Catalog CRUD**: Add new food items, update pricing/descriptions/images/categories, and delete dishes with immediate catalog synchronization.
  - **Live Order Management**: View all customer orders, filter by status, inspect customer details, and update statuses:
    `Placed` ➔ `Preparing` ➔ `Out for Delivery` ➔ `Delivered / Cancelled`
  - **Analytics & Metrics**: Real-time sales metrics, total order volume, active customer counts, and menu inventory stats.
  - **User Management**: View all registered users and their roles (`Admin` or `User`).
  
- **Customer / User Dashboard (`/user`)**:
  - **Interactive Food Catalog**: Filter by category (*Biryani, North Indian, South Indian, Fast Food, Chinese, Desserts, Healthy*), live search, and sort by rating/price.
  - **One-Click Cart**: Quick add-to-cart with quantity modification.
  - **Express Checkout**: Address & mobile number validation with automatic delivery fee, taxes, and discounts breakdown.
  - **Personal Order History**: View all previous orders with timestamps and an instant **Reorder** button.

---

### ⚡ Smart Customer Experience
- **🎯 Mood-Based Food Discovery**: Instantly filter food options matching your vibe: *Hungry*, *Spicy*, *Healthy*, *Sweet*, *Quick Bite*, or *Chill*.
- **🎲 Surprise Me Picker**: Can't decide what to eat? Tap "Surprise Me" for an instant randomized recommendation.
- **🍱 Build Your Own Combo**: Interactive 3-step meal customizer (Main + Side + Beverage) with automatic **12% bundle savings** applied directly to cart.
- **👥 Order Together (Group Room)**: Create a collaborative party order room with a shareable room code (`FD-XXXXX`).
- **🎁 Foodie Rewards Program**: Earn loyalty points on eligible orders with a daily login bonus claim (+20 points).
- **🛵 Live Delivery Tracking Simulation**: Real-time animated delivery partner moving on a simulated map with dynamic ETA countdown.
- **🏷️ Coupon & Offers Center**: Browse and copy verified promotional discount codes (`FOOD50`, `WELCOME75`, `FEAST30`, `REFER100`).
- **🌓 Dark Mode / Light Mode**: Instant one-click theme switcher persisted across sessions.

---

## 🔐 Demo Credentials

You can test both roles right out of the box:

| Role | Email | Password | Access Level |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@test.com` | `admin123` | Full Admin Dashboard (`/admin`), Order updates, Menu CRUD |
| **Customer** | *Register any user* | *Your choice* | User Dashboard (`/user`), Cart, Checkout, Order History |

> [!NOTE]
> All users, cart states, and orders persist in your browser's `localStorage`. You can create new user or admin accounts via the `/signup` page.

---

## 🛠️ Tech Stack & Architecture

- **Frontend Core**: [React 18](https://react.dev/)
- **Routing**: [React Router DOM v6](https://reactrouter.com/)
- **Build Tool & Dev Server**: [Vite 5](https://vitejs.dev/)
- **State Management**: React Context API
  - `AuthContext`: User authentication, session persistence, role-based guard logic.
  - `FoodContext`: Food catalog state, categories, CRUD mutation handlers.
  - `CartContext`: Cart items, quantity updates, pricing formulas, checkout, order generation.
- **Styling**: Modern Vanilla CSS3 with CSS Custom Properties (Theme tokens, Flexbox, CSS Grid).
- **Icons & Typography**: Inter font family, Unicode glyphs, and Unsplash food photography.

---

## 📁 Project Structure

```plaintext
Foodie-Ultimate-Professional-V3/
├── index.html               # Vite SPA entry point
├── package.json             # NPM dependencies & scripts
├── vite.config.js           # Vite configuration
│
├── src/
│   ├── main.jsx             # React root mounting
│   ├── App.jsx              # App layout, Providers & Route definitions
│   │
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.jsx       # Header navigation with role badges & cart counter
│   │   ├── Footer.jsx       # Global footer & quick links
│   │   ├── ProtectedRoute.jsx # Role-based route guard
│   │   └── Toast.jsx        # Notification feedback banner
│   │
│   ├── context/             # Global application state
│   │   ├── AuthContext.jsx  # Authentication, user roles & session storage
│   │   ├── CartContext.jsx  # Shopping cart, pricing & order placement
│   │   └── FoodContext.jsx  # Menu items catalog & CRUD actions
│   │
│   ├── data/
│   │   └── initialData.js   # Seed data: default admin, dishes, categories, restaurants
│   │
│   ├── pages/               # Application route views
│   │   ├── Home.jsx           # Hero, mood filter, combo builder, rewards
│   │   ├── Restaurants.jsx    # Restaurant listings & restaurant menu filter
│   │   ├── Offers.jsx         # Coupons and promo cards
│   │   ├── CartPage.jsx       # Cart item list & checkout form
│   │   ├── Orders.jsx         # Public/general order listing
│   │   ├── OrderTracking.jsx  # Real-time animated rider tracking & ETA
│   │   ├── Login.jsx          # User & Admin login form
│   │   ├── Signup.jsx         # New account registration
│   │   ├── AdminDashboard.jsx # Admin portal: Menu CRUD, orders, users
│   │   └── UserDashboard.jsx  # Customer portal: Menu explorer & orders
│   │
│   └── css/                 # Modern styling sheets
│       ├── style.css        # Base styles, typography, layout, variables
│       ├── components.css   # Cards, buttons, forms, badges, modals
│       └── responsive.css   # Mobile & tablet media queries
│
├── public/                  # Static assets directory
├── .gitignore               # Git ignored patterns
└── README.md                # Project documentation
```

---

## 🚦 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended) and `npm` installed:
```bash
node -v
npm -v
```

### Installation

1. **Clone or navigate to the project directory**:
   ```bash
   cd Foodie-Ultimate-Professional-V3
   ```

2. **Install project dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   The application will be running at:
   👉 **`http://localhost:5173`**

---

## 📦 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Vite local development server with Hot Module Replacement (HMR). |
| `npm run build` | Compiles and bundles production-ready assets into the `dist/` directory. |
| `npm run preview` | Locally serves the production build from `dist/` to verify optimization. |

---

## 🗺️ Application Routes

| Path | Component | Access | Description |
| :--- | :--- | :--- | :--- |
| `/` | `Home` | Public | Hero search, mood selector, combo builder, surprise dish, rewards |
| `/restaurants` | `Restaurants` | Public | Partner restaurants, ratings, cuisine filters, dish selection |
| `/offers` | `Offers` | Public | Discount coupons, copyable promo codes, flash deals |
| `/cart` | `CartPage` | Public | Shopping cart view, transparent bill calculation, and checkout |
| `/orders` | `Orders` | Public | Recent platform orders and status summary |
| `/order-tracking` | `OrderTracking` | Public | Live-style animated courier tracking with ETA |
| `/login` | `Login` | Public | Sign in for Customers and Administrators |
| `/signup` | `Signup` | Public | Register a new account |
| `/admin` | `AdminDashboard` | **Admin Only** | Manage food catalog (CRUD), change order statuses, view users |
| `/user` | `UserDashboard` | **User Only** | Authenticated menu explorer, checkout, and personal order history |

---

## 💡 Important Note

> [!IMPORTANT]
> This application is built as a comprehensive frontend showcase project. Real-world financial payment gateway processing, third-party restaurant backend APIs, push notifications, and live GPS map providers (such as Google Maps) are simulated client-side via browser storage and timers.
