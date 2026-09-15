const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const navbar = document.getElementById('navbar');
const yearEl = document.getElementById('year');

// Set current year
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Mobile menu toggle
function toggleMenu() {
  const isOpen = navLinks.classList.toggle('open');
  if (menuToggle) {
    menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    const icon = menuToggle.querySelector('i');
    if (icon) {
      icon.classList.toggle('fa-bars', !isOpen);
      icon.classList.toggle('fa-times', isOpen);
    }
  }
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', toggleMenu);

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      if (menuToggle) {
        menuToggle.setAttribute('aria-expanded', 'false');
        const icon = menuToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-times');
        }
      }
    });
  });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Reveal animation on scroll
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// Active navigation highlight
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${id}`) {
          item.classList.add('active');
        }
      });
    }
  });
}, {
  threshold: 0.3,
  rootMargin: '-60px 0px -50% 0px'
});

sections.forEach(section => sectionObserver.observe(section));

// Smooth scroll behavior for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && href.length > 1) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});
