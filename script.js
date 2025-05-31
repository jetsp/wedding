document.addEventListener('DOMContentLoaded', () => {
  const slides = [...document.querySelectorAll('.slide')];
  let curr = 0;

  function showSlide(idx) {
    slides[curr].classList.remove('active');
    curr = (idx + slides.length) % slides.length;
    slides[curr].classList.add('active');
    slides[curr].scrollTop = 0;
    history.replaceState(null, '', `#${slides[curr].id}`);
    console.log('Showing slide', curr, slides[curr].id);
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


  /* swipe navigation 
  let startX = null;
  window.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  window.addEventListener('touchend', e => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (dx < -50) showSlide(curr + 1);
    if (dx > 50) showSlide(curr - 1);
    startX = null;
  }, { passive: true }); */

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

  if (form) form.addEventListener('submit', e => {
    e.preventDefault();
    status.textContent = 'Thank you! Your RSVP was noted.';
    status.style.color = 'green';
    form.reset();
    setTimeout(() => {
      status.textContent = '';
      modal.classList.remove('show');
    }, 1800);
  });

  /* Start on hash or first slide */
  const startId = location.hash.slice(1);
  const idx = slides.findIndex(sl => sl.id === startId);
  showSlide(idx >= 0 ? idx : 0);
});
