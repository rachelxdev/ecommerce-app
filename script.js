const api = "http://localhost:5000";

let role = "";

function login() {

  const username = document.getElementById("username").value;

  const password = document.getElementById("password").value;

  if (username === "admin" && password === "1234") {

    role = "admin";

  } else if (username === "user" && password === "1234") {

    role = "user";

  } else {

    alert("Invalid login");

    return;
  }

  document.getElementById("loginPage").style.display = "none";

  document.getElementById("storePage").style.display = "block";

  if (role === "admin") {

    document.getElementById("adminPanel").style.display = "block";
  }

  loadProducts();

  loadCart();
}

async function loadProducts() {

  const res = await fetch(`${api}/products`);

  const products = await res.json();

  const productsDiv = document.getElementById("products");

  productsDiv.innerHTML = "";

  products.forEach(product => {

    const div = document.createElement("div");

    div.className = "product";

    div.innerHTML = `
      <h3>${product.name}</h3>

      <p>Price: Rs.${product.price}</p>

      <button onclick="addToCart(${product.id})">
        Add to Cart
      </button>
    `;

    productsDiv.appendChild(div);
  });
}

async function loadCart() {

  const res = await fetch(`${api}/cart`);

  const cart = await res.json();

  const cartDiv = document.getElementById("cart");

  cartDiv.innerHTML = "";

  cart.forEach(item => {

    const div = document.createElement("div");

    div.className = "cart-item";

    div.innerHTML = `
      <h3>${item.name}</h3>

      <p>Rs.${item.price}</p>
    `;

    cartDiv.appendChild(div);
  });
}

async function addToCart(id) {

  await fetch(`${api}/cart`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({ id: id })
  });

  loadCart();
}

async function checkout() {

  await fetch(`${api}/checkout`, {
    method: "POST"
  });

  alert("Order placed successfully!");

  loadCart();
}

function addProduct() {

  const name = document.getElementById("productName").value;

  const price = document.getElementById("productPrice").value;

  alert(`Product Added: ${name} - Rs.${price}`);
}