// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('change', () => {
    body.classList.toggle('dark-mode');
    localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// Load theme from localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.checked = true;
}

// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Navbar Shadow on Scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Products Slider
const prevBtn = document.getElementById('prev-products');
const nextBtn = document.getElementById('next-products');
const grids = document.querySelectorAll('.products-grid');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;

function updateSlider() {
    grids.forEach((grid, index) => {
        grid.style.display = index === currentSlide ? 'grid' : 'none';
    });
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + grids.length) % grids.length;
    updateSlider();
});

nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % grids.length;
    updateSlider();
});

dots.forEach(dot => {
    dot.addEventListener('click', () => {
        currentSlide = parseInt(dot.getAttribute('data-slide'));
        updateSlider();
    });
});

// Image Controls in Product Cards
document.querySelectorAll('.product-card').forEach(card => {
    const images = JSON.parse(card.getAttribute('data-images'));
    let currentImageIndex = 0;
    const mainImage = card.querySelector('.main-image');
    const prevImageBtn = card.querySelector('.prev-image');
    const nextImageBtn = card.querySelector('.next-image');

    function updateImage() {
        mainImage.src = images[currentImageIndex];
    }

    prevImageBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateImage();
    });

    nextImageBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateImage();
    });

    // Modal for clicking on main image
    mainImage.addEventListener('click', () => {
        openModal(images, currentImageIndex, card.querySelector('h3').textContent, card.querySelector('p').textContent);
    });
});

// Modal Functionality
const modal = document.getElementById('image-modal');
const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const closeModal = document.querySelector('.close');
const prevModalBtn = document.querySelector('.prev-btn');
const nextModalBtn = document.querySelector('.next-btn');
let modalImages = [];
let modalIndex = 0;

function openModal(images, index, title, description) {
    modalImages = images;
    modalIndex = index;
    modal.style.display = 'flex';
    updateModal();
    modalTitle.textContent = title;
    modalDescription.textContent = description;
}

function updateModal() {
    modalImage.src = modalImages[modalIndex];
}

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

prevModalBtn.addEventListener('click', () => {
    modalIndex = (modalIndex - 1 + modalImages.length) % modalImages.length;
    updateModal();
});

nextModalBtn.addEventListener('click', () => {
    modalIndex = (modalIndex + 1) % modalImages.length;
    updateModal();
});

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Form Submission
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    console.log('Form submitted:', data); // Replace with actual submission logic
    alert('Dziękujemy za przesłanie wiadomości! Odezwiemy się wkrótce.');
    contactForm.reset();
});