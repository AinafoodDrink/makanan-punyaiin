// ==== Variabel global ====
let cart = [];
let cartTotal = 0;

// ==== Tambah ke keranjang ====
function addToCart(name, price) {
    const item = cart.find(i => i.name === name);
    if (item) {
        item.qty++;
    } else {
        cart.push({ name, price, qty: 1 });
    }
    updateCart();
}

// ==== Update tampilan keranjang ====
function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotalEl = document.getElementById("cart-total");

    cartItems.innerHTML = "";
    cartTotal = 0;
    let totalCount = 0;

    cart.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${item.name} x ${item.qty}
            <span>Rp ${(item.price * item.qty).toLocaleString()}</span>
        `;
        cartItems.appendChild(li);

        cartTotal += item.price * item.qty;
        totalCount += item.qty;
    });

    cartCount.textContent = totalCount;
    cartTotalEl.textContent = cartTotal.toLocaleString();
}

// ==== Tampilkan & tutup keranjang ====
document.getElementById("cart-icon").addEventListener("click", () => {
    document.getElementById("cart").classList.add("active");
});

document.getElementById("close-cart").addEventListener("click", () => {
    document.getElementById("cart").classList.remove("active");
});

// ==== Checkout ====
document.getElementById("checkout-btn").addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Keranjang masih kosong!");
        return;
    }
    document.getElementById("checkout-message").classList.add("active");
    cart = [];
    updateCart();
});

function closeMessage() {
    document.getElementById("checkout-message").classList.remove("active");
}

// ==== Fitur Pencarian Produk ====
function searchProduct() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const cards = document.querySelectorAll(".product-card");

    cards.forEach(card => {
        const name = card.getAttribute("data-name").toLowerCase();
        card.style.display = name.includes(input) ? "block" : "none";
    });
}
