# Portfolio Audit Log and Evidence Backlog

Audit date: 14 October 2026  
Repository: `jalak-patel-190/jalak-portfolio`  
Scope: source-level review of the homepage, company hubs, case pages, legacy routes, CSS and linked local assets.

## Status

- Phase 1, source of truth: complete.
- Phase 2, source-level technical and content audit: substantially complete across the 27 primary portfolio pages, four legacy routes and custom 404 page. Source checks have been repeated after major batches; real-browser checks remain open.
- Phase 3, information architecture: complete. Homepage proof cards link directly to relevant cases; company hubs have “Continue Exploring” navigation; deep cases have related “What's Next” cards and a final “View All Work” action.
- Phase 4, content accuracy: core pass complete. Unsupported Ajmera claims and unverified Jalan counts have been removed; Cinekorn lifetime views, legacy catalogue results, tenure results and Facebook comparison periods are labelled more carefully. Jalan proof gaps remain open for user-supplied evidence.
- Phase 5, implementation: implementation batches are merged into main, including accuracy, navigation, social metadata, responsive card rules, reduced-motion handling, visible keyboard focus and the custom 404 skip link. Existing theme, typography, colour palettes and page structure have been preserved.
- Phase 6, regression and final sign-off: post-deployment Chromium checks and Lighthouse lab tests passed on 14 October 2026 for deployed commit `f727b308d82a066c1fa81102dec764e84a262d7e` (Pages workflow [38519206459](https://github.com/jalak-patel-190/jalak-portfolio/actions/runs/38519206459), QA/Lighthouse workflow [38519206514](https://github.com/jalak-patel-190/jalak-portfolio/actions/runs/38519206514)). Automated checks are passing; manual screen-reader/touch review, external-media reachability, image optimization and evidence-dependent factual review remain open.

## Evidence and method

The repository contains 32 HTML files: the homepage, four current company hubs, 22 individual case pages, four legacy redirect pages, and a custom 404 page. The 27 primary portfolio pages (homepage, four hubs, 22 cases) were checked for title, meta description, canonical URL and one H1. Static checks previously found no broken local references, missing same-page anchor targets, duplicate IDs, missing image alt attributes in the checked pages, or missing local CSS/JS files.

These are source-level checks only. They do not prove the rendered page works at every viewport, that third-party thumbnails load, or that the latest commit is already visible on GitHub Pages.

## Issue register

| ID | Priority | Finding | Action / status |
|---|---|---|---|
| UX-001 | P2 | Homepage proof cards described specific pieces of work but linked only to company hubs, adding a navigation step and weakening the promise of the card. | **Fixed and merged in PR #57:** each proof card links to its related case page. |
| UX-003 | P2 | Homepage company cards said “Read full case study” but opened a company hub containing multiple cases. | **Fixed and merged in PR #59:** label these actions “Explore company hub” to match the destination. |
| FACT-001 | P1 | Cinekorn's 108M+ views could be mistaken for views generated solely during the user's tenure. | **Addressed in merged batch:** label as lifetime YouTube views and explain that the total includes pre-tenure catalogue performance. Individual case pages separate inherited catalogue from tenure work. |
| FACT-002 | P1 | Ajmera's +20.3% same-account result was not verified by the available tracker evidence. | **Removed from the homepage headline.** Do not restore until the account list, matched dates and metric definition can be reproduced. |
| FACT-003 | P2 | A single “6+ languages” headline was not consistent with the language names across source descriptions. | **Removed from the homepage headline.** Use named languages only after the inventory is reconciled. |
| FACT-004 | P1 | Swad channel metrics refer to different channels and should not be added together without a verified common definition and period. | **Addressed in merged batch:** no ambiguous combined view total in the homepage headline. Keep channel labels and periods on detailed pages. |
| FACT-005 | P2 | Jalan evidence for influencer results, tele-calling outcomes, festival campaign performance and channel setup is incomplete. | Preserve the case-study ideas and process descriptions. Do not publish invented booking totals, sales, ROI or campaign lift. Evidence checklist below. |
| UX-002 | P2 | Swad's hub reuses a small number of images across several case cards. | Improvement opportunity only. Existing theme is retained; choose more specific imagery only after confirming what each available image actually depicts. |
| SEO-001 | P2 | Homepage social preview currently uses an analytics screenshot rather than a dedicated portfolio preview image. | Improvement opportunity. Do not change the site's visual theme; create or select a preview asset that fits the existing palette before replacing it. |
| QA-001 | P1 | Confirm the latest published commit and primary-route behavior after deployment. | **Automated checks passed** for deployed commit `f727b308d82a066c1fa81102dec764e84a262d7e`: all 27 primary pages passed live desktop/mobile smoke tests; local test-server image/video URLs resolved; four legacy routes redirected; custom 404 returned 404; internal audit/QA paths tested by CI returned 404. Manual and third-party checks remain separate. |
| QA-002 | P2 | Third-party destinations and media playback need separate checks. | **Partially verified:** 31/31 unique YouTube thumbnail URLs returned image responses in run [38520451454](https://github.com/jalak-patel-190/jalak-portfolio/actions/runs/38520451454). The regression test merged in [PR #86](https://github.com/jalak-patel-190/jalak-portfolio/pull/86), run [38524093421](https://github.com/jalak-patel-190/jalak-portfolio/actions/runs/38524093421), found no video-ID mismatch for linked output-card thumbnails that could be compared. Still open: intended-video identity, actual playback, and LinkedIn/Instagram destinations. |
| PERF-001 | P2 | Lab performance is measured, but field Core Web Vitals are not. | Lighthouse one-run scores on 14 Oct 2026: Performance 92 homepage, 97 Ajmera, 99 Cinekorn, 96 Jalan, 99 Swad; Accessibility/Best Practices/SEO each 100 on all five. FCP 1.6–2.6 s, LCP 1.6–2.7 s, TBT 0 ms, CLS 0–0.03. Field Core Web Vitals remain unmeasured. |
| PERF-002 | P2 | Large images are sent to smaller card slots without responsive derivatives. | Lighthouse estimated responsive-image savings around 2.3 MiB on the homepage, 3.3 MiB on Cinekorn hub and 3.4 MiB on Swad hub (overlapping per-page estimates, not additive). Create small preview derivatives for cards and preserve original full-resolution evidence screenshots on detailed case pages. |


### Priority definitions

- **P0:** blocks access or breaks a core function for most users.
- **P1:** significant trust, accessibility, navigation or factual-accuracy risk.
- **P2:** meaningful usability, evidence or polish improvement.
- **P3:** low-impact refinement.

No confirmed P0 issue was established by the source-level audit.

The latest automated run also includes axe-core WCAG 2.1 A/AA scans on all 27 primary pages in desktop and mobile Chromium, mobile overflow checks across all 27 pages, and mobile menu open/Escape/focus-return tests on the homepage and four company hubs. Automated results do not replace manual assistive-technology testing.

## Latest implementation and deployment checkpoint — 13 October 2026

- The first controlled implementation PR (#2) and subsequent follow-up batches are merged into `main`.
- Website code deployment [38406532537](https://github.com/jalak-patel-190/jalak-portfolio/actions/runs/38406532537) succeeded for commit `bbefefdfae098b29219ff4115331bc71ab7719db`; documentation deployment [38406683217](https://github.com/jalak-patel-190/jalak-portfolio/actions/runs/38406683217) succeeded for latest `main` commit `c7de73c4f37ce6f48558603ec3d0705a0a4f888c`.
- Recent merged work includes related-case cards, “View All Work” endings, company-to-company navigation, tighter comparison labels, improved social metadata, visible keyboard focus indicators and a skip link on the custom 404 page.
- The source audit is not the same as a browser test. A public-page crawler returned an older homepage snapshot; a cache-busted fresh fetch was not available in this review environment. This is inconclusive about what a human visitor currently sees, so live deployment/rendering remains unverified here.
- Remaining sign-off: desktop/mobile rendering, menu and keyboard interactions, external links and image loading, page-level contrast, and Lighthouse/Core Web Vitals. Preserve the existing theme. Do not invent Jalan proof; collect it from the user when available.

## Jalan evidence backlog

The case-study ideas remain in place. Proof can be added later; nothing below should be fabricated to fill the gap.

### Jalan Case 01: Building the channel and page network
Useful proof:
- A channel/page list or screenshots showing the properties operated.
- A few public channel/page URLs and, if available, creation or takeover dates.
- If retaining the “from near zero” framing, provide the starting baseline, date range and a matched follow-up metric.
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


## Latest loop: related case cards and source regression

- **Merged:** [PR #60](https://github.com/jalak-patel-190/jalak-portfolio/pull/60), 13 October 2026.
- **Deployment:** [GitHub Pages workflow 38385996781](https://github.com/jalak-patel-190/jalak-portfolio/actions/runs/38385996781) succeeded.
- Ajmera, Jalan and Swad deep cases now use two related “What's Next” cards, matching the Cinekorn pattern. The final “View All Work” action remains in place.
- Static source checks on all 22 deep case pages (6 Cinekorn, 6 Ajmera, 4 Jalan, 6 Swad) found one H1 per page, no duplicate IDs, no missing in-page anchor targets, no images missing alt attributes, two related cards per page, and the expected View All Work CTA.
- The four Jalan case pages reviewed no longer contain the previously unsupported 70-influencer, 43-date, 10–15-channel, four-agent, ₹93.67 crore or 5166% claims. Keep these evidence gaps open until the user provides supporting material.
- Responsive CSS includes single-column card rules at narrow widths, but actual browser-rendered mobile behavior has not been verified.

### Sign-off status
**Implementation batches complete; final browser QA pending.** The review environment could not retrieve the live GitHub Pages site as a usable rendered page. The latest Pages workflow is green, which verifies the deployment workflow, not the rendered experience. Remaining checks: desktop/mobile browser layout, keyboard and mobile-menu interaction, external media loading, full contrast review, and Lighthouse/Core Web Vitals. Do not claim these have passed without real test results.


## Accessibility follow-up: focus indicators

- **Merged:** [PR #62](https://github.com/jalak-patel-190/jalak-portfolio/pull/62).
- Added explicit keyboard-focus outlines to key homepage and case-study controls across the four company stylesheets, using existing theme accents.
- Contrast ratios against white for the focus-token colors are 5.41:1 (`#B8441B`), 5.18:1 (`#C2410C`) and 7.50:1 (`#1F5C6B`). This is not a full-page contrast audit.
- Existing reduced-motion and responsive CSS rules remain in place.
- **Open:** test actual keyboard traversal, visible focus on the deployed pages, and all text/control/background combinations in a real browser. Do not mark full accessibility QA complete yet.

## Accessibility follow-up: semantic image match

- **Merged:** [PR #65](https://github.com/jalak-patel-190/jalak-portfolio/pull/65).
- Corrected Cinekorn Case 02, where the evidence figure described Telugu analytics but loaded the Movies analytics screenshot. The page now uses the existing `yt-telugu.png` asset and aligned alt text.
- No layout or theme changes.
- This was a targeted fix, not completion of the full image/alt review. External media loading and browser-rendered verification remain open.


## Final phase checkpoint — 14 October 2026

### Six-phase status

1. **Source of truth:** complete for the evidence archives currently available. The remaining Jalan proof requests are listed below; they are not assumed or fabricated.
2. **Technical and content audit:** source-level review substantially complete across 27 primary pages, four legacy routes and the custom 404 page. Static checks do not replace browser testing.
3. **Information architecture:** implemented. Homepage proof cards point to relevant cases; company hubs link to other companies; deep cases have related-work cards and a View All Work action.
4. **Content accuracy:** core corrections implemented. Unverified Ajmera and Jalan headline claims have been removed or narrowed; lifetime, legacy, tenure and channel-specific figures are labelled more carefully.
5. **Implementation:** merged into main in controlled batches. Existing typography, palette, card style, spacing and company-specific visual language have been preserved.
6. **Regression and final sign-off:** **open**. The latest website-code deployment succeeded for commit `cefc38a98bddf809cfb6226ffdafabf9afb81dc2` (workflow [38415532993](https://github.com/jalak-patel-190/jalak-portfolio/actions/runs/38415532993)). The audit-documentation merge `d32f69b339d4e12161d8beaae3246097964cec16` also passed Pages workflow [38510972833](https://github.com/jalak-patel-190/jalak-portfolio/actions/runs/38510972833). These workflow results confirm the deployment jobs completed; they do not independently prove the live rendered page is correct.

### Verified in source versus still blocked

**Source-verified:** core local routes and anchor targets were checked in prior regression passes; page metadata and heading structure are present on the 27 primary pages; relevant content/navigation and accessibility fixes are merged; no redesign was made.

**Still not verified:** real browser rendering, desktop/mobile overflow and clipping, touch and keyboard interaction, external YouTube/LinkedIn links and thumbnail retrieval, complete contrast checks, and Lighthouse/Core Web Vitals. A fresh rendered GitHub Pages response was not available from this review environment, so these items must remain open rather than being marked passed.

### User evidence dependency

Keep all four Jalan case-study ideas. Do not add unverified counts, ROI, booking totals, sales attribution, team productivity, or campaign lift. The evidence checklist above specifies what would support each claim. The user can attach the proof after this implementation phase; no evidence is required to preserve the qualitative case narratives.

### Final state

**Five of six phases are complete at source/implementation level. Phase 6 is partially complete: static regression and deployment workflow checks passed, while real-browser QA remains blocked by lack of a usable browser/rendered-page check in this environment.** Do not label the whole website fully audited or accessibility-certified until those tests are actually performed.


## Audit continuation checkpoint — 14 October 2026

### Source and deployment re-established

- Current `main` head checked: `edaf7c899d96c038e5cfd1ef96d59c15fbad056c` — “Retain video metadata preload until dimensions are verified.”
- GitHub Pages workflow [38511950324](https://github.com/jalak-patel-190/jalak-portfolio/actions/runs/38511950324) completed successfully for that exact commit on 14 October 2026. This verifies that the Pages build/deploy workflow completed; it is not a substitute for checking the live rendered page.
- Latest commit changes video preload behavior on the Ajmera corporate-content and Swad owner-channel case pages. No unrelated theme or content changes were made in this checkpoint.

### Static regression checks completed in this loop

Checked homepage, all four company hubs, and the custom 404 page directly from current `main`:

- Each of the six pages has exactly one H1.
- No duplicate IDs or missing in-page anchor targets were detected on these six pages.
- All image elements on these six pages have an `alt` attribute (18 homepage images, 16 Ajmera hub images, 9 Cinekorn hub images, 5 Jalan hub images, 9 Swad hub images; the 404 page has no images).
- Homepage and all four hubs have canonical URLs, Open Graph title metadata and skip links. The custom 404 page has a skip link; it intentionally has no canonical URL or Open Graph title in this check.
- Checked relative local references on the homepage and four hubs against the repository tree: 138 references across these five pages, with zero unresolved local file paths detected by this static check. This does not verify runtime loading, browser navigation, or third-party destinations.

### Still open

- Live browser rendering at desktop and mobile sizes, overflow/clipping, touch and keyboard navigation, visible focus in context, menu/Escape behavior, external media and links, full rendered contrast, and Lighthouse/Core Web Vitals.
- The local review environment cannot fetch the public host directly. However, the new GitHub Actions browser suite can reach the live homepage and all four company hubs; see the 14 October browser-QA checkpoint below. Do not treat the five-page live smoke test as a full live-site review.
- Jalan evidence backlog remains unchanged. Preserve qualitative case narratives and do not restore unverified figures.

### Next action

Continue source regression checks on deep case pages, including evidence-image/alt-text matching, related-case navigation, video behavior, and relative asset paths. Then complete real-browser QA when a usable browser/rendered-page check is available. Keep the existing visual theme intact.


## Deep-case regression loop — 14 October 2026

### Coverage completed

Continued static regression review across all 22 deep case-study pages (6 Ajmera, 6 Cinekorn, 4 Jalan, 6 Swad). The checks covered H1 count, duplicate IDs, in-page anchor targets, image alt attributes, relative local file references, and the presence of related-case / View All Work navigation. Selected video and evidence-image cases received extra inspection.

### Results in this loop

- All 22 pages reviewed have exactly one H1.
- No duplicate IDs or missing in-page anchor targets were detected in the checked pages.
- No checked image element lacked an `alt` attribute.
- No unresolved relative local asset/page paths were detected by the source-path check on the reviewed pages.
- Related-case navigation / View All Work endings were present across the reviewed pages.
- The Cinekorn Telugu/Kannada case points to `yt-telugu.png` for Telugu analytics, matching its alt text; the prior wrong-image pairing is not present in current source.
- The Ajmera corporate-content and Swad owner-channel video elements use `preload="metadata"` and include controls. This is a source inspection only; video loading and layout stability still require browser testing.
- Jalan case pages retain qualitative narratives without restoring the previously rejected unsupported headline figures. Their proof backlog remains open.

### Deployment checkpoint

The audit-log update from the previous loop was deployed successfully by Pages workflow [38514625906](https://github.com/jalak-patel-190/jalak-portfolio/actions/runs/38514625906), for commit `55d9988bf7b62aea7a4bddafdfd748870878d21a`.

### Live-browser access attempt

A direct request to the live homepage and Swad hub could not be completed because the execution environment could not resolve the external host (DNS/network failure). This is an environment limitation, not evidence that the site is down. Browser rendering, mobile layout, interaction behavior, external link reachability, media retrieval, full contrast and Lighthouse/Core Web Vitals remain unverified.

### Loop decision

No confirmed source-level defect in this batch justified a code change. The existing theme and page content were left unchanged. Continue with a second pass focused on navigation scripts, responsive CSS, accessibility semantics and claim/source consistency. Keep Phase 6 open until real-browser QA is possible.


## Navigation, responsive-style and accessibility source pass — 14 October 2026

### Additional checks

- Inspected the homepage and all four company-hub navigation scripts. Each hub's mobile menu source includes an `aria-expanded` update, Escape-to-close behavior, focus return to the menu trigger, link-click close behavior and outside-click close behavior.
- Inspected shared CSS for the homepage and four company case systems. Responsive media queries, `:focus-visible` styles and reduced-motion rules are present across the checked stylesheets.
- Inspected Ajmera, Cinekorn and Swad lightbox scripts. Cinekorn's image viewer uses a native `dialog` with `showModal()` where supported and a labelled close button. No source-level issue was confirmed in this pass; actual keyboard and touch behavior still requires browser testing.
- No portfolio code changes were justified by these static checks. The visual theme remains unchanged.

### Remaining phase-6 requirements

Source checks now cover all 22 deep case pages, the homepage, four hubs and the custom 404 page. They still cannot verify real layout, overflow, interaction behavior, network-loaded images/videos, external destination responses, computed contrast or performance metrics. The local review environment cannot fetch the public host directly, but GitHub Actions now provides a live smoke test for the homepage and four company hubs. Full live-site coverage of all deep pages remains outstanding.


## Automated browser regression and accessibility checkpoint — 14 October 2026

### Test harness merged

- **Merged:** [PR #73](https://github.com/jalak-patel-190/jalak-portfolio/pull/73).
- Added a Playwright + Chromium GitHub Actions workflow for desktop and Pixel-sized mobile browser contexts.
- Added smoke checks for all 27 primary pages: HTTP 200 response, one H1, skip-link presence, image alt attributes, local resource HTTP errors and uncaught JavaScript exceptions.
- Added mobile document-overflow checks on the homepage and four company hubs.
- Added mobile navigation checks on the homepage and four hubs: open state, Escape-to-close, and focus return.
- Added live deployment smoke checks for the homepage and four company hubs.
- Added axe-core WCAG 2.1 A/AA scans for the homepage and four hubs on desktop and mobile viewports.
- No website design, content or CSS was changed in this PR; the changes are automated QA tooling.

### Verified result

- Latest successful browser run: [38515851748](https://github.com/jalak-patel-190/jalak-portfolio/actions/runs/38515851748).
- **68 tests passed, 2 desktop-only skips** (the mobile-only checks are intentionally skipped on desktop).
- All 27 primary pages passed the structural smoke checks in both desktop and mobile Chromium contexts.
- The mobile overflow check passed on the homepage and four company hubs.
- The mobile menu open/Escape/focus-return checks passed on the homepage and all four company hubs.
- The live smoke test successfully reached the published homepage and four company hubs and verified HTTP 200, one H1 and skip-link presence.
- axe-core reported no WCAG 2.1 A/AA violations on the homepage and four company hubs across both tested viewport contexts after the test was adjusted to emulate reduced motion and inspect the stable final state. The earlier reported contrast issue was a transient mid-animation measurement, not a confirmed static colour-token defect.

### What this does not prove

- The live smoke test covers the homepage and four company hubs, not all 22 deep case pages on the public deployment.
- Automated axe scans are not a full manual accessibility certification; keyboard, screen-reader, and touch testing still needs broader review.
- Third-party YouTube/LinkedIn destinations and every external image/video were not exhaustively tested.
- Lighthouse/Core Web Vitals and performance profiling remain open.
- Content-source validation for evidence-dependent claims, especially Jalan, remains separate from browser QA.

### Phase-6 status after this loop

**Improved but not signed off.** Source-level checks and repeatable desktop/mobile browser tests now pass. Live homepage/hub smoke checks and selected WCAG scans also pass. Keep final sign-off open until deep-page live coverage, external media/destination checks, broader manual accessibility review, and performance testing are complete.


## Expanded live-page regression checkpoint — 14 October 2026

- **Merged:** [PR #74](https://github.com/jalak-patel-190/jalak-portfolio/pull/74).
- Successful browser run: [38516101853](https://github.com/jalak-patel-190/jalak-portfolio/actions/runs/38516101853).
- Result: **68 passed, 2 desktop-only skips by design**.
- Expanded the mobile document-overflow test from five entry pages to all 27 primary pages. All passed.
- Expanded the live GitHub Pages smoke test from the homepage and four company hubs to all 27 primary pages. Every route returned HTTP 200, contained exactly one H1 and a skip link, and the crawl recorded no uncaught JavaScript errors.
- The five-page axe-core WCAG 2.1 A/AA scan still passed on desktop and mobile; the five company/hub mobile navigation checks still passed.
- The test covers the 27 primary pages, not the four legacy routes or custom 404 route. Legacy-route/404 behavior remains in the source audit but has not yet received the same live browser crawl.

### Updated Phase-6 status

Automated source and live browser coverage now includes all 27 primary pages, mobile page-level overflow checks, navigation behavior on five entry pages, and axe-core scans on five entry pages. Final sign-off remains open for legacy routes/404 live behavior, external destination/media reachability, manual screen-reader/keyboard/touch review, and Lighthouse/Core Web Vitals.


## Legacy-route, custom-404 and local-media regression — 14 October 2026

- **Merged:** [PR #75](https://github.com/jalak-patel-190/jalak-portfolio/pull/75).
- **Successful browser run:** [38516344601](https://github.com/jalak-patel-190/jalak-portfolio/actions/runs/38516344601).
- **Result:** 74 passed, 2 desktop-only skips by design.
- All 27 primary pages passed the live deployment smoke test and mobile document-overflow check.
- All local image and video source URLs referenced by the 27 primary pages returned HTTP 200.
- All four legacy routes redirected to their intended canonical company hubs.
- The live custom 404 page returned HTTP 404, displayed the expected page-not-found heading, and retained a skip link.
- The five-page axe-core WCAG 2.1 A/AA scans and five-entry-page mobile navigation tests remained passing.

### Remaining Phase-6 work

The automated suite now covers primary-page live availability, local media, legacy redirects, custom 404 behavior, mobile overflow and selected accessibility rules. Still outstanding: external YouTube/LinkedIn destination and third-party thumbnail/video reachability, broader manual keyboard/touch/screen-reader checks, Lighthouse/Core Web Vitals, and a final human review of evidence-dependent claims (especially Jalan).


## Latest verified deployment QA and Lighthouse checkpoint — 14 October 2026

- **Deployed commit:** `f727b308d82a066c1fa81102dec764e84a262d7e`.
- **Pages deployment:** [38519206459](https://github.com/jalak-patel-190/jalak-portfolio/actions/runs/38519206459) succeeded.
- **Browser QA and Lighthouse:** [38519206514](https://github.com/jalak-patel-190/jalak-portfolio/actions/runs/38519206514) succeeded.
- **Browser result:** 120 passed, 2 desktop-context skips by design because the skipped checks are mobile-only.
- All 27 primary pages passed live Chromium desktop/mobile smoke checks; all local image/video references served by the local test server returned HTTP 200; the live deployment crawl did not exhaustively fetch every media URL from the published host; all 27 pages passed the mobile document-overflow check; all four legacy routes redirected to their intended company hubs; the custom 404 returned HTTP 404; the audit report and selected QA/source paths tested by CI returned HTTP 404 rather than being published.
- axe-core WCAG 2.1 A/AA scans passed on all 27 primary pages in desktop and mobile Chromium. Mobile navigation open/Escape/focus-return checks passed on the homepage and four company hubs. These are automated checks, not a manual accessibility certification.

### Lighthouse results (one lab run per page)

| Page | Performance | Accessibility | Best Practices | SEO |
|---|---:|---:|---:|---:|
| Homepage | 92 | 100 | 100 | 100 |
| Ajmera hub | 97 | 100 | 100 | 100 |
| Cinekorn hub | 99 | 100 | 100 | 100 |
| Jalan hub | 96 | 100 | 100 | 100 |
| Swad hub | 99 | 100 | 100 | 100 |

FCP ranged 1.6–2.6 s, LCP 1.6–2.7 s, TBT was 0 ms and CLS 0–0.03 in this sample. Lab scores vary by run; no field Core Web Vitals result is claimed.

### Performance backlog

Lighthouse flagged render-blocking Google Fonts CSS and large images. Specific repository assets include `media/swad/DSC02610.JPG` (3,145,728 bytes), `media/cinekorn/yt-movies.png` (922,363 bytes), `media/cinekorn/yt-kannada.png` (979,444 bytes) and `media/cinekorn/cinekorn-logo.png` (192,880 bytes). Next image work should create smaller preview derivatives for cards and retain the original full-resolution evidence on deep case pages. Lighthouse savings estimates are per-page and overlap; do not sum them as a site-wide total.

### Remaining before final sign-off

1. YouTube thumbnail reachability passed for 31 unique URLs in run [38520451454](https://github.com/jalak-patel-190/jalak-portfolio/actions/runs/38520451454). Still test LinkedIn/Instagram destinations, actual video playback, and thumbnail-to-video matching.
2. Complete manual keyboard, touch and screen-reader review, plus a human contrast review of chart labels and component states.
3. Evaluate responsive image derivatives and non-blocking font loading, then rerun Lighthouse to verify any improvement.
4. Keep Jalan evidence-dependent metrics blocked until the source tracker/report is supplied. Do not invent counts, ROI, sales attribution or team productivity.

**Status:** Phases 1–5 are complete for the approved scope. Phase 6 is substantially advanced and automated regression is passing on the deployed commit, but final sign-off remains open for external media, manual accessibility, performance optimization and factual evidence follow-up.


## Third-party thumbnail reachability checkpoint — 14 October 2026

- **Run:** [38520451454](https://github.com/jalak-patel-190/jalak-portfolio/actions/runs/38520451454), post-deployment browser QA.
- The suite collected thumbnail URLs from the published HTML of all 27 primary pages and checked 31 unique YouTube thumbnail URLs.
- **Result:** 31 confirmed image responses; zero confirmed failures; zero inconclusive responses.
- This establishes endpoint response and image content for those URLs at test time. It does not confirm the thumbnail matches the intended video, video playback, or LinkedIn/Instagram destination reachability.
- Those remaining checks stay open; no visual or case-study content changes were made.


## Latest deployed regression and Lighthouse checkpoint — 14 October 2026

- **Main commit:** `b579c729c5738ba6fc541c529b2dee5e0ff252ff` — mobile menu keyboard-focus QA test.
- **Post-deployment run:** [38521538328](https://github.com/jalak-patel-190/jalak-portfolio/actions/runs/38521538328) succeeded for the current main commit.
- **Browser suite:** 125 passed, 3 skipped by test configuration; the mobile-only menu-focus check is intentionally skipped in desktop context and passes in mobile context. The keyboard skip-link visibility test passes across all 27 primary pages.
- **External thumbnail check:** 31 unique YouTube thumbnail URLs; 31 image responses, zero confirmed failures, zero inconclusive results. This confirms endpoint responses only, not thumbnail identity or playback.
- **Latest single-run Lighthouse scores:**

| Page | Performance | Accessibility | Best Practices | SEO | FCP | LCP | TBT | CLS |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Homepage | 92 | 100 | 100 | 100 | 2.6 s | 2.7 s | 0 ms | 0.000 |
| Ajmera hub | 96 | 100 | 100 | 100 | 1.7 s | 2.6 s | 0 ms | 0.002 |
| Cinekorn hub | 99 | 100 | 100 | 100 | 1.7 s | 1.7 s | 0 ms | 0.004 |
| Jalan hub | 96 | 100 | 100 | 100 | 1.6 s | 2.7 s | 0 ms | 0.002 |
| Swad hub | 99 | 100 | 100 | 100 | 1.7 s | 1.7 s | 0 ms | 0.031 |

- Lighthouse is a single lab run per URL; scores and timing vary between runs. These results do not establish field Core Web Vitals.
- **Next batch:** examine oversized images and render-blocking Google Fonts, then make targeted, reversible changes only where source inspection confirms they are safe. Preserve original analytics/evidence images on deep case pages.
- **Still open:** manual keyboard/touch/screen-reader and human contrast review; LinkedIn/Instagram destination checks; actual video playback and thumbnail identity; Jalan evidence-dependent claims.


## YouTube thumbnail-to-target consistency — 14 October 2026

PR [#86](https://github.com/jalak-patel-190/jalak-portfolio/pull/86) added a test-only browser regression check across the 27 primary pages. In run [38524093421](https://github.com/jalak-patel-190/jalak-portfolio/actions/runs/38524093421), 123 tests passed and 7 were skipped by configuration. No mismatches were found between YouTube thumbnail IDs and linked target video IDs for eligible `a.output-card` pairs. This does not validate intended-video identity, actual playback or LinkedIn/Instagram reachability.


## Closure checkpoint — 15 October 2026

- PR [#90](https://github.com/jalak-patel-190/jalak-portfolio/pull/90) merged; the unverified “43 dates planned across seven months” claim was replaced with “Seasonal festival planning”.
- Post-merge run [38685901558](https://github.com/jalak-patel-190/jalak-portfolio/actions/runs/38685901558): browser QA passed, 127 passed and 3 skipped. Desktop/mobile automated WCAG scans passed across the 27 primary pages. Lighthouse passed. Pages deployment [38685900996](https://github.com/jalak-patel-190/jalak-portfolio/actions/runs/38685900996) succeeded.
- Still open: external social-link reachability and manual destination confirmation; intended video identity/playback; manual keyboard, touch and screen-reader review; human contrast review; image/font optimization decision and retest; factual evidence boundaries for Jalan claims.
- Automated checks are not certification. Lighthouse is a lab snapshot, not field Core Web Vitals.


## YouTube target availability regression — 15 October 2026

- **Merged:** [PR #91](https://github.com/jalak-patel-190/jalak-portfolio/pull/91), squash merge commit `9e04adfb10a9b9ecd29ceb6aa8ca32dee781df2a`.
- Added a post-deployment check that collects unique linked YouTube video targets from the 27 primary pages and queries public oEmbed metadata.
- Confirmed unavailable/private targets (HTTP 400, 401 or 404) fail the test. Rate limits, other response statuses and network errors are logged as inconclusive rather than incorrectly treated as broken videos.
- PR validation passed: [workflow run 38696178810](https://github.com/jalak-patel-190/jalak-portfolio/actions/runs/38696178810). Browser QA and Lighthouse jobs both succeeded.
- **Not yet verified:** the post-merge Pages deployment and the first live run of the new external-media check. PR validation intentionally skips the live-only check; the result must be read from a successful post-deployment run before claiming the YouTube targets were audited.
- Remaining Phase-6 items are unchanged: confirm live external-media results; manually verify intended video identity/playback and LinkedIn/Instagram destinations; complete broader keyboard, touch, screen-reader and human contrast review; decide on responsive image/font optimization and retest; preserve evidence limits on Jalan claims.
