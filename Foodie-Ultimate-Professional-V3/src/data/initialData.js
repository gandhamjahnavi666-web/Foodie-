export const DEFAULT_ADMIN = {
  id: "admin-1",
  name: "System Admin",
  email: "admin@test.com",
  password: "admin123",
  role: "Admin",
  createdAt: "2026-01-01T00:00:00.000Z"
};

export const INITIAL_FOOD_ITEMS = [
  {
    id: 101,
    name: "Chicken Biryani",
    category: "Biryani",
    price: 220,
    desc: "Aromatic basmati rice, tender chicken and signature spices.",
    img: "https://images.unsplash.com/photo-1563379091339-03246963d51a?auto=format&fit=crop&w=500&q=80",
    restaurantId: 1,
    restaurantName: "Spice Route",
    rating: 4.8
  },
  {
    id: 102,
    name: "Paneer Biryani",
    category: "Biryani",
    price: 190,
    desc: "Fragrant rice with soft paneer and Indian spices.",
    img: "https://images.unsplash.com/photo-1631515242808-497c3fbd3972?auto=format&fit=crop&w=500&q=80",
    restaurantId: 1,
    restaurantName: "Spice Route",
    rating: 4.6
  },
  {
    id: 103,
    name: "Chicken 65",
    category: "South Indian",
    price: 170,
    desc: "Crispy spicy chicken bites.",
    img: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=500&q=80",
    restaurantId: 1,
    restaurantName: "Spice Route",
    rating: 4.7
  },
  {
    id: 104,
    name: "Butter Naan",
    category: "North Indian",
    price: 45,
    desc: "Soft tandoori naan finished with butter.",
    img: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=500&q=80",
    restaurantId: 1,
    restaurantName: "Spice Route",
    rating: 4.5
  },
  {
    id: 201,
    name: "Paneer Butter Masala",
    category: "North Indian",
    price: 180,
    desc: "Creamy tomato gravy with soft paneer.",
    img: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=500&q=80",
    restaurantId: 2,
    restaurantName: "Urban Tadka",
    rating: 4.7
  },
  {
    id: 202,
    name: "Veg Hakka Noodles",
    category: "Chinese",
    price: 150,
    desc: "Wok-tossed noodles with fresh vegetables.",
    img: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=500&q=80",
    restaurantId: 2,
    restaurantName: "Urban Tadka",
    rating: 4.4
  },
  {
    id: 301,
    name: "Andhra Chicken Curry",
    category: "South Indian",
    price: 210,
    desc: "Traditional spicy Andhra-style chicken curry.",
    img: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=500&q=80",
    restaurantId: 3,
    restaurantName: "Coastal Bowl",
    rating: 4.9
  },
  {
    id: 302,
    name: "Prawn Fry",
    category: "Seafood",
    price: 260,
    desc: "Crispy prawns with coastal spices.",
    img: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=500&q=80",
    restaurantId: 3,
    restaurantName: "Coastal Bowl",
    rating: 4.8
  },
  {
    id: 401,
    name: "Garden Salad Bowl",
    category: "Healthy",
    price: 150,
    desc: "Fresh greens, vegetables and house dressing.",
    img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=80",
    restaurantId: 4,
    restaurantName: "Green Leaf",
    rating: 4.5
  },
  {
    id: 501,
    name: "Classic Cheese Burger",
    category: "Burgers",
    price: 160,
    desc: "Juicy patty, cheese, lettuce and house sauce.",
    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80",
    restaurantId: 5,
    restaurantName: "Burger Yard",
    rating: 4.7
  },
  {
    id: 502,
    name: "Loaded Fries",
    category: "Burgers",
    price: 120,
    desc: "Crispy fries with cheese and seasoning.",
    img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=500&q=80",
    restaurantId: 5,
    restaurantName: "Burger Yard",
    rating: 4.6
  },
  {
    id: 601,
    name: "Gulab Jamun",
    category: "Desserts",
    price: 90,
    desc: "Soft warm milk dumplings in sugar syrup.",
    img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=500&q=80",
    restaurantId: 6,
    restaurantName: "Sweet & Sip",
    rating: 4.9
  },
  {
    id: 701,
    name: "Masala Dosa",
    category: "South Indian",
    price: 110,
    desc: "Crispy dosa with potato masala and chutney.",
    img: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=500&q=80",
    restaurantId: 7,
    restaurantName: "Dosa District",
    rating: 4.7
  },
  {
    id: 801,
    name: "Margherita Pizza",
    category: "Pizza",
    price: 230,
    desc: "Classic tomato, mozzarella and basil.",
    img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=500&q=80",
    restaurantId: 8,
    restaurantName: "Pizza Planet",
    rating: 4.8
  },
  {
    id: 901,
    name: "Veg Noodles",
    category: "Chinese",
    price: 160,
    desc: "Wok-tossed noodles with fresh vegetables.",
    img: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=500&q=80",
    restaurantId: 9,
    restaurantName: "Wok & Roll",
    rating: 4.5
  }
];

export const INITIAL_RESTAURANTS = [
  { id: 1, name: "Spice Route", cuisine: "South Indian • Biryani", rating: 4.7, time: "24–29 min", offer: "20% OFF", img: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=900&q=80" },
  { id: 2, name: "Urban Tadka", cuisine: "North Indian • Chinese", rating: 4.5, time: "28–34 min", offer: "15% OFF", img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80" },
  { id: 3, name: "Coastal Bowl", cuisine: "Andhra • Seafood", rating: 4.8, time: "20–26 min", offer: "10% OFF", img: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=900&q=80" },
  { id: 4, name: "Green Leaf", cuisine: "Healthy • Salads", rating: 4.4, time: "22–28 min", offer: "FREE DELIVERY", img: "https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=900&q=80" },
  { id: 5, name: "Burger Yard", cuisine: "Burgers • Fast Food", rating: 4.6, time: "18–24 min", offer: "25% OFF", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80" },
  { id: 6, name: "Sweet & Sip", cuisine: "Desserts • Beverages", rating: 4.3, time: "15–20 min", offer: "BUY 1 GET 1", img: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=80" },
  { id: 7, name: "Dosa District", cuisine: "South Indian • Tiffins", rating: 4.6, time: "16–22 min", offer: "₹75 OFF", img: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=900&q=80" },
  { id: 8, name: "Pizza Planet", cuisine: "Pizza • Italian", rating: 4.7, time: "25–31 min", offer: "30% OFF", img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=80" },
  { id: 9, name: "Wok & Roll", cuisine: "Asian • Noodles", rating: 4.5, time: "21–27 min", offer: "20% OFF", img: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80" }
];

export const CATEGORIES = [
  { emoji: "🍛", name: "Biryani" },
  { emoji: "🍕", name: "Pizza" },
  { emoji: "🍔", name: "Burgers" },
  { emoji: "🥘", name: "South Indian" },
  { emoji: "🍲", name: "North Indian" },
  { emoji: "🥗", name: "Healthy" },
  { emoji: "🍜", name: "Chinese" },
  { emoji: "🍰", name: "Desserts" }
];

