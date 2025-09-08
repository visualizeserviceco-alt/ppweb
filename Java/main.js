

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
     Portfolio Filtering
  ========================= */
  const filterButtons = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;

      galleryItems.forEach((item) => {
        if (filter === "all" || item.dataset.category === filter) {
          item.style.display = "block";
          setTimeout(() => item.classList.add("fade-in"), 50);
        } else {
          item.classList.remove("fade-in");
          setTimeout(() => (item.style.display = "none"), 300);
        }
      });
    });
  });

  /* =========================
     Smooth Scroll for Links
  ========================= */
  const navAnchors = document.querySelectorAll("a[href^='#']");
  navAnchors.forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      if (navLinks.classList.contains("active")) {
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
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("appear");
      observer.unobserve(entry.target);
    });
  }, appearOptions);

  faders.forEach((el) => {
    appearOnScroll.observe(el);
  });

  /* =========================
     Contact Form Validation Placeholder
  ========================= */
  const contactForm = document.querySelector(".contact-form");
  const formMessages = document.querySelector(".form-messages");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = contactForm.name.value.trim();
      const email = contactForm.email.value.trim();
      const message = contactForm.message.value.trim();

      if (!name || !email || !message) {
        formMessages.textContent = "Please fill out all fields!";
        return;
      }

      formMessages.textContent = "Thank you! Your message has been sent!";
      contactForm.reset();
    });
  }
});