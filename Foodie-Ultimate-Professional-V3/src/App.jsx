import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { FoodProvider } from "./context/FoodContext";
import { CartProvider } from "./context/CartContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Toast } from "./components/Toast";

// Pages
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { AdminDashboard } from "./pages/AdminDashboard";
import { UserDashboard } from "./pages/UserDashboard";
import { CartPage } from "./pages/CartPage";
import { Restaurants } from "./pages/Restaurants";
import { Offers } from "./pages/Offers";
import { Orders } from "./pages/Orders";
import { OrderTracking } from "./pages/OrderTracking";

export const App = () => {
  return (
    <Router>
      <AuthProvider>
        <FoodProvider>
          <CartProvider>
            <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
              <Navbar />

              <div style={{ flex: 1 }}>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/restaurants" element={<Restaurants />} />
                  <Route path="/offers" element={<Offers />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/order-tracking" element={<OrderTracking />} />
                  <Route path="/orders" element={<Orders />} />

                  {/* Role-Based Protected Route: Admin Module */}
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute allowedRole="Admin">
                        <AdminDashboard />
                      </ProtectedRoute>
                    }
                  />

                  {/* Role-Based Protected Route: User Module */}
                  <Route
                    path="/user"
                    element={
                      <ProtectedRoute allowedRole="User">
                        <UserDashboard />
                      </ProtectedRoute>
                    }
                  />

                  {/* Fallback */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </div>

              <Footer />
              <Toast />
            </div>
          </CartProvider>
        </FoodProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
