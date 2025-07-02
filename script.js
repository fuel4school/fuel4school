document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const toggleMode = document.querySelector('#dark-mode-toggle');

  if (!navbar || !menuToggle || !navLinks || !toggleMode) {
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

  // Dark mode toggle
  toggleMode.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
  });

  // Load saved dark mode preference
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    toggleMode.checked = true;
  }

  // Add scroll event listener
  window.addEventListener('scroll', handleScroll);

  // Survey form submission
  const surveyForm = document.getElementById('surveyForm');
  if (surveyForm) {
    surveyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const lunchQuality = document.querySelector('input[name="lunchQuality"]:checked').value;
      const lunchFrequency = document.querySelector('input[name="lunchFrequency"]:checked').value;

      // Load existing data or initialize
      let surveyData = JSON.parse(localStorage.getItem('surveyData')) || { quality: {}, frequency: {} };

      // Update quality counts
      surveyData.quality[lunchQuality] = (surveyData.quality[lunchQuality] || 0) + 1;
      // Update frequency counts
      surveyData.frequency[lunchFrequency] = (surveyData.frequency[lunchFrequency] || 0) + 1;

      // Save updated data
      localStorage.setItem('surveyData', JSON.stringify(surveyData));
      alert('Thank you for your feedback!');
      surveyForm.reset();
    });
  }

  // Chart rendering for stats page
  const qualityChart = document.getElementById('qualityChart');
  const frequencyChart = document.getElementById('frequencyChart');
  if (qualityChart && frequencyChart) {
    const surveyData = JSON.parse(localStorage.getItem('surveyData')) || { quality: {}, frequency: {} };

    // Quality Chart
    new Chart(qualityChart, {
      type: 'bar',
      data: {
        labels: Object.keys(surveyData.quality),
        datasets: [{
          label: 'Responses',
          data: Object.values(surveyData.quality),
          backgroundColor: 'rgba(20, 184, 166, 0.8)',
          borderColor: 'rgba(15, 118, 110, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: { y: { beginAtZero: true } },
        plugins: { legend: { display: false } }
      }
    });

    // Frequency Chart
    new Chart(frequencyChart, {
      type: 'bar',
      data: {
        labels: Object.keys(surveyData.frequency),
        datasets: [{
          label: 'Responses',
          data: Object.values(surveyData.frequency),
          backgroundColor: 'rgba(244, 114, 182, 0.8)',
          borderColor: 'rgba(236, 72, 153, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: { y: { beginAtZero: true } },
        plugins: { legend: { display: false } }
      }
    });
  }
});

// Ensure Chart.js is included via CDN
const script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
document.head.appendChild(script);
