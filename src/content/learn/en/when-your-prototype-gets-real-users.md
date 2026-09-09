---
title: 'What changes when your prototype gets real users?'
description: 'Real users bring different data, timing and expectations. Here is how to prepare your product without rebuilding it before you learn.'
category: 'Product thinking'
published: '2026-09-07'
order: 3
draft: false
translationKey: 'real-users'
---

A prototype usually has an unusually helpful user: the person who built it. You know what each field expects, which sequence works and which rough edges to avoid.

Real users bring none of that context. They do bring different devices, incomplete information and a reasonable expectation that the product will do what it says.

This change does not automatically call for a new architecture. It calls for better evidence about the journeys people actually use.

## Your knowledge stops filling the gaps

You understand that an empty screen means “create your first project”. A new user may think the application failed to load. You know which settings are optional. They may stop because they cannot answer a field.

Try writing an empty state with three things: what belongs here, why it matters and one clear action. Then observe whether a new person takes that action without help.

For onboarding, count the decisions before the first useful result. Delay the ones the user cannot yet answer well. A dashboard full of options is often less useful than a short route to one successful outcome.

## Time becomes unpredictable

During a demo, you perform actions in the intended order. Real users open two tabs, return to a link from yesterday and press a button twice when nothing seems to happen.

Take one core operation and write its states: not started, in progress, succeeded and failed. Then ask what happens if the browser disappears between any two states. Which system knows whether the operation completed?

For a document tool, the concern might be duplicate saves. For a paid booking, it might be charging twice or confirming a slot that no longer exists. Spend effort in proportion to the consequence.

## “A user” becomes several different users

The founder account often has permission to do everything. The first customer should not. The second customer should not inherit the first customer's data.

Build a small role matrix. Put actions down the left and roles across the top. For each cell, write allow or deny. Include direct access to records, not just the pages that contain them.

Test the matrix with separate accounts in a controlled environment. If an access rule is unclear in the matrix, it is probably unclear in the product as well. Resolve the intended behaviour before changing implementation.

## Data acquires a cost of being wrong

Losing a sample project during development is inconvenient. Losing a customer's work changes the relationship. Incorrect data may be worse than a visible error because a user might act on it.

Identify the records that would be costly or impossible for a user to recreate. Decide what level of recovery the next stage requires. This may mean testing a backup restore, making a destructive action harder to trigger or recording enough history to diagnose a change.

Do not copy live customer information into test environments just to make testing realistic. Create representative synthetic records, including long names, missing optional fields and unusually large inputs.

## Support becomes part of the product

A clear way to ask for help is part of operating software. The first version can be simple, but someone needs to monitor it.

When an issue arrives, capture the journey, approximate time, expected result and actual result. Ask for only the information needed to investigate. A support process that requests passwords or full customer datasets creates another problem.

Notice repeated confusion. If several people ask the same question, the answer may belong in the interface. If several people hit the same failure, prioritise the underlying cause over writing a better apology.

## Growth is not the first thing to fix

It is tempting to prepare for a million users when the first ten have not completed onboarding. Early operational problems often come from incorrect assumptions rather than raw load.

First establish whether the important paths work correctly. Then observe which parts become slow or expensive under the actual use pattern. A report generated once a month behaves differently from one generated on every keystroke, even with the same number of accounts.

Set basic spending limits where your providers support them and understand which actions trigger external calls. This is especially relevant when a feature calls a paid model. Keep a simple path to disable an unexpectedly expensive feature.

## A practical first-user routine

Before the first cohort, write the release promise and known limitations. During the first sessions, observe where people stop and where the system surprises them. After each session, separate findings into three lists:

1. **Correctness:** the product did the wrong thing or failed to do the promised thing.
2. **Comprehension:** the product may work, but the user cannot tell what to do or what happened.
3. **Improvement:** a useful addition that does not block the current promise.

Fix the consequential correctness issues first. Improve the moments that prevent understanding. Let the third list compete with what you learn from the next users.

The transition to a real product is not a single ceremony. It is a sequence of promises, evidence and adjustments. Keep the next step small enough to learn from and solid enough to stand behind.

Use [the launch checklist](/learn/ai-built-product-launch-checklist) to prepare that next step, or [see what a Reality Check covers](/reality-check) when you want help judging the evidence.
