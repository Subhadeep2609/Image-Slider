const slidesContainer = document.querySelector('.slides');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const dotsContainer = document.querySelector('.dots');

let slideIndex = 0;
const totalSlides = slides.length;
let autoSlideInterval;
const autoSlideDelay = 4000; // 4 seconds

// Create dots dynamically based on number of slides
function createDots() {
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === slideIndex) dot.classList.add('active');
    dot.addEventListener('click', () => {
      slideIndex = i;
      updateSlidePosition();
      resetAutoSlide();
    });
    dotsContainer.appendChild(dot);
  }
}

// Update active dot based on slide index
function updateDots() {
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, idx) => {
    dot.classList.toggle('active', idx === slideIndex);
  });
}

// Move slides container to show current slide
function updateSlidePosition() {
  slidesContainer.style.transform = `translateX(-${slideIndex * 100}%)`;
  updateDots();
}

// Previous slide button handler
function prevSlide() {
  slideIndex = (slideIndex - 1 + totalSlides) % totalSlides;
  updateSlidePosition();
  resetAutoSlide();
}

// Next slide button handler
function nextSlide() {
  slideIndex = (slideIndex + 1) % totalSlides;
  updateSlidePosition();
  resetAutoSlide();
}

// Auto-slide function
function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    nextSlide();
  }, autoSlideDelay);
}

// Reset auto-slide timer when user manually navigates
function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

// Initialize slider
function init() {
  createDots();
  updateSlidePosition();
  startAutoSlide();

  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);

  // Optional: add keyboard navigation (left/right arrows)
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });
}

init();
