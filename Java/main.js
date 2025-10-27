// Mobile menu functionality for Paps Productions
console.log('📱 Main.js loaded');

function initMobileMenu() {
  console.log('🚀 Initializing mobile menu...');
  
  // Wait for elements to be available
  setTimeout(() => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    console.log('Menu toggle found:', !!menuToggle);
    console.log('Nav links found:', !!navLinks);
    
    if (!menuToggle || !navLinks) {
      console.error('❌ Menu elements not found');
      return;
    }
    
    // Icon management
    function updateMenuIcon(isOpen) {
      const menuIcon = menuToggle.querySelector('[data-lucide="menu"]');
      const closeIcon = menuToggle.querySelector('[data-lucide="x"]');
      
      if (menuIcon && closeIcon) {
        if (isOpen) {
          menuIcon.style.display = 'none';
          closeIcon.style.display = 'block';
        } else {
          menuIcon.style.display = 'block';
          closeIcon.style.display = 'none';
        }
      }
      
      menuToggle.classList.toggle('open', isOpen);
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    }
    
    // Toggle function
    function toggleMenu(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const isActive = navLinks.classList.contains('active');
      const willBeActive = !isActive;
      
      navLinks.classList.toggle('active', willBeActive);
      document.body.classList.toggle('menu-open', willBeActive);
      
      updateMenuIcon(willBeActive);
      
      console.log('Menu toggled:', willBeActive ? 'OPEN' : 'CLOSED');
    }
    
    // Event listeners for mobile - Enhanced touch support
    menuToggle.addEventListener('click', toggleMenu);
    
    // For mobile devices, use touchend to prevent click delays
    menuToggle.addEventListener('touchend', (e) => {
      e.preventDefault();
      toggleMenu(e);
    });
    
    // Prevent touch events from interfering
    menuToggle.addEventListener('touchstart', (e) => {
      e.stopPropagation();
    });
    
    // Close menu when clicking nav links
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        document.body.classList.remove('menu-open');
        updateMenuIcon(false);
        console.log('Menu closed by navigation');
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navLinks.classList.contains('active') && 
          !navLinks.contains(e.target) && 
          !menuToggle.contains(e.target)) {
        navLinks.classList.remove('active');
        document.body.classList.remove('menu-open');
        updateMenuIcon(false);
        console.log('Menu closed by outside click');
      }
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        document.body.classList.remove('menu-open');
        updateMenuIcon(false);
        console.log('Menu closed by escape key');
      }
    });
    
    // Close on window resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 900 && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        document.body.classList.remove('menu-open');
        updateMenuIcon(false);
        console.log('Menu closed by resize');
      }
    });
    
    // Initialize
    updateMenuIcon(false);
    console.log('✅ Mobile menu initialized successfully');
    
  }, 200);
}

// FAQ functionality
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    
    if (question && answer) {
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');
        
        // Close other items
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherAnswer = otherItem.querySelector('.faq-answer');
            if (otherAnswer) otherAnswer.style.maxHeight = null;
          }
        });
        
        // Toggle current item
        if (isOpen) {
          item.classList.remove('active');
          answer.style.maxHeight = null;
        } else {
          item.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    }
  });
}

// Auto-initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('🔄 DOM ready - initializing...');
  initFAQ();
  initMobileMenu();
});

// Make globally available
window.initMobileMenu = initMobileMenu;
window.initFAQ = initFAQ;
