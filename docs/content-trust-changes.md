# Content and product-trust corrections

This change addresses specific unsupported claims and useful-content gaps. It does not certify the entire site for AdSense or guarantee a review outcome.

## Implemented

- Replace the promotional homepage with a free preparation hub and a timed, worked project-answer exercise. The fictional example is identified and its latency calculation is tested.
- Share the homepage body between React and Vite's initial HTML to avoid contradictory crawler-facing copy. Remove obsolete software-offer and invisible FAQ claims from structured data.
- Rewrite four product-focused posts. The former self-review explicitly identifies its first-party origin and corrects its unsupported verdict. Two concise product-status notes are identified as notes rather than padded to an arbitrary article length.
- Correct product capability claims in 16 additional guides, replacing them with specific peer/self-review exercises.
- Correct About, FAQ, demo, service-description copy, shared footer, homepage navigation, and seven guide-page calls to action. Public visitors are directed to working guides instead of an unconnected sign-in flow.
- Preserve existing article URLs, consent controls, analytics, branding assets, and generated static articles.

## Checks

Run npm run build, npm run audit:content, node scripts/verify-blog-output.mjs and node scripts/test-content-trust.mjs. Build includes claim-regression checks and validates shared homepage content.

Automated checks test consistency, calculations, markup and routing; they do not establish originality, editorial expertise, current employer requirements, or approval eligibility.

## Before another review

Merge and deploy, then inspect production pages rather than relying only on a preview. The owner should verify current employer-specific information, review remaining articles for accuracy and distinct value, and confirm privacy/retention statements against deployed services. Do not submit another AdSense review merely because the cooldown expires. Live payment, authentication and interview backends remain outside this content patch.
