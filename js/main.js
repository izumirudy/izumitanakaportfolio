// ─── NAV SCROLL SHADOW ────────────────────────────────────
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

// ─── MOBILE MENU ──────────────────────────────────────────
const hamburger = document.querySelector('.nav__hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on link click
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ─── LAZY IMAGE FALLBACK ──────────────────────────────────
// Replaces missing images with a placeholder gradient
document.querySelectorAll('.work__img-wrap img').forEach(img => {
  img.addEventListener('error', () => {
    img.style.opacity = '0';
    const wrap = img.closest('.work__img-wrap');
    if (wrap) {
      // subtle gradient placeholder
      wrap.style.background = 'linear-gradient(135deg, #e2e1dd 0%, #d4d3cf 100%)';
    }
  });
});
