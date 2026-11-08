import React from "react";
import { useCart } from "../context/CartContext";

export const Toast = () => {
  const { showToast, toastMessage } = useCart();

  if (!showToast || !toastMessage) return null;

  return (
    <div className={`toast ${showToast ? "show" : ""}`}>
      {toastMessage}
    </div>
  );
};

export default Toast;

