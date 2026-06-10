document.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loader');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const themeToggle = document.getElementById('themeToggle');
  const typingText = document.getElementById('typingText');
  const backToTop = document.getElementById('backToTop');
  const year = document.getElementById('year');
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');
  const revealElements = document.querySelectorAll('.reveal');

  const typingWords = [
    'responsive web apps.',
    'beautiful interfaces.',
    'secure backend systems.',
    'smart database solutions.'
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const storedTheme = localStorage.getItem('portfolio-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const activeTheme = storedTheme || (prefersDark ? 'dark' : 'light');

  if (activeTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.querySelector('i').className = 'fa-solid fa-sun';
    themeToggle.querySelector('span').textContent = 'Light';
  }

  year.textContent = new Date().getFullYear();

  const animateTyping = () => {
    const currentWord = typingWords[wordIndex];
    const visibleText = isDeleting
      ? currentWord.slice(0, charIndex--)
      : currentWord.slice(0, charIndex++);

    typingText.textContent = visibleText;

    if (!isDeleting && charIndex > currentWord.length) {
      isDeleting = true;
      setTimeout(animateTyping, 1200);
      return;
    }

    if (isDeleting && charIndex < 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % typingWords.length;
      charIndex = 0;
    }

    const delay = isDeleting ? 50 : 90;
    setTimeout(animateTyping, delay);
  };

  animateTyping();

  const hideLoader = () => {
    loader.classList.add('is-hidden');
  };

  window.addEventListener('load', () => {
    setTimeout(hideLoader, 450);
  });

  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navMenu.classList.toggle('is-open');
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
      themeToggle.querySelector('i').className = 'fa-solid fa-moon';
      themeToggle.querySelector('span').textContent = 'Mode';
      localStorage.setItem('portfolio-theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      themeToggle.querySelector('i').className = 'fa-solid fa-sun';
      themeToggle.querySelector('span').textContent = 'Light';
      localStorage.setItem('portfolio-theme', 'dark');
    }
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach((element) => observer.observe(element));

  const updateBackToTop = () => {
    if (window.scrollY > 600) {
      backToTop.classList.add('is-visible');
    } else {
      backToTop.classList.remove('is-visible');
    }
  };

  updateBackToTop();
  window.addEventListener('scroll', updateBackToTop, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !message) {
      formFeedback.textContent = 'Please fill out all fields before sending.';
      formFeedback.style.color = '#dc2626';
      return;
    }

    if (!emailPattern.test(email)) {
      formFeedback.textContent = 'Please enter a valid email address.';
      formFeedback.style.color = '#dc2626';
      return;
    }

    formFeedback.textContent = 'Message validated successfully. Connect through email for direct communication.';
    formFeedback.style.color = '#16a34a';
    contactForm.reset();
  });
});
