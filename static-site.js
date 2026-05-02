const defaultContent = {
  site: {
    title: "AimAze Tech Solutions",
    description: "AimAze Tech Solutions provides Odoo ERP implementation and technology solutions.",
    domain: "https://aimazetechsolutions.com",
    logo: "assets/aimaze-logo-transparent.png",
    ogImage: "assets/aimaze-coverpage.png",
    email: "hello@aimazetechsolutions.com",
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
  sections: {},
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

function imageMarkup(src, alt = "", className = "") {
  if (!hasText(src)) return "";
  return `<img${className ? ` class="${escapeHtml(className)}"` : ""} src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" />`;
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

function sectionHeading(section) {
  return `
    <div class="section-heading">
      ${hasText(section.eyebrow) ? `<p class="eyebrow">${escapeHtml(section.eyebrow)}</p>` : ""}
      ${hasText(section.title) ? `<h2>${escapeHtml(section.title)}</h2>` : ""}
      ${hasText(section.copy) ? `<p>${escapeHtml(section.copy)}</p>` : ""}
    </div>
  `;
}

function renderTop(content) {
  const site = content.site || {};
  const topStrip = content.topStrip || {};
  const page = currentPage();
  return `
    <div class="top-strip">
      <p>${escapeHtml(topStrip.text)}</p>
      <a href="${escapeHtml(topStrip.linkHref || "#contact")}">${escapeHtml(topStrip.linkText)}</a>
    </div>

    <header class="site-header" data-header>
      <a class="brand" href="#home" aria-label="AimAze Tech Solutions home">
        ${imageMarkup(site.logo, "AimAze Tech Solutions logo")}
      </a>
      <button class="nav-toggle" type="button" aria-label="Open navigation" data-nav-toggle>
        <span></span><span></span><span></span>
      </button>
      <nav class="site-nav" data-nav>
        ${(content.navigation || [])
          .map((item) => `<a class="${navIsActive(item.href, page) ? "is-active" : ""}" href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a>`)
          .join("")}
        <a class="nav-cta ${page === "contact" ? "is-active" : ""}" href="contact.html">Contact Us</a>
      </nav>
    </header>
  `;
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
    <section class="page-hero reveal">
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
        ${imageMarkup(hero.image || content.site?.ogImage, hero.imageAlt || meta.title)}
      </div>
    </section>
  `;
}

function renderHero(content) {
  const hero = content.hero || {};
  return `
    <section class="hero reveal" id="home">
      <div class="hero-shape hero-shape-one"></div>
      <div class="hero-shape hero-shape-two"></div>
      <div class="hero-inner">
        <div class="hero-content">
          <p class="eyebrow">${escapeHtml(hero.eyebrow)}</p>
          <h1>${escapeHtml(hero.title)}</h1>
          <p class="hero-copy">${escapeHtml(hero.copy)}</p>
          <div class="hero-points" aria-label="Key strengths">
            ${(hero.points || []).map((point) => `<span>${escapeHtml(point)}</span>`).join("")}
          </div>
          <div class="hero-actions">
            <a class="button button-primary" href="${escapeHtml(hero.primaryButton?.href || "#contact")}">${escapeHtml(hero.primaryButton?.label || "Contact Us")}</a>
            <a class="button button-secondary" href="${escapeHtml(hero.secondaryButton?.href || "#services")}">${escapeHtml(hero.secondaryButton?.label || "View Services")}</a>
          </div>
        </div>
        <div class="hero-card" aria-label="AimAze ERP capabilities">
          ${imageMarkup(hero.image, hero.imageAlt)}
          <div class="hero-card-panel">
            <strong>${escapeHtml(hero.cardTitle)}</strong>
            <span>${escapeHtml(hero.cardText)}</span>
          </div>
        </div>
      </div>
      ${(hero.gallery || []).length ? `
        <div class="hero-gallery">
          ${(hero.gallery || []).map((item) => imageMarkup(item.image, item.alt || hero.title)).join("")}
        </div>
      ` : ""}
      ${hasText(hero.videoUrl) ? `<div class="hero-video video-frame">${videoMarkup(hero.videoUrl, hero.image, hero.title)}</div>` : ""}
    </section>
  `;
}

function renderAbout(content) {
  if (!isEnabled(content, "about")) return "";
  const about = content.about || {};
  return `
    <section class="about-section reveal" id="about">
      <div class="section-heading align-left">
        <p class="eyebrow">${escapeHtml(about.eyebrow)}</p>
        <h2>${escapeHtml(about.title)}</h2>
      </div>
      <div class="about-copy">
        ${(about.paragraphs || []).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
      </div>
    </section>
  `;
}

function renderProblems(content) {
  if (!isEnabled(content, "problems")) return "";
  const problems = content.problems || {};
  return `
    <section class="section problem-section reveal">
      ${sectionHeading(problems)}
      <div class="problem-grid">
        ${(problems.items || [])
          .map((problem) => `
            <article>
              <span>${escapeHtml(problem.number)}</span>
              <h3>${escapeHtml(problem.title)}</h3>
              <p>${escapeHtml(problem.text)}</p>
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
    <section class="platform-section reveal" id="odoo">
      <div class="platform-copy">
        <p class="eyebrow">${escapeHtml(platform.eyebrow)}</p>
        <h2>${escapeHtml(platform.title)}</h2>
        <p>${escapeHtml(platform.copy)}</p>
        <ul class="check-list">
          ${(platform.bullets || []).map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join("")}
        </ul>
      </div>
      <div class="guide-panel">
        <p class="eyebrow">${escapeHtml(platform.guideEyebrow)}</p>
        <h3>${escapeHtml(platform.guideTitle)}</h3>
        <div class="guide-grid">
          ${(platform.guideItems || [])
            .map((item) => `
              <div>
                <strong>${escapeHtml(item.title)}</strong>
                <span>${escapeHtml(item.text)}</span>
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
    <section class="stats-section reveal" aria-label="AimAze service highlights">
      ${(content.stats || [])
        .map((stat) => `
          <div>
            <strong>${escapeHtml(stat.value)}</strong>
            <span>${escapeHtml(stat.label)}</span>
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
    <section class="section services-section reveal" id="services">
      ${sectionHeading(services)}
      <div class="service-grid">
        ${(services.items || [])
          .map((service) => `
            <article class="service-card">
              ${imageMarkup(service.image, service.title, "service-card-image")}
              <span class="service-icon">${escapeHtml(service.short)}</span>
              <h3>${escapeHtml(service.title)}</h3>
              <p>${escapeHtml(service.text)}</p>
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
    <section class="section industries-section reveal" id="industries">
      ${sectionHeading(industries)}
      <div class="industry-grid">
        ${(industries.items || []).map((industry) => `<span>${escapeHtml(industry)}</span>`).join("")}
      </div>
    </section>
  `;
}

function renderProcess(content) {
  if (!isEnabled(content, "process")) return "";
  const process = content.process || {};
  return `
    <section class="section process-section reveal">
      <div class="section-heading align-left">
        <p class="eyebrow">${escapeHtml(process.eyebrow)}</p>
        <h2>${escapeHtml(process.title)}</h2>
      </div>
      <div class="timeline">
        ${(process.items || [])
          .map((step) => `
            <article>
              <span>${escapeHtml(step.title)}</span>
              <p>${escapeHtml(step.text)}</p>
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
    <section class="section gallery-section reveal" id="gallery">
      ${sectionHeading(gallery)}
      <div class="gallery-grid">
        ${(gallery.items || [])
          .map((item) => `
            <article class="media-card">
              ${imageMarkup(item.image, item.alt || item.title)}
              <div>
                <h3>${escapeHtml(item.title)}</h3>
                <p>${escapeHtml(item.text)}</p>
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
    <section class="section testimonials-section reveal" id="testimonials">
      ${sectionHeading(testimonials)}
      <div class="testimonial-grid">
        ${(testimonials.items || [])
          .map((item) => `
            <article class="testimonial-card">
              ${imageMarkup(item.image, item.name, "avatar")}
              <p>${escapeHtml(item.quote)}</p>
              <strong>${escapeHtml(item.name)}</strong>
              <span>${escapeHtml(item.role)}</span>
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
    <section class="section case-section reveal" id="case-studies">
      ${sectionHeading(caseStudies)}
      <div class="case-grid">
        ${(caseStudies.items || [])
          .map((item) => `
            <article class="case-card">
              ${imageMarkup(item.image, item.title)}
              <div>
                <span>${escapeHtml(item.industry)}</span>
                <h3>${escapeHtml(item.title)}</h3>
                <p>${escapeHtml(item.summary)}</p>
                <strong>${escapeHtml(item.result)}</strong>
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
    <section class="section blog-section reveal" id="blog">
      ${sectionHeading(blog)}
      <div class="blog-grid">
        ${(blog.items || [])
          .map((item) => `
            <article class="blog-card">
              ${imageMarkup(item.image, item.title)}
              <div>
                <span>${escapeHtml(item.category)}${hasText(item.date) ? ` • ${escapeHtml(item.date)}` : ""}</span>
                <h3>${escapeHtml(item.title)}</h3>
                <p>${escapeHtml(item.excerpt)}</p>
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
    <section class="section faq-section reveal" id="faq">
      ${sectionHeading(faq)}
      <div class="faq-list">
        ${(faq.items || [])
          .map((item, index) => `
            <details ${index === 0 ? "open" : ""}>
              <summary>${escapeHtml(item.question)}</summary>
              <p>${escapeHtml(item.answer)}</p>
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
    .map((section) => `
      <section class="section custom-section reveal">
        <div class="custom-layout">
          <div>
            ${sectionHeading(section)}
            <div class="custom-items">
              ${(section.items || [])
                .map((item) => `
                  <article>
                    <h3>${escapeHtml(item.title)}</h3>
                    <p>${escapeHtml(item.text)}</p>
                  </article>
                `)
                .join("")}
            </div>
          </div>
          <div class="custom-media">
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
    <section class="contact-section reveal" id="contact">
      <div class="contact-card">
        <p class="eyebrow">${escapeHtml(contact.eyebrow)}</p>
        <h2>${escapeHtml(contact.title)}</h2>
        <p>${escapeHtml(contact.copy)}</p>
        <div class="contact-links">
          <a href="mailto:${escapeHtml(site.email)}">${escapeHtml(site.email)}</a>
          <a href="${escapeHtml(site.domain)}">${escapeHtml(hostFromUrl(site.domain))}</a>
        </div>
      </div>
      <form class="contact-form" data-contact-form>
        <label><span>Name</span><input type="text" name="name" autocomplete="name" required /></label>
        <label><span>Email</span><input type="email" name="email" autocomplete="email" required /></label>
        <label>
          <span>Service needed</span>
          <select name="service" required>
            <option value="">Select a service</option>
            ${(services.items || []).map((service) => `<option>${escapeHtml(service.title)}</option>`).join("")}
          </select>
        </label>
        <label><span>Message</span><textarea name="message" rows="5" required></textarea></label>
        <button class="button button-primary" type="submit">${escapeHtml(contact.formButton || "Send Inquiry")}</button>
      </form>
    </section>
  `;
}

function renderFooter(content) {
  const site = content.site || {};
  return `
    <footer class="site-footer">
      ${imageMarkup(site.logo, "AimAze Tech Solutions logo")}
      <p>© <span data-year></span> ${escapeHtml(site.footerText)}</p>
    </footer>
  `;
}

function renderSite(content) {
  window.AIMAZE_CONTACT_EMAIL = content.site?.email || "hello@aimazetechsolutions.com";
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
    home: () => `
      ${renderHero(content)}
      ${renderAbout(content)}
      ${renderProblems(content)}
      ${renderPlatform(content)}
      ${renderStats(content)}
      ${renderServices(content)}
      ${renderIndustries(content)}
      ${renderGallery(content)}
      ${renderTestimonials(content)}
      ${renderCaseStudies(content)}
      ${renderFaq(content)}
      ${renderContact(content)}
    `,
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
  setMeta(content);
  renderSite(content);
});
