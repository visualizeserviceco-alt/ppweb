// Advanced Mobile Menu for Paps Productions
console.log("🚀 Loading advanced mobile menu...");

// Global menu manager
const MobileMenuManager = {
  isOpen: false,
  menuButton: null,
  navMenu: null,
  
  init() {
    console.log("📱 Initializing mobile menu...");
    this.findElements();
    this.setupEvents();
    this.setupIcon();
  },
  
  findElements() {
    // Multiple selectors for reliability
    this.menuButton = document.querySelector(".menu-toggle") || 
                     document.querySelector("button[aria-controls=\"main-menu\"]") ||
                     document.querySelector("header button");
    
    this.navMenu = document.querySelector(".nav-links") ||
                   document.querySelector("#main-menu") ||
                   document.querySelector("header ul");
    
    console.log("Elements found:", {
      button: !!this.menuButton,
      menu: !!this.navMenu
    });
    
    if (!this.menuButton || !this.navMenu) {
      console.error("❌ Menu elements not found!");
      setTimeout(() => this.findElements(), 100);
      return false;
    }
    
    return true;
  },
  
  setupEvents() {
    if (!this.menuButton || !this.navMenu) return;
    
    // Remove existing listeners
    const newButton = this.menuButton.cloneNode(true);
    this.menuButton.parentNode.replaceChild(newButton, this.menuButton);
    this.menuButton = newButton;
    
    // Add click handler
    this.menuButton.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.toggle();
    });
    
    // Add touch handler for mobile - improved
    this.menuButton.addEventListener("touchstart", (e) => {
      // Prevent default to avoid click event duplication
      e.stopPropagation();
    }, { passive: true });
    
    this.menuButton.addEventListener("touchend", (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.toggle();
    }, { passive: false });
    
    // Close menu when clicking nav links
    this.navMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => this.close());
    });
    
    // Close when clicking outside
    document.addEventListener("click", (e) => {
      if (this.isOpen && !this.navMenu.contains(e.target) && !this.menuButton.contains(e.target)) {
        this.close();
      }
    });
    
    // Close on escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen) {
        this.close();
      }
    });
    
    // Close on resize
    window.addEventListener("resize", () => {
      if (window.innerWidth > 900 && this.isOpen) {
        this.close();
      }
    });
    
    console.log("✅ Events setup complete");
  },
  
  setupIcon() {
    if (!this.menuButton) return;
    
    const menuIcon = this.menuButton.querySelector("[data-lucide=\"menu\"]");
    const closeIcon = this.menuButton.querySelector("[data-lucide=\"x\"]");
    
    if (menuIcon && closeIcon) {
      menuIcon.style.display = "block";
      closeIcon.style.display = "none";
    }
  },
  
  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  },
  
  open() {
    console.log("🟢 Opening menu");
    this.isOpen = true;
    
    if (this.navMenu) {
      this.navMenu.classList.add("active");
    }
    
    document.body.classList.add("menu-open");
    
    this.updateIcon(true);
  },
  
  close() {
    console.log("🔴 Closing menu");
    this.isOpen = false;
    
    if (this.navMenu) {
      this.navMenu.classList.remove("active");
    }
    
    document.body.classList.remove("menu-open");
    
    this.updateIcon(false);
  },
  
  updateIcon(isOpen) {
    if (!this.menuButton) return;
    
    const menuIcon = this.menuButton.querySelector("[data-lucide=\"menu\"]");
    const closeIcon = this.menuButton.querySelector("[data-lucide=\"x\"]");
    
    if (menuIcon && closeIcon) {
      if (isOpen) {
        menuIcon.style.display = "none";
        closeIcon.style.display = "block";
      } else {
        menuIcon.style.display = "block";
        closeIcon.style.display = "none";
      }
    }
    
    this.menuButton.classList.toggle("open", isOpen);
    this.menuButton.setAttribute("aria-expanded", isOpen.toString());
  }
};

// FAQ functionality - Mobile optimized
function initFAQ() {
  document.querySelectorAll(".faq-item").forEach(item => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    
    if (question && answer) {
      // Click handler for desktop
      question.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFAQ(item, answer);
      });
      
      // Touch handler for mobile
      question.addEventListener("touchend", (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFAQ(item, answer);
      }, { passive: false });
    }
  });
  
  function toggleFAQ(item, answer) {
    const isOpen = item.classList.contains("active");
    
    // Close others
    document.querySelectorAll(".faq-item").forEach(otherItem => {
      if (otherItem !== item) {
        otherItem.classList.remove("active");
        const otherAnswer = otherItem.querySelector(".faq-answer");
        if (otherAnswer) {
          otherAnswer.style.maxHeight = null;
          // Update aria-expanded
          const otherQuestion = otherItem.querySelector(".faq-question");
          if (otherQuestion) {
            otherQuestion.setAttribute("aria-expanded", "false");
          }
        }
      }
    });
    
    // Toggle current
    if (isOpen) {
      item.classList.remove("active");
      answer.style.maxHeight = null;
      const question = item.querySelector(".faq-question");
      if (question) {
        question.setAttribute("aria-expanded", "false");
      }
    } else {
      item.classList.add("active");
      answer.style.maxHeight = answer.scrollHeight + "px";
      const question = item.querySelector(".faq-question");
      if (question) {
        question.setAttribute("aria-expanded", "true");
      }
    }
  }
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    MobileMenuManager.init();
    initFAQ();
  });
} else {
  MobileMenuManager.init();
  initFAQ();
}

// Try again after a delay
setTimeout(() => {
  MobileMenuManager.init();
}, 100);

// Global access
window.MobileMenuManager = MobileMenuManager;
window.initMobileMenu = () => MobileMenuManager.init();
window.initFAQ = initFAQ;

console.log("📱 Advanced mobile menu loaded");
