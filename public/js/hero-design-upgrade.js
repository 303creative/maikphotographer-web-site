/* ══════════════════════════════════════════════════════════════════════════════ */
/* HERO DESIGN UPGRADE — JS animations: line-in, video fade-in, title split      */
/* ══════════════════════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function() {
  // ── VIDEO FADE-IN ──
  const video = document.querySelector('.hero-video-bg video');
  if (video) {
    const handleVideoReady = () => {
      video.classList.add('ready');
    };

    // Try multiple events in case one fires before we attach listener
    if (video.readyState >= 2) {
      handleVideoReady();
    }

    video.addEventListener('canplay', handleVideoReady, { once: true });
    video.addEventListener('playing', handleVideoReady, { once: true });
    video.addEventListener('loadeddata', handleVideoReady, { once: true });
  }

  // ── LINE-IN ANIMATION FOR TITLE ──
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    // Split title by <br> and wrap lines in .line-in divs
    const lines = heroTitle.innerHTML.split('<br>');
    heroTitle.innerHTML = lines
      .map(line => `<span class="line-in"><span>${line.trim()}</span></span>`)
      .join('');
  }

  // ── TRIGGER ANIMATIONS ONCE ──
  // Mark that animations are ready (used by CSS anim-ready selector)
  // Delay slightly to ensure DOM is fully rendered
  setTimeout(() => {
    document.documentElement.classList.add('anim-ready');
  }, 50);
});

// ══════════════════════════════════════════════════════════════════════════════
