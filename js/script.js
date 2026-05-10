// script.js — interactive bits: theme toggle, form handling, gallery placeholders
(function(){
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  const themeToggle = document.getElementById('theme-toggle');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const stored = localStorage.getItem('mini-garbanzo-theme');
  const initialTheme = stored || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', initialTheme === 'dark' ? 'dark' : '');

  function toggleTheme(){
    const now = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', now === 'dark' ? 'dark' : '');
    localStorage.setItem('mini-garbanzo-theme', now);
  }
  if(themeToggle) themeToggle.addEventListener('click', toggleTheme);

  // contact form (fake client-side send)
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const data = new FormData(form);
      const email = data.get('email');
      const message = data.get('message');
      if(!email || !message){
        if(status) status.textContent = 'Please complete both fields.';
        return;
      }
      if(status) status.textContent = 'Sending…';
      // simulate network
      setTimeout(()=>{
        form.reset();
        if(status) status.textContent = 'Thanks — message simulated (no backend).';
      },900);
    });
  }

  // gallery click handlers — placeholders that show a toast
  const gallery = document.getElementById('gallery');
  if(gallery){
    gallery.addEventListener('click', function(e){
      const tile = e.target.closest('.tile');
      if(!tile) return;
      showToast(`Demo: ${tile.textContent.trim()}`);
    });
  }

  // simple toast
  function showToast(msg){
    let t = document.createElement('div');
    t.className = 'mini-toast';
    t.textContent = msg;
    Object.assign(t.style,{position:'fixed',right:'16px',bottom:'16px',background:'var(--surface)',color:'var(--text)',padding:'10px 14px',borderRadius:'10px',boxShadow:'0 6px 18px rgba(0,0,0,0.12)',zIndex:9999});
    document.body.appendChild(t);
    setTimeout(()=>{t.style.opacity='0';t.style.transform='translateY(10px)';},2000);
    setTimeout(()=>t.remove(),2700);
  }

})();
