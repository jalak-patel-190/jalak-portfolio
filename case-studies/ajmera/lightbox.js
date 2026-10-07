(function(){
  if (document.getElementById('cin-ui-fixes')) return;
  var s = document.createElement('style');
  s.id = 'cin-ui-fixes';
  s.textContent = `.chart-card{overflow:visible!important;cursor:pointer;position:relative}.chart-replay{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;margin:0!important;padding:0!important;border:0!important;background:transparent!important;opacity:0!important;cursor:pointer!important;z-index:3!important}@media (hover:hover) and (pointer:fine){.metric-pill{transition:box-shadow .2s ease,transform .2s ease,border-color .2s ease}.metric-pill:hover{box-shadow:0 0 0 1px rgba(232,90,42,.22),0 4px 18px rgba(232,90,42,.22);border-color:rgba(232,90,42,.35);transform:translateY(-1px)}.flow-step:hover{box-shadow:0 0 0 1px rgba(232,90,42,.18),0 4px 14px rgba(232,90,42,.14)}.next-card:hover{box-shadow:0 0 0 1px rgba(232,90,42,.15),0 8px 24px rgba(20,20,20,.08)}}.lightbox{margin:auto!important;border:none!important;padding:0!important;max-width:min(96vw,1100px)!important;max-height:92vh!important;background:transparent!important;position:fixed!important;inset:0!important}.lightbox[open]{display:flex!important;align-items:center!important;justify-content:center!important}.lightbox::backdrop{background:rgba(12,12,14,.92)!important}.lightbox-inner{display:flex!important;align-items:center!important;justify-content:center!important;background:#111!important;border-radius:12px!important;max-width:min(96vw,1100px)!important;max-height:90vh!important;margin:auto!important;position:relative!important}.lightbox-inner img{width:auto!important;height:auto!important;max-width:min(94vw,1080px)!important;max-height:85vh!important;object-fit:contain!important}.lightbox-close{position:absolute!important;top:.75rem!important;right:.75rem!important;z-index:5!important;min-height:44px!important;min-width:44px!important}`;
  document.head.appendChild(s);
})();
(function(){
  function ready(fn){ if(document.readyState!=='loading')fn(); else document.addEventListener('DOMContentLoaded',fn); }
  ready(function(){
    var cards=document.querySelectorAll('.chart-card');
    function arm(card){ card.classList.remove('is-inview'); void card.offsetWidth; card.classList.add('is-inview'); }
    cards.forEach(function(card){
      var btn=card.querySelector('.chart-replay');
      if(!btn){ btn=document.createElement('button'); btn.type='button'; btn.className='chart-replay'; btn.setAttribute('aria-label','Replay chart animation'); btn.textContent=''; card.appendChild(btn); }
      btn.addEventListener('click',function(e){ e.preventDefault(); e.stopPropagation(); arm(card); });
      btn.addEventListener('touchend',function(e){ e.preventDefault(); e.stopPropagation(); arm(card); },{passive:false});
      card.addEventListener('click',function(){ arm(card); });
    });
    if(cards.length){
      if('IntersectionObserver' in window){
        var io=new IntersectionObserver(function(entries){ entries.forEach(function(entry){ if(entry.isIntersecting){ arm(entry.target); io.unobserve(entry.target); } }); },{threshold:0.05,rootMargin:'40px 0px 40px 0px'});
        cards.forEach(function(c){ io.observe(c); });
      }
      setTimeout(function(){ cards.forEach(function(c){ if(!c.classList.contains('is-inview')) arm(c); }); },1200);
    }
  });
})();
