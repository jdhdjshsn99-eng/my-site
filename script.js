const products = [
    { name: "Eco Shirt", price: 25, img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500" },
    { name: "Green Hoodie", price: 55, img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500" },
    { name: "Eco Jeans", price: 40, img: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500" },
    { name: "Eco Sneakers", price: 80, img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500" },
    { name: "Wooden Watch", price: 120, img: "https://images.unsplash.com/photo-1509941943102-10c232535736?w=500" }
];

let cart = [];

function createLeaf() {
    const container = document.getElementById('leaf-container');
    if(!container) return;
    const leaf = document.createElement('div');
    leaf.className = 'leaf';
    const startX = Math.random() * 100 + "vw";
    const endX = (Math.random() * 100 - 20) + "vw";
    leaf.style.setProperty('--start-x', startX);
    leaf.style.setProperty('--end-x', endX);
    container.appendChild(leaf);
    setTimeout(() => leaf.remove(), 6000);
}
setInterval(createLeaf, 2000);

function render() {
    const grid = document.getElementById("grid");
    const search = document.getElementById("search").value.toLowerCase();
    if(!grid) return;
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
            </div>`;
        grid.appendChild(card);
    });
}

function addToCart(name, price) {
    cart.push({ name, price });
    updateCart();
}

function updateCart() {
    const list = document.getElementById("cartItems");
    if(list) list.innerHTML = cart.map(i => `<p>${i.name} - $${i.price}</p>`).join("");
}

function toggleCart() {
    document.getElementById("cart").classList.toggle("active");
    document.getElementById("overlay").classList.toggle("active");
}

function openAuth() { document.getElementById("auth").classList.add("active"); }

function login() {
    const name = document.getElementById("user").value;
    if(name) {
        document.getElementById("auth").classList.remove("active");
        alert("Hello, " + name + "!");
    }
}

function checkout() {
    if(cart.length === 0) return alert("Empty!");
    const audio = document.getElementById('phonk-audio');
    if(audio) audio.play();
    alert("Confirmed!");
    cart = [];
    updateCart();
    toggleCart();
}

function scrollShop() { document.getElementById("shop").scrollIntoView({ behavior: "smooth" }); }
function scrollAbout() { document.getElementById("about").scrollIntoView({ behavior: "smooth" }); }

render();