/* Shared portfolio interactions: keyboard-accessible carousels and consistent mobile-menu dismissal. */
(function(){
  'use strict';

  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('mainNav');

  if (toggle && nav) {
    toggle.setAttribute('aria-controls', nav.id || 'mainNav');
    if (!toggle.hasAttribute('aria-expanded')) toggle.setAttribute('aria-expanded', 'false');

    function closeMenu(returnFocus) {
      if (!nav.classList.contains('open')) return;
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      if (returnFocus) toggle.focus();
    }

    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape') closeMenu(true);
    });

    document.addEventListener('click', function(event) {
      if (nav.classList.contains('open') && !nav.contains(event.target) && !toggle.contains(event.target)) {
        closeMenu(false);
      }
    });

    nav.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() { closeMenu(false); });
    });
  }

  document.querySelectorAll('.output-carousel-track, [data-proof-track]').forEach(function(track, index) {
    if (!track.id) track.id = 'portfolio-carousel-track-' + (index + 1);
    if (!track.hasAttribute('tabindex')) track.setAttribute('tabindex', '0');
    if (!track.hasAttribute('role')) track.setAttribute('role', 'region');
    if (!track.hasAttribute('aria-label')) {
      track.setAttribute('aria-label', track.matches('[data-proof-track]') ? 'Scrollable portfolio proof examples' : 'Scrollable work examples');
    }

    var root = track.closest('.output-carousel, [data-proof-carousel]');
    if (root) {
      root.querySelectorAll('button').forEach(function(button) {
        if (!button.hasAttribute('aria-controls')) button.setAttribute('aria-controls', track.id);
      });
    }

    track.addEventListener('keydown', function(event) {
      if (event.target !== track || (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight')) return;
      var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      var amount = Math.max(180, track.clientWidth * 0.8);
      track.scrollBy({ left: event.key === 'ArrowRight' ? amount : -amount, behavior: reduceMotion ? 'auto' : 'smooth' });
      event.preventDefault();
    });
  });
})();
