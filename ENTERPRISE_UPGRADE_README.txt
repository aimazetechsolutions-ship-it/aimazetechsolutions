AimAze Enterprise Website Upgrade

What changed:
1. Public admin panel disabled. The old admin file had a visible default password and GitHub token workflow. Do not publish that old version.
2. Added security headers: _headers and netlify.toml.
3. Added canonical www redirect in _redirects.
4. Upgraded content.json positioning to enterprise ERP/CRM/CFO-dashboard messaging.
5. Added Organization and ProfessionalService schema to homepage.
6. Added lead-capture.js. Set window.AIMAZE_LEAD_ENDPOINT to your Odoo/CRM webhook URL when ready. Until then, it falls back to mailto.
7. Updated robots.txt and sitemap domain to www.

Important next steps before going live:
- Replace placeholder phone and WhatsApp number in content.json.
- Replace placeholder testimonials/case studies with approved real client names or keep them as anonymous case studies.
- Configure an Odoo lead endpoint or serverless form handler.
- Never expose GitHub tokens or admin passwords in browser-side code.
