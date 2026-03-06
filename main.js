// DigiClaw Media multipage interactions
(function(){
  const page = document.body.getAttribute('data-page');
  document.querySelectorAll('.navlinks a, .drawer a').forEach(a=>{
    const p = a.getAttribute('data-page');
    if (p && p === page) a.classList.add('active');
  });

  const menuBtn = document.getElementById('menuBtn');
  const drawer = document.getElementById('drawer');
  if (menuBtn && drawer) {
    menuBtn.addEventListener('click', () => {
      const open = drawer.style.display === 'block';
      drawer.style.display = open ? 'none' : 'block';
      menuBtn.setAttribute('aria-expanded', String(!open));
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({behavior:'smooth', block:'start'});
      if (drawer && drawer.style.display === 'block') {
        drawer.style.display = 'none';
        if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  });

  const reveal = (selector) => {
    const els = Array.from(document.querySelectorAll(selector));
    if (!('IntersectionObserver' in window) || els.length === 0) {
      els.forEach(el=>el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(ent=>{
        if(ent.isIntersecting){
          ent.target.classList.add('in');
          io.unobserve(ent.target);
        }
      });
    }, {threshold:0.12});
    els.forEach(el=>io.observe(el));
  };
  reveal('.card');

  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  const toast = document.getElementById('toast');
  function showToast(msg){
    if(!toast) return;
    toast.textContent = msg;
    toast.style.display = 'block';
    clearTimeout(window.__toastTimer);
    window.__toastTimer = setTimeout(()=> toast.style.display='none', 3400);
  }
  function isValidEmail(email){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }

  const form = document.getElementById('demoForm');
  if(form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const name = (document.getElementById('name')||{}).value?.trim?.() || '';
      const email = (document.getElementById('email')||{}).value?.trim?.() || '';
      const service = (document.getElementById('service')||{}).value || '';
      const message = (document.getElementById('message')||{}).value?.trim?.() || '';
      if(!name) return showToast('Please enter your name.');
      if(!email || !isValidEmail(email)) return showToast('Please enter a valid email.');
      if(!service) return showToast('Please select a service.');
      if(!message || message.length < 10) return showToast('Please add a bit more detail (10+ characters).');
      form.reset();
      showToast('✅ Request sent! (Demo form) Connect it later to email/CRM.');
    });
  }

  const floats = Array.from(document.querySelectorAll('.float'));
  if (floats.length){
    window.addEventListener('mousemove', (e)=>{
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      floats.forEach((el, i)=>{
        const m = (i+1) * 8;
        el.style.transform = `translate3d(${x*m}px, ${y*m}px, 0)`;
      });
    }, {passive:true});
  }
})();