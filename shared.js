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

  // ── WHATSAPP + BASIC CALL/LEAD TRACKING ──
  const waMessage='Hello AimAze, I need Odoo ERP / software consultation for my business.';
  function trackEvent(type, detail){
    try{
      const key='aimaze_lead_events';
      const events=JSON.parse(localStorage.getItem(key)||'[]');
      events.push({type, detail:detail||'', page:location.pathname, time:new Date().toISOString()});
      localStorage.setItem(key, JSON.stringify(events.slice(-500)));
    }catch(e){}
  }
  window.aimazeTrackEvent=trackEvent;

  const wa=document.getElementById('wa-btn');
  const waDirect=document.getElementById('wa-direct');
  const waNumber=(site.whatsapp||'').replace(/\D/g,'');
  if(waNumber&&waNumber!=='971XXXXXXXXX'.replace(/\D/g,'')){
    const waUrl='https://wa.me/'+waNumber+'?text='+encodeURIComponent(waMessage);
    if(wa){wa.href=waUrl; wa.target='_blank'; wa.rel='noopener'; wa.addEventListener('click',()=>trackEvent('whatsapp_click','floating_button'));}
    if(waDirect){waDirect.href=waUrl; waDirect.target='_blank'; waDirect.rel='noopener'; waDirect.addEventListener('click',()=>trackEvent('whatsapp_click','contact_page'));}
  }
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
