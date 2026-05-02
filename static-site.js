const defaultContent = {
  type: "WebsiteContent",
  site: {
    title: "AimAze Tech Solutions",
    description: "AimAze Tech Solutions provides Odoo ERP implementation and technology solutions.",
    domain: "https://aimazetechsolutions.com",
    logo: "assets/aimaze-logo-transparent.png",
    ogImage: "assets/aimaze-coverpage.png",
    email: "info@aimazetechsolutions.com",
    footerText: "AimAze Tech Solutions LLC. All rights reserved.",
  },
  theme: {
    cyan: "#27c7d7",
    blue: "#3f83df",
    orange: "#ff8847",
    purple: "#70419a",
    ink: "#141b2c",
    text: "#344154",
    muted: "#6d7789",
    soft: "#f5fbfd",
  },
  typography: {
    googleFontUrl: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap",
    bodyFont: "Inter, Arial, Helvetica, sans-serif",
    headingFont: "Inter, Arial, Helvetica, sans-serif",
    bodySize: "16px",
    topStripSize: "0.88rem",
    navSize: "0.95rem",
    eyebrowSize: "0.78rem",
    heroTitleMin: "3.35rem",
    heroTitleMax: "6.6rem",
    heroCopySize: "1.18rem",
    pageTitleMin: "3.35rem",
    pageTitleMax: "6.6rem",
    sectionTitleMin: "2rem",
    sectionTitleMax: "4rem",
    paragraphSize: "1.06rem",
    cardTitleSize: "1.24rem",
    cardTextSize: "1rem",
    tagSize: "0.92rem",
    statsValueMin: "2.4rem",
    statsValueMax: "3.8rem",
    statsLabelSize: "1rem",
    buttonSize: "1rem",
    formSize: "1rem",
    footerSize: "1rem",
  },
  sections: {},
  homeSectionOrder: [
    "hero",
    "about",
    "problems",
    "platform",
    "stats",
    "services",
    "industries",
    "gallery",
    "testimonials",
    "caseStudies",
    "faq",
    "contact",
  ],
  appearance: {
    hero: {},
  },
  navigation: [],
  topStrip: {},
  hero: {},
  about: {},
  problems: {},
  platform: {},
  stats: [],
  services: { items: [] },
  industries: { items: [] },
  process: { items: [] },
  faq: { items: [] },
  video: {},
  gallery: { items: [] },
  testimonials: { items: [] },
  caseStudies: { items: [] },
  blog: { items: [] },
  customSections: [],
  contact: {},
};

const pageMeta = {
  home: {
    eyebrow: "AimAze Tech Solutions",
    title: "Technology solutions for operational growth.",
    copy: "Explore Odoo ERP implementation, custom software, business applications, cloud development, IT management, and website services from one focused technology partner.",
  },
  about: {
    eyebrow: "About AimAze",
    title: "A practical technology partner for growing businesses.",
    copy: "We help businesses move from scattered tools and manual reporting into structured systems that make daily operations easier to manage.",
  },
  services: {
    eyebrow: "Services",
    title: "Business technology services built around real workflows.",
    copy: "From ERP to custom applications and websites, AimAze designs, builds, integrates, and supports the systems your team depends on.",
  },
  odoo: {
    eyebrow: "Odoo ERP",
    title: "Odoo implementation shaped around your process.",
    copy: "Plan the right modules, configure the platform, customize what matters, integrate existing tools, and train your users for adoption.",
  },
  industries: {
    eyebrow: "Industries",
    title: "ERP and software support for operational teams.",
    copy: "AimAze helps businesses in trading, distribution, retail, services, sales, finance, HR, and inventory-led operations gain control and visibility.",
  },
  portfolio: {
    eyebrow: "Portfolio",
    title: "Project visuals, case studies, and solution examples.",
    copy: "Use this page to showcase implementation examples, interface screenshots, service visuals, and business results.",
  },
  blog: {
    eyebrow: "Insights",
    title: "Guides, updates, and practical technology thinking.",
    copy: "Publish notes about Odoo ERP, software development, automation, operations, and digital transformation.",
  },
  contact: {
    eyebrow: "Contact",
    title: "Request a free business process analysis.",
    copy: "Tell us what you want to improve, and we’ll help you identify the right ERP, software, website, or IT solution path.",
  },
};

const defaultNavigation = [
  { label: "Home", href: "index.html" },
  { label: "About", href: "about.html" },
  { label: "Services", href: "services.html" },
  { label: "Odoo ERP", href: "odoo.html" },
  { label: "Industries", href: "industries.html" },
  { label: "Portfolio", href: "portfolio.html" },
  { label: "Blog", href: "blog.html" },
];

const navHrefByLabel = {
  home: "index.html",
  about: "about.html",
  services: "services.html",
  "odoo erp": "odoo.html",
  odoo: "odoo.html",
  industries: "industries.html",
  portfolio: "portfolio.html",
  gallery: "portfolio.html",
  blog: "blog.html",
  insights: "blog.html",
  contact: "contact.html",
};

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function hostFromUrl(url) {
  try {
    return new URL(url).host;
  } catch {
    return url || "";
  }
}

function isEnabled(content, key) {
  return content.sections?.[key] !== false;
}

function hasText(value) {
  return String(value || "").trim().length > 0;
}

function cssVar(name, value) {
  return hasText(value) ? `--${name}: ${escapeHtml(value)};` : "";
}

function styleVars(vars) {
  return Object.entries(vars)
    .map(([name, value]) => cssVar(name, value))
    .join(" ");
}

function imageMarkup(src, alt = "", className = "") {
  if (!hasText(src)) return "";
  return `<img${className ? ` class="${escapeHtml(className)}"` : ""} src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" />`;
}

function cssImageUrl(src) {
  if (!hasText(src)) return "";
  return `url("${String(src).replaceAll("\\", "\\\\").replaceAll('"', '\\"')}")`;
}

const contentObjectId = "content.json";

function sbField(path) {
  return hasText(path) ? ` data-sb-field-path="${escapeHtml(path)}"` : "";
}

function sbObject(path = "") {
  return ` data-sb-object-id="${contentObjectId}"${sbField(path)}`;
}

function videoMarkup(url, poster = "", title = "Video") {
  if (!hasText(url)) return "";
  const cleanUrl = String(url).trim();
  const youtube = cleanUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]+)/);
  const vimeo = cleanUrl.match(/vimeo\.com\/(\d+)/);

  if (youtube) {
    return `<iframe src="https://www.youtube.com/embed/${escapeHtml(youtube[1])}" title="${escapeHtml(title)}" allowfullscreen loading="lazy"></iframe>`;
  }

  if (vimeo) {
    return `<iframe src="https://player.vimeo.com/video/${escapeHtml(vimeo[1])}" title="${escapeHtml(title)}" allowfullscreen loading="lazy"></iframe>`;
  }

  return `<video controls ${hasText(poster) ? `poster="${escapeHtml(poster)}"` : ""}><source src="${escapeHtml(cleanUrl)}" />Your browser does not support the video tag.</video>`;
}

function visualTileMarkup(label = "AimAze", title = "Technology solution", className = "") {
  return `
    <div class="visual-tile ${escapeHtml(className)}" aria-label="${escapeHtml(title)}">
      <div class="visual-tile-grid"></div>
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(title)}</strong>
      <div class="visual-bars"><i></i><i></i><i></i></div>
    </div>
  `;
}

function setMeta(content) {
  const site = content.site || {};
  document.title = site.title || "AimAze Tech Solutions";
  document.querySelector('meta[name="description"]')?.setAttribute("content", site.description || "");
  document.querySelector('meta[property="og:title"]')?.setAttribute("content", site.title || "");
  document.querySelector('meta[property="og:description"]')?.setAttribute("content", site.description || "");
  document.querySelector('meta[property="og:url"]')?.setAttribute("content", site.domain || "");
  document.querySelector('meta[property="og:image"]')?.setAttribute("content", site.ogImage || "");
  document.querySelector('link[rel="icon"]')?.setAttribute("href", site.logo || "assets/aimaze-logo-transparent.png");
}

function applyTheme(content) {
  const theme = content.theme || {};
  const root = document.documentElement;
  ["cyan", "blue", "orange", "purple", "ink", "text", "muted", "soft"].forEach((name) => {
    if (hasText(theme[name])) {
      root.style.setProperty(`--${name}`, theme[name]);
    }
  });
}

function applyTypography(content) {
  const typography = content.typography || {};
  const root = document.documentElement;
  const fontLinkId = "aimaze-google-font";
  const fontUrl = String(typography.googleFontUrl || "").trim();
  const existingFontLink = document.getElementById(fontLinkId);

  if (fontUrl) {
    const fontLink = existingFontLink || document.createElement("link");
    fontLink.id = fontLinkId;
    fontLink.rel = "stylesheet";
    fontLink.href = fontUrl;
    if (!existingFontLink) document.head.appendChild(fontLink);
  } else if (existingFontLink) {
    existingFontLink.remove();
  }

  const typographyVars = {
    bodyFont: "--font-body",
    headingFont: "--font-heading",
    bodySize: "--body-size",
    topStripSize: "--top-strip-size",
    navSize: "--nav-size",
    eyebrowSize: "--eyebrow-size",
    heroTitleMin: "--hero-title-min",
    heroTitleMax: "--hero-title-max",
    heroCopySize: "--hero-copy-size",
    pageTitleMin: "--page-title-min",
    pageTitleMax: "--page-title-max",
    sectionTitleMin: "--section-title-min",
    sectionTitleMax: "--section-title-max",
    paragraphSize: "--paragraph-size",
    cardTitleSize: "--card-title-size",
    cardTextSize: "--card-text-size",
    tagSize: "--tag-size",
    statsValueMin: "--stats-value-min",
    statsValueMax: "--stats-value-max",
    statsLabelSize: "--stats-label-size",
    buttonSize: "--button-size",
    formSize: "--form-size",
    footerSize: "--footer-size",
  };

  Object.entries(typographyVars).forEach(([key, variable]) => {
    if (hasText(typography[key])) {
      root.style.setProperty(variable, typography[key]);
    }
  });
}

function sectionHeading(section) {
  return `
    <div class="section-heading">
      ${hasText(section.eyebrow) ? `<p class="eyebrow"${sbField(".eyebrow")}>${escapeHtml(section.eyebrow)}</p>` : ""}
      ${hasText(section.title) ? `<h2${sbField(".title")}>${escapeHtml(section.title)}</h2>` : ""}
      ${hasText(section.copy) ? `<p${sbField(".copy")}>${escapeHtml(section.copy)}</p>` : ""}
    </div>
  `;
}

function renderTop(content) {
  const site = content.site || {};
  const topStrip = content.topStrip || {};
  const page = currentPage();
  const navigation = normalizedNavigation(content);
  return `
    <div class="top-strip"${sbObject("topStrip")}>
      <p${sbField(".text")}>${escapeHtml(topStrip.text)}</p>
      <a href="${escapeHtml(topStrip.linkHref || "#contact")}"${sbField(".linkText")}>${escapeHtml(topStrip.linkText)}</a>
    </div>

    <header class="site-header" data-header>
      <a class="brand" href="#home" aria-label="AimAze Tech Solutions home"${sbObject("site.logo")}>
        ${imageMarkup(site.logo, "AimAze Tech Solutions logo")}
      </a>
      <button class="nav-toggle" type="button" aria-label="Open navigation" data-nav-toggle>
        <span></span><span></span><span></span>
      </button>
      <nav class="site-nav" data-nav>
        ${navigation
          .map((item) => `<a class="${navIsActive(item.href, page) ? "is-active" : ""}" href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a>`)
          .join("")}
        <a class="nav-cta ${page === "contact" ? "is-active" : ""}" href="contact.html">Contact Us</a>
      </nav>
    </header>
  `;
}

function normalizedNavigation(content) {
  const nav = content.navigation?.length ? content.navigation : defaultNavigation;
  return nav.map((item) => {
    const label = String(item.label || "").trim();
    const labelKey = label.toLowerCase();
    const href = String(item.href || "").trim();
    const shouldNormalize = !href || href.startsWith("#");
    return {
      label,
      href: shouldNormalize ? navHrefByLabel[labelKey] || href || "index.html" : href,
    };
  });
}

function currentPage() {
  if (document.body.dataset.page) return document.body.dataset.page;
  const file = window.location.pathname.split("/").pop() || "index.html";
  return file.replace(".html", "") || "home";
}

function navIsActive(href, page) {
  if (page === "home" && (href === "index.html" || href === "./")) return true;
  return href === `${page}.html`;
}

function renderPageHero(content, key) {
  const meta = pageMeta[key] || pageMeta.home;
  const hero = content.hero || {};
  return `
    <section class="page-hero reveal"${sbObject(key === "home" ? "hero" : "")}>
      <div>
        <p class="eyebrow">${escapeHtml(meta.eyebrow)}</p>
        <h1>${escapeHtml(meta.title)}</h1>
        <p>${escapeHtml(meta.copy)}</p>
        <div class="hero-actions">
          <a class="button button-primary" href="contact.html">Talk to Us</a>
          <a class="button button-secondary" href="services.html">Explore Services</a>
        </div>
      </div>
      <div class="page-hero-media">
        <div class="page-hero-stack">
          ${imageMarkup(hero.image || content.site?.ogImage, hero.imageAlt || meta.title)}
          <div class="floating-chip chip-one">ERP</div>
          <div class="floating-chip chip-two">Cloud</div>
          <div class="floating-chip chip-three">Apps</div>
        </div>
      </div>
    </section>
  `;
}

function renderHero(content) {
  const hero = content.hero || {};
  const heroStyle = content.appearance?.hero || {};
  const showVisualArea = hero.showVisualArea !== false;
  const showInfoPanel = hero.showInfoPanel !== false;
  const showBackgroundImage = hero.showBackgroundImage !== false;
  const showMainImage = hero.showMainImage !== false;
  const showExtraImages = hero.showExtraImages !== false;
  const showFloatingCards = hero.showFloatingCards !== false;
  const heroBackground = showBackgroundImage ? hero.backgroundImage || hero.image || content.site?.ogImage || "" : "";
  const heroImage = showMainImage && hasText(hero.image) ? imageMarkup(hero.image, hero.imageAlt) : "";
  const heroCard = heroImage || showInfoPanel ? `
          <div class="hero-card"${sbField(".showMainImage")}>
            ${heroImage ? `<div${sbField(".image")}>${heroImage}</div>` : ""}
            ${showInfoPanel ? `
              <div class="hero-card-panel"${sbField(".showInfoPanel")}>
                <strong${sbField(".cardTitle")}>${escapeHtml(hero.cardTitle)}</strong>
                <span${sbField(".cardText")}>${escapeHtml(hero.cardText)}</span>
              </div>
            ` : ""}
          </div>
        ` : "";
  const heroInlineStyle = [
    `--hero-bg-image: ${escapeHtml(cssImageUrl(heroBackground))};`,
    styleVars({
      "hero-title-color": heroStyle.titleColor,
      "hero-copy-color": heroStyle.copyColor,
      "hero-eyebrow-color": heroStyle.eyebrowColor,
      "hero-title-size": heroStyle.titleSize,
      "hero-copy-size": heroStyle.copySize,
      "hero-overlay-color": heroStyle.overlayColor,
      "hero-card-bg": heroStyle.cardBackground,
      "hero-card-text": heroStyle.cardTextColor,
    }),
  ].filter(Boolean).join(" ");
  return `
    <section class="hero ${showBackgroundImage ? "hero-with-background" : "hero-without-background"} reveal" id="home" style="${heroInlineStyle}"${sbObject("hero")}>
      <div class="hero-shape hero-shape-one"></div>
      <div class="hero-shape hero-shape-two"></div>
      <div class="hero-inner">
        <div class="hero-content">
          <p class="eyebrow"${sbField(".eyebrow")}>${escapeHtml(hero.eyebrow)}</p>
          <h1${sbField(".title")}>${escapeHtml(hero.title)}</h1>
          <p class="hero-copy"${sbField(".copy")}>${escapeHtml(hero.copy)}</p>
          <div class="hero-points" aria-label="Key strengths"${sbField(".points")}>
            ${(hero.points || []).map((point, index) => `<span${sbField(`.${index}`)}>${escapeHtml(point)}</span>`).join("")}
          </div>
          <div class="hero-actions">
            <a class="button button-primary" href="${escapeHtml(hero.primaryButton?.href || "#contact")}"${sbField(".primaryButton.label")}>${escapeHtml(hero.primaryButton?.label || "Contact Us")}</a>
            <a class="button button-secondary" href="${escapeHtml(hero.secondaryButton?.href || "#services")}"${sbField(".secondaryButton.label")}>${escapeHtml(hero.secondaryButton?.label || "View Services")}</a>
          </div>
        </div>
        ${showVisualArea ? `
          <div class="hero-showcase" aria-label="AimAze ERP capabilities"${sbField(".showVisualArea")}>
            ${heroCard}
            ${showFloatingCards ? `
              <div class="hero-float-card float-card-one"${sbField(".showFloatingCards")}>
                <span>ERP</span>
                <strong>Unified operations</strong>
              </div>
              <div class="hero-float-card float-card-two"${sbField(".showFloatingCards")}>
                <span>360</span>
                <strong>Process visibility</strong>
              </div>
              <div class="hero-float-card float-card-three"${sbField(".showFloatingCards")}>
                <span>API</span>
                <strong>Connected systems</strong>
              </div>
            ` : ""}
          </div>
        ` : ""}
      </div>
      ${showExtraImages && (hero.gallery || []).length ? `
        <div class="hero-gallery"${sbField(".showExtraImages")}>
          ${(hero.gallery || []).map((item, index) => `<div${sbField(`.gallery.${index}.image`)}>${imageMarkup(item.image, item.alt || hero.title)}</div>`).join("")}
        </div>
      ` : ""}
      ${hasText(hero.videoUrl) ? `<div class="hero-video video-frame">${videoMarkup(hero.videoUrl, hero.image, hero.title)}</div>` : ""}
    </section>
  `;
}

function renderHomeSections(content) {
  const sectionRenderers = {
    hero: () => renderHero(content),
    about: () => renderAbout(content),
    problems: () => renderProblems(content),
    platform: () => renderPlatform(content),
    stats: () => renderStats(content),
    services: () => renderServices(content),
    industries: () => renderIndustries(content),
    process: () => renderProcess(content),
    video: () => renderVideoSection(content),
    gallery: () => renderGallery(content),
    testimonials: () => renderTestimonials(content),
    caseStudies: () => renderCaseStudies(content),
    blog: () => renderBlog(content),
    faq: () => renderFaq(content),
    customSections: () => renderCustomSections(content),
    contact: () => renderContact(content),
  };
  const fallbackOrder = defaultContent.homeSectionOrder;
  const order = (content.homeSectionOrder || fallbackOrder).filter((key) => sectionRenderers[key]);
  const missing = fallbackOrder.filter((key) => !order.includes(key));
  return [...order, ...missing].map((key) => sectionRenderers[key]()).join("");
}

function renderAbout(content) {
  if (!isEnabled(content, "about")) return "";
  const about = content.about || {};
  return `
    <section class="about-section reveal" id="about"${sbObject("about")}>
      <div class="section-heading align-left">
        <p class="eyebrow"${sbField(".eyebrow")}>${escapeHtml(about.eyebrow)}</p>
        <h2${sbField(".title")}>${escapeHtml(about.title)}</h2>
      </div>
      <div class="about-copy"${sbField(".paragraphs")}>
        ${(about.paragraphs || []).map((paragraph, index) => `<p${sbField(`.${index}`)}>${escapeHtml(paragraph)}</p>`).join("")}
      </div>
    </section>
  `;
}

function renderProblems(content) {
  if (!isEnabled(content, "problems")) return "";
  const problems = content.problems || {};
  return `
    <section class="section problem-section reveal"${sbObject("problems")}>
      ${sectionHeading(problems)}
      <div class="problem-grid"${sbField(".items")}>
        ${(problems.items || [])
          .map((problem, index) => `
            <article${sbField(`.${index}`)}>
              <span${sbField(".number")}>${escapeHtml(problem.number)}</span>
              <h3${sbField(".title")}>${escapeHtml(problem.title)}</h3>
              <p${sbField(".text")}>${escapeHtml(problem.text)}</p>
            </article>
          `)
          .join("")}
      </div>
    </section>
  `;
}

function renderPlatform(content) {
  if (!isEnabled(content, "platform")) return "";
  const platform = content.platform || {};
  return `
    <section class="platform-section reveal" id="odoo"${sbObject("platform")}>
      <div class="platform-copy">
        <p class="eyebrow"${sbField(".eyebrow")}>${escapeHtml(platform.eyebrow)}</p>
        <h2${sbField(".title")}>${escapeHtml(platform.title)}</h2>
        <p${sbField(".copy")}>${escapeHtml(platform.copy)}</p>
        <ul class="check-list"${sbField(".bullets")}>
          ${(platform.bullets || []).map((bullet, index) => `<li${sbField(`.${index}`)}>${escapeHtml(bullet)}</li>`).join("")}
        </ul>
      </div>
      <div class="guide-panel">
        <p class="eyebrow"${sbField(".guideEyebrow")}>${escapeHtml(platform.guideEyebrow)}</p>
        <h3${sbField(".guideTitle")}>${escapeHtml(platform.guideTitle)}</h3>
        <div class="guide-grid"${sbField(".guideItems")}>
          ${(platform.guideItems || [])
            .map((item, index) => `
              <div${sbField(`.${index}`)}>
                <strong${sbField(".title")}>${escapeHtml(item.title)}</strong>
                <span${sbField(".text")}>${escapeHtml(item.text)}</span>
              </div>
            `)
            .join("")}
        </div>
      </div>
    </section>
  `;
}

function renderStats(content) {
  if (!isEnabled(content, "stats")) return "";
  return `
    <section class="stats-section reveal" aria-label="AimAze service highlights"${sbObject("stats")}>
      ${(content.stats || [])
        .map((stat, index) => `
          <div${sbField(`.${index}`)}>
            <strong${sbField(".value")}>${escapeHtml(stat.value)}</strong>
            <span${sbField(".label")}>${escapeHtml(stat.label)}</span>
          </div>
        `)
        .join("")}
    </section>
  `;
}

function renderServices(content) {
  if (!isEnabled(content, "services")) return "";
  const services = content.services || {};
  return `
    <section class="section services-section reveal" id="services"${sbObject("services")}>
      ${sectionHeading(services)}
      <div class="service-grid"${sbField(".items")}>
        ${(services.items || [])
          .map((service, index) => `
            <article class="service-card"${sbField(`.${index}`)}>
              <div${sbField(".image")}>${hasText(service.image) ? imageMarkup(service.image, service.title, "service-card-image") : visualTileMarkup(service.short, service.title, "service-card-image")}</div>
              <span class="service-icon"${sbField(".short")}>${escapeHtml(service.short)}</span>
              <h3${sbField(".title")}>${escapeHtml(service.title)}</h3>
              <p${sbField(".text")}>${escapeHtml(service.text)}</p>
              ${hasText(service.videoUrl) ? `<div class="mini-video">${videoMarkup(service.videoUrl, service.image, service.title)}</div>` : ""}
            </article>
          `)
          .join("")}
      </div>
    </section>
  `;
}

function renderIndustries(content) {
  if (!isEnabled(content, "industries")) return "";
  const industries = content.industries || {};
  return `
    <section class="section industries-section reveal" id="industries"${sbObject("industries")}>
      ${sectionHeading(industries)}
      <div class="industry-grid"${sbField(".items")}>
        ${(industries.items || []).map((industry, index) => `<span${sbField(`.${index}`)}>${escapeHtml(industry)}</span>`).join("")}
      </div>
    </section>
  `;
}

function renderProcess(content) {
  if (!isEnabled(content, "process")) return "";
  const process = content.process || {};
  return `
    <section class="section process-section reveal"${sbObject("process")}>
      <div class="section-heading align-left">
        <p class="eyebrow"${sbField(".eyebrow")}>${escapeHtml(process.eyebrow)}</p>
        <h2${sbField(".title")}>${escapeHtml(process.title)}</h2>
      </div>
      <div class="timeline"${sbField(".items")}>
        ${(process.items || [])
          .map((step, index) => `
            <article${sbField(`.${index}`)}>
              <span${sbField(".title")}>${escapeHtml(step.title)}</span>
              <p${sbField(".text")}>${escapeHtml(step.text)}</p>
            </article>
          `)
          .join("")}
      </div>
    </section>
  `;
}

function renderVideoSection(content) {
  if (!isEnabled(content, "video")) return "";
  const video = content.video || {};
  if (!hasText(video.videoUrl)) return "";
  return `
    <section class="section video-section reveal" id="video">
      ${sectionHeading(video)}
      <div class="video-frame">${videoMarkup(video.videoUrl, video.posterImage, video.title)}</div>
    </section>
  `;
}

function renderGallery(content) {
  if (!isEnabled(content, "gallery")) return "";
  const gallery = content.gallery || {};
  return `
    <section class="section gallery-section reveal" id="gallery"${sbObject("gallery")}>
      ${sectionHeading(gallery)}
      <div class="gallery-grid"${sbField(".items")}>
        ${(gallery.items || [])
          .map((item, index) => `
            <article class="media-card"${sbField(`.${index}`)}>
              <div${sbField(".image")}>${imageMarkup(item.image, item.alt || item.title)}</div>
              <div>
                <h3${sbField(".title")}>${escapeHtml(item.title)}</h3>
                <p${sbField(".text")}>${escapeHtml(item.text)}</p>
              </div>
            </article>
          `)
          .join("")}
      </div>
    </section>
  `;
}

function renderTestimonials(content) {
  if (!isEnabled(content, "testimonials")) return "";
  const testimonials = content.testimonials || {};
  return `
    <section class="section testimonials-section reveal" id="testimonials"${sbObject("testimonials")}>
      ${sectionHeading(testimonials)}
      <div class="testimonial-grid"${sbField(".items")}>
        ${(testimonials.items || [])
          .map((item, index) => `
            <article class="testimonial-card"${sbField(`.${index}`)}>
              <div${sbField(".image")}>${imageMarkup(item.image, item.name, "avatar")}</div>
              <p${sbField(".quote")}>${escapeHtml(item.quote)}</p>
              <strong${sbField(".name")}>${escapeHtml(item.name)}</strong>
              <span${sbField(".role")}>${escapeHtml(item.role)}</span>
            </article>
          `)
          .join("")}
      </div>
    </section>
  `;
}

function renderCaseStudies(content) {
  if (!isEnabled(content, "caseStudies")) return "";
  const caseStudies = content.caseStudies || {};
  return `
    <section class="section case-section reveal" id="case-studies"${sbObject("caseStudies")}>
      ${sectionHeading(caseStudies)}
      <div class="case-grid"${sbField(".items")}>
        ${(caseStudies.items || [])
          .map((item, index) => `
            <article class="case-card"${sbField(`.${index}`)}>
              <div${sbField(".image")}>${hasText(item.image) ? imageMarkup(item.image, item.title) : visualTileMarkup(item.industry || "Case", item.title)}</div>
              <div>
                <span${sbField(".industry")}>${escapeHtml(item.industry)}</span>
                <h3${sbField(".title")}>${escapeHtml(item.title)}</h3>
                <p${sbField(".summary")}>${escapeHtml(item.summary)}</p>
                <strong${sbField(".result")}>${escapeHtml(item.result)}</strong>
              </div>
            </article>
          `)
          .join("")}
      </div>
    </section>
  `;
}

function renderBlog(content) {
  if (!isEnabled(content, "blog")) return "";
  const blog = content.blog || {};
  return `
    <section class="section blog-section reveal" id="blog"${sbObject("blog")}>
      ${sectionHeading(blog)}
      <div class="blog-grid"${sbField(".items")}>
        ${(blog.items || [])
          .map((item, index) => `
            <article class="blog-card"${sbField(`.${index}`)}>
              <div${sbField(".image")}>${hasText(item.image) ? imageMarkup(item.image, item.title) : visualTileMarkup(item.category || "Insight", item.title)}</div>
              <div>
                <span${sbField(".category")}>${escapeHtml(item.category)}${hasText(item.date) ? ` • ${escapeHtml(item.date)}` : ""}</span>
                <h3${sbField(".title")}>${escapeHtml(item.title)}</h3>
                <p${sbField(".excerpt")}>${escapeHtml(item.excerpt)}</p>
                ${hasText(item.link) ? `<a href="${escapeHtml(item.link)}">Read more</a>` : ""}
              </div>
            </article>
          `)
          .join("")}
      </div>
    </section>
  `;
}

function renderFaq(content) {
  if (!isEnabled(content, "faq")) return "";
  const faq = content.faq || {};
  return `
    <section class="section faq-section reveal" id="faq"${sbObject("faq")}>
      ${sectionHeading(faq)}
      <div class="faq-list"${sbField(".items")}>
        ${(faq.items || [])
          .map((item, index) => `
            <details ${index === 0 ? "open" : ""}${sbField(`.${index}`)}>
              <summary${sbField(".question")}>${escapeHtml(item.question)}</summary>
              <p${sbField(".answer")}>${escapeHtml(item.answer)}</p>
            </details>
          `)
          .join("")}
      </div>
    </section>
  `;
}

function renderCustomSections(content) {
  if (!isEnabled(content, "customSections")) return "";
  return (content.customSections || [])
    .filter((section) => section.enabled)
    .map((section, index) => `
      <section class="section custom-section reveal"${sbObject(`customSections.${index}`)}>
        <div class="custom-layout">
          <div>
            ${sectionHeading(section)}
            <div class="custom-items"${sbField(".items")}>
              ${(section.items || [])
                .map((item, itemIndex) => `
                  <article${sbField(`.${itemIndex}`)}>
                    <h3${sbField(".title")}>${escapeHtml(item.title)}</h3>
                    <p${sbField(".text")}>${escapeHtml(item.text)}</p>
                  </article>
                `)
                .join("")}
            </div>
          </div>
          <div class="custom-media"${sbField(".image")}>
            ${videoMarkup(section.videoUrl, section.image, section.title) || imageMarkup(section.image, section.title)}
          </div>
        </div>
      </section>
    `)
    .join("");
}

function renderContact(content) {
  if (!isEnabled(content, "contact")) return "";
  const site = content.site || {};
  const services = content.services || {};
  const contact = content.contact || {};
  return `
    <section class="contact-section reveal" id="contact"${sbObject("contact")}>
      <div class="contact-card">
        <p class="eyebrow"${sbField(".eyebrow")}>${escapeHtml(contact.eyebrow)}</p>
        <h2${sbField(".title")}>${escapeHtml(contact.title)}</h2>
        <p${sbField(".copy")}>${escapeHtml(contact.copy)}</p>
        <div class="contact-links">
          <a href="mailto:${escapeHtml(site.email)}"${sbObject("site.email")}>${escapeHtml(site.email)}</a>
          <a href="${escapeHtml(site.domain)}">${escapeHtml(hostFromUrl(site.domain))}</a>
        </div>
      </div>
      <form class="contact-form" name="website-inquiry" method="POST" data-netlify="true" netlify-honeypot="bot-field" action="/thank-you.html" data-contact-form>
        <input type="hidden" name="form-name" value="website-inquiry" />
        <p class="hidden-field"><label>Do not fill this out: <input name="bot-field" /></label></p>
        <label><span>Name</span><input type="text" name="name" autocomplete="name" required /></label>
        <label><span>Email</span><input type="email" name="email" autocomplete="email" required /></label>
        <label><span>Phone / WhatsApp</span><input type="tel" name="phone" autocomplete="tel" required /></label>
        <label>
          <span>Service needed</span>
          <select name="service" required>
            <option value="">Select a service</option>
            ${(services.items || []).map((service) => `<option>${escapeHtml(service.title)}</option>`).join("")}
          </select>
        </label>
        <label><span>Message</span><textarea name="message" rows="5" required></textarea></label>
        <button class="button button-primary" type="submit"${sbField(".formButton")}>${escapeHtml(contact.formButton || "Send Inquiry")}</button>
        <p class="form-status" data-form-status aria-live="polite"></p>
      </form>
    </section>
  `;
}

function renderFooter(content) {
  const site = content.site || {};
  return `
    <footer class="site-footer"${sbObject("site")}>
      <div${sbField(".logo")}>${imageMarkup(site.logo, "AimAze Tech Solutions logo")}</div>
      <p${sbField(".footerText")}>© <span data-year></span> ${escapeHtml(site.footerText)}</p>
    </footer>
  `;
}

function renderSite(content) {
  window.AIMAZE_CONTACT_EMAIL = content.site?.email || "info@aimazetechsolutions.com";
  const page = currentPage();
  document.getElementById("site-root").innerHTML = `
    ${renderTop(content)}
    <main>${renderPageContent(content, page)}</main>
    ${renderFooter(content)}
  `;
  document.dispatchEvent(new Event("aimaze:rendered"));
}

function renderPageContent(content, page) {
  const layouts = {
    home: () => renderHomeSections(content),
    about: () => `
      ${renderPageHero(content, "about")}
      ${renderAbout(content)}
      ${renderStats(content)}
      ${renderProcess(content)}
      ${renderTestimonials(content)}
      ${renderCustomSections(content)}
      ${renderContact(content)}
    `,
    services: () => `
      ${renderPageHero(content, "services")}
      ${renderServices(content)}
      ${renderPlatform(content)}
      ${renderVideoSection(content)}
      ${renderFaq(content)}
      ${renderContact(content)}
    `,
    odoo: () => `
      ${renderPageHero(content, "odoo")}
      ${renderProblems(content)}
      ${renderPlatform(content)}
      ${renderProcess(content)}
      ${renderCaseStudies(content)}
      ${renderFaq(content)}
      ${renderContact(content)}
    `,
    industries: () => `
      ${renderPageHero(content, "industries")}
      ${renderIndustries(content)}
      ${renderCaseStudies(content)}
      ${renderTestimonials(content)}
      ${renderContact(content)}
    `,
    portfolio: () => `
      ${renderPageHero(content, "portfolio")}
      ${renderGallery(content)}
      ${renderCaseStudies(content)}
      ${renderTestimonials(content)}
      ${renderCustomSections(content)}
      ${renderContact(content)}
    `,
    blog: () => `
      ${renderPageHero(content, "blog")}
      ${renderBlog(content)}
      ${renderFaq(content)}
      ${renderContact(content)}
    `,
    contact: () => `
      ${renderPageHero(content, "contact")}
      ${renderContact(content)}
      ${renderFaq(content)}
    `,
  };

  return (layouts[page] || layouts.home)();
}

async function loadContent() {
  try {
    const response = await fetch("content.json", { cache: "no-store" });
    if (!response.ok) throw new Error("Could not load content.json");
    return { ...defaultContent, ...(await response.json()) };
  } catch {
    return defaultContent;
  }
}

loadContent().then((content) => {
  applyTheme(content);
  applyTypography(content);
  setMeta(content);
  renderSite(content);
});

window.addEventListener("stackbitObjectsChanged", () => {
  loadContent().then((content) => {
    applyTheme(content);
    applyTypography(content);
    setMeta(content);
    renderSite(content);
  });
});
