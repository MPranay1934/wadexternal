let cart = {};

// Fetch products from Fake Store API
fetch('https://fakestoreapi.com/products?limit=8')
  .then(res => res.json())
  .then(products => {
    const productList = document.getElementById('product-list');
    products.forEach(product => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <h4>${product.title.substring(0, 50)}...</h4>
        <p><strong>$${product.price}</strong></p>
        <button onclick="addToCart('${product.id}', '${product.title}', ${product.price})">Add to Cart</button>
      `;
      productList.appendChild(card);
    });
  });

function addToCart(id, title, price) {
  if (cart[id]) {
    cart[id].quantity += 1;
  } else {
    cart[id] = { title: title, price: price, quantity: 1 };
  }
  updateCartDisplay();
}

function removeFromCart(id) {
  if (cart[id]) {
    cart[id].quantity -= 1;
    if (cart[id].quantity <= 0) {
      delete cart[id];
    }
    updateCartDisplay();
  }
}

function updateCartDisplay() {
  const cartContainer = document.getElementById('cart-items');
  const totalDisplay = document.getElementById('total');
  cartContainer.innerHTML = '';
  let total = 0;

  for (let id in cart) {
    const { title, price, quantity } = cart[id];
    const itemTotal = price * quantity;
    total += itemTotal;

    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
      <span>${title.substring(0, 25)} x ${quantity} ($${itemTotal.toFixed(2)})</span>
      <button onclick="removeFromCart('${id}')">Remove</button>
    `;
    cartContainer.appendChild(cartItem);
  }

  totalDisplay.textContent = total.toFixed(2);
}
