const products = [
    { name: "Eco Shirt", price: 25, img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500" },
    { name: "Green Hoodie", price: 55, img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500" },
    { name: "Eco Jeans", price: 40, img: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500" },
    { name: "Eco Sneakers", price: 80, img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500" }
];

let cart = [];
let hasPaid = false;

function login() {
    const nick = document.getElementById("user-nick").value;
    const pass = document.getElementById("user-pass").value;

    if (nick && pass.length >= 8) {
        document.getElementById("auth-screen").style.display = "none";
        document.getElementById("main-content").style.display = "block";
        document.getElementById("display-name").innerText = "User: " + nick;
        render();
    } else if (pass.length < 8) {
        alert("Password too short!");
    } else {
        alert("Enter details!");
    }
}

function createLeaf() {
    const container = document.getElementById('leaf-container');
    if(!container) return;
    const leaf = document.createElement('div');
    leaf.className = 'leaf';
    leaf.style.setProperty('--start-x', Math.random() * 100 + "vw");
    leaf.style.setProperty('--end-x', Math.random() * 100 + "vw");
    container.appendChild(leaf);
    setTimeout(() => leaf.remove(), 6000);
}
setInterval(createLeaf, 1500);

function createFlag() {
    const container = document.getElementById('flag-container');
    if(!container) return;
    const flag = document.createElement('div');
    flag.className = 'flag-unit';
    const x = Math.random() * 100 + "vw";
    flag.style.setProperty('--start-x', x);
    flag.style.setProperty('--end-x', x);
    container.appendChild(flag);
    setTimeout(() => flag.remove(), 8000);
}
setInterval(createFlag, 3500);

function render() {
    const grid = document.getElementById("grid");
    const search = document.getElementById("search").value.toLowerCase();
    if(!grid) return;
    grid.innerHTML = "";
    products.filter(p => p.name.toLowerCase().includes(search)).forEach(p => {
        grid.innerHTML += `
            <div class="card">
                <img src="${p.img}">
                <div class="card-content">
                    <h3>${p.name}</h3>
                    <p>$${p.price}</p>
                    <button onclick="addToCart('${p.name}', ${p.price})">Add to Cart</button>
                </div>
            </div>`;
    });
}

function addToCart(name, price) {
    cart.push({ name, price });
    document.getElementById("cartItems").innerHTML = cart.map(i => `<p>${i.name} - $${i.price}</p>`).join("");
}

function toggleCart() {
    document.getElementById("cart").classList.toggle("active");
    document.getElementById("overlay").classList.toggle("active");
}

function openPayment() {
    if(cart.length === 0) return alert("Cart is empty!");
    document.getElementById("payment-modal").style.display = "flex";
}

function closeAll() {
    document.getElementById("payment-modal").style.display = "none";
    document.getElementById("cart").classList.remove("active");
    document.getElementById("overlay").classList.remove("active");
}

function processPayment() {
    const num = document.getElementById("card-num").value;
    if(num.length < 1) return alert("Fill in the card!");

    const audio = document.getElementById('phonk-audio');
    if(audio) audio.play();
    
    hasPaid = true;
    document.getElementById("about").classList.remove("locked");
    
    alert("Payment Successful! 'About Us' section UNLOCKED! 🇺🇦");
    cart = [];
    document.getElementById("cartItems").innerHTML = "";
    closeAll();
}

function scrollShop() { document.getElementById("shop").scrollIntoView({ behavior: "smooth" }); }
function scrollAbout() { 
    if(!hasPaid) {
        alert("Locked! Pay first!");
    } else {
        document.getElementById("about").scrollIntoView({ behavior: "smooth" }); 
    }
}