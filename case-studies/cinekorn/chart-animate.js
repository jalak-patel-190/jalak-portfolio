/*! Charts: animate when scrolled into view. Replay controls are handled by lightbox.js. */
(function () {
  function prepLine(card) {
    card.querySelectorAll('.line-path').forEach(function (path) {
      try {
        var len = path.getTotalLength();
        if (!len || !isFinite(len)) len = 400;
        path.style.strokeDasharray = String(len);
        path.style.strokeDashoffset = String(len);
      } catch (e) {}
    });
  }

  function arm(card) {
    prepLine(card);
    card.classList.remove('is-inview');
    void card.offsetWidth;
    card.classList.add('is-inview');
  }

  function init() {
    var allCards = document.querySelectorAll('.chart-card');
    var cards = Array.prototype.filter.call(allCards, function (card) {
      return !!card.querySelector('.line-path, .pt, .donut-legacy, .donut-tenure, .donut-seg, .col-bar, .hbar-fill, .bar-fill');
    });
    if (!cards.length) return;

    cards.forEach(function (card) {
      prepLine(card);
    });

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              arm(entry.target);
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -5% 0px' }
      );
      cards.forEach(function (c) { io.observe(c); });
    } else {
      cards.forEach(arm);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
