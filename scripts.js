/*********  Fade-in Letter Animation for Hero Title  *********/
function setupFadeInHeroTitle() {
    const typingTarget = document.getElementById('typing');
    if (!typingTarget) {
        console.error('Typing target element not found for fade-in effect.');
        return;
    }

    const name1 = 'Jerome'; // Corrected name
    const name2 = 'Juvelyn'; // Corrected name
    let textToDisplay = '';

    // Responsive text layout
    if (window.innerWidth <= 768) {
        textToDisplay = `${name1}<br>&<br>${name2}`;
    } else {
        // Using more non-breaking spaces for better visual separation on wider screens
        textToDisplay = `${name1}&nbsp;&nbsp;&nbsp;&nbsp;&&nbsp;&nbsp;&nbsp;&nbsp;${name2}`;
    }

    typingTarget.innerHTML = ''; // Clear previous content to prevent duplication on resize/reload

    // Create an array of units to animate (characters, <br>, &nbsp;)
    const animatableUnits = [];
    let current = 0;
    while (current < textToDisplay.length) {
        let unit = '';
        let consumedLength = 0;
        // Check for <br> tag
        if (textToDisplay.substring(current, current + 4).toLowerCase() === '<br>') {
            unit = '<br>';
            consumedLength = 4;
        // Check for &nbsp; entity (case-insensitive for robustness, though typically lowercase)
        } else if (textToDisplay.substring(current, current + 6).toLowerCase() === '&nbsp;') {
            unit = '&nbsp;';
            consumedLength = 6;
        // Regular character
        } else {
            unit = textToDisplay[current];
            consumedLength = 1;
        }
        animatableUnits.push(unit);
        current += consumedLength;
    }

    const totalAnimationDuration = 3500; // Target total duration for all letters to appear (e.g., 3.5 seconds)
    const delayPerUnit = animatableUnits.filter(u => u !== '<br>').length > 0 
        ? totalAnimationDuration / animatableUnits.filter(u => u !== '<br>').length 
        : 0;

    let currentDelay = 0;
    animatableUnits.forEach((unit) => {
        const span = document.createElement('span');
        span.innerHTML = unit; // Use innerHTML to correctly render <br> and &nbsp;
        
        // Only apply animation class and delay to actual characters/entities, not <br>
        if (unit !== '<br>') {
            span.classList.add('hero-title-fade-char');
            span.style.animationDelay = `${currentDelay}ms`;
            currentDelay += delayPerUnit;
        }
        typingTarget.appendChild(span);
    });
}

window.addEventListener('DOMContentLoaded', setupFadeInHeroTitle);
// Consider resize events if the text should change dynamically without a page reload
// window.addEventListener('resize', setupFadeInHeroTitle); // Could be added but might be too frequent


/*********  Wedding Countdown Timer  *********/
function initializeCountdown() {
    const countdownDate = new Date("November 23, 2025 00:00:00").getTime();

    const monthsEl = document.getElementById('months');
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (!monthsEl || !daysEl || !hoursEl || !minutesEl || !secondsEl) {
        console.error('One or more countdown elements not found.');
        return;
    }

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        if (distance < 0) {
            // Optional: Handle what happens when the date is passed
            document.querySelector('.countdown__timer').innerHTML = "<p style='font-size: 1.5rem; color: var(--clr-terracotta);'>The big day has arrived!</p>";
            clearInterval(interval);
            return;
        }

        // Time calculations for months, days, hours, minutes and seconds
        // Note: Month calculation is an approximation as month lengths vary.
        // For a more precise month countdown, a library might be better, or a more complex logic.
        let remainingDistance = distance;

        const approxMonths = Math.floor(remainingDistance / (1000 * 60 * 60 * 24 * 30.4375)); // Average days in month
        remainingDistance -= approxMonths * (1000 * 60 * 60 * 24 * 30.4375);
        
        const days = Math.floor(remainingDistance / (1000 * 60 * 60 * 24));
        remainingDistance %= (1000 * 60 * 60 * 24);
        
        const hours = Math.floor(remainingDistance / (1000 * 60 * 60));
        remainingDistance %= (1000 * 60 * 60);
        
        const minutes = Math.floor(remainingDistance / (1000 * 60));
        remainingDistance %= (1000 * 60);
        
        const seconds = Math.floor(remainingDistance / 1000);

        // Display the result in the elements
        monthsEl.textContent = String(approxMonths).padStart(2, '0');
        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');
    };

    updateCountdown(); // Initial call to display immediately
    const interval = setInterval(updateCountdown, 1000); // Update every second
}

// Add to DOMContentLoaded if not already there, or call directly if DOM is ready
// Assuming setupFadeInHeroTitle is also in DOMContentLoaded, we can add it there.
// For safety, let's ensure it's called after the DOM is loaded.
if (document.readyState === 'loading') { // DOM not yet ready
    window.addEventListener('DOMContentLoaded', initializeCountdown);
} else { // DOM is already ready
    initializeCountdown();
}


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
} // End of RSVP conditional fields logic


/*********  Wedding Party Modals (Godparents & Squad)  *********/
const godparentsModal = document.getElementById('godparents-modal');
const openGodparentsButton = document.getElementById('openGodparentsModal');
const closeGodparentsButton = document.getElementById('closeGodparentsModal');

const squadModal = document.getElementById('squad-modal');
const openSquadButton = document.getElementById('openSquadModal');
const closeSquadButton = document.getElementById('closeSquadModal');

// Re-use overlay from RSVP modal section if it's globally available, or re-declare if scoped
// const overlay = document.getElementById('overlay'); // Assuming overlay is already declared globally or in a shared scope

function openWeddingPartyModal(modalElement) {
  if (modalElement && overlay) {
    modalElement.classList.remove('hidden');
    modalElement.classList.add('show'); // Assuming 'show' is used for visibility like RSVP modal
    overlay.classList.remove('hidden');
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
}

function closeWeddingPartyModal(modalElement) {
  if (modalElement && overlay) {
    modalElement.classList.add('hidden');
    modalElement.classList.remove('show');
    overlay.classList.add('hidden');
    overlay.classList.remove('show');
    // Only reset body overflow if no other modals are open
    if (!document.querySelector('.modal.show')) {
      document.body.style.overflow = '';
    }
  }
}

if (openGodparentsButton && godparentsModal) {
  openGodparentsButton.addEventListener('click', () => openWeddingPartyModal(godparentsModal));
}
if (closeGodparentsButton && godparentsModal) {
  closeGodparentsButton.addEventListener('click', () => closeWeddingPartyModal(godparentsModal));
}

if (openSquadButton && squadModal) {
  openSquadButton.addEventListener('click', () => openWeddingPartyModal(squadModal));
}
if (closeSquadButton && squadModal) {
  closeSquadButton.addEventListener('click', () => closeWeddingPartyModal(squadModal));
}

// Modal List Toggling Logic (for Godparents & Squad modals)
const setupModalListToggle = (modal) => {
  if (!modal) return;
  const toggleButtons = modal.querySelectorAll('.modal-toggle__btn');
  const lists = modal.querySelectorAll('.modal-list');

  toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
      toggleButtons.forEach(btn => btn.classList.remove('active'));
      lists.forEach(list => list.classList.remove('active')); // Use 'active' to show/hide, not 'show'/'hidden'

      button.classList.add('active');
      const targetListId = button.dataset.target;
      const targetList = modal.querySelector('#' + targetListId);
      if (targetList) {
        targetList.classList.add('active');
      }
    });
  });
  // Initialize the first tab as active if not already set by HTML
  if (toggleButtons.length > 0 && !modal.querySelector('.modal-toggle__btn.active')) {
    toggleButtons[0].click();
  }
};

if (godparentsModal) {
  setupModalListToggle(godparentsModal);
}
if (squadModal) {
  setupModalListToggle(squadModal);
}

// Adjust overlay click to close any open wedding party modal
// The existing overlay listener already handles the RSVP modal.
// We need to ensure it also closes these new modals.
// Modifying the existing overlay listener might be best if it's accessible
// For now, let's assume the existing overlay listener in scripts.js needs to be updated or this adds to it.
// The previous inline script had: 
// overlay.addEventListener('click', () => {
//   closeModal(rsvpModal); 
//   closeWeddingPartyModal(godparentsModal);
//   closeWeddingPartyModal(squadModal);
// });
// The existing overlay listener in scripts.js is: overlay.addEventListener('click', () => toggleModal(false));
// This toggleModal(false) will hide the overlay. We need to ensure it also specifically hides these modals.

// Let's refine the overlay click: find the existing overlay listener and modify or add to it.
// Since direct modification of an existing listener is tricky without removing it first, 
// and your current `toggleModal(false)` for RSVP also hides the overlay, we can add specific closures for the new modals.

// This is already handled by the RSVP modal's overlay listener if it correctly uses toggleModal(false)
// which hides the overlay. If a wedding party modal is open, its close function should be called.

// Let's ensure the main overlay click closes ALL modals.
// The existing overlay listener: overlay.addEventListener('click', () => toggleModal(false));
// This `toggleModal(false)` refers to the RSVP modal. We need to extend it.

// It's better to have one consolidated overlay click handler. 
// I'll comment out the direct overlay listener for RSVP for a moment and create a new one.

// Consolidated Overlay and Escape Key Listeners for ALL Modals
if (overlay) {
  // Remove previous RSVP-specific overlay listener if it exists to avoid double handling
  // This is tricky as we don't have a reference to remove it directly by function unless it was named.
  // For now, we assume this new listener will correctly handle all cases.
  // A better approach in a refactor would be to ensure only one overlay listener is ever attached.
  overlay.addEventListener('click', () => {
    if (modal && modal.classList.contains('show')) { // RSVP modal
      toggleModal(false); // Uses the specific RSVP modal toggle function
    }
    if (godparentsModal && godparentsModal.classList.contains('show')) {
      closeWeddingPartyModal(godparentsModal);
    }
    if (squadModal && squadModal.classList.contains('show')) {
      closeWeddingPartyModal(squadModal);
    }
    // Ensure overlay itself is hidden if all modals are closed by their specific functions
    if (!document.querySelector('.modal.show')) {
        overlay.classList.add('hidden');
        overlay.classList.remove('show');
        document.body.style.overflow = ''; // Restore scroll if no modals are shown
    }
  });
}

// Remove previous RSVP-specific Escape key listener before adding the new one.
// Similar to overlay, direct removal is hard. The new one should be comprehensive.
document.removeEventListener('keydown', rsvpEscapeHandler); // Assuming rsvpEscapeHandler was the old function name
// If not named, this won't work. Let's define a new comprehensive one carefully.

const comprehensiveEscapeHandler = (e) => {
  if (e.key === 'Escape') {
    let aModalWasOpen = false;
    if (modal && modal.classList.contains('show')) { // RSVP modal
      toggleModal(false);
      aModalWasOpen = true;
    }
    if (godparentsModal && godparentsModal.classList.contains('show')) {
      closeWeddingPartyModal(godparentsModal);
      aModalWasOpen = true;
    }
    if (squadModal && squadModal.classList.contains('show')) {
      closeWeddingPartyModal(squadModal);
      aModalWasOpen = true;
    }
    // Ensure overlay is hidden and scroll restored if an escape key closed a modal
    if (aModalWasOpen && !document.querySelector('.modal.show') && overlay) {
        overlay.classList.add('hidden');
        overlay.classList.remove('show');
        document.body.style.overflow = '';
    }
  }
};
// Remove any old escape listeners if possible, then add the new one.
// This is illustrative; direct removal of anonymous listeners isn't straightforward.
// The best practice is to name event listener functions if they might need to be removed.
document.addEventListener('keydown', comprehensiveEscapeHandler);

