/*! Charts: play when scrolled into view; click/keyboard to replay */
(function () {
  function arm(card) {
    card.classList.remove('is-inview');
    void card.offsetWidth;
    card.classList.add('is-inview');
  }

  function init() {
    var cards = document.querySelectorAll('.chart-card');
    if (!cards.length) return;

    cards.forEach(function (card) {
      if (!card.hasAttribute('tabindex')) card.setAttribute('tabindex', '0');
      card.setAttribute('data-chart-interactive', '1');
      card.addEventListener('click', function () { arm(card); });
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          arm(card);
        }
      });
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
        { threshold: 0.28, rootMargin: '0px 0px -10% 0px' }
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
