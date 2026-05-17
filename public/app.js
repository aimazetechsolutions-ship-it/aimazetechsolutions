const industries = {
  hospitality: {
    label: "Hospitality",
    subtitle: "Hotels, restaurants, cafes, catering, holiday homes, and booking-led businesses.",
    baseModules: ["POS", "Inventory", "Sales", "Purchase", "Accounting", "CRM", "Website", "HR", "Maintenance"],
    premiumModules: ["Appointment", "Helpdesk", "Custom Hospitality Dashboard"],
    questions: [
      ["pos", "Do you use POS for restaurant, cafe, front desk, or outlet sales?", "POS"],
      ["bookings", "Do you track rooms, tables, reservations, or holiday home bookings in one system?", "Appointment"],
      ["inventory", "Do you track kitchen stock, minibar items, supplies, and wastage daily?", "Inventory"],
      ["suppliers", "Do you manage supplier purchases and approvals digitally?", "Purchase"],
      ["profit", "Do you calculate daily revenue, food cost, and gross profit accurately?", "Accounting"],
      ["crm", "Do you keep guest profiles, repeat customers, and loyalty follow-ups?", "CRM"],
      ["hr", "Do you manage staff attendance, shifts, payroll, or service teams?", "HR"],
      ["maintenance", "Do you track equipment, room, vehicle, or facility maintenance?", "Maintenance"],
      ["piPayments", "Do you want to accept Pi payments for booking, dining, or services?", "Pi Payment Integration"]
    ]
  },
  travel: {
    label: "Travel Agency",
    subtitle: "Tour operators, ticketing agencies, visa support, Umrah groups, and travel consultants.",
    baseModules: ["CRM", "Sales", "Accounting", "Website", "Email Marketing", "Helpdesk"],
    premiumModules: ["Approvals", "Documents", "Custom Travel Dashboard"],
    questions: [
      ["leads", "Do you track leads from WhatsApp, calls, website, and social media in one CRM?", "CRM"],
      ["packages", "Do you manage tour packages, visa services, tickets, and hotel bookings with pricing?", "Sales"],
      ["followups", "Do you automate quotation follow-ups and abandoned inquiries?", "CRM"],
      ["documents", "Do you manage customer passports, visas, tickets, and invoices safely?", "Documents"],
      ["supplier", "Do you track supplier payments for airlines, hotels, transport, and agents?", "Purchase"],
      ["profit", "Do you know profit per booking, package, agent, and destination?", "Accounting"],
      ["support", "Do you handle complaints, changes, refunds, and travel support tickets?", "Helpdesk"],
      ["piPayments", "Do you want to accept Pi payments for travel deposits or services?", "Pi Payment Integration"]
    ]
  },
  realEstate: {
    label: "Real Estate",
    subtitle: "Brokerages, property managers, developers, holiday rentals, and agency teams.",
    baseModules: ["CRM", "Sales", "Accounting", "Website", "Documents", "Email Marketing"],
    premiumModules: ["Rental Management", "Approvals", "Custom Property Dashboard"],
    questions: [
      ["pipeline", "Do you track buyer, seller, tenant, and landlord leads in one CRM pipeline?", "CRM"],
      ["properties", "Do you manage property listings, availability, prices, and documents digitally?", "Website"],
      ["agents", "Do you measure agent activities, viewings, deals, and commissions?", "Sales"],
      ["contracts", "Do you create offers, tenancy contracts, MOUs, and invoices from templates?", "Documents"],
      ["rentals", "Do you track rent collection, renewals, maintenance requests, and deposits?", "Rental Management"],
      ["marketing", "Do you capture leads from website forms, portals, and campaigns?", "Marketing Automation"],
      ["accounting", "Do you track commission revenue, expenses, and property-level profit?", "Accounting"],
      ["piPayments", "Do you want Pi payment support for booking fees or service charges?", "Pi Payment Integration"]
    ]
  },
  retail: {
    label: "Retail",
    subtitle: "Shops, outlets, supermarkets, boutiques, electronics, pharmacies, and franchises.",
    baseModules: ["POS", "Inventory", "Sales", "Purchase", "Accounting", "CRM"],
    premiumModules: ["Barcode", "Loyalty", "Multi-Branch Dashboard"],
    questions: [
      ["pos", "Do you use POS with receipts, returns, discounts, and cashier control?", "POS"],
      ["stock", "Do you know live stock by item, branch, warehouse, and expiry date?", "Inventory"],
      ["purchasing", "Do you reorder products based on minimum stock and supplier history?", "Purchase"],
      ["barcode", "Do you use barcode scanning, variants, batches, or serial numbers?", "Barcode"],
      ["loyalty", "Do you track customer purchase history, loyalty, and repeat sales?", "CRM"],
      ["accounting", "Do you reconcile cash, card, bank, expenses, and profit daily?", "Accounting"],
      ["branches", "Do you manage more than one counter, outlet, branch, or warehouse?", "Multi-Company"],
      ["piPayments", "Do you want Pi payments at checkout?", "Pi Payment Integration"]
    ]
  },
  ecommerce: {
    label: "E-commerce",
    subtitle: "Online stores, marketplaces, D2C brands, dropshipping, and social commerce sellers.",
    baseModules: ["Website", "eCommerce", "Inventory", "Sales", "Purchase", "Accounting", "CRM"],
    premiumModules: ["Marketing Automation", "Helpdesk", "Shipping Integrations"],
    questions: [
      ["store", "Do you have a structured online store with product pages, carts, and checkout?", "eCommerce"],
      ["inventory", "Does your stock update automatically after online and offline sales?", "Inventory"],
      ["orders", "Do you manage orders, packing, shipping, delivery status, and returns centrally?", "Sales"],
      ["marketing", "Do you recover abandoned carts and run segmented customer campaigns?", "Marketing Automation"],
      ["support", "Do you manage customer support, refunds, and complaints with tickets?", "Helpdesk"],
      ["accounting", "Do you track payment gateway fees, COD, refunds, and profit by channel?", "Accounting"],
      ["analytics", "Do you know your best products, channels, conversion rate, and margins?", "Dashboard"],
      ["piPayments", "Do you want Pi payment acceptance in your online checkout?", "Pi Payment Integration"]
    ]
  },
  trading: {
    label: "Trading Company",
    subtitle: "Import, export, wholesale, distribution, procurement, and B2B supply businesses.",
    baseModules: ["Sales", "Purchase", "Inventory", "Accounting", "CRM", "Documents"],
    premiumModules: ["Approvals", "Landed Cost", "Custom Trading Dashboard"],
    questions: [
      ["quotations", "Do you create quotations, proforma invoices, sales orders, and invoices digitally?", "Sales"],
      ["purchase", "Do you manage purchase orders, supplier pricing, lead time, and approvals?", "Purchase"],
      ["inventory", "Do you track stock, warehouses, lots, serial numbers, and expiry where needed?", "Inventory"],
      ["landedCost", "Do you calculate shipping, duty, clearing, and landed cost accurately?", "Landed Cost"],
      ["receivables", "Do you track customer credit limits, receivables, aging, and collections?", "Accounting"],
      ["crm", "Do you track B2B leads, repeat buyers, and account manager follow-ups?", "CRM"],
      ["documents", "Do you keep import/export documents, certificates, and delivery notes organized?", "Documents"],
      ["piPayments", "Do you want Pi payment support for deposits or B2B orders?", "Pi Payment Integration"]
    ]
  },
  services: {
    label: "Services or Startup",
    subtitle: "Consultancies, agencies, repair services, freelancers, IT companies, and new ventures.",
    baseModules: ["CRM", "Sales", "Project", "Accounting", "Website", "Helpdesk"],
    premiumModules: ["Timesheets", "Subscription", "Automation Studio"],
    questions: [
      ["leads", "Do you track all leads, opportunities, proposals, and follow-ups in one CRM?", "CRM"],
      ["projects", "Do you manage tasks, delivery milestones, owners, and deadlines?", "Project"],
      ["billing", "Do you invoice by project, milestone, retainer, or subscription accurately?", "Accounting"],
      ["support", "Do you manage client requests, tickets, and service history?", "Helpdesk"],
      ["website", "Do you collect leads through a professional website and landing pages?", "Website"],
      ["automation", "Do you automate repetitive admin work, reminders, and client updates?", "Automation Studio"],
      ["analytics", "Do you know profit by client, service, project, and team member?", "Dashboard"],
      ["piPayments", "Do you want Pi payment support for service packages?", "Pi Payment Integration"]
    ]
  },
  other: {
    label: "Other Business",
    subtitle: "Tell us your business type, then answer a general ERP and automation diagnostic.",
    baseModules: ["CRM", "Sales", "Accounting", "Website", "Inventory", "Automation Studio"],
    premiumModules: ["Custom Dashboard", "AI Chatbot", "Pi Payment Integration"],
    questions: [
      ["leads", "Do you track leads, customers, and follow-ups in one place?", "CRM"],
      ["sales", "Do you manage quotations, orders, invoices, and payment status digitally?", "Sales"],
      ["operations", "Do you track daily operations, tasks, approvals, and responsibilities?", "Project"],
      ["inventory", "Do you track stock, supplies, equipment, or service resources accurately?", "Inventory"],
      ["accounting", "Do you know your revenue, expenses, receivables, and profit clearly?", "Accounting"],
      ["website", "Do you have a website or online channel that captures customer inquiries?", "Website"],
      ["automation", "Do you want to automate repetitive admin work and customer updates?", "Automation Studio"],
      ["piPayments", "Do you want Pi payment support for your business?", "Pi Payment Integration"]
    ]
  }
};

const goals = [
  "Odoo ERP",
  "AI chatbot",
  "Website development",
  "Business automation",
  "Hospitality systems",
  "Pi payment integration"
];

const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "Costa Rica",
  "Cote d'Ivoire",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czechia",
  "Democratic Republic of the Congo",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates (UAE)",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe"
];

let currentAuth = null;
let latestReport = null;
let config = {
  paymentAmount: 1,
  whatsappNumber: "",
  contactEmail: "info@aimazetechsolutions.com",
  websiteUrl: "https://www.aimazetechsolutions.com",
  consultationEmailEnabled: false,
  activityCounts: {
    customerCount: 286,
    consultationCount: 94,
    countryCount: 197
  },
  piConfigured: false
};

const qs = selector => document.querySelector(selector);
const qsa = selector => [...document.querySelectorAll(selector)];

function safeId(text) {
  return text.replace(/[^a-z0-9]/gi, "-").toLowerCase();
}

async function loadConfig() {
  try {
    const response = await fetch("/api/config");
    config = await response.json();
  } catch {
    config = { ...config };
  }
  renderActivityCounts(config.activityCounts);
}

function populateBusinessTypes() {
  const select = qs("#business-type");
  select.innerHTML = Object.entries(industries)
    .map(([value, item]) => `<option value="${value}">${item.label}</option>`)
    .join("");
}

function renderQuestions(type) {
  const industry = industries[type];
  toggleOtherBusinessField(type);
  qs("#questionnaire-subtitle").textContent = industry.subtitle;
  qs("#question-list").innerHTML = industry.questions.map(([key, text]) => {
    const name = `q_${key}`;
    return `
      <article class="question-card">
        <p>${text}</p>
        <div class="segmented" role="radiogroup" aria-label="${text}">
          ${[
            ["yes", "Yes"],
            ["partial", "Partial"],
            ["no", "No"]
          ].map(([value, label]) => `
            <label>
              <input type="radio" name="${name}" value="${value}" ${value === "partial" ? "checked" : ""}>
              <span>${label}</span>
            </label>
          `).join("")}
        </div>
      </article>
    `;
  }).join("");
}

function toggleOtherBusinessField(type) {
  const field = qs("#other-business-field");
  const input = qs("#other-business-type");
  const isOther = type === "other";
  field.classList.toggle("hidden", !isOther);
  input.required = isOther;
  if (!isOther) input.value = "";
}

function renderGoals() {
  qs("#goal-list").innerHTML = goals.map(goal => {
    const id = `goal-${safeId(goal)}`;
    return `
      <label for="${id}">
        <input id="${id}" type="checkbox" name="goals" value="${goal}">
        <span>${goal}</span>
      </label>
    `;
  }).join("");
}

function renderCountries() {
  qs("#country-options").innerHTML = countries
    .map(country => `<option value="${country}"></option>`)
    .join("");
}

function formatCount(value, suffix = "") {
  const number = Number(value || 0);
  return `${number.toLocaleString()}${suffix}`;
}

function renderActivityCounts(counts = {}) {
  const customerCount = counts.customerCount ?? config.activityCounts.customerCount;
  const consultationCount = counts.consultationCount ?? config.activityCounts.consultationCount;
  const countryCount = counts.countryCount ?? config.activityCounts.countryCount;
  qs("#customer-count").textContent = formatCount(customerCount, "+");
  qs("#consultation-count").textContent = formatCount(consultationCount, "+");
  qs("#country-count").textContent = formatCount(countryCount);
}

function getFormData(form) {
  const data = Object.fromEntries(new FormData(form).entries());
  data.goals = qsa("input[name='goals']:checked").map(input => input.value);
  data.answers = {};

  const selectedIndustry = industries[data.businessType];
  selectedIndustry.questions.forEach(([key]) => {
    data.answers[key] = new FormData(form).get(`q_${key}`) || "partial";
  });

  if (currentAuth?.user) {
    data.piUser = currentAuth.user;
  }

  return data;
}

function scoreAnswer(value) {
  if (value === "yes") return 1;
  if (value === "partial") return 0.5;
  return 0;
}

function buildReport(data) {
  const industry = industries[data.businessType];
  const industryLabel = data.businessType === "other" && data.otherBusinessType
    ? data.otherBusinessType.trim()
    : industry.label;
  const answerValues = Object.values(data.answers);
  const total = answerValues.reduce((sum, value) => sum + scoreAnswer(value), 0);
  const ratio = total / answerValues.length;
  const healthScore = Math.round(38 + ratio * 54);
  const erpScore = Math.round(30 + ratio * 62);

  const missing = industry.questions
    .filter(([key]) => data.answers[key] !== "yes")
    .map(([, text, module]) => ({ text, module }));

  const modules = new Set(industry.baseModules);
  missing.forEach(item => modules.add(item.module));
  data.goals.forEach(goal => {
    if (goal === "AI chatbot") modules.add("AI Chatbot");
    if (goal === "Website development") modules.add("Website");
    if (goal === "Business automation") modules.add("Automation Studio");
    if (goal === "Pi payment integration") modules.add("Pi Payment Integration");
    if (goal === "Hospitality systems") {
      modules.add("POS");
      modules.add("Custom Hospitality Dashboard");
    }
  });

  const weaknessList = missing.slice(0, 5).map(item => {
    const cleaned = item.text.replace(/^Do you /, "").replace(/\?$/, "");
    return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  });

  if (weaknessList.length === 0) {
    weaknessList.push("Your operation is mature. Next step is integration, analytics, and automation.");
  }

  const savingsMap = {
    "Solo or micro team": "USD 200-600",
    "2-10 staff": "USD 500-1,500",
    "11-50 staff": "USD 1,500-5,000",
    "51+ staff": "USD 5,000+"
  };

  const roadmap = [
    `First 30 days: map ${industryLabel.toLowerCase()} workflows, clean master data, and launch CRM/sales/accounting basics.`,
    "Next 60 days: connect inventory, purchasing, website/POS, dashboards, and approval rules.",
    "Next 90 days: add automation, AI chatbot, Pi payment flow, performance reporting, and staff training."
  ];

  return {
    industry: industryLabel,
    healthScore,
    erpScore,
    weaknesses: weaknessList,
    modules: [...modules],
    savings: `${savingsMap[data.businessSize] || "USD 500-1,500"} estimated monthly value from fewer manual errors, faster follow-ups, better stock control, and cleaner reporting.`,
    roadmap,
    data
  };
}

function renderReport(report) {
  latestReport = report;
  qs("#report-empty").classList.add("hidden");
  qs("#report-content").classList.remove("hidden");
  qs("#report-title").textContent = `${report.industry} ERP readiness report`;
  qs("#health-score").textContent = `${report.healthScore}%`;
  qs("#erp-score").textContent = `${report.erpScore}%`;
  qs("#weakness-list").innerHTML = report.weaknesses.map(item => `<li>${item}</li>`).join("");
  qs("#module-list").innerHTML = report.modules.map(module => `<span>${module}</span>`).join("");
  qs("#savings-copy").textContent = report.savings;
  qs("#roadmap-list").innerHTML = report.roadmap.map(item => `<li>${item}</li>`).join("");

  const message = encodeURIComponent(
    `Hello AimAze, I generated my PiBiz AI report for ${report.industry}. I want a free ERP consultation.\n\nName: ${report.data.name}\nBusiness: ${report.data.businessName}\nBusiness Type: ${report.industry}\nWhatsApp: ${report.data.whatsapp}\nEmail: ${report.data.email}\nWebsite: ${config.websiteUrl || "https://www.aimazetechsolutions.com"}`
  );
  const number = config.whatsappNumber || "";
  qs("#fallback-contact-link").href = number
    ? `https://wa.me/${number}?text=${message}`
    : `mailto:${config.contactEmail || "info@aimazetechsolutions.com"}?subject=PiBiz AI consultation&body=${message}`;
  qs("#fallback-contact-link").textContent = number ? "Open WhatsApp Backup" : "Open Email Backup";
  qs("#fallback-contact-link").classList.add("hidden");
  setConsultationStatus("");
}

async function saveReport(report) {
  try {
    const response = await fetch("/api/reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(report)
    });
    const result = await response.json();
    latestReport.reportId = result.reportId;
    if (result.activityCounts) renderActivityCounts(result.activityCounts);
  } catch {
    latestReport.reportId = `local-${Date.now()}`;
  }
}

async function saveLead(report) {
  try {
    await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reportId: report.reportId,
        industry: report.industry,
        healthScore: report.healthScore,
        erpScore: report.erpScore,
        modules: report.modules,
        profile: report.data,
        source: "PiBiz AI web app"
      })
    });
  } catch {
    // The visible report still works if local lead storage is unavailable.
  }
}

function setConsultationStatus(message) {
  const status = qs("#consultation-status");
  if (!message) {
    status.textContent = "";
    status.classList.add("hidden");
    return;
  }
  status.textContent = message;
  status.classList.remove("hidden");
}

async function requestConsultation() {
  if (!latestReport) {
    setConsultationStatus("Generate a free report first.");
    return;
  }

  setConsultationStatus("Submitting your consultation request to AimAze...");
  try {
    const response = await fetch("/api/consultations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reportId: latestReport.reportId,
        industry: latestReport.industry,
        healthScore: latestReport.healthScore,
        erpScore: latestReport.erpScore,
        modules: latestReport.modules,
        profile: latestReport.data,
        source: "PiBiz AI consultation button"
      })
    });
    const result = await response.json();
    if (!result.ok) throw new Error(result.error || "Consultation request failed");

    if (result.emailSent) {
      setConsultationStatus("Consultation request sent to AimAze email. We will contact you soon.");
      qs("#fallback-contact-link").classList.add("hidden");
    } else {
      setConsultationStatus("Consultation request saved in the app. Email sending will activate after AimAze adds the server email API key.");
      qs("#fallback-contact-link").classList.remove("hidden");
    }
    if (result.activityCounts) renderActivityCounts(result.activityCounts);
  } catch (error) {
    setConsultationStatus(error.message || "Could not submit consultation request. Please use the backup contact option.");
    qs("#fallback-contact-link").classList.remove("hidden");
  }
}

async function authenticatePi() {
  const authTitle = qs("#auth-title");
  const authCopy = qs("#auth-copy");
  const statusDot = qs(".status-dot");

  if (!window.Pi) {
    authTitle.textContent = "Pi SDK not available";
    authCopy.textContent = "Open this app inside Pi Browser after hosting it.";
    return;
  }

  try {
    currentAuth = await window.Pi.authenticate(["username", "payments"], onIncompletePaymentFound);
    authTitle.textContent = `Signed in as ${currentAuth.user.username}`;
    authCopy.textContent = "Pi identity connected. Payments can be requested in Pi Browser.";
    statusDot.classList.add("is-connected");
  } catch (error) {
    authTitle.textContent = "Pi login was not completed";
    authCopy.textContent = error?.message || "Please try again inside Pi Browser.";
  }
}

function onIncompletePaymentFound(payment) {
  setPaymentStatus(`Incomplete Pi payment found: ${payment.identifier || payment.paymentId || "unknown"}. Please complete or cancel it in Pi Wallet.`);
}

function setPaymentStatus(message) {
  const status = qs("#payment-status");
  status.textContent = message;
  status.classList.remove("hidden");
}

async function postPayment(endpoint, payload) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  const result = await response.json();
  if (!result.ok) throw new Error(result.error || "Payment server callback failed");
  return result;
}

async function unlockPremiumReport() {
  if (!latestReport) {
    setPaymentStatus("Generate a free report first.");
    return;
  }

  if (!window.Pi) {
    setPaymentStatus("Pi SDK is not available in local browser preview. Host this app and open it in Pi Browser to test payment.");
    return;
  }

  if (!currentAuth) {
    await authenticatePi();
    if (!currentAuth) return;
  }

  setPaymentStatus("Opening Pi Wallet payment request...");

  window.Pi.createPayment({
    amount: Number(config.paymentAmount || 1),
    memo: "Premium PiBiz AI ERP report by AimAze",
    metadata: {
      reportId: latestReport.reportId || "pending",
      businessType: latestReport.industry
    }
  }, {
    onReadyForServerApproval: async paymentId => {
      setPaymentStatus("Approving payment on AimAze server...");
      await postPayment("/api/pi/payments/approve", { paymentId, reportId: latestReport.reportId });
    },
    onReadyForServerCompletion: async (paymentId, txid) => {
      setPaymentStatus("Completing payment and unlocking premium report...");
      await postPayment("/api/pi/payments/complete", { paymentId, txid, reportId: latestReport.reportId });
      setPaymentStatus("Premium report unlocked. AimAze can now deliver detailed 30/60/90 implementation planning.");
    },
    onCancel: paymentId => {
      setPaymentStatus(`Payment cancelled${paymentId ? `: ${paymentId}` : ""}.`);
    },
    onError: error => {
      setPaymentStatus(error?.message || "Pi payment failed. Please try again.");
    }
  });
}

function bindEvents() {
  qs("#business-type").addEventListener("change", event => renderQuestions(event.target.value));
  qs("#pi-login").addEventListener("click", authenticatePi);
  qs("#consultation-button").addEventListener("click", requestConsultation);
  qs("#premium-button").addEventListener("click", unlockPremiumReport);
  qs("#reset-button").addEventListener("click", () => {
    qs("#diagnostic-form").reset();
    renderQuestions(qs("#business-type").value);
    qs("#report-empty").classList.remove("hidden");
    qs("#report-content").classList.add("hidden");
    qs("#report-title").textContent = "Your ERP report will appear here.";
  });

  qs("#diagnostic-form").addEventListener("submit", async event => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    const data = getFormData(event.currentTarget);
    const report = buildReport(data);
    renderReport(report);
    await saveReport(report);
    await saveLead(report);
  });
}

async function boot() {
  await loadConfig();
  populateBusinessTypes();
  renderCountries();
  renderQuestions("hospitality");
  renderGoals();
  bindEvents();
}

boot();
