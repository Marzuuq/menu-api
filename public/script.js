const output = document.getElementById('output');

document.getElementById('fullMenuBtn').addEventListener('click', () => {
  fetchData('/menu');
});

document.getElementById('vegMenuBtn').addEventListener('click', () => {
  fetchData('/menu/vegetarian');
});

document.getElementById('categoryBtn').addEventListener('click', () => {
  fetchData('/menu/categories', true);
});

function fetchData(endpoint, isCategory = false) {
  fetch(endpoint)
    .then(res => res.json())
    .then(data => {
      displayData(data, isCategory);
    })
    .catch(err => {
      output.innerHTML = `<p class="error">Error fetching data</p>`;
      console.error(err);
    });
}

function displayData(data, isCategory) {
  output.innerHTML = "";

  if (isCategory) {
    data.categories.forEach(cat => {
      output.innerHTML += `
        <div class="card">
          <h3>${cat.name}</h3>
          <p>Items: ${cat.itemCount}</p>
        </div>
      `;
    });
  } else {
    data.forEach(item => {
      output.innerHTML += `
        <div class="card">
          <h3>${item.name}</h3>
          <p><strong>Category:</strong> ${item.category}</p>
          <p><strong>Price:</strong> ₹${item.price}</p>
          <p><strong>Description:</strong> ${item.description}</p>
          <span class="badge ${item.isVegetarian ? "veg" : "nonveg"}">
            ${item.isVegetarian ? "Vegetarian" : "Non-Vegetarian"}
          </span>
        </div>
      `;
    });
  }
}
