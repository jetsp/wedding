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
  document.documentElement.style.overflow = show ? 'hidden' : ''; // Target <html>
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

/*********  Entourage List Toggles  *********/
function setupEntourageToggles() {
    const toggleWraps = document.querySelectorAll('.entourage-toggle__wrap');

    toggleWraps.forEach(wrap => {
        const buttons = wrap.querySelectorAll('.entourage-toggle__btn');
        
        // Get all list IDs controlled by this specific toggle group
        const controlledListIds = [];
        buttons.forEach(btn => {
            if (btn.dataset.target) {
                controlledListIds.push(btn.dataset.target);
            }
        });

        buttons.forEach(button => {
            button.addEventListener('click', function(event) {
                event.preventDefault();
                const targetListId = this.dataset.target; // The list to make active

                // Deactivate other buttons in this same toggle wrap
                buttons.forEach(btn => btn.classList.remove('active'));
                // Activate clicked button
                this.classList.add('active');

                // Now, only affect the lists controlled by this specific toggle group
                controlledListIds.forEach(listId => {
                    const listElement = document.getElementById(listId);
                    if (listElement) {
                        if (listId === targetListId) {
                            listElement.classList.add('active');
                        } else {
                            listElement.classList.remove('active');
                        }
                    }
                });
            });
        });
    });
}

window.addEventListener('DOMContentLoaded', setupEntourageToggles);

/*********  Scroll to Top on Page Load  *********/
window.addEventListener('DOMContentLoaded', () => {
  // Music Player Logic
  const audio = document.getElementById('audio');
  const playPauseBtn = document.getElementById('play-pause');
  const playIcon = document.getElementById('play-icon');
  const pauseIcon = document.getElementById('pause-icon');
  const progress = document.getElementById('progress');
  const currentTimeEl = document.getElementById('current-time');
  const durationEl = document.getElementById('duration');
  const volumeSlider = document.getElementById('volume-slider');

  function formatTime(sec) {
    if (isNaN(sec)) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  function updateProgress() {
    if (!audio.duration) return;
    progress.value = Math.floor((audio.currentTime / audio.duration) * 100);
    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
  }

  if (audio && playPauseBtn) {
    audio.muted = false; // Ensure audio is unmuted on load
    audio.addEventListener('loadedmetadata', updateProgress);
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', () => {
      playIcon.style.display = '';
      pauseIcon.style.display = 'none';
      progress.value = 0;
    });

    playPauseBtn.addEventListener('click', () => {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    });

    progress.addEventListener('input', () => {
      if (!audio.duration) return;
      audio.currentTime = (progress.value / 100) * audio.duration;
    });

    audio.addEventListener('play', () => {
      playIcon.style.display = 'none';
      pauseIcon.style.display = '';
    });

    audio.addEventListener('pause', () => {
      playIcon.style.display = '';
      pauseIcon.style.display = 'none';
    });

    if (audio.readyState >= 1) {
      updateProgress();
    }

    // Volume Control
    if (volumeSlider) {
      audio.volume = 0.5;
      volumeSlider.value = 0.5;
      volumeSlider.addEventListener('input', (e) => {
        audio.volume = e.target.value;
      });
    }

    
  }

  // Scroll to top
  window.scrollTo(0, 0);

  // Floating Player Logic
  const musicPlayer = document.getElementById('music-player-container');
  const musicSection = document.querySelector('.music-section');

  if (musicPlayer && musicSection) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Add 'is-floating' class when the music section is NOT in view
        musicPlayer.classList.toggle('is-floating', !entry.isIntersecting);
      },
      {
        root: null, // observing intersections relative to the viewport
        threshold: 0, // callback is run when the element is just entering or leaving the viewport
      }
    );

    observer.observe(musicSection);
  }
});
