/* ═══════════════════════════════════════════════════
   ЭСТЕТ-С — main.js
   ═══════════════════════════════════════════════════ */

// ─── Header scroll effect ───────────────────────────
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}, { passive: true });

// ─── Mobile burger menu ──────────────────────────────
const burger   = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ─── Smooth scroll for all anchor links ─────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ─── Intersection Observer for scroll animations ────
const observerOpts = {
  threshold: 0.12,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // stagger siblings in a grid
      const siblings = entry.target.parentElement
        ? Array.from(entry.target.parentElement.children).filter(el => el.hasAttribute('data-aos') || el.classList.contains('svc-card') || el.classList.contains('equip-card') || el.classList.contains('spec-item') || el.classList.contains('cnt-box') || el.classList.contains('contact-card'))
        : [];
      const idx = siblings.indexOf(entry.target);
      const delay = Math.min(idx * 80, 400);

      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);

      observer.unobserve(entry.target);
    }
  });
}, observerOpts);

// Observe all animated elements
const animatedSelectors = [
  '[data-aos]',
  '.svc-card',
  '.equip-card',
  '.cnt-box',
  '.spec-item',
  '.contact-card',
  '.about-quote',
  '.implant-row',
  '.map-block',
  '.doctors-cta',
  '.about-left'
];

document.querySelectorAll(animatedSelectors.join(', ')).forEach(el => {
  observer.observe(el);
});

// ─── Counter animation ───────────────────────────────
function animateCounter(el, target, duration = 1800) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start);
    }
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el     = entry.target;
      const target = parseInt(el.getAttribute('data-count'), 10);
      animateCounter(el, target);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => {
  counterObserver.observe(el);
});

// ─── Active nav link on scroll ───────────────────────
const sections = document.querySelectorAll('section[id], div[id]');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) {
      current = sec.getAttribute('id');
    }
  });

  navItems.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}, { passive: true });
