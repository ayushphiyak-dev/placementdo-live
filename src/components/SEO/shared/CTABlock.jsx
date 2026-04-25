/**
 * CTABlock — full-width centered CTA section.
 */
const STYLES = `
  .cta-block {
    background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 20px; padding: clamp(40px,6vw,64px) clamp(24px,5vw,60px);
    text-align: center; margin: 64px 0;
  }
  .cta-block-heading {
    font-size: clamp(24px,4vw,40px); font-weight: 800; color: #fff;
    letter-spacing: -0.025em; margin: 0 0 12px; line-height: 1.15;
  }
  .cta-block-sub { font-size: 15.5px; color: rgba(255,255,255,.78); line-height: 1.65; margin: 0 0 28px; }
  .cta-block-btn {
    display: inline-flex; align-items: center; gap: 8px;
    background: linear-gradient(135deg, var(--teal), var(--teal-dark)); color: #fff; border: none; cursor: pointer;
    font-size: 15px; font-weight: 700; padding: 13px 28px; border-radius: 999px;
    transition: transform 0.15s, box-shadow 0.15s; font-family: 'DM Sans', sans-serif;
  }
  .cta-block-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(13,148,136,.3); }
`;

export default function CTABlock({ heading, subtext, buttonLabel, onNav, buttonHref = "/" }) {
  return (
    <>
      <style>{STYLES}</style>
      <div className="cta-block">
        <h2 className="brig cta-block-heading">{heading}</h2>
        {subtext && <p className="cta-block-sub">{subtext}</p>}
        <button
          className="cta-block-btn"
          onClick={() => onNav(buttonHref)}
        >
          {buttonLabel} →
        </button>
      </div>
    </>
  );
}
