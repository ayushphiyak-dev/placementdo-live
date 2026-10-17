// Shared by the interactive homepage and its initial HTML response.
// Keep this authored markup free of user input.
export const homeTitle = "PlacementDo — Practical Interview Preparation";
export const homeDescription = "Free interview preparation guides, worked examples, and self-review exercises. Explore a clearly labelled product demo; live AI interviews and payments are not available.";
export const homeContent = `
<main class="pd-learning-home" id="main-content">
  <section class="pd-learning-hero">
    <p class="pd-learning-eyebrow">PLACEMENTDO · LEARN, PRACTISE, REVIEW</p>
    <h1>Prepare an answer.<br>Understand why it works.</h1>
    <p>Free preparation guides for students and early-career candidates. Work through a question, check your reasoning, and leave with a specific improvement for your next attempt.</p>
    <nav aria-label="Start preparing"><a class="btn-primary" href="/blog">Explore the guides →</a><a class="btn-secondary" href="#practice-exercise">Try a 20-minute exercise</a></nav>
  </section>
  <section id="features-section">
    <h2>Choose the problem you need to solve</h2>
    <div class="pd-learning-grid">
      <article><h3>“I know the topic, but freeze when explaining it.”</h3><p>Start with a short project explanation. State the problem, your contribution, one trade-off, and the result. Have someone ask a follow-up you did not prepare.</p><a href="/blog/top-5-behavioural-interview-mistakes">Structure an answer without memorising a script →</a></article>
      <article><h3>“I solve questions, but repeat the same mistakes.”</h3><p>Separate a concept gap from a reading error or a rushed calculation. Practising more questions will not fix a misunderstood rule until you revisit the rule itself.</p><a href="/blog/aptitude-test-preparation-guide">Build an aptitude error log →</a></article>
      <article><h3>“My code passes the example, then fails.”</h3><p>Trace an empty input, a duplicate, a boundary value, and an input that breaks your assumption. Explain both the algorithm and why those tests matter.</p><a href="/blog/data-structures-interview-questions">Study worked coding examples →</a></article>
    </div>
  </section>
  <section id="practice-exercise" class="pd-learning-exercise">
    <p class="pd-learning-eyebrow">A WORKED PRACTICE SESSION</p><h2>Turn a vague project claim into evidence</h2>
    <p>You do not need an account, a subscription, or an AI interviewer for this exercise. Use a timer and a sheet of paper. The example below is fictional: use it to understand the method, not as a story to claim as your own.</p>
    <ol>
      <li><strong>Minutes 0–3: choose one real contribution.</strong> Write what you personally changed in a coursework, volunteer, or personal project. Avoid “we built an application” without identifying your own part.</li>
      <li><strong>Minutes 3–7: explain a decision.</strong> Describe two options you considered. State why one fit the actual constraints. If there was no formal comparison at the time, say that honestly rather than inventing a decision process.</li>
      <li><strong>Minutes 7–11: add evidence.</strong> Use a test result, a reproducible observation, or feedback you really received. A modest result with a clear method is more useful than a large number you cannot defend.</li>
      <li><strong>Minutes 11–15: answer a follow-up.</strong> Ask: “What would fail with ten times the load?” Identify a limit instead of pretending your solution is universal.</li>
      <li><strong>Minutes 15–20: repeat and compare.</strong> Give the answer again in 90 seconds. Check whether your contribution, decision, evidence, and limitation are each clear. Keep the first and second versions so you can inspect the change.</li>
    </ol>
    <h3>Before: a claim without enough detail</h3><blockquote>“I improved the performance of our library app and made it much faster.”</blockquote>
    <h3>After: a bounded, testable explanation</h3><p>“In our coursework library app, I changed the book-search endpoint so it queried only the fields used in the results list. On my laptop, using the same 1,000-record fixture and ten repeated searches, the median response time fell from 240 ms to 150 ms. That is a 90 ms reduction, or 37.5% of the original time. This was a local test, not proof of production performance. Next I would test concurrent requests and a larger dataset.”</p>
    <p>The stronger answer names the change and the test conditions. It also admits what the evidence cannot establish. The calculation is (240 − 150) ÷ 240 × 100 = 37.5%; do not confuse that latency reduction with a universal claim that every user task became 37.5% faster.</p>
    <h3>Check your own answer</h3><ul><li>Can a listener distinguish your work from the team's work?</li><li>Can you explain how the result was measured or observed?</li><li>Can you name an alternative and one limitation?</li><li>Can you answer a follow-up without reading your notes?</li></ul>
    <p>These questions are a self-review checklist, not a hiring score. If you cannot answer one, choose that gap for tomorrow's practice. Do not rewrite a weak example into a fictional achievement.</p>
  </section>
  <section id="pricing-section"><h2>What is available today?</h2><p>The written guides are free to read without an account. The dashboard and interactive tour are product demonstrations with sample profiles, questions, transcripts, credits, and reports. They do not provide a live AI interview, personal assessment, or a paid plan. No launch date is promised.</p><p><a href="/demo">View the product walkthrough</a> · <a href="/dashboard">Explore the sample workspace</a></p><p>For employer-specific requirements, verify the current vacancy and assessment invitation. We are not affiliated with the employers discussed in our guides and cannot guarantee an interview or offer.</p></section>
  <section><h2>How to read our guides</h2><p>Examples are teaching illustrations, not verified candidate experiences unless explicitly identified as such. Product descriptions should distinguish working features from demonstrations. If you find an incorrect calculation, outdated process, or unsupported claim, send the page URL and the correction to <a href="mailto:support@placementdo.app">support@placementdo.app</a>. A publication date is not a promise that every employer's process remains unchanged.</p><p><a href="/about">About this project</a> · <a href="/privacy-policy">Privacy policy</a> · <a href="/faq">Common questions</a></p></section>
</main>`;
