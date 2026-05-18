# AimAze Biz AI

Standalone Pi Browser app for AimAze Tech Solutions.

## Cloudflare Pages Settings

Use these settings for the AimAze Biz AI Pages deployment:

```text
Root directory: pibiz-ai
Build command: none
Build output directory: public
Framework preset: None
```

## Runtime

Frontend files are in `public/`.

Cloudflare Pages Functions are in `functions/`.

Required Cloudflare bindings and variables:

```text
PIBIZ_DATA
CONTACT_EMAIL
WEBSITE_URL
WHATSAPP_NUMBER
INITIAL_CUSTOMER_COUNT
INITIAL_CONSULTATION_COUNT
RESEND_API_KEY
EMAIL_FROM
PI_API_KEY
PI_PAYMENT_AMOUNT
ADMIN_TOKEN
```
