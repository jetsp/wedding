/*********  Typing effect (runs once)  *********/
const typingTarget = document.getElementById('typing');
let textToType = ''; // Will be set based on screen size
const name1 = 'Jerome';
const name2 = 'Juvelyn';
let idx = 0;

function type() {
  if (typingTarget && idx < textToType.length) {
    // Check if current character and next ones form a <br> or &nbsp;
    if (textToType.substring(idx, idx + 4) === '<br>') {
      typingTarget.innerHTML += '<br>';
      idx += 4;
    } else if (textToType.substring(idx, idx + 6) === '&nbsp;') {
      typingTarget.innerHTML += '&nbsp;';
      idx += 6;
    } else {
      typingTarget.innerHTML += textToType.charAt(idx);
      idx++;
    }
    setTimeout(type, 100); // Adjusted typing speed slightly
  } else if (typingTarget && idx >= textToType.length) {
    // Optional: Add a class when typing is done, e.g., for a blinking cursor to stop
    typingTarget.classList.add('typing-done');
  }
}

window.addEventListener('DOMContentLoaded', () => {
  if (window.innerWidth <= 768) {
    // Mobile: Names on separate lines with & in between
    textToType = `${name1}<br>&<br>${name2}`;
  } else {
    // Desktop: Names on one line with extra spaces around &
    textToType = `${name1}&nbsp;&nbsp;&nbsp;&&nbsp;&nbsp;&nbsp;${name2}`;
  }
  
  if (typingTarget) {
    typingTarget.innerHTML = ''; // Clear initial content if any
    idx = 0; // Reset index
    type(); // Start typing animation
  } else {
    console.error('Typing target element not found');
  }
});


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
