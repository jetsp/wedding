/*********  Fade-in Letter Animation for Hero Title  *********/
function setupFadeInHeroTitle() {
    const typingTarget = document.getElementById('typing');
    if (!typingTarget) {
        console.error('Typing target element not found for fade-in effect.');
        return;
    }

    const name1 = 'Jerome';
    const name2 = 'Juvelyn';
    let textToDisplay = '';

    if (window.innerWidth <= 768) {
        textToDisplay = `${name1}<br>&<br>${name2}`;
    } else {
        textToDisplay = `${name1}&nbsp;&nbsp;&nbsp;&&nbsp;&nbsp;&nbsp;${name2}`;
    }

    typingTarget.innerHTML = ''; // Clear previous content

    const animatableUnits = [];
    let current = 0;
    while (current < textToDisplay.length) {
        let unit = '';
        let consumedLength = 0;
        if (textToDisplay.substring(current, current + 4).toLowerCase() === '<br>') {
            unit = '<br>';
            consumedLength = 4;
        } else if (textToDisplay.substring(current, current + 6).toLowerCase() === '&nbsp;') {
            unit = '&nbsp;';
            consumedLength = 6;
        } else {
            unit = textToDisplay[current];
            consumedLength = 1;
        }
        animatableUnits.push(unit);
        current += consumedLength;
    }

    const totalAnimationDuration = 3000; // Target total duration in milliseconds
    const delayPerUnit = animatableUnits.length > 0 ? totalAnimationDuration / animatableUnits.length : 0;

    animatableUnits.forEach((unit, index) => {
        const span = document.createElement('span');
        span.innerHTML = unit; // Use innerHTML to render <br> and &nbsp; correctly
        
        // <br> tags themselves don't fade but contribute to the timing of subsequent items.
        // Other units (letters, &nbsp;) get the animation class.
        if (unit !== '<br>') {
            span.classList.add('hero-title-fade-char'); 
            span.style.animationDelay = `${index * delayPerUnit}ms`;
        }
        typingTarget.appendChild(span);
    });
}

window.addEventListener('DOMContentLoaded', setupFadeInHeroTitle);
// Consider resize events if the text should change dynamically without a page reload
// window.addEventListener('resize', setupFadeInHeroTitle); // Could be added but might be too frequent


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
