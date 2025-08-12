(function(){
  function getUser(){
    try{return JSON.parse(localStorage.getItem('user')||'null')}catch(e){return null}
  }
  function getMessages(){
    try{return JSON.parse(localStorage.getItem('messages')||'[]')}catch(e){return []}
  }
  function removeMessage(i){
    const list = getMessages();
    list.splice(i,1);
    localStorage.setItem('messages', JSON.stringify(list));
    render();
  }
  function render(){
    const tbody = document.querySelector('tbody');
    if(!tbody) return;
    tbody.innerHTML='';
    const list = getMessages();
    list.forEach((m,i)=>{
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${m.name}</td><td>${m.email}</td><td>${m.message}</td><td><button data-i="${i}">Supprimer</button></td>`;
      tbody.appendChild(tr);
    });
    tbody.querySelectorAll('button').forEach(btn=>btn.addEventListener('click',e=>removeMessage(parseInt(e.target.dataset.i))));
  }
  document.addEventListener('DOMContentLoaded', ()=>{
    const u = getUser();
    if(!u || !u.isAdmin){ location.href='login.html'; return; }
    render();
  });
})();
