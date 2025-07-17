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

  menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('active');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navbar.classList.remove('active');
    });
  });

  toggleMode.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
  });

  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    toggleMode.checked = true;
  }

  window.addEventListener('scroll', handleScroll);

  const surveyForm = document.getElementById('surveyForm');
  if (surveyForm) {
    surveyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const lunchQuality = document.querySelector('input[name="lunchQuality"]:checked').value;
      const lunchFrequency = document.querySelector('input[name="lunchFrequency"]:checked').value;
      const profession = document.getElementById('profession').value;
      const workSetting = document.getElementById('workSetting').value;

      let surveyData = JSON.parse(localStorage.getItem('surveyData')) || {
        quality: {},
        frequency: {},
        professions: {},
        settings: {}
      };

      surveyData.quality[lunchQuality] = (surveyData.quality[lunchQuality] || 0) + 1;
      surveyData.frequency[lunchFrequency] = (surveyData.frequency[lunchFrequency] || 0) + 1;
      surveyData.professions[profession] = (surveyData.professions[profession] || 0) + 1;
      surveyData.settings[workSetting] = (surveyData.settings[workSetting] || 0) + 1;

      localStorage.setItem('surveyData', JSON.stringify(surveyData));
      alert('thanks for your feedback!');
      surveyForm.reset();
    });
  }

  const qualityChart = document.getElementById('qualityChart');
  const frequencyChart = document.getElementById('frequencyChart');
  const professionChart = document.getElementById('professionChart');
  const settingChart = document.getElementById('settingChart');
  if (qualityChart && frequencyChart && professionChart && settingChart) {
    const surveyData = JSON.parse(localStorage.getItem('surveyData')) || {
      quality: {},
      frequency: {},
      professions: {},
      settings: {}
    };

    new Chart(qualityChart, {
      type: 'bar',
      data: {
        labels: Object.keys(surveyData.quality),
        datasets: [{
          label: 'responses',
          data: Object.values(surveyData.quality),
          backgroundColor: 'rgba(20, 184, 166, 0.8)',
          borderColor: 'rgba(15, 118, 110, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: { y: { beginAtZero: true } },
        plugins: { legend: { display: false } }
      }
    });

    new Chart(frequencyChart, {
      type: 'bar',
      data: {
        labels: Object.keys(surveyData.frequency),
        datasets: [{
          label: 'responses',
          data: Object.values(surveyData.frequency),
          backgroundColor: 'rgba(244, 114, 182, 0.8)',
          borderColor: 'rgba(236, 72, 153, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: { y: { beginAtZero: true } },
        plugins: { legend: { display: false } }
      }
    });

    new Chart(professionChart, {
      type: 'bar',
      data: {
        labels: Object.keys(surveyData.professions),
        datasets: [{
          label: 'responses',
          data: Object.values(surveyData.professions),
          backgroundColor: 'rgba(20, 184, 166, 0.8)',
          borderColor: 'rgba(15, 118, 110, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: { y: { beginAtZero: true } },
        plugins: { legend: { display: false } }
      }
    });

    new Chart(settingChart, {
      type: 'bar',
      data: {
        labels: Object.keys(surveyData.settings),
        datasets: [{
          label: 'responses',
          data: Object.values(surveyData.settings),
          backgroundColor: 'rgba(244, 114, 182, 0.8)',
          borderColor: 'rgba(236, 72, 153, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: { y: { beginAtZero: true } },
        plugins: { legend: { display: false } }
      }
    });
  }
});

const script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
document.head.appendChild(script);
