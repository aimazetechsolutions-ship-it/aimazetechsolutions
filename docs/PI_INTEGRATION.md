# Pi Network Integration Guide

This app is already wired for Pi Browser basics:

- Frontend SDK script: `https://sdk.minepi.com/pi-sdk.js`
- SDK init: `Pi.init({ version: "2.0", sandbox: false })`
- User login: `Pi.authenticate(["username", "payments"], onIncompletePaymentFound)`
- User-to-app payment request: `Pi.createPayment(...)`
- Server callbacks:
  - `POST /api/pi/payments/approve`
  - `POST /api/pi/payments/complete`

## What You Must Do In Your Pi Account

Codex cannot log in to your Pi Developer Portal for you. Use these steps:

1. Open Pi Browser on your phone.
2. Go to the Pi Developer Portal.
3. Create a new app for AimAze.
4. Add your hosted HTTPS app URL.
5. Copy the Pi API key into your server environment as `PI_API_KEY`.
6. Confirm your app wallet and payment settings inside the Developer Portal.
7. Test login from Pi Browser.
8. Test a small premium report payment.
9. Submit the app for review when the flow is stable.

## Hosting Checklist

Use any Node-capable host such as Render, Railway, VPS, or a cloud server.

Required:

- HTTPS domain
- Node.js 18 or newer
- Environment variables from `.env.example`
- Persistent storage or database for leads

Recommended production upgrade:

- Replace `data/leads.json` with PostgreSQL, Supabase, Firebase, or Airtable.
- Add email notification to AimAze when a lead is created.
- Add an admin dashboard with login.
- Add OpenAI API report generation after the rule-based MVP is validated.

## Pi Payment Flow

The browser requests payment through `Pi.createPayment`. Pi then calls the frontend callbacks:

1. `onReadyForServerApproval(paymentId)`
2. App server calls Pi Platform API approval endpoint.
3. User signs transaction in Pi Wallet.
4. `onReadyForServerCompletion(paymentId, txid)`
5. App server calls Pi Platform API completion endpoint.
6. App unlocks premium report delivery.

The local server runs in mock mode if `PI_API_KEY` is missing. That lets you test the app screens locally, but real Pi payments require Pi Browser plus your live Developer Portal API key.

## Safe Data Rules

- Never ask for a Pi wallet passphrase.
- Never store a wallet passphrase.
- Only request data needed for business consultation.
- Keep the Pi API key on the server, not in frontend JavaScript.
- Tell users what the premium report includes before asking for payment.

## Suggested App Listing

Name:

```text
PiBiz AI by AimAze
```

Short description:

```text
AI ERP advisor for Pi entrepreneurs, merchants, hospitality businesses, travel agencies, real estate teams, retailers, e-commerce sellers, and trading companies.
```

Long description:

```text
PiBiz AI by AimAze helps Pi business owners understand how ready their business is for ERP and automation. Users answer a short industry-specific questionnaire and receive a free report with business health score, ERP readiness score, process weaknesses, recommended Odoo modules, estimated savings, and a 30/60/90 day implementation plan. The app supports hospitality, travel, real estate, retail, e-commerce, trading, and service businesses. Users can request a free AimAze consultation and later unlock a detailed premium report using Pi payments.
```
