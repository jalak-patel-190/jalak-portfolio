# Portfolio Website Audit Report

**Site:** https://jalak-patel-190.github.io/jalak-portfolio/  
**Repository:** `jalak-patel-190/jalak-portfolio`  
**Audit date:** 13 October 2026  
**Scope:** Source-level technical, content accuracy, navigation, accessibility and conversion review. The existing visual theme is to be preserved.

## Executive summary

The portfolio has a coherent multi-page structure: a homepage, four company hubs and individual case-study pages. The current design direction is usable as a foundation. The main risks found in this pass are not reasons for a visual redesign. They are unsupported numerical claims, unclear attribution, a few case descriptions that overstate what the available archive verifies, and the absence of browser-based QA.

The first controlled accuracy and accessibility batch was merged into `main` in pull request #2. The second evidence-accuracy batch was merged in pull request #29. Legacy route redirects and the themed 404 page were merged in pull request #30. Ajmera evidence-framing corrections were merged in pull request #31.

**Design constraint:** preserve the current typography, palette, spacing, cards, page structure and company-specific styling. Prefer precise copy, clear evidence labels and small accessibility improvements over a redesign.

## Priority definitions

- **P0 - Critical:** broken core navigation, inaccessible main content, severe factual/legal risk, or a page that cannot be used.
- **P1 - High:** materially misleading claim, incorrect role/date, or major conversion/accessibility problem.
- **P2 - Medium:** unclear attribution, weak evidence labelling, discoverability or responsive/accessibility issue.
- **P3 - Low:** polish and optional improvements.

## Issue register

| ID | Priority | Finding | Action / status |
|---|---|---|---|
| FACT-001 | P1 | Homepage previously used the unresolved `+20.3%` Ajmera claim and a six-language headline, both of which were flagged as unverified in the master archive. | Removed from homepage in merged batch 1. |
| FACT-002 | P1 | Homepage role/date labels did not consistently match the verified timeline. Swad's title must remain **Social Media Manager & Content Lead**; Jalan runs through November 2024. | Corrected in merged batch 1. |
| CTA-001 | P1 | The homepage's primary action should support the user's preferred contact-first path. | **Get In Touch** is now the primary hero CTA; case studies are secondary. Merged batch 1. |
| ATTR-001 | P1 | Cinekorn's lifetime channel views can be mistaken for work published during the user's tenure. | Homepage now labels 108M+ as lifetime YouTube views across six channels and explains the legacy/tenure split. Merged batch 1. |
| CINE-001 | P1 | Movies catalogue operations and Gujarati multi-format distribution had been combined, obscuring the difference between inherited catalogue performance and work distributed during tenure. | Split into Case 03 and Case 04, with corrected navigation and proportionally scaled Radha Tara comparison bars. Merged batch 1. |
| FACT-003 | P1 | Jalan hub claimed 70 influencers, four tele-calling agents and 43 festival dates. The available Jalan master archive explicitly says the relevant counts were not supplied. | Removed those figures from the hub in batch 2. |
| FACT-011 | P1 | Jalan Case 04 still displayed `43 planned dates` after the hub-level cleanup, even though the available archive does not verify that count. | Removed the number and retained a qualitative description of the festival/campaign calendar in merged pull request [#35](https://github.com/jalak-patel-190/jalak-portfolio/pull/35). The source archive remains the authority for restoring any count. |
| FACT-012 | P2 | Cinekorn hub described the founder's LinkedIn profile and the company LinkedIn page as “two LinkedIn pages,” which is technically inaccurate. | Updated the scope sentence to distinguish the founder's profile from the company page in merged pull request [#40](https://github.com/jalak-patel-190/jalak-portfolio/pull/40). |
| FACT-004 | P1 | Jalan Case 01 claimed 10 to 15 channels/pages, which is not supported by the available archive. | Replaced the count with a qualitative description of the channel network in batch 2. |
| FACT-005 | P1 | Jalan influencer and tele-calling pages contained booking counts, spend totals and bill totals that the available master archive does not verify. The archive also says influencer totals and tele-calling team size/productivity were missing. | Removed the unsupported figures and added clear evidence boundaries in batch 2. Restore numeric claims only after checking the underlying tracker/report. |
| FACT-006 | P1 | Ajmera hub compared regional subscriber growth against a 10.9% main-channel figure not present in the available master archive. | Removed the comparison; retained the verified Telugu (+32.4%) and Tamil (+31.6%) figures with the Dec 2022 to Jun 2023 date range in batch 2. |
| FACT-007 | P2 | Swad's farewell livestream summary described six chefs. The archive records six named participants across five groupings, and specifies a duration of 5 hours 34 minutes. | Changed the hub summary and individual case page to 5h 34m, 20 recipes and six named participants in batch 2. |
| FACT-008 | P2 | Swad's hub label “Sneha channel growth” could imply a verified growth result, while the case page explicitly avoids an unverified end-state total. | Renamed the hub teaser to “Sneha channel strategy” and clarified the starting point in batch 2. |
| ATTR-002 | P2 | Rakhewal's 163-piece total is made up of one full YouTube release, 14 re-cut parts and 148 Shorts. The adjacent Facebook work is a separate distribution surface. | Clarified the 163-piece labels as YouTube-only in batch 2. |
| FACT-009 | P2 | Ajmera's tracker case could read as if a like-for-like aggregate comparison had already been verified, despite the unresolved combined percentage. | Reframed it as a method for comparing account lists, date windows and metric definitions; the account count is now labelled as tracked, not compared. Batch 4. |
| FACT-010 | P2 | Ajmera hub combined nine public videos across the business-education/trust case and the separate CEO personal-brand case, making the case-specific evidence count ambiguous. | Changed the Case 03 result label to four public examples across two content tracks. Batch 4. |
| FACT-013 | P2 | Two case narratives used an unsupported time estimate for manual data classification and described Swad's highest-ticket diploma as the “biggest revenue course,” which is not the same claim. | Removed the unverified “several days” estimate and replaced “biggest revenue course” with the archive-supported “highest-ticket course.” Updated in the current content-accuracy batch. |
| A11Y-001 | P2 | Skip links, navigation toggles and motion preferences need explicit support. | Batch 1 added navigation toggle relationships, reduced-motion handling and manual control of the homepage proof carousel. Existing shared styles already include visible-on-focus skip links. |
| SEO-001 | P2 | Social preview copy should match the revised positioning and not repeat outdated claims. | Homepage Open Graph and Twitter metadata updated in merged batch 1. |
| SEO-002 | P2 | Ajmera, Jalan and Swad hubs and deep cases lacked page-specific social-sharing metadata. | Added page-specific Open Graph and Twitter card metadata to all 19 pages in merged pull request [#45](https://github.com/jalak-patel-190/jalak-portfolio/pull/45). Existing title, description and canonical URL are reused; images are used only where the page already has an evidence image. Pages without one use a text-only summary card. Actual social-platform rendering remains unverified. |
| SEO-003 | P2 | Social metadata needed a full canonical-page consistency check after rollout. | Static validation checked all 27 canonical pages: every page has Open Graph and Twitter title/URL metadata; each `og:url` matches the canonical URL; Open Graph and Twitter titles match; image tags are paired consistently. Pages without a suitable image correctly use `summary` cards. Live card rendering is still unverified. |
| SEO-004 | P2 | Some Ajmera and Jalan case pages used generic page titles such as “Case 01,” reducing search and share-preview clarity. | Replaced generic titles with descriptive, evidence-aligned page titles and synchronized Open Graph/Twitter titles in merged pull request #50. No page body or visual styling changed. |
| ROUTE-001 | P2 | Previous portfolio URLs such as `case-studies/ajmera.html`, `swad.html`, `jalan-megamart.html` and `cinekorn.html` are not present in the current tree. Older links may still point to them. | Merged in pull request #30: added lightweight redirect pages to the current company hubs and a themed 404 fallback. |
| QA-001 | P1 | GitHub Pages deployment workflow completed successfully for current `main` commit `6094c85c730a90f68a919bcb7ffffe3b66e1d14a` (build and deploy jobs succeeded in run [38369532939](https://github.com/jalak-patel-190/jalak-portfolio/actions/runs/38369532939), 13 October 2026). A browser/search snapshot still showed older homepage content and cache-busted deep-page fetches were inaccessible in this review environment, so the live rendered HTML and browser behavior have not been independently verified. | Latest source commit build/deployment workflow is green. Real-browser confirmation remains open; do not infer live rendering from the build alone. |
| QA-002 | P1 | No real browser/device run has been completed in this audit. | Open. Desktop and mobile visual QA, keyboard-only testing, focus visibility, carousel interaction, and menu behaviour still need hands-on verification. |
| QA-003 | P2 | External YouTube thumbnails, Instagram embeds/links and LinkedIn links have not all been checked live. | Open. Test external destinations and image loading; do not treat source-level link checks as proof that external services are available. |
| PERF-001 | P2 | Lighthouse, Core Web Vitals, image-weight and network performance have not been measured. | Open. Run Lighthouse on the deployed site after deployment is confirmed. |
| CONTRAST-001 | P2 | Full-page contrast testing is still outstanding. Common body, muted-text, link and CTA token pairs were checked from source colors; rendered chart labels, all focus states and component-specific combinations remain unverified. | CTA gradient endpoints provide 5.18:1 to 5.49:1 with white text. A follow-up check found the apparent low-contrast Cinekorn `--series-4` color was declared but not referenced by current CSS or case-page markup, so changing it did not affect rendered charts. The attempted token change is being reverted rather than counted as a fix. Full rendered-page contrast checks remain open. |
| ALT-001 | P2 | Presence of alt attributes was checked, but semantic match between each description and its image has not been manually reviewed. | Open. Visually inspect images and confirm alt text describes the actual image, not an assumed purpose. |
| A11Y-002 | P2 | Two Ajmera output carousels used smooth scrolling regardless of the visitor's reduced-motion setting. | Updated both carousels to use immediate scrolling when `prefers-reduced-motion: reduce` is active. Merged in pull request #32. |

## Source-level checks completed

A static source audit covered the 27 core HTML pages. The four legacy redirect pages and root 404 page were checked separately. The core pages had:

- A page title, meta description and canonical URL.
- Exactly one H1 heading.
- No broken local file references found by the static path check.
- No missing in-page anchor targets found by the static anchor check.
- No duplicate IDs found by the static ID check.
- No images missing an `alt` attribute in the reviewed source.
- No missing local CSS or JavaScript resources found by the static reference check.

These checks confirm source-level consistency only. They do not confirm that the deployed page renders correctly, that external media loads, or that a control works in a real browser.

## Accuracy rules to keep

1. **Lifetime channel total is not personal tenure output.** Keep legacy catalogue views separate from views on content published during the role.
2. **Do not claim causality from a before/after comparison alone.** This especially applies to Facebook posting volume and views.
3. **Keep platform and channel labels attached to metrics.** Separate Swad Cooking Institute from Chef Sneha Thakkar Recipes; do not combine channel totals without a reproducible method.
4. **Do not publish unsupported counts.** This applies to languages, account totals, influencer bookings, team sizes, channel counts and festival dates.
5. **Keep official employment titles and dates.** Describe wider responsibility in the narrative without inventing a formal title.
6. **A source caveat is not a substitute for a source.** Restore disputed numbers only after checking the original export or report.
7. **Keep the role visible.** Distinguish direct execution, coordination, and work produced with designers, editors, PR, HR or other colleagues.

## Implementation sequence

### Batch 1 - merged
- Homepage positioning and contact-first CTA.
- Removal of unverified homepage metrics.
- Career timeline corrections.
- Cinekorn case split and navigation corrections.
- Reduced-motion and navigation accessibility improvements.
- Social preview metadata updates.

### Batch 2 - merged in pull request #29
- Removed unverified Jalan hub and case-page counts.
- Replaced unsupported Jalan influencer/spend/bill claims with an evidence boundary.
- Removed the unsupported Ajmera 10.9% comparison.
- Aligned Swad livestream participant wording and removed the implication of an unverified growth result.
- Clarified that the Rakhewal 163-piece count is YouTube-only.

### Batch 3 - merged in pull request #30
- Added legacy URL redirects for the previous Ajmera, Swad, Jalan and Cinekorn hub paths.
- Added a themed `404.html` page with links to the homepage and all four company hubs.
- Verified that each redirect target exists and the sitemap still contains 27 canonical page URLs, excluding redirects.
- These additions do not change the homepage or case-study visual system.

### Batch 4 - merged in pull request #31
- Reframed Ajmera tracker case as a comparison method, not a verified like-for-like aggregate result.
- Labelled the approximately fifty accounts as tracked, not confirmed as a matched comparison set.
- Kept Ajmera Case 03's four public examples separate from the five CEO personal-brand examples in Case 06.

### Batch 5 - merged in pull request #32
- Updated the Ajmera corporate-content and CEO personal-brand carousels to respect `prefers-reduced-motion`.
- Checked the other case-page carousel scripts; those reviewed already used reduced-motion-aware scrolling or did not use smooth scrolling.
- No visual styling changes.

### Batch 6 - merged directly to `main`
- Darkened only the CTA color tokens in Ajmera and Jalan to improve white-text contrast while preserving the existing orange and orange-rose color direction.
- Checked the gradient endpoints: Ajmera 5.18:1 to 5.41:1; Jalan 5.41:1 to 5.49:1.
- Layout, typography, spacing and card structure were not changed.
- Full-page contrast and focus-state testing remains open.

### Batch 7 - correction merged in pull request #36
- Post-merge validation found that the Cinekorn `--series-4` token changed in PR #33 is declared but never referenced by current CSS or case-page markup.
- That token change therefore had no visible effect and should not be counted as an accessibility fix.
- The original token was restored in merged pull request [#36](https://github.com/jalak-patel-190/jalak-portfolio/pull/36). No rendered chart, layout, typography, spacing or theme change is intended.
- Full rendered-page contrast and focus-state testing remains open.

### Batch 8 - merged in pull request #45
- Added page-specific Open Graph and Twitter metadata to the Ajmera, Jalan and Swad company hubs and all 16 of their deep case studies.
- Each page uses its existing title, meta description and canonical URL; metadata is not a replacement for the source content.
- Used an existing page image only when one was already present. Pages without a suitable image use a text-only summary card rather than a fabricated or unrelated image.
- No CSS, JavaScript, colours, typography, spacing or layout changed.
- Static patch review confirmed 19 files changed, each with Open Graph and Twitter title/description/URL metadata. Cinekorn and the homepage already had page-specific metadata and were left unchanged.
- Actual LinkedIn/X card rendering and live image retrieval still require browser/platform verification.

### Batch 9 - content claim precision
- Removed an unsupported estimate that manual classification of 6,000–8,000 rows would have taken “several days.” The Cinekorn data-tooling case now states the supported workflow problem without guessing a time saved.
- Changed the Swad diploma description from “biggest revenue course” to “highest-ticket course,” matching the source record and avoiding an unsupported inference about total revenue.
- No metrics, design, layout, or theme were added or changed in this batch.

### Batch 10 - descriptive case-page titles
- Replaced generic “Case 01/02/…” title tags on four Ajmera and four Jalan case pages with descriptive titles based on their existing case headings.
- Synchronized each page's Open Graph and Twitter title with its HTML title.
- Kept canonical URLs, descriptions, case content, CSS, layout and theme unchanged.
- Static title checks are complete; search-engine indexing and live share-preview rendering remain outside this source-only verification.

### Final QA update - 13 October 2026
- Static social-metadata consistency was checked across all 27 canonical HTML pages after PR #45. No mismatch was found between canonical URL and `og:url`, or between Open Graph and Twitter titles; image metadata is paired consistently.
- GitHub Pages workflow [38369532939](https://github.com/jalak-patel-190/jalak-portfolio/actions/runs/38369532939) succeeded for current `main` commit `6094c85c730a90f68a919bcb7ffffe3b66e1d14a`.
- The review environment still returned a stale homepage snapshot and could not fetch cache-busted deep pages. This is not proof of a broken deployment, but it means live rendered output cannot be signed off here.

### Final QA - still required
1. GitHub Pages workflow success is confirmed for the current `main` commit; independently inspect the live homepage and representative deep case pages in a real browser because this environment did not return fresh rendered HTML.
2. Test the homepage and every company hub at desktop and mobile widths.
3. Test all internal links, previous/next links, breadcrumbs, legacy redirects and the back-to-portfolio path.
4. Test keyboard navigation, visible focus, skip links, mobile menu and horizontal carousels.
5. Check external media links and image loading.
6. Run Lighthouse and contrast checks on the deployed site.
7. Recheck all numerical claims against the master archives and any original spreadsheets before restoring a disputed figure.

## Sign-off status

**Not complete.** Multiple controlled accuracy, navigation, accessibility and routing batches are merged into `main`, including the follow-up removal of the unsupported Jalan calendar count. A chart-token change was reverted after source review showed the token was unused. The latest Pages build completed successfully, but live rendered output could not be independently verified here. Real browser/device QA remains open. No full redesign is proposed; the objective is a more accurate, accessible and credible version of the existing site.
