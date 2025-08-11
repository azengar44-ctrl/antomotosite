(function(){
  const AVATARS = [
    "https://via.placeholder.com/40?text=A",
    "https://via.placeholder.com/40?text=B",
    "https://via.placeholder.com/40?text=C"
  ];
  function getUser(){ try{return JSON.parse(localStorage.getItem('user')||'null')}catch(e){return null} }
  function setUser(u){ localStorage.setItem('user', JSON.stringify(u)); }
  function clearUser(){ localStorage.removeItem('user'); }

  function renderAuthUI(){
    const slot = document.getElementById('authSlot'); if(!slot) return;
    slot.innerHTML='';
    const user = getUser();
    if(!user){
      const a = document.createElement('a');
      a.href = 'login.html'; a.className='avatar-btn'; a.style.paddingRight='14px';
      a.innerHTML = `<img alt="avatar" src="${AVATARS[0]}"><span>Se connecter</span>`;
      slot.appendChild(a); return;
    }
    const wrap = document.createElement('div'); wrap.style.position='relative';
    const btn = document.createElement('button'); btn.className='avatar-btn'; btn.style.paddingRight='14px';
    btn.innerHTML = `<img alt="avatar" src="${user.avatar || AVATARS[0]}"><span>${user.name || 'Profil'}</span>`;
    const menu = document.createElement('div'); menu.className='menu';
    if(user.isAdmin){
      const adminLink = document.createElement('a'); adminLink.href='admin.html'; adminLink.textContent='Admin';
      menu.appendChild(adminLink);
    }
    const logoutBtn = document.createElement('button'); logoutBtn.id='logoutBtn'; logoutBtn.textContent='Déconnexion';
    menu.appendChild(logoutBtn);
    btn.addEventListener('click', (e)=>{ e.stopPropagation(); menu.classList.toggle('open'); });
    document.addEventListener('click', ()=> menu.classList.remove('open'));
    logoutBtn.addEventListener('click', ()=>{ clearUser(); location.reload(); });
    wrap.appendChild(btn); wrap.appendChild(menu); slot.appendChild(wrap);
  }

  function handleForms(){
    const login = document.getElementById('loginForm');
    if(login){
      login.addEventListener('submit', (e)=>{
        e.preventDefault();
        const email = login.email.value.trim();
        const name = login.querySelector('[name=name]')?.value.trim() || email.split('@')[0];
        const avatar = AVATARS[0];
        const isAdmin = email === 'admin@antomoto.net';
        setUser({name, email, avatar, isAdmin});
        location.href = isAdmin ? 'admin.html' : 'index.html';
      });
    }
    const reg = document.getElementById('registerForm');
    if(reg){
      reg.addEventListener('submit',(e)=>{
        e.preventDefault();
        const name = reg.querySelector('[name=name]')?.value.trim() || 'Rider';
        const email = reg.email.value.trim();
        const avatar = AVATARS[1];
        setUser({name, email, avatar, isAdmin:false});
        location.href='index.html';
      });
    }
  }

  document.addEventListener('DOMContentLoaded', ()=>{ renderAuthUI(); handleForms(); });
})();
