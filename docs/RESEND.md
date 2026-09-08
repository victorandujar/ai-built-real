# Activate email delivery

The only business endpoint is POST /api/leads. It delivers a product-review request to your inbox through the Resend SDK; it does not create accounts or store leads in a database.

1. Verify your sending domain in Resend, including its required DNS records.
2. Copy .env.example to .env for development. Set RESEND_API_KEY, RESEND_FROM (a verified sender) and CONTACT_EMAIL (your receiving inbox). Keep all three server-side; never prefix secrets with PUBLIC_.
3. For production, configure UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN for shared abuse protection across serverless instances. This stores expiring counters keyed by hashed IP, not lead contents. Missing protection fails closed in production; local development uses an in-memory limit.
4. Set the same variables in the deployment environment, restart/redeploy, and submit an authorised test request. Confirm inbox receipt and that Reply addresses the requester. Configure delivery-failure monitoring in Resend.

The form shows sending, timeout/network failure, rate limiting, unavailable delivery and accepted-request states. Inputs remain available after errors. Identical submissions use the same idempotency key to reduce duplicate delivery on retry. A successful UI means Resend accepted the request, not a guarantee of inbox delivery. No confirmation email is sent to the requester, and no email was sent in this development session.

The API also validates origin, JSON content, a 20KB body limit, allowed field values, URL syntax, a honeypot and consent. It never opens a submitted URL or repository. Preview remains noindex until the domain and legal pages are ready.
