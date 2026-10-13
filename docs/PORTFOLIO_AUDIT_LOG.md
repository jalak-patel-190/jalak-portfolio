# Portfolio Audit Log and Evidence Backlog

Audit date: 13 October 2026  
Repository: `jalak-patel-190/jalak-portfolio`  
Scope: source-level review of the homepage, company hubs, case pages, legacy routes, CSS and linked local assets.

## Status

- Phase 1, source of truth: complete.
- Phase 2, source-level technical and content audit: complete for the reviewed source. Real-browser visual and interaction QA remain open.
- Phase 3, information architecture: complete. Homepage proof cards now open the relevant case directly; merged in PR #57.
- Phase 4, content accuracy: core pass complete. Visual polish that requires image selection is deferred until the correct asset can be confirmed. No theme redesign planned.
- Phase 5, implementation: two controlled batches merged into main through PR #2 and PR #57.
- Phase 6, regression and final sign-off: source-level checks and GitHub Actions build/deploy jobs succeeded for commit 8213eff673ba8f11d8f993c4706245f4b7761ade. Real-browser QA and rendered-page confirmation remain open.

## Evidence and method

The repository contains 32 HTML files: the homepage, four current company hubs, 22 individual case pages, four legacy redirect pages, and a custom 404 page. The 27 primary portfolio pages (homepage, four hubs, 22 cases) were checked for title, meta description, canonical URL and one H1. Static checks previously found no broken local references, missing same-page anchor targets, duplicate IDs, missing image alt attributes in the checked pages, or missing local CSS/JS files.

These are source-level checks only. They do not prove the rendered page works at every viewport, that third-party thumbnails load, or that the latest commit is already visible on GitHub Pages.

## Issue register

| ID | Priority | Finding | Action / status |
|---|---|---|---|
| UX-001 | P2 | Homepage proof cards described specific pieces of work but linked only to company hubs, adding a navigation step and weakening the promise of the card. | **Fixed and merged in PR #57:** each proof card links to its related case page. |
| UX-003 | P2 | Homepage company cards said “Read full case study” but opened a company hub containing multiple cases. | **Fix in this branch:** label these actions “Explore company hub” to match the destination. |
| FACT-001 | P1 | Cinekorn's 108M+ views could be mistaken for views generated solely during the user's tenure. | **Addressed in merged batch:** label as lifetime YouTube views and explain that the total includes pre-tenure catalogue performance. Individual case pages separate inherited catalogue from tenure work. |
| FACT-002 | P1 | Ajmera's +20.3% same-account result was not verified by the available tracker evidence. | **Removed from the homepage headline.** Do not restore until the account list, matched dates and metric definition can be reproduced. |
| FACT-003 | P2 | A single “6+ languages” headline was not consistent with the language names across source descriptions. | **Removed from the homepage headline.** Use named languages only after the inventory is reconciled. |
| FACT-004 | P1 | Swad channel metrics refer to different channels and should not be added together without a verified common definition and period. | **Addressed in merged batch:** no ambiguous combined view total in the homepage headline. Keep channel labels and periods on detailed pages. |
| FACT-005 | P2 | Jalan evidence for influencer results, tele-calling outcomes, festival campaign performance and channel setup is incomplete. | Preserve the case-study ideas and process descriptions. Do not publish invented booking totals, sales, ROI or campaign lift. Evidence checklist below. |
| UX-002 | P2 | Swad's hub reuses a small number of images across several case cards. | Improvement opportunity only. Existing theme is retained; choose more specific imagery only after confirming what each available image actually depicts. |
| SEO-001 | P2 | Homepage social preview currently uses an analytics screenshot rather than a dedicated portfolio preview image. | Improvement opportunity. Do not change the site's visual theme; create or select a preview asset that fits the existing palette before replacing it. |
| QA-001 | P1 | Browser-rendered desktop/mobile layout, keyboard flow, contrast, Lighthouse/Core Web Vitals and third-party image loading have not been independently verified in a real browser. GitHub Actions build and deployment jobs succeeded, but rendered-page behaviour remains unverified. | **Open.** Do not claim full QA or final sign-off until these checks are performed. |
| QA-002 | P2 | Static link checks cannot prove that external YouTube, LinkedIn or thumbnail URLs still work. | **Open.** Verify the visible links and media in browser QA. |

### Priority definitions

- **P0:** blocks access or breaks a core function for most users.
- **P1:** significant trust, accessibility, navigation or factual-accuracy risk.
- **P2:** meaningful usability, evidence or polish improvement.
- **P3:** low-impact refinement.

No confirmed P0 issue was established by the source-level audit.

## Jalan evidence backlog

The case-study ideas remain in place. Proof can be added later; nothing below should be fabricated to fill the gap.

### Jalan Case 01: Building the channel and page network
Useful proof:
- A channel/page list or screenshots showing the properties operated.
- A few public channel/page URLs and, if available, creation or takeover dates.
- Redact any private account or customer information.

### Jalan Case 02: Influencer marketing
Useful proof:
- A booking log or campaign tracker with date, creator, agreed deliverable, and spend where available.
- Public post/video links.
- Reach, enquiries or sales only if a source report can connect them to the campaign.
- If outcome data is unavailable, the case should remain process-led and should not claim ROI.

### Jalan Case 03: Tele-calling team
Useful proof:
- Report or tracker showing the relevant date range and team size.
- Definitions for calls, leads, follow-ups, bills/orders and amounts.
- Before/after productivity only if the comparison periods and data are consistent.
- Redact customer names, phone numbers, addresses and other private details.

### Jalan Case 04: Festival calendar and offline marketing
Useful proof:
- Calendar screenshots showing dates, festivals, platforms and planned offers.
- Public examples of festival posts or campaigns.
- Photos or files showing banner placement and pamphlet production, if available.
- Campaign results only when enquiries or orders can be tied to a defined period and source.

## Other evidence guardrails

### Ajmera Fashion
- The Telugu +32.4% and Tamil +31.6% subscriber figures must retain the December 2022–June 2023 window.
- The 40% content-output claim is not supported by the current tracker proxy.
- Do not repeat the rejected Odisha +527% spike or the old 59-account count.
- Facebook Gujarati follower growth from 647 to 14,473 is described as organic and from Facebook groups, based on the user's confirmation.
- Do not restore +20.3% without reproducible like-for-like source data.

### Swad Cooking Institute
- Keep institute-channel and owner/creator-channel results separate.
- Do not combine 6.38M and 16M+ into one total without confirming the exact channel, date range and metric.
- The owner-channel case may describe its starting point as about 1,500 subscribers and three videos; do not imply that this is the institute channel.

### Cinekorn
- Lifetime channel totals are context, not automatic personal attribution.
- For the Movies case, retain the split between legacy catalogue performance and content published during tenure.
- For Rakhewal, keep fresh full release, re-cut parts and Shorts as separate rows before showing the combined 163-piece total.
- The Facebook comparison describes observed 2025 and 2026 reporting periods. It is not proof that posting volume caused the change.

## Theme-preservation rules

- Keep the existing typography, colour systems, spacing, cards, and company-specific page styles.
- Prefer accurate copy, direct links, evidence labels, accessible controls and targeted fixes over a redesign.
- Keep each company's case-study ideas. Mark missing proof as a gap; do not silently delete the idea or invent replacement numbers.
- Do not call an item fixed until a source check or browser check verifies it.

## Remaining QA before final sign-off

- [ ] Open homepage and all four hubs in desktop and mobile browsers.
- [ ] Test mobile navigation with touch and keyboard; confirm Escape behaviour where implemented.
- [ ] Test keyboard tab order and visible focus on all page templates.
- [ ] Check colour contrast on text, buttons, chart labels and focus indicators.
- [ ] Confirm every proof card and case navigation link opens the intended page.
- [ ] Check external YouTube/LinkedIn links and image thumbnails.
- [ ] Run Lighthouse or equivalent performance/accessibility checks.
- [ ] Confirm GitHub Pages has deployed the latest merged commit.
- [ ] Review the final evidence backlog with the user before adding any new Jalan claims.
