const products = [
  { "id": 1, "category": "Fasteners", "title": "High-Grade Steel Nuts", "description": "Durable steel nuts suitable for all types of projects.", "price": 25, "image": "Images/High grade steel nuts.png" },
  { "id": 2, "category": "Hand Tools", "title": "Multi-purpose Hammer", "description": "Ergonomic hammer with rubber grip.", "price": 450, "image": "Images/Multi-purpose hammer.png" },
  { "id": 3, "category": "Power Tools", "title": "Electric Drill 20V", "description": "Cordless drill ideal for home and professional use.", "price": 3500, "image": "Images/Electric drill 20 V.png" },
  { "id": 4, "category": "Plumbing Materials", "title": "PVC Pipe 1 inch", "description": "High-quality PVC pipe for plumbing needs.", "price": 180, "image": "Images/PVC Pipe 1 inch.png" },
  { "id": 5, "category": "Paint and Painting Supplies", "title": "Premium Wall Paint (White)", "description": "Smooth finish paint for walls and ceilings.", "price": 1200, "image": "Images/Premium wall paint(white).png" },
  { "id": 6, "category": "Building Supplies", "title": "Concrete Mix 40kg", "description": "Strong and durable concrete mix for construction.", "price": 500, "image": "Images/Concrete mix 40 kg.png" },
  { "id": 7, "category": "Electrical Supplies", "title": "Copper Electrical Wire 10m", "description": "High conductivity copper wire for electrical work.", "price": 800, "image": "Images/copper electrical wire 10m.png" },
  { "id": 8, "category": "Safety and Protection Gear", "title": "Safety Work Gloves", "description": "Durable gloves for hand protection during work.", "price": 350, "image": "Images/safety hand gloves.png" },
  { "id": 9, "category": "Door and Furniture Hardware", "title": "Stainless Steel Door Handle", "description": "Sleek and sturdy handle for doors and cabinets.", "price": 400, "image": "Images/stainless steel door handle.png" },
  { "id": 10, "category": "Home Improvement Accessories", "title": "Steel Curtain Rod", "description": "Strong rod for hanging curtains with easy installation.", "price": 750, "image": "Images/Steel curtain Rod.png" },
  { "id": 11, "category": "Fasteners", "title": "Stainless Steel Screws Pack", "description": "Pack of high-quality stainless steel screws for multiple uses.", "price": 150, "image": "Images/Stainless screw pack.png" },
  { "id": 12, "category": "Hand Tools", "title": "Adjustable Wrench", "description": "Durable adjustable wrench for versatile use.", "price": 600, "image": "Images/Adjustable wrench.png" },
  { "id": 13, "category": "Power Tools", "title": "Cordless Circular Saw", "description": "Efficient and portable circular saw for wood cutting.", "price": 6000, "image": "Images/cordless circular saw.png" },
  { "id": 14, "category": "Plumbing Materials", "title": "Faucet Mixer Tap", "description": "High-quality faucet mixer tap with chrome finish.", "price": 1200, "image": "Images/Faucet Tap mixer.png" },
  { "id": 15, "category": "Paint and Painting Supplies", "title": "Wood Varnish 1L", "description": "Protective wood varnish with a clear finish.", "price": 900, "image": "Images/wood warnish 1L.png" },
  { "id": 16, "category": "Building Supplies", "title": "Wooden Lumber 2x4 inch", "description": "Treated wooden lumber for construction and framing.", "price": 350, "image": "Images/wooden lumber2x4 inch.png" },
  { "id": 17, "category": "Electrical Supplies", "title": "Electrical Switch Board", "description": "Multi-gang switch board with high safety standards.", "price": 1500, "image": "Images/electrical switch board.png" },
  { "id": 18, "category": "Safety and Protection Gear", "title": "Safety Helmet", "description": "Durable safety helmet for head protection.", "price": 1100, "image": "Images/safety helmet.png" },
  { "id": 19, "category": "Door and Furniture Hardware", "title": "Cabinet Latch Set", "description": "Strong and reliable cabinet latch set.", "price": 300, "image": "Images/cabinet latch set.png" },
  { "id": 20, "category": "Home Improvement Accessories", "title": "Wall Mounted Hooks Pack", "description": "Multi-purpose wall hooks for organizing items.", "price": 250, "image": "Images/wall mounted hook pack.png" },
];

const categoryButtonsContainer = document.getElementById("categoryButtons");
const productsGrid = document.getElementById("productsGrid");
const btnCartToggle = document.getElementById("btnCartToggle");
const cartSidebar = document.getElementById("cartSidebar");
const closeCartBtn = document.getElementById("closeCartBtn");
const cartItemsContainer = document.getElementById("cartItemsContainer");
const cartTotalElement = document.getElementById("cartTotal");

let activeCategory = "All";
let cart = {};

const categories = ["All", ...new Set(products.map(p => p.category))];

// Display category buttons
function renderCategoryButtons() {
  categoryButtonsContainer.innerHTML = "";
  categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.textContent = cat;
    btn.classList.toggle("active", cat === activeCategory);
    btn.addEventListener("click", () => {
      activeCategory = cat;
      updateActiveCategory();
      renderProducts();
    });
    categoryButtonsContainer.appendChild(btn);
  });
}

function updateActiveCategory() {
  [...categoryButtonsContainer.children].forEach(btn => {
    btn.classList.toggle("active", btn.textContent === activeCategory);
  });
}

// Render products with Add to Cart and Buy Now buttons
function renderProducts() {
  productsGrid.innerHTML = "";
  let filteredProducts = activeCategory === "All" ? products : products.filter(p => p.category === activeCategory);

  filteredProducts.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <div class="product-title">${product.title}</div>
      <div class="product-price">₹${product.price}</div>
      <div class="product-desc">${product.description}</div>
      <button class="btn-add-cart">Add to Cart</button>
      <button class="btn-buy-now">Buy Now</button>
    `;

    // Add to Cart Event
    card.querySelector(".btn-add-cart").addEventListener("click", () => {
      addToCart(product);
    });

    // Buy Now redirects to buy.html with product id
    card.querySelector(".btn-buy-now").addEventListener("click", () => {
      window.location.href = `buy.html?id=${product.id}`;
    });

    productsGrid.appendChild(card);
  });
}

function addToCart(product) {
  if (!cart[product.id]) {
    cart[product.id] = { ...product, quantity: 1 };
  } else {
    cart[product.id].quantity++;
  }
  renderCart();
}

function renderCart() {
  cartItemsContainer.innerHTML = "";
  let total = 0;
  let countItems = 0;

  Object.values(cart).forEach(item => {
    countItems += item.quantity;
    total += item.price * item.quantity;
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
      <span class="cart-item-name">${item.title}</span>
      <div class="cart-item-controls">
        <button class="btn-dec" data-id="${item.id}">-</button>
        <span>${item.quantity}</span>
        <button class="btn-inc" data-id="${item.id}">+</button>
        <button class="btn-remove" data-id="${item.id}" title="Remove">&times;</button>
      </div>
    `;
    cartItemsContainer.appendChild(cartItem);
  });

  cartTotalElement.textContent = total.toFixed(2);
  btnCartToggle.textContent = `Cart (${countItems})`;

  attachCartControls();
}

function attachCartControls() {
  document.querySelectorAll(".btn-inc").forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute("data-id");
      cart[id].quantity++;
      renderCart();
    };
  });
  document.querySelectorAll(".btn-dec").forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute("data-id");
      if (cart[id].quantity > 1) {
        cart[id].quantity--;
      } else {
        delete cart[id];
      }
      renderCart();
    };
  });
  document.querySelectorAll(".btn-remove").forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute("data-id");
      delete cart[id];
      renderCart();
    };
  });
}

btnCartToggle.addEventListener("click", () => {
  cartSidebar.classList.toggle("open");
});

closeCartBtn.addEventListener("click", () => {
  cartSidebar.classList.remove("open");
});

// Initial render calls
renderCategoryButtons();
renderProducts();
renderCart();
