// Dynamically load the reusable footer component into every page
(function() {
  'use strict';
  
  // Helper function to get the correct path
  function getFooterPath() {
    // Try relative path first (works in most contexts)
    return 'Backend/footer.html';
  }
  
  function loadFooter() {
    const footerPath = getFooterPath();
    
    fetch(footerPath)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        return res.text();
      })
      .then(html => {
        // Find or create footer element
        let footer = document.querySelector('footer') || 
                    document.querySelector('#footer-include') ||
                    document.querySelector('[id*="footer"]');
        
        if (!footer) {
          footer = document.createElement('footer');
          document.body.appendChild(footer);
        }
        
        footer.innerHTML = html;
        
        // Initialize Lucide icons in footer after a short delay
        if (typeof lucide !== 'undefined') {
          setTimeout(() => {
            lucide.createIcons();
          }, 100);
        }
      })
      .catch(error => {
        console.warn('Failed to load footer:', error);
      });
  }
  
  // Load footer when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => loadFooter());
  } else {
    loadFooter();
  }
})();
