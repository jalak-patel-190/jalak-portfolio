/*! Charts + lightbox — mobile-safe */
(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    var cards = document.querySelectorAll('.chart-card');

    function arm(card) {
      card.classList.remove('is-inview');
      void card.offsetWidth;
      card.classList.add('is-inview');
    }

    cards.forEach(function (card) {
      if (!card.hasAttribute('tabindex')) card.setAttribute('tabindex', '0');

      var btn = card.querySelector('.chart-replay');
      if (!btn) {
        btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'chart-replay';
        btn.textContent = 'Tap to play animation';
        card.appendChild(btn);
      }
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        arm(card);
      });
      btn.addEventListener('touchend', function (e) {
        e.preventDefault();
        e.stopPropagation();
        arm(card);
      }, { passive: false });

      card.addEventListener('click', function (e) {
        if (e.target.closest('.chart-replay')) return;
        arm(card);
      });
    });

    if (cards.length) {
      if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting || entry.intersectionRatio > 0) {
                arm(entry.target);
                io.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.05, rootMargin: '40px 0px 40px 0px' }
        );
        cards.forEach(function (c) { io.observe(c); });
      }
      setTimeout(function () {
        cards.forEach(function (c) {
          if (!c.classList.contains('is-inview')) arm(c);
        });
      }, 1200);
    }

    document.querySelectorAll('figure.figure img, .evidence-block img, .proof-media img, .proof-row img').forEach(function (img) {
      if (img.closest('.zoom-trigger')) return;
      var wrap = document.createElement('button');
      wrap.type = 'button';
      wrap.className = 'zoom-trigger';
      wrap.setAttribute('data-full', img.getAttribute('src') || '');
      wrap.setAttribute('aria-label', 'View larger image');
      img.parentNode.insertBefore(wrap, img);
      wrap.appendChild(img);
      var hint = document.createElement('span');
      hint.className = 'zoom-hint';
      hint.textContent = 'Tap to enlarge';
      wrap.appendChild(hint);
    });

    var dialog = document.getElementById('imgLightbox');
    if (!dialog) {
      dialog = document.createElement('dialog');
      dialog.id = 'imgLightbox';
      dialog.className = 'lightbox';
      dialog.innerHTML = '<div class="lightbox-inner"><button type="button" class="lightbox-close" aria-label="Close">Close</button><img src="" alt=""></div>';
      document.body.appendChild(dialog);
    }
    var imgEl = dialog.querySelector('img');
    var closeBtn = dialog.querySelector('.lightbox-close');

    function openLb(src, alt) {
      imgEl.src = src;
      imgEl.alt = alt || '';
      if (typeof dialog.showModal === 'function') dialog.showModal();
      else dialog.setAttribute('open', '');
    }
    function closeLb() {
      if (typeof dialog.close === 'function') dialog.close();
      else dialog.removeAttribute('open');
      imgEl.removeAttribute('src');
    }

    document.querySelectorAll('.zoom-trigger').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var full = btn.getAttribute('data-full') || (btn.querySelector('img') && btn.querySelector('img').src);
        if (full) openLb(full, (btn.querySelector('img') && btn.querySelector('img').alt) || '');
      });
    });
    closeBtn.addEventListener('click', closeLb);
    dialog.addEventListener('click', function (e) { if (e.target === dialog) closeLb(); });
  });
})();
