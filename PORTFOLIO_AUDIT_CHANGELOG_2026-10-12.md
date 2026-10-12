# Portfolio Audit and Change Log
**Review date:** 12 October 2026  
**Repository:** `jalak-patel-190/jalak-portfolio`  
**Scope:** Homepage (`index.html`) and Cinekorn hub plus six Cinekorn case studies.  
**Out of scope:** Full content audit of Ajmera, Jalan and Swad case studies. Their backend work is still in progress.

## Executive verdict

The current source code has a coherent visual system and useful evidence-led case studies. The main improvements needed are not a new theme. They are clearer attribution, a stronger contact path, accurate work labels, better case-to-case navigation, and accessibility behavior that is predictable.

No confirmed P0 defect remains in the source-level checks completed for the scoped pages. This is **not final sign-off** because browser-rendered desktop/mobile QA and live deployment verification have not been completed.

## Change log

### Batch 1 — merged to `main`
Pull request: [#2 — Phase 1: Improve homepage accuracy and site accessibility](https://github.com/jalak-patel-190/jalak-portfolio/pull/2)

- Positioned the homepage around creative strategy for media and entertainment.
- Made **Get In Touch** the primary hero action and **View Case Studies** secondary.
- Clarified that 108M+ is lifetime YouTube views across six Cinekorn channels and includes pre-tenure catalogue performance.
- Removed the unresolved `+20.3%` and `6+ languages` homepage claims.
- Removed the broken resume CTA rather than linking to a PDF that is not available.
- Corrected the homepage chronology and the verified Swad role title.
- Kept the existing design direction instead of rebuilding the theme.
- Added visible skip-link styling, reduced-motion handling, manual carousel movement and navigation dismissal improvements.

### Batch 2 — merged to `main`
Pull request: [#20 — Phase 2: Improve Cinekorn case navigation and evidence accuracy](https://github.com/jalak-patel-190/jalak-portfolio/pull/20)

- Added two related-case cards to each Cinekorn deep dive, using existing evidence imagery and the current design system.
- Standardized the ending of all six Cinekorn case studies with a **View All Work** CTA.
- Added a **Continue Exploring** section to the Cinekorn hub linking to the other company hubs.
- Changed the Cinekorn hub's Case 01 thumbnail alt text from empty to a descriptive label.
- Changed the Case 04 hub thumbnail to Rakhewal analytics, a closer match for the case's main multi-format distribution example.
- Added Escape-key and outside-click dismissal to the homepage and Cinekorn navigation. The current dropdown design is retained.

### Batch 3 — merged to `main`
Pull request: [#21 — Accessibility: improve Cinekorn accent contrast](https://github.com/jalak-patel-190/jalak-portfolio/pull/21)

- Darkened the shared Cinekorn CTA and text-accent variables slightly while preserving the orange/plum palette.
- White text contrast at the two gradient endpoints increased from 3.54:1 and 3.95:1 to 5.41:1 and 5.49:1, above the 4.5:1 normal-text target.
- Chart-series colors were left unchanged.

### Batch 4 — merged to `main`
Pull request: [#22 — Content accuracy: standardize the Cinekorn role title](https://github.com/jalak-patel-190/jalak-portfolio/pull/22)

- Standardized the Cinekorn hub narrative to the verified title **Sr. Social Media Manager**.
- Confirmed the homepage already uses the verified Jalan title **Social Media Manager (with Ops Oversight)**; no change was needed there.

### Batch 5 — merged to `main`
Pull request: [#23 — Accessibility: improve Cinekorn focus and anchor behavior](https://github.com/jalak-patel-190/jalak-portfolio/pull/23)

- Added visible focus outlines to Cinekorn links, buttons and interactive chart cards.
- Preserved the focus outline on primary CTA buttons.
- Added sticky-header offsets to in-page target sections and the main landmark.
- Used the darker accent for focus outlines so the indicator remains visible without changing the design language.

### Batch 6 — merged to `main`
Pull request: [#24 — SEO: add share previews to Cinekorn case pages](https://github.com/jalak-patel-190/jalak-portfolio/pull/24)

- Added page-specific Open Graph and Twitter card metadata to the Cinekorn hub and all six deep dives.
- Reused existing evidence images, with descriptive image alt text and canonical page URLs.
- The source metadata is present; actual LinkedIn/X preview rendering still needs a post-deployment check.

## Prioritized issue register

| ID | Priority | Finding | Evidence/status | Action |
|---|---|---|---|---|
| QA-001 | P1 | Live deployment and real-browser behavior are not confirmed | Cannot verify in this review environment. GitHub source is available, but source checks are not a substitute for a live browser test. | After merge, open the deployed homepage, Cinekorn hub and all six cases on desktop and mobile. |
| QA-002 | P1 | Mobile navigation needs interaction testing | Source now closes the menu on link activation, Escape and outside click; real focus and touch behavior still need testing. | Test keyboard, touch, resize, anchor navigation and focus return on a real browser. |
| UX-001 | P2 | Deep case studies lacked a clear related-work path and a consistent final action | Verified in source: endings used a generic “Next step” area with only previous/hub/next buttons. | Batch 2 adds two related-case cards and a final View All Work CTA. |
| UX-002 | P2 | Cinekorn hub did not explicitly offer a “Continue Exploring” path to other companies | Verified in source: company links were present in navigation but there was no dedicated section at the end of the hub. | Batch 2 adds three company-hub cards without changing the page's visual system. |
| CONTENT-001 | P2 | A Cinekorn hub image was decorative to assistive technology despite depicting useful evidence | Verified in source: the Colab screenshot had an empty alt attribute. | Batch 2 adds a descriptive alt label. |
| CONTENT-002 | P2 | Cinekorn Case 04's hub thumbnail showed the Radha Tara comparison, while the case's primary example is the Rakhewal multi-format run | Verified in source. The existing image was relevant to a secondary example but less representative of the case-card summary. | Batch 2 switches the thumbnail to Rakhewal analytics. |
| SEO-001 | P3 | External YouTube and LinkedIn destinations may change or become unavailable | Not individually live-tested. | Check outbound links during final QA; do not infer they are broken from source alone. |
| PERF-001 | P3 | Lighthouse/Core Web Vitals and image transfer costs remain unmeasured | Cannot verify without a browser performance run. | Measure after the visual and content changes are merged; optimize only where measurements support it. |

## Static source checks completed

Reviewed the homepage, Cinekorn hub and six Cinekorn case pages on the Batch 2 branch.

- All 8 scoped HTML pages have a page title, meta description, canonical link and exactly one H1.
- No broken local file references or missing in-page anchor targets were found in the checked pages.
- No duplicate IDs or images missing an alt attribute were found.
- All new related-case image paths resolve to existing repository assets.
- All six deep dives now contain two related-case cards and a View All Work ending.
- The Cinekorn hub now contains three Continue Exploring company cards.
- The homepage no longer contains the unresolved `+20.3%` or `6+ languages` claims.
- Decorative logo images with empty alt attributes remain intentional where adjacent text already names the company.

These are source-level checks. They do not prove that every image renders in a browser, that external links still work, or that the live Pages deployment has updated.

## Final QA checklist — still required

- [ ] Confirm the merged commit is visible on the deployed GitHub Pages site.
- [ ] Check at approximately 375px, 768px and 1440px viewport widths.
- [ ] Open and close navigation with touch, keyboard, Escape, outside click and link activation.
- [ ] Confirm the skip link moves focus to the intended content.
- [ ] Confirm no horizontal overflow, clipped text, overlapping cards or hidden CTAs.
- [ ] Check the proof carousel with keyboard and touch, including reduced-motion preference.
- [ ] Check Cinekorn related cards and View All Work links from all six cases.
- [ ] Check external YouTube and LinkedIn links.
- [ ] Measure color contrast and run Lighthouse/Core Web Vitals.
- [ ] Compare all published metrics against the supplied source dashboards before any future content edits.

## What should not change unnecessarily

Keep the existing dark, restrained visual direction, typography, spacing language, evidence-first writing and separation between lifetime catalogue numbers and work published during the role. The aim is to make the site more accurate and easier to navigate, not to redesign it for novelty.

## Completion status

**Batch 1:** merged.  
**Batch 2:** merged.  
**Batch 3:** merged.  
**Batch 4:** merged.  
**Batch 5:** merged.  
**Batch 6:** merged.  
**Deployment/browser QA:** still pending.  
**Full website audit:** not complete. Only the homepage and Cinekorn are in the current detailed scope.
