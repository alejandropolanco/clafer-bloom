// ========== WHATSAPP URL ==========
const WHATSAPP_NUMBER = '573167460230';
const WHATSAPP_MSG_DEFAULT = 'Hola,%20veo%20que%20les%20interesa%20la%20marca,%20indicame%20que%20producto%20solicit%C3%A1s';

// ========== HAMBURGER MENU ==========
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
const header = document.getElementById('header');

if (hamburger && nav) {
  hamburger.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
  });

  // Cerrar menu al hacer click en un link
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      document.body.classList.remove('nav-open');
    });
  });
}

// ========== HEADER SCROLL ==========
let lastScroll = 0;

window.addEventListener('scroll', () => {
  if (!header) return;
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    header.style.boxShadow = '0 4px 30px rgba(88, 28, 92, 0.2)';
  } else {
    header.style.boxShadow = '0 4px 20px rgba(88, 28, 92, 0.15)';
  }

  lastScroll = currentScroll;
});

// ========== SCROLL REVEAL (Intersection Observer) ==========
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

// ========== HELPERS ==========
function formatPrice(num) {
  return '$' + num.toLocaleString('es-CO');
}

function getWhatsAppUrl(msg) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

// ========== INIT ==========
document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
});
