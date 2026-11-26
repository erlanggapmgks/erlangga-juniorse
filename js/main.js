/* ══════════════════════════════════════════
   THEME — dark by default
══════════════════════════════════════════ */
(function initTheme() {
  const saved = localStorage.getItem('theme');
  if (saved === 'light') {
    document.documentElement.classList.add('light');
  }
})();

document.getElementById('theme-toggle').addEventListener('click', () => {
  const isLight = document.documentElement.classList.toggle('light');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

/* ══════════════════════════════════════════
   NAVBAR — shrink on scroll
══════════════════════════════════════════ */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.style.padding = '12px 0';
    navbar.style.background = 'var(--nav-bg)';
    navbar.style.backdropFilter = 'blur(16px)';
    navbar.style.WebkitBackdropFilter = 'blur(16px)';
    navbar.style.borderBottom = '1px solid var(--border)';
  } else {
    navbar.style.padding = '24px 0';
    navbar.style.background = 'transparent';
    navbar.style.backdropFilter = 'none';
    navbar.style.WebkitBackdropFilter = 'none';
    navbar.style.borderBottom = 'none';
  }
}, { passive: true });

/* ══════════════════════════════════════════
   NAVBAR — active section highlight
══════════════════════════════════════════ */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link[data-section]');

function setActiveNav() {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.section === current);
  });
}
window.addEventListener('scroll', setActiveNav, { passive: true });
setActiveNav();

/* ══════════════════════════════════════════
   MOBILE MENU
══════════════════════════════════════════ */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const spans      = hamburger.querySelectorAll('span');

function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; s.style.width = ''; });
  hamburger.setAttribute('aria-expanded', 'false');
}

hamburger.addEventListener('click', () => {
  if (mobileMenu.classList.contains('open')) { closeMobileMenu(); return; }
  mobileMenu.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  spans[0].style.transform = 'rotate(45deg) translate(4px,4px)';
  spans[1].style.opacity   = '0';
  spans[2].style.transform = 'rotate(-45deg) translate(3px,-3px)';
  spans[2].style.width     = '20px';
});

mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobileMenu));
document.addEventListener('click', e => {
  if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) closeMobileMenu();
});

/* ══════════════════════════════════════════
   PROJECT ACCORDION
══════════════════════════════════════════ */
document.querySelectorAll('.project-row').forEach(row => {
  row.querySelector('.project-header').addEventListener('click', () => {
    const isOpen = row.classList.contains('open');
    document.querySelectorAll('.project-row').forEach(r => r.classList.remove('open'));
    if (!isOpen) row.classList.add('open');
  });
});

/* ══════════════════════════════════════════
   EXPERIENCE ACCORDION
══════════════════════════════════════════ */
document.querySelectorAll('.exp-entry').forEach(entry => {
  entry.querySelector('.exp-header').addEventListener('click', () => {
    const isOpen = entry.classList.contains('open');
    document.querySelectorAll('.exp-entry').forEach(e => e.classList.remove('open'));
    if (!isOpen) entry.classList.add('open');
  });
});

/* ══════════════════════════════════════════
   SCROLL REVEAL
══════════════════════════════════════════ */
const reveals  = document.querySelectorAll('.reveal');
const revealOb = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealOb.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

reveals.forEach(el => {
  if (el.getBoundingClientRect().top < window.innerHeight) {
    el.classList.add('visible');
  } else {
    revealOb.observe(el);
  }
});
