document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const menuToggle = document.createElement('button');
  menuToggle.className = 'menu-toggle';
  menuToggle.innerHTML = '☰';
  navbar.appendChild(menuToggle);

  const toggleDarkMode = document.createElement('button');
  toggleDarkMode.className = 'toggle-dark-mode';
  toggleDarkMode.textContent = 'Toggle Dark Mode';
  navbar.appendChild(toggleDarkMode);

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

  // Dark mode toggle
  const applyDarkMode = (isDark) => {
    document.body.classList.toggle('dark-mode', isDark);
    localStorage.setItem('darkMode', isDark);
  };

  toggleDarkMode.addEventListener('click', () => {
    const isDark = !document.body.classList.contains('dark-mode');
    applyDarkMode(isDark);
  });

  // Load saved preference
  const savedDarkMode = localStorage.getItem('darkMode') === 'true';
  if (savedDarkMode) {
    applyDarkMode(true);
  }

  // Add scroll event listener
  window.addEventListener('scroll', handleScroll);

  // Error handling
  if (!navbar) {
    console.error('Navbar not found');
  }
});
