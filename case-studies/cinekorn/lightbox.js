(function(){
  if (document.getElementById('cin-ui-fixes')) return;
  var s = document.createElement('style');
  s.id = 'cin-ui-fixes';
  s.textContent = `
.chart-card{overflow:visible!important;cursor:pointer;position:relative;-webkit-tap-highlight-color:transparent}
.chart-replay{
  position:absolute!important;inset:0!important;width:100%!important;height:100%!important;
  margin:0!important;padding:0!important;border:0!important;border-radius:14px!important;
  background:transparent!important;color:transparent!important;font-size:0!important;
  box-shadow:none!important;opacity:0!important;cursor:pointer!important;
  -webkit-appearance:none!important;appearance:none!important;z-index:3!important;
}
.chart-replay:focus-visible{opacity:.01!important;outline:2px solid #E85A2A;outline-offset:2px}
@media (hover:hover) and (pointer:fine){
  .metric-pill{transition:box-shadow .2s ease, transform .2s ease, border-color .2s ease}
  .metric-pill:hover{
    box-shadow:0 0 0 1px rgba(232,90,42,.22),0 4px 18px rgba(232,90,42,.22),0 2px 8px rgba(196,91,155,.12);
    border-color:rgba(232,90,42,.35);transform:translateY(-1px)
  }
  .flow-step{transition:box-shadow .2s ease, border-color .2s ease}
  .flow-step:hover{box-shadow:0 0 0 1px rgba(232,90,42,.18),0 4px 14px rgba(232,90,42,.14);border-color:rgba(232,90,42,.3)}
  .next-card:hover{box-shadow:0 0 0 1px rgba(232,90,42,.15),0 8px 24px rgba(20,20,20,.08)}
  .page-nav .back:hover{box-shadow:0 0 0 1px rgba(232,90,42,.2),0 4px 14px rgba(232,90,42,.12)}
}
.lightbox{margin:auto!important;border:none!important;padding:0!important;max-width:min(96vw,1100px)!important;max-height:92vh!important;width:fit-content!important;height:fit-content!important;background:transparent!important;position:fixed!important;inset:0!important}
.lightbox[open]{display:flex!important;align-items:center!important;justify-content:center!important}
.lightbox::backdrop{background:rgba(12,12,14,.92)!important}
.lightbox-inner{position:relative!important;display:flex!important;align-items:center!important;justify-content:center!important;background:#111!important;border-radius:12px!important;max-width:min(96vw,1100px)!important;max-height:90vh!important;overflow:hidden!important;margin:auto!important}
.lightbox-inner img{display:block!important;width:auto!important;height:auto!important;max-width:min(94vw,1080px)!important;max-height:85vh!important;object-fit:contain!important;margin:0 auto!important}
.lightbox-close{position:absolute!important;top:.75rem!important;right:.75rem!important;z-index:5!important;min-height:44px!important;min-width:44px!important}
@media(max-width:720px){.lightbox[open]{width:100%!important;max-width:100vw!important;height:100%!important;max-height:100vh!important}.lightbox-inner{width:100%!important;height:100%!important;max-width:100vw!important;max-height:100vh!important;border-radius:0!important;background:#0a0a0a!important}.lightbox-inner img{max-width:100vw!important;max-height:calc(100vh - 6rem)!important}}
.funnel{display:flex;flex-direction:column;gap:.45rem;max-width:420px;margin:0 auto}
.funnel-step{background:linear-gradient(135deg,#E85A2A,#C45B9B);color:#fff;text-align:center;padding:.55rem .75rem;border-radius:8px;font-size:.82rem;font-weight:700;transform:scaleX(.35);opacity:0;transform-origin:center}
.chart-card.is-inview .funnel-step{animation:funnelIn .55s ease forwards}
.chart-card.is-inview .funnel-step:nth-child(1){animation-delay:.05s;width:100%}
.chart-card.is-inview .funnel-step:nth-child(2){animation-delay:.15s;width:88%;margin-left:6%}
.chart-card.is-inview .funnel-step:nth-child(3){animation-delay:.25s;width:74%;margin-left:13%}
.chart-card.is-inview .funnel-step:nth-child(4){animation-delay:.35s;width:60%;margin-left:20%}
@keyframes funnelIn{from{opacity:0;transform:scaleX(.35)}to{opacity:1;transform:scaleX(1)}}
.line-chart{width:100%;height:180px;display:block}
.line-chart path.line-path{fill:none;stroke:#E85A2A;stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:800;stroke-dashoffset:800}
.chart-card.is-inview .line-path{animation:lineDraw 1.15s ease forwards}
@keyframes lineDraw{to{stroke-dashoffset:0}}
.line-chart circle.pt{fill:#C45B9B;opacity:0}
.chart-card.is-inview circle.pt{animation:ptIn .35s ease forwards}
@keyframes ptIn{to{opacity:1}}
.line-chart text.axis-label{font-size:10px;fill:#5A5A5A;font-family:system-ui,sans-serif}
.line-chart text.point-label{font-size:11px;font-weight:700;fill:#141414;font-family:system-ui,sans-serif}
.line-chart text.point-sub{font-size:9px;fill:#5A5A5A;font-family:system-ui,sans-serif}
.stack-row{display:flex;height:28px;border-radius:8px;overflow:hidden;margin:.5rem 0 .35rem;background:#E8E2D8}
.stack-seg{height:100%;width:0}
.chart-card.is-inview .stack-seg{width:var(--w,0%);transition:width .9s cubic-bezier(.2,.7,.2,1)}
.stack-legend{display:flex;flex-wrap:wrap;gap:.75rem;font-size:.75rem;color:#5A5A5A;margin-top:.5rem}
.stack-legend span::before{content:"";display:inline-block;width:10px;height:10px;border-radius:2px;margin-right:.35rem;vertical-align:middle;background:var(--c,#E85A2A)}
.ring-wrap{display:flex;gap:1.25rem;flex-wrap:wrap;justify-content:center}
.ring{width:110px;height:110px;position:relative}
.ring svg{width:100%;height:100%;transform:rotate(-90deg)}
.ring circle.track{fill:none;stroke:#E8E2D8;stroke-width:10}
.ring circle.val{fill:none;stroke:#E85A2A;stroke-width:10;stroke-linecap:round;stroke-dasharray:283;stroke-dashoffset:283}
.chart-card.is-inview .ring circle.val{animation:ringDraw 1.1s ease forwards}
@keyframes ringDraw{to{stroke-dashoffset:var(--off,100)}}
.ring-label{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;font-weight:700;font-size:.95rem}
.ring-label small{font-size:.65rem;font-weight:600;color:#5A5A5A}
`;
  document.head.appendChild(s);
})();
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
      card.setAttribute('aria-label', (card.querySelector('h3') && card.querySelector('h3').textContent) || 'Chart');
      var btn = card.querySelector('.chart-replay');
      if (!btn) {
        btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'chart-replay';
        btn.setAttribute('aria-label', 'Replay chart animation');
        btn.textContent = '';
        card.appendChild(btn);
      } else {
        btn.textContent = '';
        btn.setAttribute('aria-label', 'Replay chart animation');
      }
      btn.addEventListener('click', function (e) {
        e.preventDefault(); e.stopPropagation(); arm(card);
      });
      btn.addEventListener('touchend', function (e) {
        e.preventDefault(); e.stopPropagation(); arm(card);
      }, { passive: false });
      card.addEventListener('click', function (e) {
        if (e.target.closest('a')) return;
        arm(card);
      });
    });
    if (cards.length) {
      if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting || entry.intersectionRatio > 0) {
              arm(entry.target);
              io.unobserve(entry.target);
            }
          });
        }, { threshold: 0.05, rootMargin: '40px 0px 40px 0px' });
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
      imgEl.src = src; imgEl.alt = alt || '';
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
