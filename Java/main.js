// MAIN.JS

window.initHeaderMenu = function() {
  /* =========================
     Sticky Header Animation
  ========================= */
  const header = document.querySelector("header");
  let lastScroll = 0;
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!header) return;
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const curr = window.scrollY;
        if (curr > 60) {
          header.classList.add("scrolled");
          if (curr > lastScroll) header.classList.add("hide");
          else header.classList.remove("hide");
        } else {
          header.classList.remove("scrolled", "hide");
        }
        lastScroll = curr;
        ticking = false;
      });
      ticking = true;
    }
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
      if (expanded) menuToggle.focus();
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
        menuToggle.focus();
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
        menuToggle.focus();
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
      entry.target.style.transform = "translateY(0) scale(1)";
      observer.unobserve(entry.target);
    });
  }, fadeInOptions);

  sections.forEach(section => {
    section.style.opacity = 0;
    section.style.transform = "translateY(40px) scale(0.98)";
    fadeInOnScroll.observe(section);
  });
};

// If header is already present (not loaded via AJAX), run immediately
if (document.querySelector("header")) {
  window.initHeaderMenu();
}

window.initFAQ = function() {
  document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
      const faqItem = button.parentElement;
      faqItem.classList.toggle('active');
    });
  });
};

// Run FAQ JS after DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  if (window.initFAQ) window.initFAQ();
});

// Advanced navigation: hamburger menu, accessibility, smooth transitions

document.addEventListener('DOMContentLoaded', function() {
  // Hamburger menu logic
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', navLinks.classList.contains('active'));
    });
    menuToggle.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        menuToggle.click();
      }
    });
    // Close menu on link click (mobile UX)
    document.querySelectorAll('.nav-links a').forEach(function(link) {
      link.addEventListener('click', function() {
        if (window.innerWidth < 900 && navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          menuToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = anchor.getAttribute('href');
      if (!href || href.length < 2) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const header = document.querySelector('.main-header');
        const headerHeight = header ? header.offsetHeight : 0;
        const rect = target.getBoundingClientRect();
        const scrollTo = window.scrollY + rect.top - headerHeight + 2;
        window.scrollTo({ top: scrollTo, behavior: "smooth" });
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
      entry.target.style.transform = "translateY(0) scale(1)";
      observer.unobserve(entry.target);
    });
  }, fadeInOptions);

  sections.forEach(section => {
    section.style.opacity = 0;
    section.style.transform = "translateY(40px) scale(0.98)";
    fadeInOnScroll.observe(section);
  });

  // FAQ accordion and fade-in animation
  document.addEventListener('DOMContentLoaded', function() {
    // Accordion logic
    document.querySelectorAll('.faq-question').forEach(function(btn) {
      btn.addEventListener('click', function() {
        const item = btn.parentElement;
        const expanded = item.classList.toggle('active');
        btn.setAttribute('aria-expanded', expanded);
        // Collapse others for better UX
        document.querySelectorAll('.faq-item').forEach(function(other) {
          if (other !== item) {
            other.classList.remove('active');
            other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
          }
        });
      });
      btn.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          btn.click();
        }
      });
    });

    // Fade-in FAQ items on scroll
    const faqItems = document.querySelectorAll('.faq-item');
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('faq-visible');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
      faqItems.forEach(item => observer.observe(item));
    } else {
      // Fallback: show all
      faqItems.forEach(item => item.classList.add('faq-visible'));
    }
  });
});

// ...other modular JS as needed...