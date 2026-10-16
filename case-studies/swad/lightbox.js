/* Universal image lightbox for portfolio case pages */
(function () {
  if (document.getElementById('portfolio-lightbox-css')) return;
  var s = document.createElement('style');
  s.id = 'portfolio-lightbox-css';
  s.textContent = ['.zoom-trigger{cursor:zoom-in;border:0;padding:0;background:transparent;display:block;width:100%;max-width:100%}','img.zoom-trigger,button.zoom-trigger img{cursor:zoom-in;transition:opacity .2s ease}','img.zoom-trigger:hover,button.zoom-trigger:hover img{opacity:.92}','.lightbox{margin:auto!important;border:none!important;padding:0!important;max-width:min(96vw,1100px)!important;max-height:92vh!important;width:fit-content!important;background:transparent!important;position:fixed!important;inset:0!important;z-index:10000!important}','.lightbox[open]{display:flex!important;align-items:center!important;justify-content:center!important}','.lightbox::backdrop{background:rgba(12,12,14,.92)!important}','.lightbox-inner{display:flex!important;align-items:center!important;justify-content:center!important;background:#111!important;border-radius:12px!important;max-width:min(96vw,1100px)!important;max-height:90vh!important;margin:auto!important;position:relative!important;padding:2.5rem 1rem 1rem}','.lightbox-inner img{width:auto!important;height:auto!important;max-width:min(94vw,1080px)!important;max-height:85vh!important;object-fit:contain!important;margin:0 auto!important;display:block!important}','.lightbox-close{position:absolute!important;top:.5rem!important;right:.5rem!important;z-index:5!important;min-height:44px!important;min-width:44px!important;border-radius:999px!important;border:1px solid rgba(255,255,255,.25)!important;background:rgba(0,0,0,.55)!important;color:#fff!important;font-size:.85rem!important;font-weight:700!important;cursor:pointer!important;font-family:inherit!important}','@media(max-width:720px){.lightbox[open]{width:100%!important;height:100%!important;max-height:100vh!important}.lightbox-inner{width:100%!important;height:100%!important;border-radius:0!important}.lightbox-inner img{max-width:100vw!important;max-height:calc(100vh - 6rem)!important}}'].join('');
  document.head.appendChild(s);
})();

(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }
  function absUrl(u) {
    if (!u) return '';
    try { return new URL(u, location.href).href; } catch (e) { return u; }
  }
  function getSrc(el) {
    if (!el) return '';
    if (el.getAttribute && el.getAttribute('data-full')) return absUrl(el.getAttribute('data-full'));
    if (el.tagName === 'IMG') return absUrl(el.getAttribute('src') || el.currentSrc || el.src || '');
    var img = el.querySelector && el.querySelector('img');
    if (img) return absUrl(img.getAttribute('src') || img.currentSrc || img.src || '');
    return '';
  }
  function getAlt(el) {
    if (!el) return '';
    if (el.tagName === 'IMG') return el.alt || '';
    var img = el.querySelector && el.querySelector('img');
    return img ? (img.alt || '') : '';
  }
  ready(function () {
    var selectors = 'figure.figure img, figure.proof-figure img, .evidence-block img, .proof-media img, .proof-row img';
    document.querySelectorAll(selectors).forEach(function (img) {
      if (img.closest('a[href^="http"], a[target="_blank"], .output-card, .video-card, .proof-slide')) return;
      if (img.closest('button.zoom-trigger')) return;
      if (img.classList.contains('zoom-trigger')) {
        img.setAttribute('role', 'button');
        img.setAttribute('tabindex', '0');
        img.setAttribute('aria-label', 'View larger image');
        return;
      }
      var wrap = document.createElement('button');
      wrap.type = 'button';
      wrap.className = 'zoom-trigger';
      wrap.setAttribute('data-full', absUrl(img.getAttribute('src') || ''));
      wrap.setAttribute('aria-label', 'View larger image');
      img.parentNode.insertBefore(wrap, img);
      wrap.appendChild(img);
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
      if (!src) return;
      imgEl.src = src;
      imgEl.alt = alt || '';
      try {
        if (typeof dialog.showModal === 'function') dialog.showModal();
        else dialog.setAttribute('open', '');
      } catch (err) {
        dialog.setAttribute('open', '');
      }
      document.body.style.overflow = 'hidden';
    }
    function closeLb() {
      try {
        if (typeof dialog.close === 'function') dialog.close();
        else dialog.removeAttribute('open');
      } catch (err) {
        dialog.removeAttribute('open');
      }
      imgEl.removeAttribute('src');
      document.body.style.overflow = '';
    }
    function onZoomClick(e) {
      var el = e.currentTarget;
      e.preventDefault();
      e.stopPropagation();
      openLb(getSrc(el), getAlt(el));
    }
    document.querySelectorAll('.zoom-trigger').forEach(function (el) {
      el.addEventListener('click', onZoomClick);
      el.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onZoomClick(e);
        }
      });
    });
    if (closeBtn) closeBtn.addEventListener('click', function (e) { e.preventDefault(); closeLb(); });
    dialog.addEventListener('click', function (e) { if (e.target === dialog) closeLb(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && (dialog.open || dialog.hasAttribute('open'))) closeLb();
    });
  });
})();
