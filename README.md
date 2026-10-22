# SENTINEL-1

Prototype-stage concept website built with TanStack Start, React, Tailwind CSS,
and Vercel's Nitro adapter.

## Enquiry email delivery

The pre-order-interest and contact forms submit to a server-side function. It
validates the fields and sends the enquiry through Resend; submissions are not
stored in a database.

To enable delivery on Vercel:

1. Verify a sending domain with Resend.
2. In Vercel project settings, add `RESEND_API_KEY` and `RESEND_FROM_EMAIL` for
   the production environment. The sender must use the domain verified in
   Resend.
3. Optionally set `SENTINEL_CONTACT_EMAIL` to choose the inbox that receives
   enquiries. If unset, the current site contact address is used.
4. Redeploy and submit a test enquiry.

Do not commit provider credentials. If email delivery is not configured or the
provider rejects a request, the form reports the issue and offers direct email
and WhatsApp contact options.

## Local development

```sh
npm ci
npm run dev
```

## Project status

SENTINEL-1 is a concept-stage project. Descriptions, prices, and design targets
are preliminary, not verified performance or safety claims. No public-road
testing, installation, or product sale is represented as available.
