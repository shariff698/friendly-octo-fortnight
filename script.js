/* ================= PRODUCT DATA ================= */

const products = [

    {
        id: 1,
        name: "Smartphone Pro",
        category: "Electronics",
        price: 24999,
        icon: "fa-mobile-screen-button"
    },

    {
        id: 2,
        name: "Wireless Headphones",
        category: "Electronics",
        price: 4500,
        icon: "fa-headphones"
    },

    {
        id: 3,
        name: "Laptop Pro",
        category: "Electronics",
        price: 65000,
        icon: "fa-laptop"
    },

    {
        id: 4,
        name: "Classic Sneakers",
        category: "Fashion",
        price: 3500,
        icon: "fa-shoe-prints"
    },

    {
        id: 5,
        name: "Smart Watch",
        category: "Electronics",
        price: 6500,
        icon: "fa-clock"
    },

    {
        id: 6,
        name: "Travel Backpack",
        category: "Fashion",
        price: 2800,
        icon: "fa-bag-shopping"
    },

    {
        id: 7,
        name: "Modern Lamp",
        category: "Home",
        price: 2200,
        icon: "fa-lightbulb"
    },

    {
        id: 8,
        name: "Beauty Care Set",
        category: "Beauty",
        price: 3200,
        icon: "fa-heart"
    }

];


/* ================= CART ================= */

let cart = JSON.parse(localStorage.getItem("shopproCart")) || [];


/* ================= ELEMENTS ================= */

const productContainer =
    document.getElementById("productContainer");

const cartCount =
    document.getElementById("cartCount");

const cartItems =
    document.getElementById("cartItems");

const cartTotal =
    document.getElementById("cartTotal");

const cartOverlay =
    document.getElementById("cartOverlay");

const toast =
    document.getElementById("toast");


/* ================= FORMAT MONEY ================= */

function formatMoney(amount) {

    return new Intl.NumberFormat("en-KE", {
        style: "currency",
        currency: "KES",
        maximumFractionDigits: 0
    }).format(amount);

}


/* ================= SHOW PRODUCTS ================= */

function displayProducts(items = products) {

    productContainer.innerHTML = "";

    if (items.length === 0) {

        productContainer.innerHTML = `
            <p>No products found.</p>
        `;

        return;
    }

    items.forEach(product => {

        const card = document.createElement("article");

        card.className = "product-card";

        card.innerHTML = `

            <div class="product-image">

                <i class="fa-solid ${product.icon}"></i>

            </div>

            <div class="product-info">

                <span class="product-category">
                    ${product.category}
                </span>

                <h3>${product.name}</h3>

                <div class="rating">
                    ★★★★★
                </div>

                <div class="price">

                    <strong>
                        ${formatMoney(product.price)}
                    </strong>

                    <button
                        class="add-cart"
                        data-id="${product.id}"
                    >

                        <i class="fa-solid fa-plus"></i>

                    </button>

                </div>

            </div>
        `;

        productContainer.appendChild(card);

    });

}


/* ================= ADD TO CART ================= */

function addToCart(id) {

    const product = products.find(
        product => product.id === id
    );

    if (!product) return;

    const existing = cart.find(
        item => item.id === id
    );

    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }

    saveCart();

    showToast(`${product.name} added to cart`);

}


/* ================= SAVE CART ================= */

function saveCart() {

    localStorage.setItem(
        "shopproCart",
        JSON.stringify(cart)
    );

    updateCart();

}


/* ================= UPDATE CART ================= */

function updateCart() {

    const totalItems = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    cartCount.textContent = totalItems;

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div style="text-align:center;padding:50px 10px;">
                <i
                    class="fa-solid fa-cart-shopping"
                    style="font-size:50px;color:#d0d5dd;"
                ></i>

                <h3 style="margin-top:15px;">
                    Your cart is empty
                </h3>

                <p style="color:#667085;">
                    Add products to your cart.
                </p>
            </div>
        `;

        cartTotal.textContent = "KSh 0";

        return;
    }


    let total = 0;


    cart.forEach(item => {

        total += item.price * item.quantity;

        const element = document.createElement("div");

        element.className = "cart-product";

        element.innerHTML = `

            <div class="cart-product-icon">

                <i class="fa-solid ${item.icon}"></i>

            </div>

            <div class="cart-product-info">

                <strong>${item.name}</strong>

                <p>
                    ${formatMoney(item.price)}
                    × ${item.quantity}
                </p>

            </div>

            <button
                class="remove-item"
                data-id="${item.id}"
            >

                <i class="fa-solid fa-trash"></i>

            </button>

        `;

        cartItems.appendChild(element);

    });


    cartTotal.textContent = formatMoney(total);

}


/* ================= REMOVE CART ITEM ================= */

function removeFromCart(id) {

    cart = cart.filter(
        item => item.id !== id
    );

    saveCart();

}


/* ================= TOAST ================= */

function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}


/* ================= EVENT DELEGATION ================= */

productContainer.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(".add-cart");

        if (!button) return;

        const id =
            Number(button.dataset.id);

        addToCart(id);

    }
);


cartItems.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(".remove-item");

        if (!button) return;

        removeFromCart(
            Number(button.dataset.id)
        );

    }
);


/* ================= CART OPEN ================= */

document
    .getElementById("cartButton")
    .addEventListener("click", () => {

        cartOverlay.classList.add("active");

    });


/* ================= CART CLOSE ================= */

document
    .getElementById("closeCart")
    .addEventListener("click", () => {

        cartOverlay.classList.remove("active");

    });


/* ================= SEARCH ================= */

const searchBox =
    document.getElementById("searchBox");

document
    .getElementById("searchButton")
    .addEventListener("click", () => {

        searchBox.classList.toggle("active");

        document
            .getElementById("searchInput")
            .focus();

    });


document
    .getElementById("closeSearch")
    .addEventListener("click", () => {

        searchBox.classList.remove("active");

    });


document
    .getElementById("searchInput")
    .addEventListener("input", event => {

        const value =
            event.target.value.toLowerCase();

        const filtered =
            products.filter(product =>

                product.name
                    .toLowerCase()
                    .includes(value)

                ||

                product.category
                    .toLowerCase()
                    .includes(value)

            );

        displayProducts(filtered);

    });


/* ================= CATEGORY FILTER ================= */

document
    .querySelectorAll(".category-card")
    .forEach(button => {

        button.addEventListener("click", () => {

            const category =
                button.dataset.category;

            const filtered =
                products.filter(
                    product =>
                        product.category === category
                );

            displayProducts(filtered);

            document
                .getElementById("products")
                .scrollIntoView({
                    behavior: "smooth"
                });

        });

    });


/* ================= SORT ================= */

document
    .getElementById("sortProducts")
    .addEventListener("change", event => {

        let sorted = [...products];

        if (event.target.value === "low") {

            sorted.sort(
                (a, b) => a.price - b.price
            );

        }

        if (event.target.value === "high") {

            sorted.sort(
                (a, b) => b.price - a.price
            );

        }

        displayProducts(sorted);

    });


/* ================= ACCOUNT MODAL ================= */

const accountModal =
    document.getElementById("accountModal");


document
    .getElementById("accountButton")
    .addEventListener("click", () => {

        accountModal.classList.add("active");

    });


document
    .getElementById("closeAccount")
    .addEventListener("click", () => {

        accountModal.classList.remove("active");

    });


/* ================= LOGIN ================= */

document
    .getElementById("loginForm")
    .addEventListener("submit", event => {

        event.preventDefault();

        showToast("Login system will connect to the backend.");

        accountModal.classList.remove("active");

    });


/* ================= NEWSLETTER ================= */

document
    .getElementById("newsletterForm")
    .addEventListener("submit", event => {

        event.preventDefault();

        const email =
            document.getElementById(
                "newsletterEmail"
            ).value;

        if (!email) return;

        showToast("Thank you for subscribing!");

        event.target.reset();

    });


/* ================= CHECKOUT ================= */

document
    .getElementById("checkoutButton")
    .addEventListener("click", () => {

        if (cart.length === 0) {

            showToast("Your cart is empty.");

            return;

        }

        showToast(
            "Checkout will connect to your payment system."
        );

    });


/* ================= INITIALIZE ================= */

displayProducts();

updateCart();
