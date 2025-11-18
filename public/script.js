// script.js
const output = document.getElementById('output');
const btnFull = document.getElementById('btn-full');
const btnVeg = document.getElementById('btn-veg');
const btnCats = document.getElementById('btn-cats');

btnFull.addEventListener('click', fetchFullMenu);
btnVeg.addEventListener('click', fetchVegMenu);
btnCats.addEventListener('click', fetchCategories);

function showError(message) {
  output.innerHTML = `<div class="card"><strong>Error:</strong> ${message}</div>`;
}

async function fetchFullMenu() {
  output.innerHTML = '<div class="card">Loading full menu...</div>';
  try {
    const res = await fetch('/menu');
    if (!res.ok) throw new Error(`Server returned ${res.status}`);
    const data = await res.json();
    renderMenu(data);
  } catch (err) {
    showError(err.message);
  }
}

async function fetchVegMenu() {
  output.innerHTML = '<div class="card">Loading vegetarian options...</div>';
  try {
    const res = await fetch('/menu/vegetarian');
    if (!res.ok) throw new Error(`Server returned ${res.status}`);
    const data = await res.json();
    renderMenu(data, true);
  } catch (err) {
    showError(err.message);
  }
}

async function fetchCategories() {
  output.innerHTML = '<div class="card">Loading categories...</div>';
  try {
    const res = await fetch('/menu/categories');
    if (!res.ok) throw new Error(`Server returned ${res.status}`);
    const json = await res.json();
    renderCategories(json.categories || []);
  } catch (err) {
    showError(err.message);
  }
}

function renderMenu(items, highlightVeg = false) {
  if (!items || items.length === 0) {
    output.innerHTML = '<div class="card">No items to display.</div>';
    return;
  }

  const container = document.createElement('div');
  container.className = 'menu-grid';

  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';

    const titleRow = document.createElement('div');
    titleRow.className = 'item-title';

    const name = document.createElement('div');
    name.innerHTML = `<strong>${item.name}</strong>`;

    const price = document.createElement('div');
    price.className = 'price';
    price.textContent = `₹${item.price}`;

    titleRow.appendChild(name);
    titleRow.appendChild(price);

    const badge = document.createElement('div');
    badge.className = 'badge';
    badge.textContent = item.isVegetarian ? 'VEG' : 'NON-VEG';
    if (!item.isVegetarian) badge.classList.add('nonveg');

    const cat = document.createElement('div');
    cat.className = 'category';
    cat.textContent = item.category;

    const desc = document.createElement('div');
    desc.className = 'description';
    desc.textContent = item.description;

    card.appendChild(titleRow);
    card.appendChild(badge);
    card.appendChild(cat);
    card.appendChild(desc);

    container.appendChild(card);
  });

  output.innerHTML = '';
  output.appendChild(container);
}

function renderCategories(categories) {
  if (!categories || categories.length === 0) {
    output.innerHTML = '<div class="card">No categories found.</div>';
    return;
  }
  const list = document.createElement('ul');
  list.className = 'cat-list';
  categories.forEach(c => {
    const li = document.createElement('li');
    li.innerHTML = `<span>${c.name}</span><strong>${c.itemCount}</strong>`;
    list.appendChild(li);
  });
  output.innerHTML = '';
  output.appendChild(list);
}

// Load full menu on page load
fetchFullMenu();
