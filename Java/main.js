// MAIN.JS

document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     Mobile Menu Toggle
  ========================= */
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  /* =========================
     Portfolio Images Configuration
  ========================= */
  const images = {
    portraits: [
      'Storage/Smp/p3.jpeg',
      'Storage/Smp/p5.jpg'
    ],
    events: [
      'Storage/Smp/p4.jpg',
      'Storage/Smp/p6.jpg'
    ],
    creative: [
      'Storage/Smp/p7.jpg',
      'Storage/Smp/p8.jpg'
    ]
  };

  let currentCategory = 'all';
  let currentIndex = 0;

  const sliders = {
    all: document.getElementById('all'),
    portraits: document.getElementById('portraits'),
    events: document.getElementById('events'),
    creative: document.getElementById('creative')
  };

  /* =========================
     Populate Slider Function
  ========================= */
  function populateSlider(category) {
    const slider = sliders[category];
    // If slider already has images in HTML, do not overwrite
    if (slider.querySelectorAll('img').length > 0) {
      currentIndex = 0;
      showSlide(currentIndex, category);
      return;
    }

    slider.innerHTML = '';
    let imgArray = [];

    if (category === 'all') {
      imgArray = [...images.portraits, ...images.events, ...images.creative].sort(() => Math.random() - 0.5);
    } else {
      imgArray = images[category];
    }

    imgArray.forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      img.style.display = 'none';
      img.style.width = '100%';
      slider.appendChild(img);
    });

    currentIndex = 0;
    showSlide(currentIndex, category);
  }

  function showSlide(index, category) {
    const slider = sliders[category];
    const slides = slider.querySelectorAll('img');
    slides.forEach((s, i) => s.style.display = i === index ? 'block' : 'none');
  }

  /* =========================
     Filter Buttons
  ========================= */
  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      currentCategory = btn.dataset.filter;

      Object.values(sliders).forEach(s => s.style.display = 'none');
      sliders[currentCategory].style.display = 'block';
      populateSlider(currentCategory);

      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  /* =========================
     Slider Navigation
  ========================= */
  const nextBtn = document.querySelector('.slider-next');
  const prevBtn = document.querySelector('.slider-prev');

  nextBtn.addEventListener('click', () => {
    const slides = sliders[currentCategory].querySelectorAll('img');
    if(slides.length === 0) return;
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex, currentCategory);
  });

  prevBtn.addEventListener('click', () => {
    const slides = sliders[currentCategory].querySelectorAll('img');
    if(slides.length === 0) return;
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex, currentCategory);
  });

  /* =========================
     Smooth Scroll for Links
  ========================= */
  const navAnchors = document.querySelectorAll("a[href^='#']");
  navAnchors.forEach(anchor => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute("href"));
      if(target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      if(navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
      }
    });
  });

  /* =========================
     Fade-in on Scroll
  ========================= */
  const faders = document.querySelectorAll(".fade-on-scroll");
  const appearOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };
  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(!entry.isIntersecting) return;
      entry.target.classList.add("appear");
      observer.unobserve(entry.target);
    });
  }, appearOptions);

  faders.forEach(el => appearOnScroll.observe(el));

  /* =========================
     Touch-friendly Gallery Effect
  ========================= */
  Object.values(sliders).forEach(slider => {
    slider.addEventListener("touchstart", () => {
      slider.style.transform = "scale(0.97)";
    });
    slider.addEventListener("touchend", () => {
      slider.style.transform = "scale(1)";
    });
  });

  /* =========================
     Initialize Slider
  ========================= */
  Object.values(sliders).forEach(s => s.style.display = 'none');
  sliders['all'].style.display = 'block';
  populateSlider('all');
});