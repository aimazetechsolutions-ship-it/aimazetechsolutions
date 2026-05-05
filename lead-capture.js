/* Enterprise lead tracking for AimAze.
   Form submission is handled by FormSubmit/Netlify so inquiries reach info@aimazetechsolutions.com.
   This file only keeps a local browser backup and tracking event before normal submit. */
(function(){
  function storeLocal(key,obj){try{const arr=JSON.parse(localStorage.getItem(key)||'[]');arr.unshift(obj);localStorage.setItem(key,JSON.stringify(arr.slice(0,500)));}catch(e){}}
  function formToObject(form){const o={}; new FormData(form).forEach((v,k)=>{ if(!String(k).startsWith('_')) o[k]=String(v).trim(); }); o.source='AimAze Website'; o.page=location.href; o.submitted_at=new Date().toISOString(); return o;}
  document.addEventListener('DOMContentLoaded',function(){
    const form=document.getElementById('contact-form'); const status=document.getElementById('form-status');
    if(form){
      form.addEventListener('submit',function(){
        const lead=formToObject(form);
        storeLocal('aimaze_leads',lead);
        if(window.aimazeTrackEvent) window.aimazeTrackEvent('lead_form_submit', lead.service||'General');
        if(status){status.style.display='block';status.style.color='#27c7d7';status.textContent='Submitting your inquiry...';}
      });
    }
  });
})();
