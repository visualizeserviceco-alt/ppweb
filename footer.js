// Dynamically load the reusable header component into every page
fetch('/Backend/header.html')
  .then(res => res.text())
  .then(html => {
    let header = document.querySelector('header');
    if (!header) {
      header = document.createElement('header');
      document.body.insertBefore(header, document.body.firstChild);
    }
    header.outerHTML = html;
    
    // Reinitialize mobile menu after header is loaded
    if (window.initMobileMenu) {
      window.initMobileMenu();
    }
  })
  .catch(err => console.log('Header loading not available:', err));

// Dynamically load the reusable footer component into every page
fetch('/Backend/footer.html')
  .then(res => res.text())
  .then(html => {
    let footer = document.querySelector('footer');
    if (!footer) {
      footer = document.createElement('footer');
      document.body.appendChild(footer);
    }
    footer.innerHTML = html;
  });
