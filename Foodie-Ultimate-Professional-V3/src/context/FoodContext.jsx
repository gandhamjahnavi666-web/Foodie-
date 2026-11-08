import React, { createContext, useContext, useState, useEffect } from "react";
import { INITIAL_FOOD_ITEMS } from "../data/initialData";

const FoodContext = createContext(null);

export const FoodProvider = ({ children }) => {
  const [foodItems, setFoodItems] = useState(() => {
    try {
      const stored = localStorage.getItem("foodItems");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error("Failed to load foodItems from localStorage", e);
    }
    localStorage.setItem("foodItems", JSON.stringify(INITIAL_FOOD_ITEMS));
    return INITIAL_FOOD_ITEMS;
  });

  useEffect(() => {
    try {
      localStorage.setItem("foodItems", JSON.stringify(foodItems));
    } catch (e) {
      console.error("Failed to save foodItems to localStorage", e);
    }
  }, [foodItems]);

  const addFoodItem = (item) => {
    const newItem = {
      ...item,
      id: item.id || Date.now(),
      price: Number(item.price) || 0,
      rating: item.rating ? Number(item.rating) : 4.5,
      img: item.img || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
    };
    setFoodItems((prev) => [newItem, ...prev]);
    return newItem;
  };

  const updateFoodItem = (id, updatedFields) => {
    setFoodItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              ...updatedFields,
              price: Number(updatedFields.price !== undefined ? updatedFields.price : item.price)
            }
          : item
      )
    );
  };

  const deleteFoodItem = (id) => {
    setFoodItems((prev) => prev.filter((item) => item.id !== id));
  };

  const getFoodItemById = (id) => {
    return foodItems.find((item) => item.id === Number(id) || item.id === id);
  };

  return (
    <FoodContext.Provider
      value={{
        foodItems,
        addFoodItem,
        updateFoodItem,
        deleteFoodItem,
        getFoodItemById
      }}
    >
      {children}
    </FoodContext.Provider>
  );
};

export const useFood = () => {
  const context = useContext(FoodContext);
  if (!context) {
    throw new Error("useFood must be used within a FoodProvider");
  }
  return context;
};

export default FoodContext;

