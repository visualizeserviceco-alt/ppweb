// MAIN.JS

// Unify and animate mobile menu for all pages
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (!menuToggle || !navLinks) return;

  // Hamburger/X icon logic
  function updateMenuIcon() {
    if (navLinks.classList.contains('active')) {
      menuToggle.classList.add('open');
      menuToggle.setAttribute('aria-label', 'Close navigation');
      menuToggle.innerHTML = '<span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span>';
    } else {
      menuToggle.classList.remove('open');
      menuToggle.setAttribute('aria-label', 'Open navigation');
      menuToggle.innerHTML = '<span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span>';
    }
  }

  // Initial icon
  menuToggle.innerHTML = '<span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span>';

  menuToggle.addEventListener('click', (e) => {
    e.preventDefault();
    navLinks.classList.toggle('active');
    const isActive = navLinks.classList.contains('active');
    menuToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    updateMenuIcon();
  });

  // Accessibility: toggle on Enter/Space
  menuToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      menuToggle.click();
    }
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (
      navLinks.classList.contains('active') &&
      !navLinks.contains(e.target) &&
      !menuToggle.contains(e.target)
    ) {
      navLinks.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      updateMenuIcon();
    }
  });

  // Close menu on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      updateMenuIcon();
      menuToggle.focus();
    }
  });

  // Close menu if resizing to desktop or rotating device
  const closeMenuOnResize = () => {
    if (window.innerWidth > 900 && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      updateMenuIcon();
    }
  };
  window.addEventListener('resize', closeMenuOnResize);
  window.addEventListener('orientationchange', closeMenuOnResize);

  // Close menu on nav link click (mobile)
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 900 && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        updateMenuIcon();
      }
    });
  });

  updateMenuIcon();
}

// Run on DOMContentLoaded and after header/footer loads
document.addEventListener('DOMContentLoaded', initMobileMenu);

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




window.initFAQ = function() {
  document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
      const faqItem = button.parentElement;
      const expanded = !faqItem.classList.contains('active');
      // Collapse all others for single-open UX
      document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem) {
          item.classList.remove('active');
          const btn = item.querySelector('.faq-question');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        }
      });
      faqItem.classList.toggle('active', expanded);
      button.setAttribute('aria-expanded', expanded ? 'true' : 'false');
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