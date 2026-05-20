const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let products = [
  {
    id: 1,
    name: "Laptop",
    price: 50000
  },

  {
    id: 2,
    name: "Phone",
    price: 20000
  },

  {
    id: 3,
    name: "Headphones",
    price: 3000
  }
];

let cart = [];

app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/cart", (req, res) => {
  res.json(cart);
});

app.post("/cart", (req, res) => {

  const product = products.find(
    p => p.id === req.body.id
  );

  if (product) {
    cart.push(product);
  }

  res.json(cart);
});

app.post("/checkout", (req, res) => {

  cart = [];

  res.json({
    message: "Order placed successfully"
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});