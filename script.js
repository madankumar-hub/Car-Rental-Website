// ===== Vehicle Data =====
const vehicles = [
    {
        id: 1, name: "Maruti Swift", type: "car", emoji: "🚗",
        brand: "Maruti Suzuki", seats: 5, fuel: "Petrol",
        transmission: "Manual", mileage: "22 km/l",
        price: 250, badge: "available", badgeText: "Available",
        rating: 4.5, trips: 320
    },
    {
        id: 2, name: "Hyundai Creta", type: "suv", emoji: "🚙",
        brand: "Hyundai", seats: 5, fuel: "Diesel",
        transmission: "Automatic", mileage: "18 km/l",
        price: 500, badge: "popular", badgeText: "Popular",
        rating: 4.7, trips: 540
    },
    {
        id: 3, name: "Royal Enfield 350", type: "bike", emoji: "🏍️",
        brand: "Royal Enfield", seats: 2, fuel: "Petrol",
        transmission: "Manual", mileage: "35 km/l",
        price: 150, badge: "available", badgeText: "Available",
        rating: 4.6, trips: 890
    },
    {
        id: 4, name: "Tesla Model 3", type: "electric", emoji: "⚡",
        brand: "Tesla", seats: 5, fuel: "Electric",
        transmission: "Automatic", mileage: "500 km range",
        price: 2000, badge: "electric", badgeText: "Electric",
        rating: 4.9, trips: 120
    },
    {
        id: 5, name: "Mercedes-Benz E-Class", type: "luxury", emoji: "🏎️",
        brand: "Mercedes-Benz", seats: 5, fuel: "Petrol",
        transmission: "Automatic", mileage: "12 km/l",
        price: 3500, badge: "popular", badgeText: "Premium",
        rating: 4.9, trips: 85
    },
    {
        id: 6, name: "Honda Activa", type: "bike", emoji: "🛵",
        brand: "Honda", seats: 2, fuel: "Petrol",
        transmission: "Automatic", mileage: "45 km/l",
        price: 80, badge: "available", badgeText: "Available",
        rating: 4.3, trips: 1200
    },
    {
        id: 7, name: "Toyota Fortuner", type: "suv", emoji: "🚙",
        brand: "Toyota", seats: 7, fuel: "Diesel",
        transmission: "Automatic", mileage: "14 km/l",
        price: 1200, badge: "popular", badgeText: "Popular",
        rating: 4.8, trips: 310
    },
    {
        id: 8, name: "Hyundai i20", type: "car", emoji: "🚗",
        brand: "Hyundai", seats: 5, fuel: "Petrol",
        transmission: "Manual", mileage: "20 km/l",
        price: 300, badge: "available", badgeText: "Available",
        rating: 4.4, trips: 450
    },
    {
        id: 9, name: "BMW 3 Series", type: "luxury", emoji: "🏎️",
        brand: "BMW", seats: 5, fuel: "Petrol",
        transmission: "Automatic", mileage: "15 km/l",
        price: 3000, badge: "popular", badgeText: "Premium",
        rating: 4.8, trips: 95
    },
    {
        id: 10, name: "KTM Duke 200", type: "bike", emoji: "🏍️",
        brand: "KTM", seats: 2, fuel: "Petrol",
        transmission: "Manual", mileage: "30 km/l",
        price: 200, badge: "available", badgeText: "Available",
        rating: 4.5, trips: 670
    },
    {
        id: 11, name: "Tata Nexon EV", type: "electric", emoji: "⚡",
        brand: "Tata", seats: 5, fuel: "Electric",
        transmission: "Automatic", mileage: "312 km range",
        price: 800, badge: "electric", badgeText: "Electric",
        rating: 4.6, trips: 230
    },
    {
        id: 12, name: "Mahindra Thar", type: "suv", emoji: "🚙",
        brand: "Mahindra", seats: 4, fuel: "Diesel",
        transmission: "Manual", mileage: "15 km/l",
        price: 900, badge: "popular", badgeText: "Adventure",
        rating: 4.7, trips: 400
    }
];

// ===== Render Vehicle Cards =====
const vehicleGrid = document.getElementById('vehicleGrid');

function renderVehicles(filter = 'all') {
    const filtered = filter === 'all'
        ? vehicles
        : vehicles.filter(v => v.type === filter);

    vehicleGrid.innerHTML = filtered.map((v, i) => `
        <div class="vehicle-card" style="animation-delay: ${i * 0.08}s" data-type="${v.type}">
            <div class="vehicle-card-image">
                <span class="vehicle-emoji">${v.emoji}</span>
                <span class="vehicle-badge badge-${v.badge}">${v.badgeText}</span>
            </div>
            <div class="vehicle-card-body">
                <div class="vehicle-card-top">
                    <div>
                        <h3>${v.name}</h3>
                        <span class="vehicle-type">${v.brand}</span>
                    </div>
                    <div class="vehicle-price">
                        <span class="price">₹${v.price}</span>
                        <span class="price-unit">per hour</span>
                    </div>
                </div>
                <div class="vehicle-specs">
                    <div class="spec"><span class="spec-icon">💺</span> ${v.seats} Seats</div>
                    <div class="spec"><span class="spec-icon">⛽</span> ${v.fuel}</div>
                    <div class="spec"><span class="spec-icon">⚙️</span> ${v.transmission}</div>
                    <div class="spec"><span class="spec-icon">📏</span> ${v.mileage}</div>
                    <div class="spec"><span class="spec-icon">⭐</span> ${v.rating}</div>
                    <div class="spec"><span class="spec-icon">🔄</span> ${v.trips} trips</div>
                </div>
                <div class="vehicle-card-actions">
                    <button class="btn btn-outline btn-sm" onclick="viewDetails(${v.id})">Details</button>
                    <button class="btn btn-primary btn-sm" onclick="openBooking(${v.id})">Book Now</button>
                </div>
            </div>
        </div>
    `).join('');
}

renderVehicles();

// ===== Filter Buttons =====
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderVehicles(btn.dataset.filter);
    });
});

// ===== Booking Modal =====
const modal = document.getElementById('bookingModal');
const modalClose = document.getElementById('modalClose');
let currentVehicle = null;

function openBooking(id) {
    currentVehicle = vehicles.find(v => v.id === id);
    if (!currentVehicle) return;

    document.getElementById('modalTitle').textContent = `Book ${currentVehicle.name}`;
    document.getElementById('modalSubtitle').textContent = `${currentVehicle.brand} • ${currentVehicle.type.toUpperCase()}`;
    document.getElementById('modalVehicleInfo').innerHTML = `
        <span class="modal-v-emoji">${currentVehicle.emoji}</span>
        <div class="modal-v-details">
            <h4>${currentVehicle.name}</h4>
            <span class="modal-v-price">₹${currentVehicle.price}/hr</span>
        </div>
    `;

    // Set min date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('bookDate').min = today;
    document.getElementById('bookDate').value = today;

    document.getElementById('bookHours').value = 1;
    updateTotal();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    document.getElementById('bookingForm').reset();
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

// Update total price
function updateTotal() {
    const hours = parseInt(document.getElementById('bookHours').value) || 1;
    const total = hours * (currentVehicle ? currentVehicle.price : 0);
    document.getElementById('totalPrice').innerHTML = `Total: <strong>₹${total.toLocaleString('en-IN')}</strong>`;
}

document.getElementById('bookHours').addEventListener('input', updateTotal);

// Form submit
document.getElementById('bookingForm').addEventListener('submit', (e) => {
    e.preventDefault();
    closeModal();
    showToast(`🎉 ${currentVehicle.name} booked successfully!`);
});

// ===== View Details (alert) =====
function viewDetails(id) {
    const v = vehicles.find(x => x.id === id);
    if (!v) return;

    const details = `
${v.emoji} ${v.name}
━━━━━━━━━━━━━━━━━━━
Brand: ${v.brand}
Type: ${v.type.charAt(0).toUpperCase() + v.type.slice(1)}
Seats: ${v.seats}
Fuel: ${v.fuel}
Transmission: ${v.transmission}
Mileage: ${v.mileage}
Rating: ${v.rating} ⭐
Total Trips: ${v.trips}
━━━━━━━━━━━━━━━━━━━
Price: ₹${v.price}/hour
    `.trim();

    alert(details);
}

// ===== Toast =====
function showToast(message) {
    const toast = document.getElementById('toast');
    document.getElementById('toastMessage').textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
}

// ===== Navbar Scroll =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== Mobile Nav =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(link =>
    link.addEventListener('click', () => navLinks.classList.remove('open'))
);

// ===== Scroll Reveal =====
const revealEls = document.querySelectorAll('.step-card, .cta-card, .cta-info-item');
revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.15 });

revealEls.forEach(el => observer.observe(el));

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});
