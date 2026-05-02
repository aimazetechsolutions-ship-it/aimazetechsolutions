function initAimazeInteractions() {
  const navToggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");
  const header = document.querySelector("[data-header]");
  const year = document.querySelector("[data-year]");
  const contactForm = document.querySelector("[data-contact-form]");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });

    nav.addEventListener("click", (event) => {
      if (event.target.matches("a")) {
        nav.classList.remove("is-open");
        navToggle.setAttribute("aria-label", "Open navigation");
      }
    });
  }

  if (header) {
    const updateHeaderShadow = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    };

    updateHeaderShadow();
    window.addEventListener("scroll", updateHeaderShadow, { passive: true });
  }

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const recipient = window.AIMAZE_CONTACT_EMAIL || "hello@aimazetechsolutions.com";
      const formData = new FormData(contactForm);
      const name = formData.get("name");
      const email = formData.get("email");
      const service = formData.get("service");
      const message = formData.get("message");

      const subject = encodeURIComponent(`Website inquiry: ${service}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nService needed: ${service}\n\nMessage:\n${message}`
      );

      window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    });
  }

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealItems.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }
}

if (document.querySelector("[data-header]")) {
  initAimazeInteractions();
} else {
  document.addEventListener("aimaze:rendered", initAimazeInteractions);
}
