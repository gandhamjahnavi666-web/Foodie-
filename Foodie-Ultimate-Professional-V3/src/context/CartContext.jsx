import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { currentUser } = useAuth();

  const [cart, setCart] = useState(() => {
    try {
      const stored = localStorage.getItem("cart");
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error("Failed to parse cart from localStorage", e);
      return [];
    }
  });

  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [cart]);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2500);
  };

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existing = prevCart.find((i) => i.id === item.id);
      if (existing) {
        return prevCart.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        );
      } else {
        return [...prevCart, { ...item, qty: 1 }];
      }
    });
    triggerToast(`${item.name} added to cart!`);
  };

  const updateQuantity = (id, delta) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => {
      const item = prevCart.find((i) => i.id === id);
      if (item) {
        triggerToast(`${item.name} removed from cart`);
      }
      return prevCart.filter((i) => i.id !== id);
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  // Live bill calculation
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const delivery = subtotal > 0 ? (subtotal >= 499 ? 0 : 40) : 0;
  const platformFee = subtotal > 0 ? 5 : 0;
  const discount = subtotal >= 500 ? 50 : 0;
  const taxes = subtotal > 0 ? Math.round((subtotal + platformFee) * 0.05) : 0;
  const total = Math.max(0, subtotal + delivery + platformFee + taxes - discount);

  const cartCount = cart.reduce((count, item) => count + item.qty, 0);

  // Checkout function
  const checkout = ({ address, phone, notes = "" }) => {
    if (cart.length === 0) {
      return { success: false, message: "Your cart is empty!" };
    }

    const orderId = "FD" + Math.floor(10000000 + Math.random() * 89999999);
    const newOrder = {
      id: orderId,
      date: new Date().toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }),
      createdAt: new Date().toISOString(),
      userEmail: currentUser?.email || "guest@foodie.com",
      userName: currentUser?.name || "Customer",
      items: [...cart],
      subtotal,
      delivery,
      platformFee,
      taxes,
      discount,
      total,
      address,
      phone,
      notes,
      status: "Preparing"
    };

    try {
      const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
      const updatedOrders = [newOrder, ...existingOrders];
      localStorage.setItem("orders", JSON.stringify(updatedOrders));
      localStorage.setItem("fd_last", JSON.stringify(newOrder));
      clearCart();
      triggerToast("Order placed successfully! 🎉");
      return { success: true, order: newOrder };
    } catch (e) {
      console.error("Failed to save order to localStorage", e);
      return { success: false, message: "Failed to place order. Try again." };
    }
  };

  // Helper to reorder past order items
  const reorder = (order) => {
    if (!order || !order.items) return;
    setCart(order.items);
    triggerToast("Past order items added to cart!");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        subtotal,
        delivery,
        platformFee,
        discount,
        taxes,
        total,
        checkout,
        reorder,
        triggerToast,
        toastMessage,
        showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export default CartContext;

