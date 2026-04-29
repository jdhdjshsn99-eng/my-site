const products = [
    { name: "Eco Shirt", price: 25, img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500" },
    { name: "Green Hoodie", price: 55, img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500" },
    { name: "Eco Jeans", price: 40, img: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500" }
];

let cart = [];
let user = localStorage.getItem("userName");

// Функція для створення літаючих листочків
function createLeaf() {
    const container = document.getElementById('leaf-container');
    const leaf = document.createElement('div');
    leaf.className = 'leaf';
    
    // Випадкова позиція появи
    const startX = Math.random() * 100 + "vw";
    const endX = (Math.random() * 100 - 20) + "vw"; // Листок трохи зноситиме вбік
    
    leaf.style.setProperty('--start-x', startX);
    leaf.style.setProperty('--end-x', endX);
    
    container.appendChild(leaf);
    
    // Видаляємо листок після завершення анімації
    setTimeout(() => {
        leaf.remove();
    }, 6000);
}

// Спавн листка кожні 2 секунди
setInterval(createLeaf, 2000);

function render() {
    const grid = document.getElementById("grid");
    const search = document.getElementById("search").value.toLowerCase();
    grid.innerHTML = "";

    products.filter(p => p.name.toLowerCase().includes(search)).forEach(p => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <img src="${p.img}">
            <div class="card-content">
                <h3>${p.name}</h3>
                <p>$${p.price}</p>
                <button onclick="addToCart('${p.name}', ${p.price})">Add to Cart</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

function addToCart(name, price) {
    cart.push({ name, price });
    updateCart();
}

function updateCart() {
    const list = document.getElementById("cartItems");
    list.innerHTML = cart.map(i => `<p>${i.name} - $${i.price}</p>`).join("");
}

function toggleCart() {
    document.getElementById("cart").classList.toggle("active");
    document.getElementById("overlay").classList.toggle("active");
}

function openAuth() { document.getElementById("auth").classList.add("active"); }

function login() {
    const name = document.getElementById("user").value;
    if(name) {
        user = name;
        localStorage.setItem("userName", name);
        document.getElementById("auth").classList.remove("active");
        alert("Hello, " + name + "!");
    }
}

// ОНОВЛЕНА ФУНКЦІЯ CHECKOUT З ФОНКОМ
function checkout() {
    if(cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // Включаємо МАТАДОРА
    const audio = document.getElementById('phonk-audio');
    audio.currentTime = 0; // Почати з початку
    audio.play();

    // Зупиняємо через 2 секунди (2000 мс)
    setTimeout(() => {
        audio.pause();
    }, 2000);

    alert("Order confirmed! Matador Phonk Intensifies...");
    cart = [];
    updateCart();
    toggleCart();
}

function scrollShop() { document.getElementById("shop").scrollIntoView({ behavior: "smooth" }); }
function scrollAbout() { document.getElementById("about").scrollIntoView({ behavior: "smooth" }); }

render();