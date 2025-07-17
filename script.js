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

      // Animate sections on scroll
      document.querySelectorAll('.animate').forEach(section => {
        if (isInViewport(section)) {
          section.classList.add('show');
        }
      });
    }, 100);
  };

  function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

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
      const lunchEvaluation = document.querySelector('input[name="lunchEvaluation"]:checked').value;
      const portionAdequate = document.querySelector('input[name="portionAdequate"]:checked').value;
      const serviceEfficient = document.querySelector('input[name="serviceEfficient"]:checked').value;
      const recommendProgram = document.querySelector('input[name="recommendProgram"]:checked').value;

      let surveyData = JSON.parse(localStorage.getItem('surveyData')) || {
        evaluation: {},
        portion: {},
        service: {},
        recommend: {}
      };
      surveyData.evaluation[lunchEvaluation] = (surveyData.evaluation[lunchEvaluation] || 0) + 1;
      surveyData.portion[portionAdequate] = (surveyData.portion[portionAdequate] || 0) + 1;
      surveyData.service[serviceEfficient] = (surveyData.service[serviceEfficient] || 0) + 1;
      surveyData.recommend[recommendProgram] = (surveyData.recommend[recommendProgram] || 0) + 1;

      let answers = JSON.parse(localStorage.getItem('sampleAnswers')) || [];
      answers.push(lunchEvaluation);
      answers = [...new Set(answers.slice(-5))]; // Keep last 5 unique answers
      localStorage.setItem('sampleAnswers', JSON.stringify(answers));

      localStorage.setItem('surveyData', JSON.stringify(surveyData));
      alert('thanks for your feedback!');
      surveyForm.reset();
      displayAnswers();
    });

    function displayAnswers() {
      const answersDisplay = document.getElementById('answersDisplay');
      if (answersDisplay) {
        const answers = JSON.parse(localStorage.getItem('sampleAnswers')) || [];
        answersDisplay.innerHTML = answers.length ? answers.map(answer => `<p>${answer.charAt(0).toUpperCase() + answer.slice(1)}</p>`).join('') : '<p>No responses yet.</p>';
      }
    }
    displayAnswers();
  }

  const evaluationChart = document.getElementById('evaluationChart');
  const portionChart = document.getElementById('portionChart');
  const serviceChart = document.getElementById('serviceChart');
  const recommendChart = document.getElementById('recommendChart');
  if (evaluationChart && portionChart && serviceChart && recommendChart) {
    const surveyData = JSON.parse(localStorage.getItem('surveyData')) || {
      evaluation: {},
      portion: {},
      service: {},
      recommend: {}
    };

    new Chart(evaluationChart, {
      type: 'bar',
      data: {
        labels: Object.keys(surveyData.evaluation),
        datasets: [{
          label: 'responses',
          data: Object.values(surveyData.evaluation),
          backgroundColor: 'rgba(20, 184, 166, 0.8)',
          borderColor: 'rgba(15, 118, 110, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: { y: { beginAtZero: true, max: 100 } },
        plugins: { legend: { display: false } }
      }
    });

    new Chart(portionChart, {
      type: 'bar',
      data: {
        labels: Object.keys(surveyData.portion),
        datasets: [{
          label: 'responses',
          data: Object.values(surveyData.portion),
          backgroundColor: 'rgba(244, 114, 182, 0.8)',
          borderColor: 'rgba(236, 72, 153, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: { y: { beginAtZero: true, max: 100 } },
        plugins: { legend: { display: false } }
      }
    });

    new Chart(serviceChart, {
      type: 'bar',
      data: {
        labels: Object.keys(surveyData.service),
        datasets: [{
          label: 'responses',
          data: Object.values(surveyData.service),
          backgroundColor: 'rgba(20, 184, 166, 0.8)',
          borderColor: 'rgba(15, 118, 110, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: { y: { beginAtZero: true, max: 100 } },
        plugins: { legend: { display: false } }
      }
    });

    new Chart(recommendChart, {
      type: 'bar',
      data: {
        labels: Object.keys(surveyData.recommend),
        datasets: [{
          label: 'responses',
          data: Object.values(surveyData.recommend),
          backgroundColor: 'rgba(244, 114, 182, 0.8)',
          borderColor: 'rgba(236, 72, 153, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: { y: { beginAtZero: true, max: 100 } },
        plugins: { legend: { display: false } }
      }
    });
  }
});

const script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
document.head.appendChild(script);
