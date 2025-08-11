
(function(){
  const AVATARS = [
    "assets/img/suzuki.jpg",
    "assets/img/scooter_violet.jpg",
    "assets/img/honda_crf450.jpg"
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
      a.href = 'portail.html'; a.className='avatar-btn'; a.style.paddingRight='14px'; // léger padding
      a.innerHTML = `<img alt="avatar" src="${AVATARS[0]}"><span>Se connecter</span>`;
      slot.appendChild(a); return;
    }
    const wrap = document.createElement('div'); wrap.style.position='relative';
    const btn = document.createElement('button'); btn.className='avatar-btn'; btn.style.paddingRight='14px';
    btn.innerHTML = `<img alt="avatar" src="${user.avatar || AVATARS[0]}"><span>${user.name || 'Profil'}</span>`;
    const menu = document.createElement('div'); menu.className='menu';
    menu.innerHTML = `<a href="parametres.html">Paramètres</a><button id="logoutBtn">Déconnexion</button>`;
    btn.addEventListener('click', (e)=>{ e.stopPropagation(); menu.classList.toggle('open'); });
    document.addEventListener('click', ()=> menu.classList.remove('open'));
    menu.querySelector('#logoutBtn').addEventListener('click', ()=>{ clearUser(); location.reload(); });
    wrap.appendChild(btn); wrap.appendChild(menu); slot.appendChild(wrap);
  }

  function handleForms(){
    const login = document.getElementById('loginForm');
    if(login){
      login.addEventListener('submit', (e)=>{
        e.preventDefault();
        const email = login.email.value.trim();
        const name = (login.name?.value?.trim()) || email.split('@')[0];
        const avatar = "assets/img/suzuki.jpg";
        setUser({name, email, avatar}); location.href='index.html';
      });
    }
    const reg = document.getElementById('registerForm');
    if(reg){
      reg.addEventListener('submit',(e)=>{
        e.preventDefault();
        const name = reg.name.value.trim() || 'Rider';
        const email = reg.email.value.trim();
        const avatar = "assets/img/suzuki.jpg";
        setUser({name, email, avatar}); location.href='index.html';
      });
    }
  }

  document.addEventListener('DOMContentLoaded', ()=>{ renderAuthUI(); handleForms(); });
})();
