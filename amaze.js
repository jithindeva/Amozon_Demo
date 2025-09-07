// =====================
// Amazon Clone Demo JS
// =====================

// Hero slider images
const heroImages = [
  "https://via.placeholder.com/1200x300?text=Big+Sale+on+Mobiles",
  "https://via.placeholder.com/1200x300?text=Fashion+Deals",
  "https://via.placeholder.com/1200x300?text=Electronics+Discounts"
];

// Categories
const categories = [
  { name: "Shoes", img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQ193Kp1FDwxK0KB3f9duKPyMVSnIHyYnhEyQxf7eUkGuCC7pYmdsG1MyMzjNFRBsTXHCSj87JGXIp8sUr9eHQXr-nv4e5phMyaHAMwAzRm_2Bc41SEa6J58g" },
  { name: "Dresses", img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTM_sVbgn7Wzi4Ne_yQ_kk7UwtJulF_830YX4YEYzbcKmYWXd1dedu9O7a-dQvKsGtlBYfna58InqAygzeMeViCISaaAOFXPxeH357STkfkW8mpd82m3Rg&usqp=CAc" },
  { name: "Watches", img: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcT18M15eLKMbUayD0wgyvm-kkib_kaiTfxcIQmegvMiBsDE1qYHSnfm-bTQodS-U--Q3ooUSYFfV5dBCeRmsXXnG6-0lCVyPCh4b8vHGdXTOYGT5yaLcP_jrd8&usqp=CAc" },
  { name: "Bags", img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRpBofGV57V93167J_bnDQ-Jinqxg8opUg-QplDDpyodUml92Ecl5lFvtJ_8e2ZprjelAnKxDIMvb7WEVhZ2iRC0TfABfNNhR-ddtyPUT7hRH65txncFm67ZlI&usqp=CAc" },
  { name: "Grocery", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL84IYLvvQ6goDvljboaBWpcRmfCYu7uUM1w&s" },
  { name: "Mobiles", img: "https://via.placeholder.com/200?text=Mobile" },
  { name: "Televisions", img: "https://via.placeholder.com/200?text=TV" }
];

// Products
const products = [
  { id: 1, title: "Running Shoes", price: 1999, img: "https://via.placeholder.com/300?text=Shoes" },
  { id: 2, title: "Casual Dress", price: 2499, img: "https://via.placeholder.com/300?text=Dress" },
  { id: 3, title: "Smart Watch", price: 4999, img: "https://via.placeholder.com/300?text=Watch" },
  { id: 4, title: "Leather Bag", price: 2999, img: "https://via.placeholder.com/300?text=Bag" },
  { id: 5, title: "Grocery Pack", price: 799, img: "https://via.placeholder.com/300?text=Grocery" },
  { id: 6, title: "Smartphone", price: 15999, img: "https://via.placeholder.com/300?text=Mobile" },
  { id: 7, title: "LED TV", price: 25999, img: "https://via.placeholder.com/300?text=TV" }
];

// =====================
// DOM Elements
// =====================
const slider = document.getElementById("slider");
const heroDots = document.getElementById("heroDots");
const categoryGrid = document.getElementById("categoryGrid");
const productGrid = document.getElementById("productGrid");
const productsShown = document.getElementById("productsShown");
const cartBtn = document.getElementById("cartBtn");
const cartCount = document.getElementById("cartCount");
const cartList = document.getElementById("cartList");
const cartItemsCount = document.getElementById("cartItemsCount");
const cartSubtotal = document.getElementById("cartSubtotal");

let currentSlide = 0;
let cart = [];

// =====================
// Hero Slider
// =====================
function loadHero() {
  slider.innerHTML = `<img src="${heroImages[0]}" alt="Hero Banner" />`;
  heroDots.innerHTML = heroImages
    .map((_, idx) => `<div class="${idx === 0 ? "active" : ""}" onclick="goToSlide(${idx})"></div>`)
    .join("");
}
function goToSlide(index) {
  currentSlide = index;
  slider.innerHTML = `<img src="${heroImages[index]}" alt="Hero Banner" />`;
  document.querySelectorAll("#heroDots div").forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}
setInterval(() => {
  currentSlide = (currentSlide + 1) % heroImages.length;
  goToSlide(currentSlide);
}, 3000);

// =====================
// Categories
// =====================
function loadCategories() {
  categoryGrid.innerHTML = categories
    .map(
      (c) => `
      <div class="cat-box">
        <img src="${c.img}" alt="${c.name}" style="width:100%;border-radius:4px"/>
        <p>${c.name}</p>
      </div>`
    )
    .join("");
}

// =====================
// Products
// =====================
function loadProducts() {
  productGrid.innerHTML = products
    .map(
      (p) => `
      <div class="product-card">
        <img src="${p.img}" alt="${p.title}" />
        <div class="title">${p.title}</div>
        <div class="price">₹${p.price}</div>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
      </div>`
    )
    .join("");
  productsShown.textContent = products.length;
}

// =====================
// Cart Functions
// =====================
function addToCart(id) {
  const product = products.find((p) => p.id === id);
  if (!product) return;
  cart.push(product);
  updateCartUI();
}

function updateCartUI() {
  cartCount.textContent = cart.length;
  cartItemsCount.textContent = cart.length;
  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  cartSubtotal.textContent = `₹${subtotal.toFixed(2)}`;
  cartList.innerHTML = cart
    .map(
      (item, i) => `
      <div class="cart-item">
        <img src="${item.img}" alt="${item.title}" />
        <div class="info">
          <strong>${item.title}</strong><br/>₹${item.price}
        </div>
        <div class="actions">
          <button class="btn" onclick="removeFromCart(${i})">Remove</button>
        </div>
      </div>`
    )
    .join("");
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
}

// =====================
// Init
// =====================
window.onload = () => {
  loadHero();
  loadCategories();
  loadProducts();
};
