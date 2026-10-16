# Recorded-flow fixes

Reviewed the supplied 1.mp4 (2:28) and 2.mp4 (0:09) through timeline samples and focused frames.

## Root causes and changes

- Interview startup: the elapsed timer rendered the parent every second, replacing `onReady`, so the loading effect repeatedly cancelled its 3.8-second completion timer. Use a stable callback and start elapsed time only after loading. Ignore keyboard shortcuts in editable controls.
- Header CTA: inline `background: none` overrode the primary button class. Remove presentation overrides from the shared anchor style.
- Route flash: Suspense displayed a long unrelated article between routes. Use a compact branded loading state and remove the whole-page exit fade. Existing static article generation is retained.
- Checkout: collected card data and simulated success with timers, without a payment provider. Replace with an honest unavailable notice in a native modal dialog, portaled outside animated ancestors. Escape closes it and the body scroll lock is restored.
- Waitlist: previously showed success without contacting an API. POST to the existing endpoint, retain the address on failure, and require explicit storage confirmation. Portal the confirmation overlay outside transformed ancestors.
- Demo: both CSP policies blocked the configured Storylane iframe. Allow only its exact origin in frame-src.
- Support: replace random replies with deterministic, explicitly local help. Feedback opens an email draft and never claims delivery. Preserve the user's draft.
- Clearly identify sample dashboard and interview data.

## Verification

- Production build, JSX binding guard, public navigation guard, video regression tests pass.
- Blog output verification passes: all 34 article links, single H1, retained analytics, executable worked examples.
- Browser: header CTA has teal background/white text; dashboard starts interview and reaches the room; notes accept spaces/arrows without muting or advancing questions; checkout is opaque white, 520px wide at 1280px viewport, and Escape removes it; Storylane iframe renders its Start Demo dialog without console errors.
- API tests mock upstream success, HTTP failure, negative acknowledgement, and an HTTP-200 HTML/login response. No real address was submitted to the production waitlist.

## Deployment / remaining limitations

- These changes require merging and deploying the PR; local tests do not modify production.
- Google Apps Script must return JSON `success: true`, `status: "success"`, or `result: "success"` only after storage succeeds. Verify that contract in the deployed script. An HTTP-200 login page is intentionally rejected.
- Real payments, account authentication in the legacy UI, and live AI interview processing are not implemented by this patch. Their sample UI must not be mistaken for working backend integrations.
- The large legacy InterviewAI module still has pre-existing lint violations; build and regression guards pass. This is not a claim of a clean whole-repository lint run or guaranteed AdSense approval.
