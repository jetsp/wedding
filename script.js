document.addEventListener('DOMContentLoaded', () => {
  const slides = [...document.querySelectorAll('.slide')];
  let curr = 0;

function showSlide(idx) {
  const next = (idx + slides.length) % slides.length;
  if (next === curr) return;

  const direction = next > curr || (curr === slides.length - 1 && next === 0) ? 'left' : 'right';

  const currentSlide = slides[curr];
  const nextSlide = slides[next];

  currentSlide.classList.remove('active');
  currentSlide.classList.add(direction === 'left' ? 'to-left' : 'to-right');

  nextSlide.classList.remove('to-left', 'to-right');
  nextSlide.classList.add('active');

  setTimeout(() => {
    currentSlide.classList.remove('to-left', 'to-right');
  }, 600); // match transition duration

  curr = next;
  history.replaceState(null, '', `#${nextSlide.id}`);
}

document.addEventListener('click', e => {
  // Try to find button with btn-nav class in clicked element or parents
  const btn = e.target.closest('.btn-nav');

  if (!btn) {
    console.log('Clicked outside btn-nav:', e.target);
    return; // no button clicked, ignore
  }

  console.log('Clicked btn-nav button:', btn);

  if (btn.classList.contains('next')) {
    console.log('Going to next slide');
    showSlide(curr + 1);
  }
  else if (btn.classList.contains('prev')) {
    console.log('Going to previous slide');
    showSlide(curr - 1);
  }
  else if (btn.classList.contains('restart')) {
    console.log('Restarting slideshow');
    showSlide(0);
  }
});


  /* RSVP modal */
  const modal = document.getElementById('rsvp-modal');
  const openBtn = document.getElementById('rsvp-open');
  const closeBtn = document.getElementById('modal-close');

  if (openBtn) openBtn.addEventListener('click', () => modal.classList.add('show'));
  if (closeBtn) closeBtn.addEventListener('click', () => modal.classList.remove('show'));
  if (modal) modal.addEventListener('click', e => {
    if (e.target.classList.contains('modal-overlay')) modal.classList.remove('show');
  });

  /* RSVP form */
  const form = document.getElementById('rsvp-form');
  const status = document.getElementById('form-status');

  if (form) {
    form.addEventListener('submit', (e) => {
      // Let Formspree handle the submission
      // We'll just show a success message after submission
      status.textContent = 'Thank you! Your RSVP was sent successfully.';
      status.style.color = 'green';
      
      // Close modal after a delay
      setTimeout(() => {
        status.textContent = '';
        modal.classList.remove('show');
      }, 2000);
    });
  }

  /* Start on hash or first slide */
  const startId = location.hash.slice(1);
  const idx = slides.findIndex(sl => sl.id === startId);
  showSlide(idx >= 0 ? idx : 0);
});

// ─── BLOCK HORIZONTAL SWIPES / BOUNCE ───────────────────────────
let touchStartX = null;
let touchStartY = null;

document.addEventListener('touchstart', (e) => {
  if (e.touches.length === 1) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }
}, { passive: true });

document.addEventListener('touchmove', (e) => {
  if (touchStartX === null || touchStartY === null) return;

  const currentX = e.touches[0].clientX;
  const currentY = e.touches[0].clientY;
  const dx = currentX - touchStartX;
  const dy = currentY - touchStartY;

  // If horizontal movement is greater than vertical, prevent default (blocks horizontal pan/bounce)
  if (Math.abs(dx) > Math.abs(dy)) {
    e.preventDefault();
  }
}, { passive: false });

document.addEventListener('touchend', () => {
  touchStartX = null;
  touchStartY = null;
});
