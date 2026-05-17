const PI_API_BASE = "https://api.minepi.com/v2";

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });
}

async function readBody(request) {
  if (!request.body) return {};
  return request.json();
}

function hasRequiredContact(payload) {
  const profile = payload.profile || payload.data || payload;
  return Boolean(
    String(profile.name || "").trim() &&
    String(profile.businessName || "").trim() &&
    String(profile.whatsapp || "").trim() &&
    String(profile.email || "").trim()
  );
}

async function readList(env, key) {
  if (!env.PIBIZ_DATA) return [];
  const value = await env.PIBIZ_DATA.get(key);
  return value ? JSON.parse(value) : [];
}

async function writeList(env, key, value) {
  if (!env.PIBIZ_DATA) {
    throw new Error("PIBIZ_DATA KV binding is missing.");
  }
  await env.PIBIZ_DATA.put(key, JSON.stringify(value, null, 2));
}

async function saveRecord(env, key, payload) {
  const records = await readList(env, key);
  const record = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...payload
  };
  records.unshift(record);
  await writeList(env, key, records);
  return record;
}

async function getActivityCounts(env) {
  const initialCustomerCount = Number(env.INITIAL_CUSTOMER_COUNT || 286);
  const initialConsultationCount = Number(env.INITIAL_CONSULTATION_COUNT || 94);
  const reports = await readList(env, "reports");
  const consultations = await readList(env, "consultations");
  return {
    customerCount: initialCustomerCount + reports.length,
    consultationCount: initialConsultationCount + consultations.length,
    countryCount: 197
  };
}

function consultationEmailHtml(record) {
  const profile = record.profile || {};
  return `
    <h2>New PiBiz AI Consultation Request</h2>
    <p><strong>Name:</strong> ${profile.name || ""}</p>
    <p><strong>Business:</strong> ${profile.businessName || ""}</p>
    <p><strong>Business type:</strong> ${record.industry || profile.businessType || ""}</p>
    <p><strong>Country:</strong> ${profile.country || ""}</p>
    <p><strong>WhatsApp:</strong> ${profile.whatsapp || ""}</p>
    <p><strong>Email:</strong> ${profile.email || ""}</p>
    <p><strong>Business health:</strong> ${record.healthScore || ""}%</p>
    <p><strong>ERP readiness:</strong> ${record.erpScore || ""}%</p>
    <p><strong>Recommended modules:</strong> ${(record.modules || []).join(", ")}</p>
    <p><strong>Source:</strong> PiBiz AI by AimAze</p>
  `;
}

async function sendConsultationEmail(env, record) {
  if (!env.RESEND_API_KEY) {
    return {
      sent: false,
      reason: "RESEND_API_KEY is not configured. Request was saved on Cloudflare KV."
    };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: env.EMAIL_FROM || "PiBiz AI <onboarding@resend.dev>",
      to: env.CONTACT_EMAIL || "info@aimazetechsolutions.com",
      reply_to: record.profile?.email || undefined,
      subject: `New PiBiz AI consultation - ${record.profile?.businessName || record.industry || "Business lead"}`,
      html: consultationEmailHtml(record)
    })
  });

  const text = await response.text();
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { raw: text };
  }

  if (!response.ok) {
    return {
      sent: false,
      reason: `Email provider returned ${response.status}`,
      details: data
    };
  }

  return { sent: true, provider: "resend", data };
}

async function piPost(env, endpoint, payload) {
  if (!env.PI_API_KEY) {
    return {
      mock: true,
      ok: true,
      message: "PI_API_KEY is not set. Payment callback accepted in Cloudflare mock mode."
    };
  }

  const response = await fetch(`${PI_API_BASE}${endpoint}`, {
    method: "POST",
    headers: {
      "Authorization": `Key ${env.PI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload || {})
  });

  const text = await response.text();
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { raw: text };
  }

  if (!response.ok) {
    throw new Error(`Pi API returned ${response.status}: ${JSON.stringify(data)}`);
  }

  return data;
}

function requireAdmin(request, env) {
  return Boolean(env.ADMIN_TOKEN && request.headers.get("x-admin-token") === env.ADMIN_TOKEN);
}

export async function onRequest({ request, env }) {
  const url = new URL(request.url);
  const path = url.pathname.replace(/^\/api\/?/, "");
  const method = request.method.toUpperCase();

  try {
    if (method === "GET" && path === "config") {
      return json({
        paymentAmount: Number(env.PI_PAYMENT_AMOUNT || 1),
        whatsappNumber: env.WHATSAPP_NUMBER || "",
        contactEmail: env.CONTACT_EMAIL || "info@aimazetechsolutions.com",
        websiteUrl: env.WEBSITE_URL || "https://www.aimazetechsolutions.com",
        consultationEmailEnabled: Boolean(env.RESEND_API_KEY),
        activityCounts: await getActivityCounts(env),
        piConfigured: Boolean(env.PI_API_KEY)
      });
    }

    if (method === "POST" && path === "reports") {
      const payload = await readBody(request);
      const record = await saveRecord(env, "reports", payload);
      return json({ ok: true, reportId: record.id, activityCounts: await getActivityCounts(env) }, 201);
    }

    if (method === "POST" && path === "leads") {
      const payload = await readBody(request);
      if (!hasRequiredContact(payload)) {
        return json({
          ok: false,
          error: "Name, business name, WhatsApp number, and email are required for consultation leads."
        }, 400);
      }
      const record = await saveRecord(env, "leads", payload);
      return json({ ok: true, leadId: record.id }, 201);
    }

    if (method === "POST" && path === "consultations") {
      const payload = await readBody(request);
      if (!hasRequiredContact(payload)) {
        return json({
          ok: false,
          error: "Name, business name, WhatsApp number, and email are required for consultation requests."
        }, 400);
      }
      const record = await saveRecord(env, "consultations", payload);
      const email = await sendConsultationEmail(env, record);
      return json({
        ok: true,
        consultationId: record.id,
        emailSent: email.sent,
        activityCounts: await getActivityCounts(env),
        email
      }, 201);
    }

    if (method === "GET" && path === "admin/leads") {
      if (!requireAdmin(request, env)) return json({ ok: false, error: "Unauthorized" }, 401);
      return json({ ok: true, leads: await readList(env, "leads") });
    }

    if (method === "GET" && path === "admin/consultations") {
      if (!requireAdmin(request, env)) return json({ ok: false, error: "Unauthorized" }, 401);
      return json({ ok: true, consultations: await readList(env, "consultations") });
    }

    if (method === "POST" && path === "pi/payments/approve") {
      const { paymentId } = await readBody(request);
      if (!paymentId) return json({ ok: false, error: "paymentId is required" }, 400);
      const result = await piPost(env, `/payments/${encodeURIComponent(paymentId)}/approve`, {});
      return json({ ok: true, result });
    }

    if (method === "POST" && path === "pi/payments/complete") {
      const { paymentId, txid } = await readBody(request);
      if (!paymentId || !txid) {
        return json({ ok: false, error: "paymentId and txid are required" }, 400);
      }
      const result = await piPost(env, `/payments/${encodeURIComponent(paymentId)}/complete`, { txid });
      return json({ ok: true, result });
    }

    return json({ ok: false, error: "Not found" }, 404);
  } catch (error) {
    return json({ ok: false, error: error.message }, 500);
  }
}
