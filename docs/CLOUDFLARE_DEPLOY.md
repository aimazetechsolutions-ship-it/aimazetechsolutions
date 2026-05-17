# Cloudflare Pages Deployment

Use this for the Cloudflare dashboard shown in your screenshot.

## 1. Confirm Project Settings

Open:

```text
Workers & Pages > aimazetechsolutions > Settings > Build & deployments
```

Set:

```text
Build command: none
Build output directory: public
Root directory: /
```

If Cloudflare asks for framework preset, choose:

```text
None
```

## 2. Add KV Storage

Open:

```text
Workers & Pages > KV > Create namespace
```

Create:

```text
pibiz_ai_data
```

Then open:

```text
Workers & Pages > aimazetechsolutions > Settings > Functions > KV namespace bindings
```

Add binding:

```text
Variable name: PIBIZ_DATA
KV namespace: pibiz_ai_data
```

This stores reports, leads, and consultation requests.

## 3. Add Environment Variables

Open:

```text
Workers & Pages > aimazetechsolutions > Settings > Environment variables
```

Add production variables:

```text
CONTACT_EMAIL=info@aimazetechsolutions.com
WEBSITE_URL=https://www.aimazetechsolutions.com
INITIAL_CUSTOMER_COUNT=286
INITIAL_CONSULTATION_COUNT=94
ADMIN_TOKEN=choose-a-strong-secret
WHATSAPP_NUMBER=your-whatsapp-number-with-country-code
PI_PAYMENT_AMOUNT=1
```

Later, after Pi Developer Portal:

```text
PI_API_KEY=your-pi-api-key
```

Later, for automatic email:

```text
RESEND_API_KEY=your-resend-api-key
EMAIL_FROM=PiBiz AI <verified-email@aimazetechsolutions.com>
```

## 4. Deploy Code

Your Cloudflare project is connected to GitHub, so the normal path is:

1. Put this app code into the connected GitHub repo.
2. Commit and push.
3. Cloudflare automatically builds and deploys.

Cloudflare Pages will serve files from `public` and use `functions/api/[[path]].js` for all `/api/*` routes.

## 5. Test Live App

After deployment, open:

```text
https://aimazetechsolutions.pages.dev
```

Test:

- Logo loads
- Country searchable dropdown works
- Free report generates
- Counters update
- Consultation request saves
- `/api/config` returns JSON

Admin consultations:

```powershell
curl -H "x-admin-token: your-secret" https://aimazetechsolutions.pages.dev/api/admin/consultations
```

## 6. Add Custom Domain

Open:

```text
Workers & Pages > aimazetechsolutions > Custom domains
```

Add:

```text
pibiz.aimazetechsolutions.com
```

Use this final HTTPS URL for Pi Developer Portal app registration.
