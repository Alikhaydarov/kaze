// CURSOR
const cur=document.getElementById('cur'),ring=document.getElementById('cur-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cur.style.left=mx+'px';cur.style.top=my+'px';});
(function loop(){rx+=(mx-rx)*.1;ry+=(my-ry)*.1;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(loop);})();
document.querySelectorAll('a,button,.svc-card,.curr-item,.pillar,.rec-item,.cult-feat').forEach(el=>{
  el.addEventListener('mouseenter',()=>ring.classList.add('expand'));
  el.addEventListener('mouseleave',()=>ring.classList.remove('expand'));
});

// NAV
window.addEventListener('scroll',()=>{document.getElementById('nav').classList.toggle('dark',window.scrollY>80);});

// REVEAL
const ro=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('on');});
},{threshold:0.08});
document.querySelectorAll('.r').forEach(el=>ro.observe(el));

// COUNTERS
function count(el,t){
  const dur=1800,s=performance.now();
  (function f(now){
    const p=Math.min((now-s)/dur,1),ease=1-Math.pow(1-p,3);
    el.textContent=Math.round(ease*t);
    if(p<1)requestAnimationFrame(f);else el.textContent=t;
  })(s);
}
const co=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.querySelectorAll('.cnt').forEach(el=>{
        if(!el.dataset.done){el.dataset.done='1';count(el,+el.dataset.t);}
      });
      e.target.classList.add('lit');
    }
  });
},{threshold:0.2});
document.querySelectorAll('.rec-item').forEach(el=>co.observe(el));