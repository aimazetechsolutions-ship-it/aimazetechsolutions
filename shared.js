/* shared.js — injects nav, footer, topbar, theme and hero video across all pages */
(async function(){
  let c={};
  try{
    const r=await fetch('content.json?v='+Date.now());
    c=await r.json();
  }catch(e){}

  const site=c.site||{};
  const theme=c.theme||{};
  const nav=c.nav||{};
  const hero=c.hero||{};
  const pageVideos=c.pageVideos||{};

  // ── APPLY THEME ──
  const root=document.documentElement.style;
  if(theme.primaryColor)root.setProperty('--primary',theme.primaryColor);
  if(theme.secondaryColor)root.setProperty('--secondary',theme.secondaryColor);
  if(theme.accentColor)root.setProperty('--accent',theme.accentColor);
  if(theme.darkColor)root.setProperty('--dark',theme.darkColor);
  if(theme.headingFont)root.setProperty('--heading-font',`'${theme.headingFont}'`);
  if(theme.bodyFont)root.setProperty('--body-font',`'${theme.bodyFont}'`);
  if(theme.baseFontSize)root.setProperty('--base-size',theme.baseFontSize+'px');
  if(theme.heroHeadingSize)root.setProperty('--hero-h-size',theme.heroHeadingSize+'px');
  if(theme.heroSubSize)root.setProperty('--hero-sub-size',theme.heroSubSize+'px');
  if(theme.heroTextSize)root.setProperty('--hero-text-size',theme.heroTextSize+'px');
  if(theme.sectionHeadingSize)root.setProperty('--section-h-size',theme.sectionHeadingSize+'px');
  if(theme.cardTitleSize)root.setProperty('--card-title-size',theme.cardTitleSize+'px');
  if(theme.cardTextSize)root.setProperty('--card-text-size',theme.cardTextSize+'px');
  if(theme.navFontSize)root.setProperty('--nav-font-size',theme.navFontSize+'px');
  if(theme.heroHeadingWeight)root.setProperty('--hero-h-weight',theme.heroHeadingWeight);
  if(theme.sectionHeadingWeight)root.setProperty('--section-h-weight',theme.sectionHeadingWeight);
  if(theme.cardTitleWeight)root.setProperty('--card-title-weight',theme.cardTitleWeight);

  // ── TOPBAR REMOVED SITE-WIDE ──
  document.querySelectorAll('.topbar,#topbar').forEach(el=>el.remove());

  // ── NAV ──
  const navLinks=document.getElementById('nav-links');
  if(navLinks){
    const links=(nav.links||[
      {label:'Home',url:'index.html'},{label:'About',url:'about.html'},
      {label:'Services',url:'services.html'},{label:'Odoo ERP',url:'odoo.html'},
      {label:'Industries',url:'industries.html'},{label:'Portfolio',url:'portfolio.html'},
      {label:'Blog',url:'blog.html'}
    ]);
    navLinks.innerHTML=links.map(l=>`<a href="${l.url}">${l.label}</a>`).join('')+
      `<a class="nav-cta" href="${nav.ctaLink||'contact.html'}">${nav.ctaLabel||'Contact Us'}</a>`;
  }

  // ── PREMIUM WHATSAPP LIVE CHAT + TRACKING ──
  const waMessage='Hello AimAze, I need ERP / software consultation for my business.';
  function trackEvent(type, detail){
    try{
      const key='aimaze_lead_events';
      const events=JSON.parse(localStorage.getItem(key)||'[]');
      events.push({type, detail:detail||'', page:location.pathname, time:new Date().toISOString()});
      localStorage.setItem(key, JSON.stringify(events.slice(-500)));
    }catch(e){}
  }
  window.aimazeTrackEvent=trackEvent;

  const waNumber=((site.whatsapp||'')+'').replace(/\D/g,'');
  const waUrl=waNumber ? ('https://wa.me/'+waNumber+'?text='+encodeURIComponent(waMessage)) : '';

  function isAimazeOnline(){
    try{
      const parts=new Intl.DateTimeFormat('en-US',{timeZone:'Asia/Dubai',weekday:'short',hour:'2-digit',hour12:false}).formatToParts(new Date());
      const day=(parts.find(p=>p.type==='weekday')||{}).value;
      const hour=parseInt((parts.find(p=>p.type==='hour')||{}).value,10);
      const workingDay=!['Sat','Sun'].includes(day);
      return workingDay && hour>=9 && hour<18;
    }catch(e){return true;}
  }

  function injectWhatsappStyles(){
    if(document.getElementById('aimaze-wa-v15-style')) return;
    const st=document.createElement('style');
    st.id='aimaze-wa-v15-style';
    st.textContent=`
      .whatsapp-float{position:fixed!important;right:24px!important;bottom:24px!important;z-index:99999!important;width:68px!important;height:68px!important;min-width:68px!important;max-width:68px!important;padding:0!important;border-radius:50%!important;background:radial-gradient(circle at 35% 28%,#45f38a 0%,#25d366 42%,#128c7e 100%)!important;color:#fff!important;display:flex!important;align-items:center!important;justify-content:center!important;box-shadow:0 22px 55px rgba(18,140,126,.38),0 8px 18px rgba(0,0,0,.16)!important;text-decoration:none!important;overflow:visible!important;animation:waRoundFloat 2.8s ease-in-out infinite!important;border:none!important;cursor:pointer!important}
      .whatsapp-float:before{content:''!important;position:absolute!important;inset:-9px!important;border-radius:50%!important;border:2px solid rgba(37,211,102,.42)!important;animation:waRoundPulse 2.2s ease-out infinite!important;pointer-events:none!important}
      .whatsapp-float:after{content:''!important;position:absolute!important;right:8px!important;top:8px!important;width:13px!important;height:13px!important;background:#22c55e!important;border:3px solid #fff!important;border-radius:50%!important;box-shadow:0 0 0 5px rgba(34,197,94,.18)!important}
      .whatsapp-float .wa-icon{width:42px!important;height:42px!important;border-radius:50%!important;background:rgba(255,255,255,.96)!important;color:#12a85d!important;display:flex!important;align-items:center!important;justify-content:center!important;font-size:22px!important;line-height:1!important;box-shadow:0 8px 18px rgba(0,0,0,.14)!important}
      .whatsapp-float .wa-icon svg{display:block!important}.whatsapp-float .wa-label,.whatsapp-float .wa-mini-status,.whatsapp-float .wa-ring,.whatsapp-float span:not(.wa-icon){display:none!important}.whatsapp-float:hover{transform:translateY(-5px) scale(1.07)!important;box-shadow:0 30px 75px rgba(18,140,126,.5),0 12px 24px rgba(0,0,0,.2)!important}
      @keyframes waRoundFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}@keyframes waRoundPulse{0%{transform:scale(.9);opacity:.75}70%{transform:scale(1.45);opacity:0}100%{opacity:0}}
      .wa-chat-popup{position:fixed!important;right:24px!important;bottom:104px!important;width:min(360px,calc(100vw - 32px))!important;background:#fff!important;border-radius:24px!important;box-shadow:0 30px 90px rgba(15,23,42,.28)!important;z-index:99998!important;overflow:hidden!important;opacity:0!important;transform:translateY(18px) scale(.96)!important;pointer-events:none!important;transition:.28s ease!important;border:1px solid rgba(15,23,42,.08)!important}.wa-chat-popup.open{opacity:1!important;transform:translateY(0) scale(1)!important;pointer-events:auto!important}
      @media(max-width:640px){.whatsapp-float{right:16px!important;bottom:16px!important;width:62px!important;height:62px!important;min-width:62px!important;max-width:62px!important}.whatsapp-float .wa-icon{width:38px!important;height:38px!important}.wa-chat-popup{right:16px!important;bottom:94px!important;width:calc(100vw - 32px)!important}}
    `;
    document.head.appendChild(st);
  }

  function ensureWhatsappChat(){
    injectWhatsappStyles();
    document.querySelectorAll('.whatsapp-float').forEach((el)=>{ if(el.id!=='wa-btn') el.remove(); });
    let float=document.getElementById('wa-btn');
    if(!float){
      float=document.createElement('a');
      float.id='wa-btn';
      document.body.appendChild(float);
    }
    float.className='whatsapp-float';
    float.href='#';
    float.innerHTML=`<span class="wa-icon" aria-hidden="true"><svg viewBox="0 0 32 32" width="24" height="24"><path fill="currentColor" d="M16 .5C7.5.5.7 7.3.7 15.7c0 2.7.7 5.2 2 7.4L.4 31.5l8.7-2.2c2.1 1.1 4.5 1.7 6.9 1.7 8.5 0 15.3-6.8 15.3-15.3S24.5.5 16 .5zm0 27.6c-2.3 0-4.6-.6-6.6-1.8l-.5-.3-5.2 1.3 1.4-5.1-.3-.5c-1.2-2-1.9-4.3-1.9-6.7C2.9 7.8 8.8 1.9 16 1.9s13.1 5.9 13.1 13.1S23.2 28.1 16 28.1zm7.2-9.7c-.4-.2-2.3-1.1-2.6-1.3-.3-.1-.5-.2-.7.2-.2.4-.8 1.3-1 1.5-.2.2-.4.3-.8.1-.4-.2-1.6-.6-3.1-2-.8-.7-1.4-1.6-1.6-1.9-.2-.4 0-.6.2-.8.2-.2.4-.5.6-.7.2-.2.3-.4.4-.6.1-.2 0-.5 0-.7 0-.2-.7-1.8-1-2.5-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.6.1-.9.5-.3.4-1.2 1.1-1.2 2.7s1.2 3.1 1.4 3.3c.2.2 2.3 3.6 5.6 5 .8.4 1.5.6 2 .8.8.2 1.5.2 2.1.1.6-.1 2.3-.9 2.6-1.7.3-.8.3-1.5.2-1.7-.1-.2-.3-.3-.7-.5z"/></svg></span><span class="wa-label">WhatsApp</span><small class="wa-mini-status">Online</small>`;
    float.setAttribute('aria-label','Open AimAze WhatsApp chat');

    let popup=document.getElementById('wa-chat-popup');
    if(!popup){
      popup=document.createElement('div');
      popup.id='wa-chat-popup';
      popup.className='wa-chat-popup';
      popup.innerHTML=`
        <div class="wa-chat-head">
          <div class="wa-avatar">A</div>
          <div><strong>AimAze Tech Solutions</strong><p id="wa-status-line"><span class="status-dot"></span><span id="wa-status-text">Online now</span></p></div>
          <button type="button" id="wa-close" aria-label="Close WhatsApp chat">×</button>
        </div>
        <div class="wa-chat-body">
          <div class="wa-msg wa-msg-in">Hello 👋</div>
          <div class="wa-msg wa-msg-in">How can we help with Odoo ERP, automation, dashboards or website development?</div>
          <div class="wa-typing" aria-label="Typing"><span></span><span></span><span></span></div>
        </div>
        <div class="wa-chat-actions">
          <a href="${waUrl || 'contact.html'}" id="wa-start-chat" class="wa-start-chat">Start WhatsApp Chat</a>
          <a href="contact.html" class="wa-secondary-chat">Send Inquiry Form</a>
        </div>`;
      document.body.appendChild(popup);
    }

    const statusText=document.getElementById('wa-status-text');
    const statusLine=document.getElementById('wa-status-line');
    const start=document.getElementById('wa-start-chat');
    const close=document.getElementById('wa-close');
    const online=isAimazeOnline();
    if(statusText) statusText.textContent=online?'Online now · UAE business hours':'Offline now · Leave a message';
    if(statusLine) statusLine.classList.toggle('is-offline',!online);
    const mini=float.querySelector('.wa-mini-status');
    if(mini) mini.textContent=online?'Online':'Offline';
    if(start){
      if(waNumber){ start.href=waUrl; start.target='_blank'; start.rel='noopener'; start.textContent='Start WhatsApp Chat'; }
      else { start.href='contact.html'; start.removeAttribute('target'); start.textContent='WhatsApp activating soon — use inquiry form'; }
    }
    float.onclick=null;
    float.addEventListener('click',function(e){
      e.preventDefault();
      trackEvent('whatsapp_popup_open','floating_button');
      popup.classList.add('open');
      return false;
    });
    if(close){ close.onclick=()=>popup.classList.remove('open'); }
    document.addEventListener('keydown',(e)=>{ if(e.key==='Escape') popup.classList.remove('open'); });
    const direct=document.getElementById('wa-direct');
    if(direct){
      direct.href='#';
      direct.onclick=(e)=>{e.preventDefault();trackEvent('whatsapp_popup_open','contact_page_card');popup.classList.add('open');};
    }
  }
  ensureWhatsappChat();

  document.querySelectorAll('a[href^="tel:"]').forEach(a=>a.addEventListener('click',()=>trackEvent('call_click',a.getAttribute('href'))));
  document.querySelectorAll('a[href="contact.html"], .nav-cta, .btn-primary').forEach(a=>a.addEventListener('click',()=>trackEvent('cta_click',a.textContent.trim())));

  // ── FOOTER ──
  const footer=document.getElementById('footer-inner');
  if(footer){
    footer.innerHTML=`
    <div class="footer-grid">
      <div class="footer-brand">
        <img src="assets/aimaze-logo-transparent.png" alt="AimAze">
        <p>Odoo ERP, software, websites and digital transformation services for UAE and international businesses.</p>
        <div class="social-links" style="margin-top:20px">
          <a class="social-link" href="#">💼</a>
          <a class="social-link" href="#">📘</a>
          <a class="social-link" href="#">📸</a>
        </div>
      </div>
      <div class="footer-col">
        <h4>Services</h4>
        <a href="odoo.html">Odoo ERP</a>
        <a href="services.html">Customization</a>
        <a href="services.html">CRM & Sales</a>
        <a href="services.html">Finance Dashboards</a>
        <a href="services.html">Web Development</a>
      </div>
      <div class="footer-col">
        <h4>Company</h4>
        <a href="about.html">About Us</a>
        <a href="portfolio.html">Portfolio</a>
        <a href="blog.html">Blog</a>
        <a href="industries.html">Industries</a>
      </div>
      <div class="footer-col footer-contact">
        <h4>Contact</h4>
        <p><strong>Email</strong><br>${site.email||'info@aimazetechsolutions.com'}</p>
        <p><strong>Location</strong><br>${site.address||'Dubai, UAE'}</p>
        ${site.phone?`<p><strong>Phone</strong><br>${site.phone}</p>`:''}
        <p style="margin-top:16px"><a class="btn btn-primary" href="contact.html" style="font-size:13px;padding:11px 20px;display:inline-flex">Book Consultation</a></p>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 ${site.name||'AimAze Tech Solutions LLC'}. All rights reserved.</span>
      <span style="color:rgba(255,255,255,.3)">Built with ❤️ in Dubai</span>
    </div>`;
  }

  // ── PAGE HERO VIDEO ──
  // Accepts YouTube video IDs, normal URLs, Shorts URLs, embed URLs, or pasted iframe embed code.
  function extractYouTubeId(input){
    if(!input)return null;
    const str=String(input).trim();
    if(/^[A-Za-z0-9_-]{11}$/.test(str))return str;

    const patterns=[
      /youtube\.com\/embed\/([A-Za-z0-9_-]{11})/,
      /youtube\.com\/watch\?[^"'<>]*v=([A-Za-z0-9_-]{11})/,
      /youtu\.be\/([A-Za-z0-9_-]{11})/,
      /youtube\.com\/shorts\/([A-Za-z0-9_-]{11})/,
      /playlist=([A-Za-z0-9_-]{11})/,
      /src=["'][^"']*\/embed\/([A-Za-z0-9_-]{11})/
    ];
    for(const re of patterns){
      const m=str.match(re);
      if(m&&m[1])return m[1];
    }
    return null;
  }

  // Detect current page name e.g. "about" from "about.html"
  let pageName=location.pathname.split('/').pop().replace('.html','').toLowerCase();
  if(!pageName||pageName==='index')pageName='home';

  // Pick video: home uses hero.videoUrl; other pages use pageVideos[pageName].
  // If a page-specific value is missing/invalid, it falls back to the home hero video.
  const defaultHomeVideo='QyhwSYhX09s';
  const heroVideoId=extractYouTubeId(hero.videoUrl)||defaultHomeVideo;
  const pageVideoId=extractYouTubeId(pageVideos[pageName]);
  const videoId=pageVideoId||heroVideoId;
  const showVideo=hero.showVideo!==false;

  const pageHero=document.querySelector('.page-hero');
  if(pageHero){
    const existingHTML=pageHero.innerHTML;
    pageHero.innerHTML='';

    // 1 — YouTube video layer
    if(showVideo&&videoId){
      const vdiv=document.createElement('div');
      vdiv.className='page-hero-video';
      vdiv.innerHTML=`<iframe
        src="https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&disablekb=1&iv_load_policy=3&fs=0"
        allow="autoplay; encrypted-media"
        allowfullscreen loading="lazy">
      </iframe>`;
      pageHero.appendChild(vdiv);
    }

    // 2 — Subtle overlay
    const overlay=document.createElement('div');
    overlay.className='page-hero-overlay';
    pageHero.appendChild(overlay);

    // 3 — Content on top
    const contentWrap=document.createElement('div');
    contentWrap.className='page-hero-content';
    contentWrap.innerHTML=existingHTML;
    pageHero.appendChild(contentWrap);
  }

  // ── NAVBAR SCROLL ──
  const navbar=document.getElementById('navbar');
  if(navbar){
    window.addEventListener('scroll',()=>{
      navbar.classList.toggle('scrolled',window.scrollY>80);
    },{passive:true});
  }

  // ── HAMBURGER ──
  const ham=document.getElementById('hamburger');
  if(ham)ham.addEventListener('click',()=>{
    document.getElementById('nav-links')?.classList.toggle('open');
  });

  // ── SCROLL REVEAL ──
  const reveal=()=>{
    document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el=>{
      if(el.getBoundingClientRect().top<window.innerHeight-80)el.classList.add('in');
    });
  };
  window.addEventListener('scroll',reveal,{passive:true});
  setTimeout(reveal,150);

})();
