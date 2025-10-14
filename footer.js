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
