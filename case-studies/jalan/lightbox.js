(function(){
  if (document.getElementById('cin-ui-fixes')) return;
  var s = document.createElement('style');
  s.id = 'cin-ui-fixes';
  s.textContent = `.chart-card{overflow:visible!important;cursor:pointer;position:relative;-webkit-tap-highlight-color:transparent}.chart-replay{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;margin:0!important;padding:0!important;border:0!important;background:transparent!important;opacity:0!important;cursor:pointer!important;z-index:3!important}.metric-pill,.meta-card{transition:box-shadow .35s ease,border-color .35s ease,transform .35s ease}.metric-pill.is-counting,.meta-card.is-counting{box-shadow:0 0 0 1.5px rgba(232,90,42,.35),0 4px 22px rgba(232,90,42,.32),0 0 28px rgba(196,91,155,.18)!important;border-color:rgba(232,90,42,.45)!important;transform:translateY(-1px)}.metric-pill.is-counted,.meta-card.is-counted{box-shadow:0 0 0 1px rgba(232,90,42,.12),0 2px 10px rgba(20,20,20,.04);transform:none}@media (hover:hover) and (pointer:fine){.metric-pill:hover{box-shadow:0 0 0 1px rgba(232,90,42,.22),0 4px 18px rgba(232,90,42,.22);border-color:rgba(232,90,42,.35);transform:translateY(-1px)}}@media (prefers-reduced-motion:reduce){.metric-pill.is-counting{transform:none}}.funnel{display:flex;flex-direction:column;gap:.45rem;max-width:420px;margin:0 auto}.funnel-step{background:linear-gradient(135deg,#E85A2A,#C45B9B);color:#fff;text-align:center;padding:.55rem .75rem;border-radius:8px;font-size:.82rem;font-weight:700;transform:scaleX(.35);opacity:0}.chart-card.is-inview .funnel-step{animation:funnelIn .55s ease forwards}.chart-card.is-inview .funnel-step:nth-child(1){animation-delay:.05s;width:100%}.chart-card.is-inview .funnel-step:nth-child(2){animation-delay:.15s;width:88%;margin-left:6%}.chart-card.is-inview .funnel-step:nth-child(3){animation-delay:.25s;width:74%;margin-left:13%}.chart-card.is-inview .funnel-step:nth-child(4){animation-delay:.35s;width:60%;margin-left:20%}@keyframes funnelIn{from{opacity:0;transform:scaleX(.35)}to{opacity:1;transform:scaleX(1)}}.line-chart{width:100%;height:180px;display:block}.line-chart path.line-path{fill:none;stroke:#E85A2A;stroke-width:2.5;stroke-linecap:round;stroke-dasharray:1000;stroke-dashoffset:1000}.chart-card.is-inview .line-path{animation:lineDraw 1.2s cubic-bezier(.2,.7,.2,1) forwards}@keyframes lineDraw{to{stroke-dashoffset:0}}.line-chart circle.pt{fill:#C45B9B;opacity:0}.chart-card.is-inview circle.pt{animation:ptPop .4s ease forwards}.chart-card.is-inview circle.pt:nth-of-type(1){animation-delay:.12s}.chart-card.is-inview circle.pt:nth-of-type(2){animation-delay:.32s}.chart-card.is-inview circle.pt:nth-of-type(3){animation-delay:.52s}.chart-card.is-inview circle.pt:nth-of-type(4){animation-delay:.72s}@keyframes ptPop{0%{opacity:0;transform:scale(.4)}70%{opacity:1;transform:scale(1.15)}100%{opacity:1;transform:scale(1)}}.line-chart text.axis-label{font-size:10px;fill:#5A5A5A}.line-chart text.point-label,.line-chart text.point-sub{opacity:0}.line-chart text.point-label{font-size:11px;font-weight:700;fill:#141414}.line-chart text.point-sub{font-size:9px;fill:#5A5A5A}.chart-card.is-inview text.point-label,.chart-card.is-inview text.point-sub{animation:labelIn .35s ease forwards}.chart-card.is-inview text.point-label:nth-of-type(1){animation-delay:.12s}.chart-card.is-inview text.point-label:nth-of-type(2){animation-delay:.32s}.chart-card.is-inview text.point-label:nth-of-type(3){animation-delay:.52s}.chart-card.is-inview text.point-label:nth-of-type(4){animation-delay:.72s}@keyframes labelIn{from{opacity:0}to{opacity:1}}.stack-row{display:flex;height:28px;border-radius:8px;overflow:hidden;margin:.5rem 0;background:#E8E2D8}.stack-seg{height:100%;width:0}.chart-card.is-inview .stack-seg{width:var(--w,0%);transition:width .95s cubic-bezier(.2,.7,.2,1)}.stack-legend{display:flex;flex-wrap:wrap;gap:.75rem;font-size:.75rem;color:#5A5A5A;margin-top:.5rem}.stack-legend span::before{content:"";display:inline-block;width:10px;height:10px;border-radius:2px;margin-right:.35rem;vertical-align:middle;background:var(--c,#E85A2A)}.ring-wrap{display:flex;gap:1.25rem;flex-wrap:wrap;justify-content:center}.ring{width:110px;height:110px;position:relative}.ring svg{width:100%;height:100%;transform:rotate(-90deg)}.ring circle.track{fill:none;stroke:#E8E2D8;stroke-width:10}.ring circle.val{fill:none;stroke:#E85A2A;stroke-width:10;stroke-linecap:round;stroke-dasharray:283;stroke-dashoffset:283}.chart-card.is-inview .ring circle.val{animation:ringDraw 1.15s ease forwards}@keyframes ringDraw{to{stroke-dashoffset:var(--off,100)}}.ring-label{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;font-weight:700;font-size:.95rem}.ring-label small{font-size:.65rem;font-weight:600;color:#5A5A5A}.col-bar{transform-origin:bottom;transition:height .9s cubic-bezier(.22,1,.36,1)}.chart-card.is-inview .col-bar,.bars.is-on .col-bar{height:var(--h,50%)!important}`;
  document.head.appendChild(s);
})();
(function(){
  function ready(fn){ if(document.readyState!=='loading')fn(); else document.addEventListener('DOMContentLoaded',fn); }
  function countUp(el){
    var target=parseFloat(el.getAttribute('data-count')); if(isNaN(target)) return;
    var suffix=el.getAttribute('data-suffix')||''; var decimals=el.getAttribute('data-decimals');
    var duration=900,start=null;
    var pill=el.closest('.metric-pill')||el.closest('.meta-card')||el.parentElement;
    if(pill){ pill.classList.remove('is-counted'); pill.classList.add('is-counting'); }
    function frame(ts){
      if(!start) start=ts;
      var p=Math.min(1,(ts-start)/duration);
      var e=1-Math.pow(1-p,3);
      var val=target*e;
      el.textContent=(decimals?val.toFixed(+decimals):Math.round(val))+suffix;
      if(p<1) requestAnimationFrame(frame);
      else {
        el.textContent=(decimals?target.toFixed(+decimals):Math.round(target))+suffix;
        if(pill){ pill.classList.remove('is-counting'); pill.classList.add('is-counted');
          setTimeout(function(){ pill.classList.remove('is-counted'); },700); }
      }
    }
    requestAnimationFrame(frame);
  }
  ready(function(){
    var cards=document.querySelectorAll('.chart-card');
    function arm(card){ card.classList.remove('is-inview'); void card.offsetWidth; card.classList.add('is-inview'); }
    cards.forEach(function(card){
      var btn=card.querySelector('.chart-replay');
      if(!btn){ btn=document.createElement('button'); btn.type='button'; btn.className='chart-replay'; btn.setAttribute('aria-label','Replay chart animation'); btn.textContent=''; card.appendChild(btn); }
      else { btn.textContent=''; btn.setAttribute('aria-label','Replay chart animation'); }
      btn.addEventListener('click',function(e){ e.preventDefault(); e.stopPropagation(); arm(card); });
      btn.addEventListener('touchend',function(e){ e.preventDefault(); e.stopPropagation(); arm(card); },{passive:false});
      card.addEventListener('click',function(){ arm(card); });
    });
    if(cards.length){
      if('IntersectionObserver' in window){
        var io=new IntersectionObserver(function(entries){ entries.forEach(function(entry){ if(entry.isIntersecting){ arm(entry.target); io.unobserve(entry.target); } }); },{threshold:[0,0.05,0.1],rootMargin:'80px 0px 80px 0px'});
        cards.forEach(function(c){ io.observe(c); });
      }
      setTimeout(function(){ cards.forEach(function(c){ var r=c.getBoundingClientRect(); if(r.top<window.innerHeight&&r.bottom>0&&!c.classList.contains('is-inview')) arm(c); }); },400);
      setTimeout(function(){ cards.forEach(function(c){ if(!c.classList.contains('is-inview')) arm(c); }); },1800);
    }
    var counters=document.querySelectorAll('[data-count]');
    if(counters.length){
      if('IntersectionObserver' in window){
        var cio=new IntersectionObserver(function(entries){ entries.forEach(function(e){ if(e.isIntersecting){ countUp(e.target); cio.unobserve(e.target); } }); },{threshold:0.25});
        counters.forEach(function(el){ cio.observe(el); });
      } else counters.forEach(countUp);
    }
  });
})();
