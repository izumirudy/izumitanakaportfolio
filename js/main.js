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
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ─── LAZY IMAGE FALLBACK ──────────────────────────────────
document.querySelectorAll('.work__img-wrap img').forEach(img => {
  img.addEventListener('error', () => {
    img.style.opacity = '0';
    const wrap = img.closest('.work__img-wrap');
    if (wrap) wrap.style.background = 'linear-gradient(135deg, #e2e1dd 0%, #d4d3cf 100%)';
  });
});

// ─── LIGHTBOX ─────────────────────────────────────────────
const items = document.querySelectorAll('.work__item');
let current = 0;

// Build lightbox HTML
const lb = document.createElement('div');
lb.className = 'lightbox';
lb.innerHTML = `
  <div class="lightbox__overlay"></div>
  <button class="lightbox__close">&#x2715;</button>
  <button class="lightbox__prev">&#x2190;</button>
  <button class="lightbox__next">&#x2192;</button>
  <div class="lightbox__img-wrap">
    <img class="lightbox__img" src="" alt="" />
    <p class="lightbox__caption"></p>
  </div>
`;
document.body.appendChild(lb);

const lbImg = lb.querySelector('.lightbox__img');
const lbCaption = lb.querySelector('.lightbox__caption');

function openLightbox(index) {
  current = index;
  const item = items[current];
  const src = item.querySelector('img').src;
  const caption = item.querySelector('.work__caption').textContent;
  lbImg.src = src;
  lbCaption.textContent = caption;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lb.classList.remove('open');
  document.body.style.overflow = '';
}

function showNext() {
  current = (current + 1) % items.length;
  openLightbox(current);
}

function showPrev() {
  current = (current - 1 + items.length) % items.length;
  openLightbox(current);
}

// Click on grid image to open
items.forEach((item, i) => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    openLightbox(i);
  });
});

// Controls
lb.querySelector('.lightbox__close').addEventListener('click', closeLightbox);
lb.querySelector('.lightbox__overlay').addEventListener('click', closeLightbox);
lb.querySelector('.lightbox__next').addEventListener('click', showNext);
lb.querySelector('.lightbox__prev').addEventListener('click', showPrev);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (!lb.classList.contains('open')) return;
  if (e.key === 'ArrowRight') showNext();
  if (e.key === 'ArrowLeft') showPrev();
  if (e.key === 'Escape') closeLightbox();
});