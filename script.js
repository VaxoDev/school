// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Dark Mode Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    themeToggle.innerHTML = body.classList.contains('dark-mode') ? '<i class="bx bx-sun"></i>' : '<i class="bx bx-moon"></i>';
});

// Custom Gallery Implementation
document.addEventListener('DOMContentLoaded', function () {
    const swiperContainer = document.querySelector('.swiper-container');
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    const slides = document.querySelectorAll('.swiper-slide');
    const nextBtn = document.querySelector('.swiper-button-next');
    const prevBtn = document.querySelector('.swiper-button-prev');
    const pagination = document.querySelector('.swiper-pagination');
    let currentIndex = 0;
    let autoplayInterval;
    let startX;
    let endX;

    // Set initial positions
    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${100 * index}%)`;
    });

    // Create pagination bullets
    slides.forEach((_, index) => {
        const bullet = document.createElement('span');
        bullet.classList.add('swiper-pagination-bullet');
        bullet.addEventListener('click', () => goToSlide(index));
        pagination.appendChild(bullet);
    });

    function updateSlides() {
        slides.forEach((slide, index) => {
            slide.style.transform = `translateX(${100 * (index - currentIndex)}%)`;
            slide.style.transition = 'transform 0.5s ease-in-out';
        });
        updatePagination();
    }

    function updatePagination() {
        const bullets = document.querySelectorAll('.swiper-pagination-bullet');
        bullets.forEach((bullet, index) => {
            bullet.classList.toggle('swiper-pagination-bullet-active', index === currentIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = index;
        updateSlides();
        resetAutoplay();
    }

    function goToNextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlides();
        resetAutoplay();
    }

    function goToPrevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlides();
        resetAutoplay();
    }

    function startAutoplay() {
        autoplayInterval = setInterval(goToNextSlide, 5000); // 5000ms = 5 seconds
    }

    function resetAutoplay() {
        clearInterval(autoplayInterval);
        startAutoplay();
    }

    // Touch events for swiping
    swiperContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    swiperContainer.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        if (startX - endX > 50) { // Swipe left
            goToNextSlide();
        } else if (endX - startX > 50) { // Swipe right
            goToPrevSlide();
        }
    });

    nextBtn.addEventListener('click', goToNextSlide);
    prevBtn.addEventListener('click', goToPrevSlide);

    // Initialize the gallery
    updateSlides();
    startAutoplay();
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.bx');

    question.addEventListener('click', () => {
        answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
        icon.classList.toggle('bx-chevron-up');
    });
});

// Go to Top Button
const goTopBtn = document.querySelector('.go-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
        goTopBtn.classList.add('show');
    } else {
        goTopBtn.classList.remove('show');
    }
});

goTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ScrollReveal Initialization
ScrollReveal().reveal('.section', {
    delay: 200,
    distance: '10px',
    duration: 1000,
    easing: 'ease-in-out',
    origin: 'bottom',
    reset: true
});
