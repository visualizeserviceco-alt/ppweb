// MAIN.JS - Clean version

// Mobile menu functionality
function initMobileMenu() {
  console.log('Initializing mobile menu...');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  console.log('Menu toggle:', menuToggle);
  console.log('Nav links:', navLinks);
  
  if (!menuToggle || !navLinks) {
    console.error('Menu elements not found!');
    return;
  }

  // Hamburger/X icon animation
  function updateMenuIcon() {
    if (navLinks.classList.contains('active')) {
      menuToggle.classList.add('open');
      menuToggle.setAttribute('aria-label', 'Close navigation');
    } else {
      menuToggle.classList.remove('open');
      menuToggle.setAttribute('aria-label', 'Open navigation');
    }
  }

  // Menu toggle click handler
  menuToggle.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('Menu toggle clicked');
    navLinks.classList.toggle('active');
    const isActive = navLinks.classList.contains('active');
    console.log('Menu is now:', isActive ? 'open' : 'closed');
    menuToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    updateMenuIcon();
  });

  // Keyboard accessibility
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

  // Close menu on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      updateMenuIcon();
      menuToggle.focus();
    }
  });

  // Close menu on window resize (desktop view)
  const closeMenuOnResize = () => {
    if (window.innerWidth > 900 && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      updateMenuIcon();
    }
  };
  window.addEventListener('resize', closeMenuOnResize);
  window.addEventListener('orientationchange', closeMenuOnResize);

  // Close menu when nav link is clicked (mobile)
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
  console.log('Mobile menu initialized successfully');
}

// Make function globally available for dynamic loading
window.initMobileMenu = initMobileMenu;

// FAQ functionality
function initFAQ() {
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
}

// Smooth scroll for anchor links
function initSmoothScroll() {
  // Handle data-target navigation links
  document.querySelectorAll("a[data-target]").forEach(anchor => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = anchor.getAttribute("data-target");
      
      // Handle booking page navigation
      if (targetId === 'booking-page') {
        // Check if we're already on booking page
        if (window.location.pathname.includes('booking')) {
          return; // Already on booking page
        } else {
          // Check if we're on index page or in Pages folder
          if (window.location.pathname.includes('Pages/')) {
            window.location.href = 'booking.html';
          } else {
            window.location.href = 'Pages/booking.html';
          }
          return;
        }
      }
      
      // Handle navigation from booking page to home sections
      if (targetId.startsWith('home-')) {
        const sectionId = targetId.replace('home-', '');
        if (window.location.pathname.includes('booking')) {
          // Navigate to home page with section (will scroll to section after load)
          window.location.href = `../index.html#${sectionId}`;
          return;
        } else {
          // Already on home page, scroll to section
          const target = document.querySelector(`#${sectionId}`);
          if (target) {
            const header = document.querySelector('.main-header');
            const headerHeight = header ? header.offsetHeight : 0;
            const rect = target.getBoundingClientRect();
            const scrollTo = window.scrollY + rect.top - headerHeight + 2;
            window.scrollTo({ top: scrollTo, behavior: "smooth" });
          }
          return;
        }
      }
      
      // Handle same-page navigation
      const target = document.querySelector(`#${targetId}`);
      if (target) {
        const header = document.querySelector('.main-header');
        const headerHeight = header ? header.offsetHeight : 0;
        const rect = target.getBoundingClientRect();
        const scrollTo = window.scrollY + rect.top - headerHeight + 2;
        window.scrollTo({ top: scrollTo, behavior: "smooth" });
        
        // Update URL without showing hash (optional)
        // history.replaceState(null, null, ' ');
      }
    });
  });

  // Handle traditional anchor links (fallback)
  document.querySelectorAll("a[href^='#']").forEach(anchor => {
    anchor.addEventListener("click", (e) => {
      const href = anchor.getAttribute("href");
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
}

// Handle hash navigation on page load
function handleHashOnLoad() {
  const hash = window.location.hash.slice(1); // Remove the #
  if (hash) {
    const target = document.querySelector(`#${hash}`);
    if (target) {
      // Wait for page to fully load
      setTimeout(() => {
        const header = document.querySelector('.main-header');
        const headerHeight = header ? header.offsetHeight : 0;
        const rect = target.getBoundingClientRect();
        const scrollTo = window.scrollY + rect.top - headerHeight + 2;
        window.scrollTo({ top: scrollTo, behavior: "smooth" });
        
        // Remove hash from URL after scrolling
        history.replaceState(null, null, window.location.pathname);
      }, 100);
    }
  }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing all functionality...');
  
  // Initialize mobile menu
  initMobileMenu();
  
  // Initialize FAQ if elements exist
  if (document.querySelector('.faq-question')) {
    initFAQ();
  }
  
  // Initialize smooth scroll
  initSmoothScroll();
  
  // Handle hash navigation on page load
  handleHashOnLoad();
  
  // Test menu after a short delay
  setTimeout(() => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    console.log('Final check - Menu toggle found:', !!menuToggle);
    console.log('Final check - Nav links found:', !!navLinks);
    if (menuToggle && navLinks) {
      console.log('Mobile menu setup complete and ready!');
    } else {
      console.error('Mobile menu elements still not found after initialization!');
    }
  }, 500);
});