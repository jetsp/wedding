/***  Fade-in Letter Animation for Hero Title  ***/
function setupFadeInHeroTitle() {
  const typingTarget = document.getElementById('typing');
  if (!typingTarget) {
    console.error('Typing target element not found for fade-in effect.');
    return;
  }

  const name1 = 'Jerome';
  const name2 = 'Juvelyn';
  let textToDisplay = '';

  // Responsive text layout
  if (window.innerWidth <= 768) {
    textToDisplay = `${name1}<br>&<br>${name2}`;
  } else {
    // Use non-breaking spaces for separation on wider screens
    textToDisplay = `${name1}&nbsp;&nbsp;&nbsp;&nbsp;&&nbsp;&nbsp;&nbsp;&nbsp;${name2}`;
  }

  typingTarget.innerHTML = '';

  // Build animatable units (characters, <br>, &nbsp;)
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

  const totalAnimationDuration = 3500;
  const delayPerUnitSource = animatableUnits.filter(u => u !== '<br>');
  const delayPerUnit = delayPerUnitSource.length > 0
    ? totalAnimationDuration / delayPerUnitSource.length
    : 0;

  let currentDelay = 0;
  animatableUnits.forEach((unit) => {
    const span = document.createElement('span');
    span.innerHTML = unit; // render <br> and &nbsp;
    if (unit !== '<br>') {
      span.classList.add('hero-title-fade-char');
      span.style.animationDelay = `${currentDelay}ms`;
      currentDelay += delayPerUnit;
    }
    typingTarget.appendChild(span);
  });
}

// Render hero names on load
window.addEventListener('DOMContentLoaded', setupFadeInHeroTitle);

function setupFaqAccordion() {
  const questions = document.querySelectorAll('.faq__question');
  if (!questions.length) return;

  questions.forEach((btn) => {
    const answerId = btn.getAttribute('aria-controls');
    const answerEl = document.getElementById(answerId);
    if (!answerEl) return;

    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      const newExpanded = !expanded;
      // Collapse other open items within the same list
      const group = btn.closest('.faq__list');
      if (group) {
        group.querySelectorAll('.faq__question[aria-expanded="true"]').forEach(other => {
          if (other !== btn) {
            other.setAttribute('aria-expanded', 'false');
            const otherAns = document.getElementById(other.getAttribute('aria-controls'));
            if (otherAns) otherAns.hidden = true;
          }
        });
      }

      btn.setAttribute('aria-expanded', newExpanded ? 'true' : 'false');
      answerEl.hidden = !newExpanded;
    });
  });
}

window.addEventListener('DOMContentLoaded', setupFaqAccordion);

/*********  Wedding Countdown Timer  *********/
function initializeCountdown() {
  const countdownDate = new Date('November 23, 2025 00:00:00').getTime();

  const monthsEl = document.getElementById('months');
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  if (!monthsEl || !daysEl || !hoursEl || !minutesEl || !secondsEl) {
    // Elements not present on this page
    return;
  }

  const updateCountdown = () => {
    const now = Date.now();
    const distance = countdownDate - now;

    if (distance < 0) {
      const timer = document.querySelector('.countdown__timer');
      if (timer) timer.innerHTML = "<p style='font-size: 1.5rem; color: var(--clr-terracotta);'>The big day has arrived!</p>";
      clearInterval(interval);
      return;
    }

    let remainingDistance = distance;
    const approxMonths = Math.floor(remainingDistance / (1000 * 60 * 60 * 24 * 30.4375));
    remainingDistance -= approxMonths * (1000 * 60 * 60 * 24 * 30.4375);

    const days = Math.floor(remainingDistance / (1000 * 60 * 60 * 24));
    remainingDistance %= (1000 * 60 * 60 * 24);

    const hours = Math.floor(remainingDistance / (1000 * 60 * 60));
    remainingDistance %= (1000 * 60 * 60);

    const minutes = Math.floor(remainingDistance / (1000 * 60));
    remainingDistance %= (1000 * 60);

    const seconds = Math.floor(remainingDistance / 1000);

    monthsEl.textContent = String(approxMonths).padStart(2, '0');
    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  };

  updateCountdown();
  const interval = setInterval(updateCountdown, 1000);
}

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', initializeCountdown);
} else {
  initializeCountdown();
}


/*********  RSVP Deadline Countdown (to Oct 31, 2025)  *********/
function initializeRsvpCountdown() {
  const el = document.getElementById('rsvpCountdown');
  if (!el) return;

  const deadline = new Date('October 31, 2025 23:59:59').getTime();

  function format(n) { return String(n).padStart(2, '0'); }

  function update() {
    const now = Date.now();
    const dist = deadline - now;

    if (dist <= 0) {
      el.textContent = 'RSVP period has ended.';
      clearInterval(timer);
      return;
    }

    const days = Math.floor(dist / (1000 * 60 * 60 * 24));
    const hours = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((dist % (1000 * 60)) / 1000);

    el.textContent = `${days}d ${format(hours)}h ${format(mins)}m ${format(secs)}s remaining to submit your RSVP`;
  }

  update();
  const timer = setInterval(update, 1000);
}

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', initializeRsvpCountdown);
} else {
  initializeRsvpCountdown();
}

/***  Fade-in on scroll (robust, mobile-friendly)  ***/
// Disable fade-on-scroll entirely; reveal all .fade elements immediately
function disableFadeOnScroll() {
  document.querySelectorAll('.fade').forEach(el => el.classList.add('visible'));
}

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', disableFadeOnScroll);
} else {
  disableFadeOnScroll();
}


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
const classificationField = document.getElementById('classificationField');
const classificationSelect = document.getElementById('classificationSelect');
const plusOneSection = document.getElementById('plusOneSection');
const rsvpPlusOneSelect = document.getElementById('plusOneSelect');
const rsvpGuestNameField = document.getElementById('guestNameField');
const rsvpGuestNameInput = rsvpGuestNameField?.querySelector('input[name="guestName"]');

if (
  attendanceSelect && classificationField && classificationSelect &&
  plusOneSection && rsvpPlusOneSelect && rsvpGuestNameField && rsvpGuestNameInput
) {
  function updateGuestField() {
    // Show guest name only if a plus-one is selected
    if (rsvpPlusOneSelect.value === 'yes') {
      rsvpGuestNameField.style.display = 'block';
      rsvpGuestNameInput.required = true;
      // Ensure field ready for user input
      if (!rsvpGuestNameInput.value || rsvpGuestNameInput.value === '-') rsvpGuestNameInput.value = '';
    } else {
      rsvpGuestNameField.style.display = 'none';
      rsvpGuestNameInput.required = false;
      // Clear when not applicable
      rsvpGuestNameInput.value = '';
    }
  }

  function updatePlusOneVisibility() {
    const isAttending = attendanceSelect.value === 'yes';
    const cls = classificationSelect.value;
    const sponsors = cls === 'principal' || cls === 'secondary';

    if (isAttending && sponsors) {
      plusOneSection.style.display = 'block';
      rsvpPlusOneSelect.required = true;
      // keep current selection behavior
      updateGuestField();
    } else {
      plusOneSection.style.display = 'none';
      rsvpPlusOneSelect.required = false;
      // Clear when not applicable
      rsvpPlusOneSelect.value = '';
      updateGuestField(); // clears guest name if needed
    }
  }

  function updateClassificationVisibility() {
    if (attendanceSelect.value === 'yes') {
      classificationField.style.display = 'block';
      classificationSelect.required = true;
    } else {
      classificationField.style.display = 'none';
      classificationSelect.required = false;
      // Clear when not applicable
      classificationSelect.value = '';
    }
    updatePlusOneVisibility();
  }

  // Initial setup on page load
  updateClassificationVisibility();

  // Event listeners
  attendanceSelect.addEventListener('change', updateClassificationVisibility);
  classificationSelect.addEventListener('change', updatePlusOneVisibility);
  rsvpPlusOneSelect.addEventListener('change', updateGuestField);
} // End of RSVP conditional fields logic

// Invitation Code Gate for RSVP button (does not change modal logic)
window.addEventListener('DOMContentLoaded', () => {
  const codeInput = document.getElementById('inviteCode');
  const verifyBtn = document.getElementById('verifyCodeBtn');
  const msgEl = document.getElementById('inviteCodeMsg');
  const gateWrap = document.getElementById('rsvpGateWrap');
  const rsvpBtn = document.getElementById('openRsvp');

  if (!codeInput || !verifyBtn || !rsvpBtn) return; // Gate not present

  // NOTE: Set your actual invitation code(s) here. Keep numeric for simplicity.
  // You can also change this to an array like ["1234","5678"].
  const VALID_CODES = ["1226"]; // TODO: replace with your real code(s)

  function showMessage(text, isError = true) {
    if (!msgEl) return;
    msgEl.textContent = text || '';
    msgEl.style.color = isError ? 'var(--clr-blush)' : 'var(--clr-sage)';
  }

  function revealRsvpButton() {
    // Hide gate UI and show the RSVP trigger button
    if (gateWrap) gateWrap.style.display = 'none';
    rsvpBtn.style.display = '';
    rsvpBtn.focus({ preventScroll: true });
  }

  verifyBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const raw = (codeInput.value || '').trim();
    // Allow only digits
    const digits = raw.replace(/\D+/g, '');
    if (!digits) {
      showMessage('Please enter your numeric invitation code.', true);
      codeInput.focus();
      return;
    }

    if (VALID_CODES.includes(digits)) {
      showMessage('Code verified. Thank you!', false);
      revealRsvpButton();
    } else {
      showMessage('Invalid code. Please check your invitation and try again.', true);
      codeInput.focus();
      codeInput.select?.();
    }
  });

  // Also allow pressing Enter inside the input to verify
  codeInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      verifyBtn.click();
    }
  });
});

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

/*********  Collage Album: click thumbnail to swap main image  *********/
function setupCollageAlbum() {
  const mainImg = document.querySelector('.collage__image');
  const thumbs = document.querySelectorAll('.collage__thumbs .collage__thumb');
  if (!mainImg || !thumbs.length) return;

  // Initialize active state if a thumb matches the main image file name
  const mainFile = (mainImg.currentSrc || mainImg.src).split('/').pop();
  thumbs.forEach(t => {
    t.style.cursor = 'pointer';
    const tFile = (t.currentSrc || t.src).split('/').pop();
    if (tFile === mainFile) t.classList.add('is-active');

    t.addEventListener('click', () => {
      // Update the main image to the clicked thumb
      mainImg.src = t.src;
      if (t.alt) mainImg.alt = t.alt;

      // Active state
      thumbs.forEach(x => x.classList.remove('is-active'));
      t.classList.add('is-active');
    });
  });
}

window.addEventListener('DOMContentLoaded', setupCollageAlbum);

/*** Collage thumbnails scroll controls (desktop vertical, mobile horizontal) ***/
function setupCollageThumbScroll() {
  const container = document.getElementById('collageThumbs');
  if (!container) return;

  const btnUp = document.querySelector('.collage__thumbs-btn--up');
  const btnDown = document.querySelector('.collage__thumbs-btn--down');
  const btnPrev = document.querySelector('.collage__thumbs-btn--prev');
  const btnNext = document.querySelector('.collage__thumbs-btn--next');

  const mqMobile = window.matchMedia('(max-width: 768px)');

  function scrollAmount() {
    // Scroll by approx one viewport of the thumbnail strip
    return mqMobile.matches ? container.clientWidth * 0.8 : container.clientHeight * 0.8;
  }

  function bindDesktop() {
    if (btnUp) btnUp.onclick = () => container.scrollBy({ top: -scrollAmount(), behavior: 'smooth' });
    if (btnDown) btnDown.onclick = () => container.scrollBy({ top: scrollAmount(), behavior: 'smooth' });
    if (btnPrev) btnPrev.onclick = null;
    if (btnNext) btnNext.onclick = null;
  }

  function bindMobile() {
    if (btnPrev) btnPrev.onclick = () => container.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
    if (btnNext) btnNext.onclick = () => container.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
    if (btnUp) btnUp.onclick = null;
    if (btnDown) btnDown.onclick = null;
  }

  function applyBindings() {
    if (mqMobile.matches) bindMobile(); else bindDesktop();
  }

  applyBindings();
  mqMobile.addEventListener('change', applyBindings);
}

window.addEventListener('DOMContentLoaded', setupCollageThumbScroll);

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

/*********  Web3Forms AJAX Submit for RSVP (stay on page)  *********/
function setupRsvpAjaxSubmit() {
  const form = document.getElementById('rsvpForm');
  const result = document.getElementById('rsvpResult');
  const submitBtn = document.getElementById('rsvpSubmitBtn');
  if (!form || !result) return;
  const modalEl = document.getElementById('modal');
  const openRsvpBtn = document.getElementById('openRsvp');

  function showSuccessView() {
    if (!modalEl) return;
    // Hide the form and show a temporary success view
    form.style.display = 'none';
    let successView = document.getElementById('rsvpSuccessView');
    if (!successView) {
      successView = document.createElement('div');
      successView.id = 'rsvpSuccessView';
      successView.className = 'modal__success';
      successView.innerHTML = `
        <p style="margin: 1rem 0; color: var(--clr-sage); font-weight: 600;">Successfully sent!</p>
        <button id="closeRsvpSuccessBtn" class="btn">Close</button>
      `;
      modalEl.appendChild(successView);
      const closeBtn = successView.querySelector('#closeRsvpSuccessBtn');
      closeBtn.addEventListener('click', () => {
        // Clean up success view and close modal
        successView.remove();
        form.style.display = '';
        if (typeof toggleModal === 'function') toggleModal(false);
      });
    } else {
      successView.style.display = '';
    }
  }

  // When reopening the modal, ensure the form is visible again and success view removed
  if (openRsvpBtn) {
    openRsvpBtn.addEventListener('click', () => {
      const successView = document.getElementById('rsvpSuccessView');
      if (successView) successView.remove();
      form.style.display = '';
      result.textContent = '';
      result.style.display = 'none';
      try { form.reset(); } catch {}
    });
  }
  // Belt & suspenders: blank the action to avoid native navigation even if handler fails
  try { form.setAttribute('action', ''); } catch {}
  console.log('RSVP AJAX submit bound');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    e.stopPropagation();

    // Basic guard: ensure access_key exists
    const accessKeyEl = form.querySelector('input[name="access_key"]');
    if (!accessKeyEl || !accessKeyEl.value) {
      result.style.color = 'var(--clr-blush)';
      result.textContent = 'Missing Web3Forms access key.';
      return;
    }

    const formData = new FormData(form);
    // Optional: append current page/source info
    if (!formData.has('source')) formData.append('source', window.location.href);

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    result.style.display = '';
    result.style.color = 'var(--clr-sage)';
    result.textContent = 'Please wait…';
    if (submitBtn) submitBtn.disabled = true;

    // Prepare Web3Forms request (primary)
    const web3Req = fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: json
    });

    // Prepare Google Apps Script request (secondary, URL-encoded so e.parameter is populated)
    const appsScriptUrl = 'https://script.google.com/macros/s/AKfycbyjp_tfMYTXwfHfzL7P738IdylPz74INbm0Ds5GlRw5EZBhduLz7LMIFmsknlGMIqz3/exec';
    const urlParams = new URLSearchParams();
    ['name', 'attendance', 'classification', 'plusone', 'guestName', 'message'].forEach((k) => {
      urlParams.append(k, (object[k] ?? ''));
    });
    const gasReq = fetch(appsScriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: urlParams.toString()
    }).catch((err) => {
      // Do not block UX if Apps Script fails
      console.log('Apps Script submit error:', err);
    });

    // Run both requests in parallel but drive UI based on Web3Forms result only
    Promise.allSettled([web3Req, gasReq])
      .then(async ([web3ResSettle]) => {
        try {
          const response = web3ResSettle.value;
          const data = await response.json().catch(() => ({ message: 'Unexpected response' }));
          if (response && response.status === 200) {
            // Show inline success view with a Close button instead of just text
            showSuccessView();
          } else {
            console.log('Web3Forms error:', response, data);
            result.style.color = 'var(--clr-blush)';
            result.textContent = (data && data.message) || 'Something went wrong. Please try again.';
          }
        } catch (err) {
          console.log('Web3Forms handling error:', err);
          result.style.color = 'var(--clr-blush)';
          result.textContent = 'Network error. Please try again.';
        }
      })
      .finally(() => {
        form.reset();
        if (submitBtn) submitBtn.disabled = false;
        // Keep message visible for a bit
        setTimeout(() => {
          result.style.display = 'none';
          result.textContent = '';
        }, 3000);
      });

    return false; // Extra guard to prevent any default submission
  });
}

window.addEventListener('DOMContentLoaded', setupRsvpAjaxSubmit);
