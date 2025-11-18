// server.js
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// In-memory menu data
const menuItems = [
  {
    id: 1,
    name: "Margherita Pizza",
    category: "Main Course",
    price: 350,
    isVegetarian: true,
    description: "Classic pizza with tomato, fresh basil and mozzarella."
  },
  {
    id: 2,
    name: "Butter Chicken",
    category: "Main Course",
    price: 420,
    isVegetarian: false,
    description: "Creamy tomato-based curry with tender chicken pieces."
  },
  {
    id: 3,
    name: "Paneer Tikka",
    category: "Appetizer",
    price: 250,
    isVegetarian: true,
    description: "Chargrilled cottage cheese cubes marinated in spices."
  },
  {
    id: 4,
    name: "Garlic Bread",
    category: "Appetizer",
    price: 150,
    isVegetarian: true,
    description: "Toasted bread slices with garlic butter and herbs."
  },
  {
    id: 5,
    name: "Chocolate Lava Cake",
    category: "Dessert",
    price: 180,
    isVegetarian: true,
    description: "Warm chocolate cake with a gooey molten center."
  },
  {
    id: 6,
    name: "Grilled Fish Tandoori",
    category: "Main Course",
    price: 480,
    isVegetarian: false,
    description: "Spiced and grilled fish fillet with tandoori marinade."
  }
];

// Middleware: serve static files from /public
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint 1: GET /menu -> all items
app.get('/menu', (req, res) => {
  res.json(menuItems);
});

// Endpoint 2: GET /menu/vegetarian -> only vegetarian items
app.get('/menu/vegetarian', (req, res) => {
  const veg = menuItems.filter(item => item.isVegetarian === true);
  res.json(veg);
});

// Endpoint 3: GET /menu/categories -> unique categories with counts
app.get('/menu/categories', (req, res) => {
  const counts = menuItems.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});

  const categories = Object.keys(counts).map(name => ({
    name,
    itemCount: counts[name]
  }));

  res.json({ categories });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
