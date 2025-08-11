
(function(){
  async function saveMessage(data){
    try{
      await fetch('/api/messages',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(data)
      });
    }catch(e){console.error(e);}
  }
  document.addEventListener('submit',(e)=>{ const f=e.target; if(f.matches('form[data-contact]')){ e.preventDefault(); const name=f.querySelector('[name=name]')?.value.trim()||'Anonyme'; const email=f.querySelector('[name=email]')?.value.trim()||''; const message=f.querySelector('[name=message]')?.value.trim()||''; saveMessage({name,email,message,source:location.pathname}); alert('Message envoyé.'); f.reset(); }});
  async function renderMessages(){
    const list=document.getElementById('msgList'); if(!list) return;
    try{
      const res=await fetch('/api/messages',{headers:{'x-admin-token':window.ADMIN_TOKEN||''}});
      if(!res.ok) throw new Error('unauthorized');
      const all=await res.json();
      list.innerHTML= all.map(m=>`<div class="card" style="padding:12px;margin-bottom:10px"><div><strong>${m.name}</strong> — ${m.email||'n/a'}</div><div style="opacity:.8;margin:6px 0">${m.message}</div><div class="tag">${new Date(m.created_at).toLocaleString()}</div></div>`).join('') || '<div class="muted">Aucun message.</div>';
    }catch(err){ list.innerHTML='<div class="muted">Erreur de chargement.</div>'; }
  }
  document.addEventListener('DOMContentLoaded',renderMessages);
})();
