/*********  Typing effect (runs once)  *********/
const typingTarget = document.getElementById('typing');
const textToType   = 'Jerome  &  Juvelyn';
let idx = 0;

function type() {
  if (idx < textToType.length) {
    typingTarget.textContent += textToType.charAt(idx);
    idx++;
    setTimeout(type, 150);
  }
}
window.addEventListener('DOMContentLoaded', type);


/*********  Fade-in on scroll  *********/
const faders   = document.querySelectorAll('.fade');
const options  = {threshold:0.15};

const appearOnScroll = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    }
  });
}, options);

faders.forEach(el => appearOnScroll.observe(el));


/*********  RSVP modal  *********/
const openBtn  = document.getElementById('openRsvp');
const closeBtn = document.getElementById('closeRsvp');
const modal    = document.getElementById('modal');
const overlay  = document.getElementById('overlay');

function toggleModal(show = true){
  [modal, overlay].forEach(el => el.classList.toggle('show', show));
  [modal, overlay].forEach(el => el.classList.toggle('hidden', !show));
  document.body.style.overflow = show ? 'hidden' : '';
}

openBtn.addEventListener('click', () => toggleModal(true));
closeBtn.addEventListener('click', () => toggleModal(false));
overlay.addEventListener('click', () => toggleModal(false));
document.addEventListener('keydown', e => {
  if(e.key === 'Escape' && modal.classList.contains('show')) toggleModal(false);
});

// Conditional RSVP Fields Logic
const attendanceSelect = document.getElementById('attendanceSelect');
const plusOneSection = document.getElementById('plusOneSection');
const rsvpPlusOneSelect = document.getElementById('plusOneSelect');
const rsvpGuestNameField = document.getElementById('guestNameField');
const rsvpGuestNameInput = rsvpGuestNameField.querySelector('input[name="guestName"]');

if (attendanceSelect && plusOneSection && rsvpPlusOneSelect && rsvpGuestNameField && rsvpGuestNameInput) {
  function updateGuestField() {
    // Check if 'Bringing a guest?' is 'yes'
    if (rsvpPlusOneSelect.value === 'yes') {
      rsvpGuestNameField.style.display = 'block';
      rsvpGuestNameInput.required = true;
    } else {
      rsvpGuestNameField.style.display = 'none';
      rsvpGuestNameInput.required = false;
      rsvpGuestNameInput.value = '';
    }
  }

  function updatePlusOneSectionVisibility() {
    // Check if 'Will you attend?' is 'yes'
    if (attendanceSelect.value === 'yes') {
      plusOneSection.style.display = 'block';
      rsvpPlusOneSelect.required = true;
      updateGuestField(); // Update guest name field based on current 'Bringing a guest?' selection
    } else {
      plusOneSection.style.display = 'none';
      rsvpPlusOneSelect.required = false;
      rsvpPlusOneSelect.value = ''; // Reset 'Bringing a guest?' select
      updateGuestField(); // This will hide guest name field as rsvpPlusOneSelect is now empty
    }
  }

  // Initial setup on page load
  updatePlusOneSectionVisibility();

  // Event listeners
  attendanceSelect.addEventListener('change', updatePlusOneSectionVisibility);
  rsvpPlusOneSelect.addEventListener('change', updateGuestField);
}
