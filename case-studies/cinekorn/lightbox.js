/*! Cinekorn image lightbox — no library */
(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
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
