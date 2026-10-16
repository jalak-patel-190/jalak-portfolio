/**
 * Portfolio scroll animations + site-wide ambient glow.
 * - Injects media/global-ambient.css on every page that loads this script
 * - Scroll-linked gradient color shift (phone + desktop)
 * - Count-up, fade-up, chart bars
 * - Carousel loop for [data-output-carousel]
 * Respects prefers-reduced-motion.
 */
(function () {
  try {
    var scriptEl = document.currentScript || document.querySelector('script[src*="portfolio-animate.js"]');
    if (scriptEl && scriptEl.src && !document.querySelector('link[data-global-ambient]')) {
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = scriptEl.src.replace(/portfolio-animate\.js(\?.*)?$/, 'global-ambient.css');
      link.setAttribute('data-global-ambient', '1');
      document.head.appendChild(link);
    }
  } catch (e) {}

  (function () {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var root = document.documentElement;
    var stops = [
      { a: [232, 90, 42], b: [157, 58, 114], c: [31, 92, 107] },
      { a: [194, 65, 12], b: [120, 70, 160], c: [20, 110, 120] },
      { a: [180, 80, 40], b: [100, 60, 140], c: [40, 90, 100] }
    ];
    function lerp(a, b, t) { return Math.round(a + (b - a) * t); }
    function mix(c1, c2, t) {
      return [lerp(c1[0], c2[0], t), lerp(c1[1], c2[1], t), lerp(c1[2], c2[2], t)];
    }
    var ticking = false;
    function update() {
      ticking = false;
      var max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      var p = Math.min(1, Math.max(0, window.scrollY / max));
      var seg = p < 0.5 ? 0 : 1;
      var t = p < 0.5 ? p * 2 : (p - 0.5) * 2;
      var from = stops[seg], to = stops[seg + 1];
      root.style.setProperty('--glow-a', mix(from.a, to.a, t).join(', '));
      root.style.setProperty('--glow-b', mix(from.b, to.b, t).join(', '));
      root.style.setProperty('--glow-c', mix(from.c, to.c, t).join(', '));
      root.style.setProperty('--glow-s', String(0.11 + p * 0.07));
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  })();

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
      return prefix + (decimals ? target.toFixed(decimals) : Math.round(target).toLocaleString('en-IN')) + suffix;
    }
    if (reduce) { el.textContent = finalText(); return; }
    var from = target * 0.55;
    var duration = 850;
    var start = null;
    function frame(ts) {
      if (!start) start = ts;
      var p = Math.min(1, (ts - start) / duration);
      var e = 1 - Math.pow(1 - p, 3);
      var val = from + (target - from) * e;
      el.textContent = prefix + (decimals ? val.toFixed(decimals) : Math.round(val).toLocaleString('en-IN')) + suffix;
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

  var countObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { countUp(e.target); countObs.unobserve(e.target); }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.metric-count[data-count], [data-count].teaser-stat, .teaser-stat[data-count], [data-count].count-up, .count-up[data-count]').forEach(function (el) {
    countObs.observe(el);
  });

  document.querySelectorAll('.case-teaser, .case-card, .journey-card, .how-step, .cc, .next-card, .output-card, .section').forEach(function (el, i) {
    el.classList.add('fade-up');
    el.style.transitionDelay = reduce ? '0s' : Math.min(i * 0.07, 0.42) + 's';
  });

  var fadeObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { markIn(e.target); fadeObs.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.fade-up').forEach(function (el) { fadeObs.observe(el); });

  var chartObs = new IntersectionObserver(function (entries) {
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
  }, { threshold: 0.25 });
  document.querySelectorAll('.chart-card, .bars, [data-chart-animate]').forEach(function (el) {
    chartObs.observe(el);
  });

  /* Carousel loop for any [data-output-carousel] */
  document.querySelectorAll('[data-output-carousel]').forEach(function (root) {
    var track = root.querySelector('.output-carousel-track');
    var prev = root.querySelector('.carousel-btn.prev');
    var next = root.querySelector('.carousel-btn.next');
    if (!track) return;
    function step() { return Math.min(track.clientWidth * 0.85, 280); }
    function go(dir) {
      var max = track.scrollWidth - track.clientWidth;
      var nextPos = track.scrollLeft + dir * step();
      if (nextPos > max - 4) track.scrollTo({ left: 0, behavior: 'smooth' });
      else if (nextPos < 4 && dir < 0) track.scrollTo({ left: max, behavior: 'smooth' });
      else track.scrollBy({ left: dir * step(), behavior: 'smooth' });
    }
    if (prev) prev.addEventListener('click', function () { go(-1); });
    if (next) next.addEventListener('click', function () { go(1); });
  });
})();
