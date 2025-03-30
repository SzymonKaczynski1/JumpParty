window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        if (window.innerWidth <= 768) {
            document.querySelector('.nav-links').classList.remove('active');
            document.querySelector('.hamburger').classList.remove('active');
        }
    });
});

const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('change', () => {
    body.classList.toggle('dark-mode');
});


const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

const modal = document.getElementById('image-modal');
const modalImage = document.getElementById('modal-image');
const closeModal = document.querySelector('.close');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentImages = [];
let currentIndex = 0;

document.querySelectorAll('.product-card .main-image').forEach(image => {
    image.addEventListener('click', () => {
        const card = image.closest('.product-card');
        currentImages = JSON.parse(card.getAttribute('data-images'));
        currentIndex = 0;
        modalImage.src = currentImages[currentIndex];
        modal.style.display = 'flex';
    });
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    modalImage.src = currentImages[currentIndex];
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % currentImages.length;
    modalImage.src = currentImages[currentIndex];
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

document.querySelectorAll('.product-card').forEach(card => {
    const images = JSON.parse(card.getAttribute('data-images'));
    let currentImageIndex = 0;
    const mainImage = card.querySelector('.main-image');
    const prevImageBtn = card.querySelector('.prev-image');
    const nextImageBtn = card.querySelector('.next-image');

    prevImageBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        mainImage.src = images[currentImageIndex];
    });

    nextImageBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex + 1) % images.length;
        mainImage.src = images[currentImageIndex];
    });
});

const prevProductsBtn = document.getElementById('prev-products');
const nextProductsBtn = document.getElementById('next-products');
const grids = [document.getElementById('products-grid-1'), document.getElementById('products-grid-2')];
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;

function showSlide(index) {
    grids.forEach((grid, i) => {
        grid.style.display = i === index ? 'grid' : 'none';
        if (i === index) {
            grid.classList.add('show');
        } else {
            grid.classList.remove('show');
        }
    });
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
    currentSlide = index;
}

prevProductsBtn.addEventListener('click', () => {
    const newIndex = (currentSlide - 1 + grids.length) % grids.length;
    showSlide(newIndex);
});

nextProductsBtn.addEventListener('click', () => {
    const newIndex = (currentSlide + 1) % grids.length;
    showSlide(newIndex);
});

dots.forEach(dot => {
    dot.addEventListener('click', () => {
        const slideIndex = parseInt(dot.getAttribute('data-slide'));
        showSlide(slideIndex);
    });
});

showSlide(0);

const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    const subject = encodeURIComponent(`Zamówienie od ${name}`);
    const body = encodeURIComponent(`Imię i Nazwisko: ${name}\nEmail: ${email}\nWiadomość: ${message}`);
    const mailtoLink = `mailto:JumpParty@gmail.com?subject=${subject}&body=${body}`;
    
    window.location.href = mailtoLink;
    contactForm.reset();
});

document.querySelector('.footer-card .see-more').addEventListener('click', () => {
    document.querySelector('#contact').scrollIntoView({
        behavior: 'smooth'
    });
});