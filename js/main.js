// ---------- Footer year ----------
document.querySelectorAll('#year').forEach((el) => {
  el.textContent = new Date().getFullYear();
});

// ---------- Mobile nav toggle ----------
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');
if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const open = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ---------- Split hero (home page signature interaction) ----------
const splitHero = document.getElementById('splitHero');
const splitHandle = document.getElementById('splitHandle');

if (splitHero && splitHandle) {
  let dragging = false;

  const setSplit = (percent) => {
    const clamped = Math.min(80, Math.max(20, percent));
    splitHero.style.setProperty('--split', clamped + '%');
    splitHandle.setAttribute('aria-valuenow', Math.round(clamped));
  };

  const percentFromClientX = (clientX) => {
    const rect = splitHero.getBoundingClientRect();
    return ((clientX - rect.left) / rect.width) * 100;
  };

  const onMove = (clientX) => {
    if (!dragging) return;
    setSplit(percentFromClientX(clientX));
  };

  splitHandle.addEventListener('pointerdown', (e) => {
    dragging = true;
    splitHandle.setPointerCapture(e.pointerId);
  });
  splitHandle.addEventListener('pointermove', (e) => onMove(e.clientX));
  splitHandle.addEventListener('pointerup', () => (dragging = false));
  splitHandle.addEventListener('pointercancel', () => (dragging = false));

  // Keyboard accessibility: arrow keys nudge the split
  splitHandle.addEventListener('keydown', (e) => {
    const current = parseFloat(splitHero.style.getPropertyValue('--split')) || 50;
    if (e.key === 'ArrowLeft') setSplit(current - 5);
    if (e.key === 'ArrowRight') setSplit(current + 5);
  });

  // Gentle idle animation on load to hint interactivity, then settle at 50%
  window.requestAnimationFrame(() => {
    setSplit(50);
  });
}

// ---------- Work page: timeline reveal on scroll ----------
const entries = document.querySelectorAll('.entry');
if (entries.length) {
  const observer = new IntersectionObserver(
    (items) => {
      items.forEach((item) => {
        if (item.isIntersecting) {
          item.target.classList.add('in-view');
          observer.unobserve(item.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  entries.forEach((entry) => observer.observe(entry));
}

// ---------- Art page: gallery filter ----------
const filterBtns = document.querySelectorAll('.filter-btn');
const tiles = document.querySelectorAll('.tile');
if (filterBtns.length && tiles.length) {
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      tiles.forEach((tile) => {
        const match = filter === 'all' || tile.dataset.cat === filter;
        tile.hidden = !match;
      });
    });
  });
}

// ---------- Art page: lightbox ----------
const lightbox = document.getElementById('lightbox');
if (lightbox) {
  const lightboxSwatch = document.getElementById('lightboxSwatch');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const closeBtn = document.getElementById('lightboxClose');

  tiles.forEach((tile) => {
    tile.addEventListener('click', () => {
      const swatch = tile.querySelector('.swatch');
      const caption = tile.querySelector('figcaption')?.textContent || '';
      lightboxSwatch.style.background = swatch ? getComputedStyle(swatch).background : '';
      lightboxTitle.textContent = caption.split('—')[0]?.trim() || 'Untitled';
      lightboxCaption.textContent = caption;
      lightbox.classList.add('open');
    });
  });

  const close = () => lightbox.classList.remove('open');
  closeBtn?.addEventListener('click', close);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
}
