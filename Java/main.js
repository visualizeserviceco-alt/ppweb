// MAIN.JS

window.initHeaderMenu = function() {
  /* =========================
     Sticky Header Animation
  ========================= */
  const header = document.querySelector("header");
  let lastScroll = 0;
  window.addEventListener("scroll", () => {
    if (!header) return;
    const curr = window.scrollY;
    if (curr > 60) {
      header.classList.add("scrolled");
      if (curr > lastScroll) header.classList.add("hide");
      else header.classList.remove("hide");
    } else {
      header.classList.remove("scrolled", "hide");
    }
    lastScroll = curr;
  });

  /* =========================
     Mobile Menu Toggle + UX
  ========================= */
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    // Toggle on click
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
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

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (
        navLinks.classList.contains("active") &&
        !navLinks.contains(e.target) &&
        e.target !== menuToggle
      ) {
        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });

    // Close menu on ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });

    // Close menu if resizing to desktop or rotating device
    const closeMenuOnResize = () => {
      if (window.innerWidth > 768 && navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    };
    window.addEventListener("resize", closeMenuOnResize);
    window.addEventListener("orientationchange", closeMenuOnResize);
  }

  /* =========================
     Smooth Scroll for Links (with header offset)
  ========================= */
  const navAnchors = document.querySelectorAll("a[href^='#']");
  navAnchors.forEach(anchor => {
    anchor.addEventListener("click", (e) => {
      const href = anchor.getAttribute("href");
      if (!href || href.length < 2) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        // Use scroll-margin-top for modern browsers, fallback for others
        const headerHeight = header ? header.offsetHeight : 0;
        const rect = target.getBoundingClientRect();
        const scrollTo = window.scrollY + rect.top - headerHeight + 2;
        window.scrollTo({ top: scrollTo, behavior: "smooth" });
      }
      // Only close menu on mobile
      if (window.innerWidth <= 768 && navLinks && navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  });

  /* =========================
     Fade-in on Scroll for Sections
  ========================= */
  const sections = document.querySelectorAll("main > section");
  const fadeInOptions = {
    threshold: 0.10,
    rootMargin: "0px 0px -40px 0px",
  };
  const fadeInOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.style.opacity = 1;
      entry.target.style.transform = "translateY(0)";
      observer.unobserve(entry.target);
    });
  }, fadeInOptions);

  sections.forEach(section => {
    section.style.opacity = 0;
    section.style.transform = "translateY(40px)";
    fadeInOnScroll.observe(section);
  });
};

// If header is already present (not loaded via AJAX), run immediately
if (document.querySelector("header")) {
  window.initHeaderMenu();
}