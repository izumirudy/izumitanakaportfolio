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
document.querySelectorAll('.work__entry-img img').forEach(img => {
  img.addEventListener('error', () => {
    img.style.opacity = '0';
    const wrap = img.closest('.work__entry-img');
    if (wrap) wrap.style.background = 'linear-gradient(135deg, #e2e1dd 0%, #d4d3cf 100%)';
  });
});

// ─── LIGHTBOX ─────────────────────────────────────────────
// Collect ALL clickable images across all entries
const allImgs = document.querySelectorAll('.work__entry-img');
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
  const imgEl = allImgs[current];
  const src = imgEl.dataset.lightboxSrc || imgEl.querySelector('img').src;
  const entry = imgEl.closest('.work__entry');
  const caption = entry ? entry.querySelector('.work__entry-title').textContent : '';
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
  current = (current + 1) % allImgs.length;
  openLightbox(current);
}

function showPrev() {
  current = (current - 1 + allImgs.length) % allImgs.length;
  openLightbox(current);
}

allImgs.forEach((img, i) => {
  img.style.cursor = 'pointer';
  img.addEventListener('click', () => openLightbox(i));
});

lb.querySelector('.lightbox__close').addEventListener('click', closeLightbox);
lb.querySelector('.lightbox__overlay').addEventListener('click', closeLightbox);
lb.querySelector('.lightbox__next').addEventListener('click', showNext);
lb.querySelector('.lightbox__prev').addEventListener('click', showPrev);

document.addEventListener('keydown', (e) => {
  if (!lb.classList.contains('open')) return;
  if (e.key === 'ArrowRight') showNext();
  if (e.key === 'ArrowLeft') showPrev();
  if (e.key === 'Escape') closeLightbox();
});