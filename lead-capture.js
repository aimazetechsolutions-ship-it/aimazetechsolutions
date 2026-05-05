/* Enterprise lead capture for AimAze.
   Set window.AIMAZE_LEAD_ENDPOINT to an Odoo/controller/CRM webhook URL when available.
   Without endpoint, it safely falls back to mailto. */
(function(){
  function formToObject(form){const o={}; new FormData(form).forEach((v,k)=>o[k]=String(v).trim()); o.source='AimAze Website'; o.page=location.href; o.submitted_at=new Date().toISOString(); return o;}
  async function submitLead(form,status){
    const lead=formToObject(form); const endpoint=window.AIMAZE_LEAD_ENDPOINT||'';
    if(endpoint){
      try{
        const res=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(lead)});
        if(res.ok){status.style.display='block';status.style.color='#27c7d7';status.textContent='✓ Thank you. Your inquiry has been received.';form.reset();return;}
      }catch(e){}
    }
    const subject='Website Inquiry - '+(lead.service||'General');
    const body=['Name: '+(lead.name||''),'Email: '+(lead.email||''),'Phone: '+(lead.phone||''),'Company: '+(lead.company||''),'Service: '+(lead.service||''),'','Message:',lead.message||''].join('\n');
    location.href='mailto:info@aimazetechsolutions.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
    status.style.display='block';status.style.color='#27c7d7';status.textContent='✓ Opening your email client. CRM endpoint can be enabled later.';
  }
  document.addEventListener('DOMContentLoaded',function(){
    const form=document.getElementById('contact-form'); const status=document.getElementById('form-status');
    if(form&&status){ form.addEventListener('submit',function(e){e.preventDefault();submitLead(form,status);}); }
  });
})();