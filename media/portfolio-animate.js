/**
 * Portfolio scroll animations: count-up, fade-up stagger, chart bars.
 * Respects prefers-reduced-motion.
 * Count-up never wipes the final HTML value to 0 on first paint.
 */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function countUp(el) {
    if (!el || el.dataset.counted) return;
    el.dataset.counted = '1';
    var target = parseFloat(el.getAttribute('data-count'));
    if (isNaN(target)) return;
    var suffix = el.getAttribute('data-suffix') || '';
    var prefix = el.getAttribute('data-prefix') || '';
    var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);

    function finalText() {
      return (
        prefix +
        (decimals ? target.toFixed(decimals) : Math.round(target).toLocaleString('en-IN')) +
        suffix
      );
    }

    if (reduce) {
      el.textContent = finalText();
      return;
    }

    // Start from ~55% so the number never looks empty / stagnant at 0
    var from = target * 0.55;
    var duration = 850;
    var start = null;
    function frame(ts) {
      if (!start) start = ts;
      var p = Math.min(1, (ts - start) / duration);
      var e = 1 - Math.pow(1 - p, 3);
      var val = from + (target - from) * e;
      el.textContent =
        prefix +
        (decimals ? val.toFixed(decimals) : Math.round(val).toLocaleString('en-IN')) +
        suffix;
      if (p < 1) requestAnimationFrame(frame);
      else el.textContent = finalText();
    }
    requestAnimationFrame(frame);
  }

  function markIn(el) {
    if (!el) return;
    el.classList.add('is-in');
    el.classList.add('is-inview');
  }

  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.metric-count[data-count], [data-count].metric-count').forEach(countUp);
    document.querySelectorAll('.fade-up, .case-teaser, .chart-card, .bars').forEach(markIn);
    return;
  }

  var countObs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          countUp(e.target);
          countObs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  document.querySelectorAll('.metric-count[data-count], [data-count].teaser-stat, .teaser-stat[data-count], [data-count].count-up, .count-up[data-count]').forEach(function (el) {
    countObs.observe(el);
  });

  document.querySelectorAll('.case-teaser, .case-card, .journey-card').forEach(function (el, i) {
    el.classList.add('fade-up');
    el.style.transitionDelay = reduce ? '0s' : Math.min(i * 0.07, 0.42) + 's';
  });

  var fadeObs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          markIn(e.target);
          fadeObs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  );
  document.querySelectorAll('.fade-up').forEach(function (el) {
    fadeObs.observe(el);
  });

  var chartObs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          markIn(e.target);
          e.target.querySelectorAll('.bar-fill').forEach(function (bar) {
            var w = bar.style.getPropertyValue('--w') || bar.getAttribute('data-w') || bar.dataset.w;
            if (w && !String(w).includes('%') && !isNaN(parseFloat(w))) w = w + '%';
            if (w) bar.style.setProperty('--w', w);
          });
          chartObs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.25 }
  );
  document.querySelectorAll('.chart-card, .bars, [data-chart-animate]').forEach(function (el) {
    chartObs.observe(el);
  });
})();
