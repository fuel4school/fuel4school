document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const menuToggle = document.createElement('button');
  menuToggle.className = 'menu-toggle';
  menuToggle.innerHTML = '☰';
  navbar.appendChild(menuToggle);

  const logo = document.createElement('a');
  logo.className = 'logo';
  logo.href = 'index.html';
  logo.textContent = 'F4S';
  navbar.insertBefore(logo, navbar.firstChild);

  const toggleMode = document.createElement('button');
  toggleMode.className = 'toggle-mode';
  toggleMode.textContent = 'Toggle Mode';
  navbar.insertBefore(toggleMode, navbar.firstChild.nextSibling);

  let lastScroll = 0;
  let scrollTimeout;

  // Debounce scroll function
  const handleScroll = () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      let currentScroll = window.pageYOffset;
      if (currentScroll > lastScroll && currentScroll > 50) {
        navbar.classList.add('hidden');
      } else {
        navbar.classList.remove('hidden');
      }
      lastScroll = currentScroll;
    }, 100);
  };

  // Mobile menu toggle
  menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('active');
  });

  // Close mobile menu when clicking a link
  navbar.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navbar.classList.remove('active');
    });
  });

  // Mode toggle
  const applyMode = (isDark) => {
    document.body.classList.toggle('dark-mode', isDark);
    localStorage.setItem('darkMode', isDark);
    toggleMode.textContent = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
  };

  toggleMode.addEventListener('click', () => {
    const isDark = !document.body.classList.contains('dark-mode');
    applyMode(isDark);
  });

  // Load saved preference
  const savedDarkMode = localStorage.getItem('darkMode') === 'true';
  if (savedDarkMode) {
    applyMode(true);
  } else {
    applyMode(false); // Ensure light mode is applied if no preference
  }

  // Add scroll event listener
  window.addEventListener('scroll', handleScroll);

  // Error handling
  if (!navbar) {
    console.error('Navbar not found');
  }
});
