---
title: 'Is your AI-built app ready for production?'
description: 'A working demo answers one question. These practical checks help you decide whether your AI-built app is ready for its next real users.'
category: 'Readiness'
published: '2026-09-07'
order: 1
draft: false
translationKey: 'production-ready'
---

Your app works. You can sign in, create something and show a friend. That is real progress. It also leaves an important question unanswered: what happens when someone uses it without you nearby?

Production readiness is a decision about a specific next step. A private beta with five invited people asks less of a product than an open launch with paying customers. Start by writing down which one you mean.

## Define the next reality

Complete this sentence: **“Next week, this product needs to let [who] do [what], using [which data], with [what consequence if it fails].”**

For a scheduling app, that could be ten invited businesses booking test appointments. Or it could be any customer booking a paid appointment with a real business. The interface might look identical. The expectations are different.

Write down the journeys that support that promise. Keep the list short: account creation, the first useful action, returning to saved work and, if relevant, paying for access. These are the paths that deserve your attention first.

## Try the product as a stranger

Open a fresh browser profile. Create a new account using a different email. Do not reuse your founder account or a browser full of saved state.

Follow the words on the screen. Can you understand what to do next? Is there a useful empty state? Does the first successful action produce a result you can recognise? Close the browser and come back. Is the work still there?

Ask one person who has not watched your demo to do the same thing. Watch without explaining. If they need your instructions, record the exact point where they stop. That is better evidence than a general feeling that onboarding needs polish.

## Test boundaries with two accounts

Create account A and account B in a test environment. Give each something distinct: a project, document or booking. Try opening A's resource while signed in as B. If the URL contains an identifier, changing that identifier is one useful check.

Hiding a button is not an access rule. The system that returns or changes the data must enforce permission. A single successful test does not prove all access is correct, but an unexpected cross-account result is a concrete reason to pause that journey and investigate.

Record the account role, action, expected result and actual result. Never use someone else's real records for a test. For deeper access or security questions, bring in a qualified specialist.

## Try an interruption

For each important action, choose one ordinary interruption. Refresh while saving. Lose the connection. Open an old link. Submit twice. Let a session expire. You are looking for a recoverable result and an understandable explanation.

A booking that looks confirmed but never reaches the business is more serious than an awkward animation. Prioritise silent failures, lost work and incorrect state before cosmetic inconsistencies.

If you take payments, use the payment provider's test environment. Verify the connection between a completed payment, your stored subscription state and the access the customer receives. A successful checkout screen alone does not prove that chain works.

## Find out who notices a failure

Cause a harmless, intentional error in a test environment. Can you find it? Does the log contain enough context to identify the affected action without exposing credentials or private records?

Agree who responds to issues during the next launch stage. Even a simple monitored inbox and a clear way to report a problem are useful. Visibility only helps if someone will act on it.

## Make a decision you can explain

Use four possible outcomes:

- **Ship:** the agreed journeys work and remaining issues are acceptable for the next stage.
- **Ship after fixes:** there are specific blockers with a bounded path to correction.
- **Keep testing:** there is not enough evidence to make the call yet.
- **Rethink the foundation:** a core assumption prevents the product from meeting its intended use without substantial change.

Do not turn an untested area into a green tick. “We have not checked this” is a useful finding. It tells you where confidence ends.

## Keep a small evidence log

For each check, write: journey, setup, action, expected result, actual result and next action. Add a screenshot or a short reproduction when it helps. Group findings into blockers, fix soon and fine for now.

For example: “Account B can open account A's invoice by changing the URL” is actionable. “Security needs work” is not. The first tells you what to fix and how to verify the fix.

A Reality Check applies this process to the whole product, with scope agreed around your next stage. It does not certify that a product is free of defects. It gives you a better-founded decision about what comes next.

Continue with [the AI-built product launch checklist](/learn/ai-built-product-launch-checklist) to turn that decision into a release plan.
