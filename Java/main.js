// MAIN.JS

document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     Mobile Menu Toggle
  ========================= */
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    // Toggle on click
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      const expanded = navLinks.classList.contains("active");
      menuToggle.setAttribute("aria-expanded", expanded ? "true" : "false");
    });

    // Toggle on Enter/Space for accessibility
    menuToggle.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        menuToggle.click();
      }
    });
  }

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
      // Only close menu on mobile (when menu-toggle is visible)
      if (window.innerWidth <= 768 && navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
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
  
});