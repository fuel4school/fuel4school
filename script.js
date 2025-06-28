document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const toggleMode = document.querySelector('.toggle-mode');
  const logo = document.querySelector('.logo');

  if (!navbar || !menuToggle || !navLinks || !toggleMode || !logo) {
    console.error('One or more navbar elements not found');
    return;
  }

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
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navbar.classList.remove('active');
    });
  });

  // Mode toggle
  const applyMode = (isDark) => {
    document.body.classList.toggle('dark-mode', isDark);
    localStorage.setItem('darkMode', isDark);
    toggleMode.textContent = isDark ? 'Toggle to Light Mode' : 'Toggle to Dark Mode';
  };

  toggleMode.addEventListener('click', () => {
    const isDark = !document.body.classList.contains('dark-mode');
    applyMode(isDark);
  });

  // Load saved preference
  const savedDarkMode = localStorage.getItem('dynamicMode') === 'true';
  if (savedDarkMode) {
    applyMode(true);
  } else {
    applyMode(false); // Default to light mode
  }

  // Add scroll event listener
  window.addEventListener('scroll', handleScroll);
});
