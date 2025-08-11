
(function(){
  function saveMessage(data){
    let all = []; try{ all = JSON.parse(localStorage.getItem('messages')||'[]'); }catch(e){}
    all.unshift({...data, date: new Date().toISOString()});
    localStorage.setItem('messages', JSON.stringify(all));
  }
  document.addEventListener('submit', (e)=>{
    const f = e.target;
    if(f.matches('form[data-contact]')){
      e.preventDefault();
      const name = f.querySelector('[name=name]')?.value.trim() || 'Anonyme';
      const email = f.querySelector('[name=email]')?.value.trim() || '';
      const message = f.querySelector('[name=message]')?.value.trim() || '';
      saveMessage({name,email,message,source:location.pathname});
      alert('Message envoyé.'); f.reset();
    }
  });
  function renderMessages(){
    const list = document.getElementById('msgList'); if(!list) return;
    let all = []; try{ all = JSON.parse(localStorage.getItem('messages')||'[]'); }catch(e){}
    list.innerHTML = all.map(m=>`
      <div class="card" style="padding:12px;margin-bottom:10px">
        <div><strong>${m.name}</strong> — ${m.email || 'n/a'}</div>
        <div style="opacity:.8;margin:6px 0">${m.message}</div>
        <div class="tag">Depuis: ${m.source}</div>
      </div>
    `).join('') || '<div class="muted">Aucun message.</div>';
  }
  document.addEventListener('DOMContentLoaded', renderMessages);
})();
