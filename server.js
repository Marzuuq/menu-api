const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Load menu data
const menuItems = require('./data/menuData');

// Serve static frontend
app.use(express.static(path.join(__dirname, 'public')));

// GET /menu (all items)
app.get('/menu', (req, res) => {
  res.json(menuItems);
});

// GET /menu/vegetarian (veg only)
app.get('/menu/vegetarian', (req, res) => {
  const vegItems = menuItems.filter(item => item.isVegetarian);
  res.json(vegItems);
});

// GET /menu/categories (category counts)
app.get('/menu/categories', (req, res) => {
  const categoryMap = {};

  menuItems.forEach(item => {
    if (!categoryMap[item.category]) {
      categoryMap[item.category] = 0;
    }
    categoryMap[item.category]++;
  });

  const categories = Object.keys(categoryMap).map(name => ({
    name,
    itemCount: categoryMap[name]
  }));

  res.json({ categories });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
