/*! Cinekorn: lightbox + scroll-triggered chart animations */
(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    /* ---- Charts: animate when scrolled into view; click to replay ---- */
    (function initCharts() {
      var cards = document.querySelectorAll('.chart-card');
      if (!cards.length) return;

      function arm(card) {
        card.classList.remove('is-inview');
        void card.offsetWidth;
        card.classList.add('is-inview');
      }

      cards.forEach(function (card) {
        if (!card.hasAttribute('tabindex')) card.setAttribute('tabindex', '0');
        card.setAttribute('title', 'Click to replay chart animation');
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
    })();

    /* ---- Image lightbox ---- */
    document.querySelectorAll('figure.figure img, .evidence-block img, .proof-media img').forEach(function (img) {
      if (img.closest('.zoom-trigger')) return;
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'zoom-trigger';
      btn.setAttribute('data-full', img.getAttribute('src') || '');
      btn.setAttribute('aria-label', 'View larger image');
      img.parentNode.insertBefore(btn, img);
      btn.appendChild(img);
      var hint = document.createElement('span');
      hint.className = 'zoom-hint';
      hint.setAttribute('aria-hidden', 'true');
      hint.textContent = 'Tap to enlarge';
      btn.appendChild(hint);
    });

    var dialog = document.getElementById('imgLightbox');
    if (!dialog) {
      dialog = document.createElement('dialog');
      dialog.id = 'imgLightbox';
      dialog.className = 'lightbox';
      dialog.setAttribute('aria-label', 'Enlarged image');
      dialog.innerHTML =
        '<div class="lightbox-inner">' +
        '<button type="button" class="lightbox-close" aria-label="Close enlarged image">Close</button>' +
        '<img src="" alt="">' +
        '</div>';
      document.body.appendChild(dialog);
    }

    var imgEl = dialog.querySelector('img');
    var closeBtn = dialog.querySelector('.lightbox-close');

    function open(src, alt) {
      imgEl.src = src;
      imgEl.alt = alt || '';
      if (typeof dialog.showModal === 'function') dialog.showModal();
      else dialog.setAttribute('open', '');
      closeBtn.focus();
    }

    function close() {
      if (typeof dialog.close === 'function') dialog.close();
      else dialog.removeAttribute('open');
      imgEl.removeAttribute('src');
    }

    document.querySelectorAll('.zoom-trigger').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var full = btn.getAttribute('data-full') || (btn.querySelector('img') && btn.querySelector('img').src);
        var alt = (btn.querySelector('img') && btn.querySelector('img').alt) || '';
        if (full) open(full, alt);
      });
    });

    closeBtn.addEventListener('click', close);
    dialog.addEventListener('click', function (e) {
      if (e.target === dialog) close();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && dialog.open) close();
    });
  });
})();
