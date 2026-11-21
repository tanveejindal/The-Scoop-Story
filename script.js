
// Selecting HTML elements
const cards = document.querySelectorAll(".flavour-card");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");

const cartStatus = document.getElementById("cartStatus");
const totalPrice = document.getElementById("totalPrice");
const checkoutBtn = document.getElementById("checkoutBtn");

const productModal = document.getElementById("productModal");
const modalImage = document.getElementById("modalImage");
const modalName = document.getElementById("modalName");
const modalDescription = document.getElementById("modalDescription");
const modalPrice = document.getElementById("modalPrice");
const modalAdd = document.getElementById("modalAdd");
const closeModal = document.getElementById("closeModal");

let cart = [];
let selectedCard = null;
let currentCategory = "all";

// Mobile Navigation
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", function() {
    navLinks.classList.toggle("show");
});

// Close mobile menu after clicking a link
document.querySelectorAll(".nav-links a").forEach(function(link) {
    link.addEventListener("click", function() {
        navLinks.classList.remove("show");
    });
});


// Favourite Feature
cards.forEach(function(card) {

    const favBtn = document.createElement("button");

    favBtn.innerHTML = "♡";
    favBtn.classList.add("fav-btn");
    favBtn.title = "Add to favourites";

    card.appendChild(favBtn);

    favBtn.addEventListener("click", function(event) {

        event.stopPropagation();

        favBtn.classList.toggle("selected");

        if (favBtn.classList.contains("selected")) {
            favBtn.innerHTML = "♥";
        } else {
            favBtn.innerHTML = "♡";
        }

    });

});


// Search and Category Filter
function filterProducts() {

    const searchText = searchInput.value.toLowerCase();

    cards.forEach(function(card) {

        const name = card.querySelector("h3").innerText.toLowerCase();
        const category = card.dataset.category;

        const matchesSearch = name.includes(searchText);

        const matchesCategory =
            currentCategory === "all" ||
            category === currentCategory;

        if (matchesSearch && matchesCategory) {
            card.classList.remove("hide");
        } else {
            card.classList.add("hide");
        }

    });

}

// Search input
searchInput.addEventListener("input", filterProducts);

// Category buttons
filterButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        filterButtons.forEach(function(btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        currentCategory = button.dataset.category;

        filterProducts();

    });

});


// Add Product to Basket
function addToCart(card) {

    const name = card.querySelector("h3").innerText;

    const priceText = card.querySelector(".product-bottom b").innerText;

    const price = Number(priceText.replace("₹", ""));

    const existingItem = cart.find(function(item) {
        return item.name === name;
    });

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCart();

}


// Add button event
cards.forEach(function(card) {

    const addButton = card.querySelector(".add-btn");

    addButton.addEventListener("click", function() {
        addToCart(card);
    });

});


// Update Basket and Total
function updateCart() {

    if (cart.length === 0) {

        cartStatus.innerText = "Your basket is empty!";

    } else {

        let basketText = "";

        cart.forEach(function(item) {

            basketText += item.name + " x " +
            item.quantity + " = ₹" +
            (item.price * item.quantity) + "\n";

        });

        cartStatus.innerText = basketText;

    }

    let total = 0;

    cart.forEach(function(item) {
        total += item.price * item.quantity;
    });

    totalPrice.innerText = "Total: ₹" + total;

}


// Product Details Popup
const descriptions = {
    "Vanilla Dream": "A smooth and creamy classic vanilla ice cream made for every dessert lover.",
    "Choco Bliss": "Rich chocolate flavour that makes every bite extra special.",
    "Strawberry Swirl": "A sweet and refreshing strawberry treat.",
    "Pista Paradise": "A delicious combination of creamy ice cream and pistachio flavour.",
    "Berry Sundae": "A fruity and refreshing berry ice cream.",
    "Cookie Crunch": "Creamy ice cream filled with crunchy cookie goodness.",
    "Mango Magic": "A tropical mango treat full of sweetness.",
    "Oreo Overload": "A wonderful combination of cookies and creamy ice cream.",
    "Butterscotch Bliss": "A sweet butterscotch flavour with a crunchy twist.",
    "Blueberry Dream": "A lovely blueberry flavoured creamy treat.",
    "Coffee Craze": "A delicious coffee flavoured ice cream for coffee lovers.",
    "Red Velvet Romance": "A rich and smooth red velvet inspired dessert."
};


// Open Popup
function openModal(card) {

    selectedCard = card;

    const name = card.querySelector("h3").innerText;
    const image = card.querySelector("img").src;
    const price = card.querySelector(".product-bottom b").innerText;

    modalImage.src = image;
    modalName.innerText = name;
    modalPrice.innerText = price;

    modalDescription.innerText =
        descriptions[name] || "A delicious and creamy ice cream.";

    productModal.classList.add("show");

}


// Click image or product name to open details
cards.forEach(function(card) {

    card.querySelector("img").addEventListener("click", function() {
        openModal(card);
    });

    card.querySelector("h3").addEventListener("click", function() {
        openModal(card);
    });

});


// Add to basket from popup
modalAdd.addEventListener("click", function() {

    if (selectedCard !== null) {

        addToCart(selectedCard);

        productModal.classList.remove("show");

    }

});


// Close Popup
closeModal.addEventListener("click", function() {
    productModal.classList.remove("show");
});

// Close popup by clicking outside it
productModal.addEventListener("click", function(event) {

    if (event.target === productModal) {
        productModal.classList.remove("show");
    }

});

// Close popup with Escape key
document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {
        productModal.classList.remove("show");
    }

});


// Place Order
checkoutBtn.addEventListener("click", function() {

    if (cart.length === 0) {

        alert("Your basket is empty! Please add some ice cream.");

    } else {

        alert("Thank you for ordering from The Scoop Story! 🍦");

        cart = [];

        updateCart();

    }

});