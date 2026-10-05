/*! Cinekorn image lightbox — auto-wraps figure images */
(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    // Auto-wrap evidence images so every case gets zoom without HTML edits
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
