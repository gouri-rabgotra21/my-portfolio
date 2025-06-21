// Mobile nav toggle
const burger = document.getElementById('hamburger');
const menu = document.querySelector('.nav-menu');

if (burger && menu) {
  burger.addEventListener('click', () => {
    menu.classList.toggle('active');
  });
}

// Scroll animation init
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

// Observe each section only once
document.querySelectorAll('.section-animate').forEach(el => observer.observe(el));

// Animated cursor dot
const dot = document.getElementById('cursor-dot');
if (dot) {
  document.addEventListener('mousemove', e => {
    dot.style.left = `${e.clientX}px`;
    dot.style.top = `${e.clientY}px`;
  });
}
const clickSound = document.getElementById('clickSound');
let audioReady = false;

// Initialize audio on first user gesture
function initAudioOnce() {
  if (!audioReady) {
    clickSound.play().then(() => clickSound.pause());
    audioReady = true;
  }
  // Remove init handlers
  document.removeEventListener('click', initAudioOnce);
  document.removeEventListener('touchstart', initAudioOnce);
}

// Add listener to capture that first click/touch
document.addEventListener('click', initAudioOnce);
document.addEventListener('touchstart', initAudioOnce);
const targets = document.querySelectorAll('.contact-btn, .socials a');

targets.forEach(el => {
  el.addEventListener('click', () => {
    if (audioReady) {
      clickSound.currentTime = 0;
      clickSound.play().catch(()=>{/* handle errors silently */});
    }
  });
});

