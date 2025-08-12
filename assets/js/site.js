(function(){
  function saveMessage(data){
    const list = JSON.parse(localStorage.getItem('messages')||'[]');
    list.push(data);
    localStorage.setItem('messages', JSON.stringify(list));
  }
  document.addEventListener('DOMContentLoaded', ()=>{
    const form = document.querySelector('form[data-contact]');
    if(form){
      form.addEventListener('submit', e=>{
        e.preventDefault();
        const msg = {
          name: form.name.value.trim(),
          email: form.email.value.trim(),
          message: form.message.value.trim(),
          date: new Date().toISOString()
        };
        saveMessage(msg);
        form.reset();
        alert('Message envoyé !');
      });
    }
  });
})();
