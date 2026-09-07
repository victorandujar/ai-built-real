---
title: 'The AI-built product launch checklist'
description: 'A stage-aware checklist for your first launch: accounts, data, payments, recovery and the evidence worth collecting before you invite users.'
category: 'Launch guide'
published: '2026-09-07'
order: 2
draft: false
---

A checklist is useful when it changes what you do. It becomes noise when it treats every unfinished detail as a launch blocker.

Use this one for a working product built with AI. For each item, mark **checked**, **needs work**, **not applicable** or **not yet tested**. Add evidence. Decide which unresolved items matter for this particular release.

## 1. Write the release promise

Name the audience, the core job and the size of the release. “Invite ten beta users to create and share a test project” is specific enough to assess. “Launch the platform” is not.

List what this release does not support. If payments are unavailable or a workflow still needs manual help, make that clear to the invited users. An honest boundary prevents a missing feature from becoming a broken promise.

## 2. Verify the first useful journey

- Start with a fresh account in a clean browser profile.
- Follow sign-up and any verification email to completion.
- Reach the first useful result without founder guidance.
- Leave, return and confirm that saved work remains accessible.
- Try a realistic empty state and an invalid input.
- Repeat the essential path on a small screen.

**Evidence to keep:** a short recording or an ordered set of steps. Note any point where the interface assumes knowledge a new user does not have.

**Potential blocker:** the core action only works with preloaded founder data. A cosmetic mismatch can usually wait; inability to create the first useful result cannot.

## 3. Check identity and access

Use test accounts for each supported role. Check sign-in, sign-out, password reset and expired sessions. Then test access to another account's records through the actual data request, not only through visible navigation.

A server or database policy should enforce the boundary. Client-side code is delivered to the browser and is not a place to hide a secret or rely on a permission decision.

For a Supabase-backed product, inspect the Row Level Security policies for exposed tables, including read, insert, update and delete behaviour. The [official RLS guide](https://supabase.com/docs/guides/database/postgres/row-level-security) explains how policies interact with authentication. Do not copy a policy without understanding which rows it permits.

**Potential blocker:** one ordinary customer can read or change another customer's private data. Stop the affected exposure and get appropriate help before inviting more users.

## 4. Separate test and live data

Confirm which database, payment account and external services each environment uses. Make test mode visible to the team. Check that local or preview environments cannot accidentally modify production records.

Where you promise to retain important information, document how it is backed up and how it can be restored. Test restoration into an isolated environment. A backup setting is not the same as evidence that recovery works.

**Evidence to keep:** an environment inventory without secret values, plus the date and result of the last relevant restore test.

## 5. Follow a payment beyond checkout

If the release does not take payments, mark this section not applicable. Otherwise, use test mode to check:

- A successful payment grants the intended access.
- A failed or abandoned payment does not grant access.
- A duplicate event does not repeat a one-time operation.
- A cancellation or subscription change updates the product state.
- A delayed event can be handled without losing the customer.
- The customer can understand and recover from a failed attempt.

Stripe describes signature verification, retries and event ordering in its [webhook documentation](https://docs.stripe.com/webhooks). Your endpoint must treat the event as a server-side input to verify, and your logic must account for retries. Do not rely only on the browser arriving at a success URL.

**Evidence to keep:** test event references and the matching state in your application. Use provider test data, not a real customer's card.

## 6. Make failures visible and recoverable

Cause a safe failure in a test environment. Check the message the user sees and the diagnostic information you receive. Can they retry without duplicating a record? Is unfinished work preserved where it should be?

Remove credentials and unnecessary personal data from logs. Decide who checks errors and how a user reports a problem. Write one short response procedure for a broken core journey.

**Potential blocker:** an important action claims success while the underlying operation silently fails.

## 7. Check the public surface

Review title, description, canonical URL and social preview for public pages. Keep private account pages out of search results, but remember that a robots directive is not access control.

Check your own domain, HTTPS, error page and the links in onboarding emails. Try the landing page on a slower connection and on a real phone. Inspect loading behaviour and unexpected layout shifts.

[Google's SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) is a useful reference for discoverability. Search metadata helps people find the product; it does not replace testing the product itself.

## 8. Rehearse the release and the way back

Know which change you are releasing, how you will verify it after deployment and what you will do if the core journey stops working. Database changes may need a different recovery plan from application code. Do not assume reverting a deploy will reverse a data migration.

After deployment, run a small set of harmless checks against the live environment. Watch the first real journeys. Increase exposure as evidence grows.

## The final release note

Write three short lists: **fixed before release**, **known limitations**, **watch after release**. Put an owner beside each item that needs action.

Your goal is not a perfect score. It is a release promise you can keep, with a clear response when reality teaches you something new.

If you still need to decide what counts as a blocker, read [how to assess production readiness](/learn/is-your-ai-built-app-ready-for-production).
