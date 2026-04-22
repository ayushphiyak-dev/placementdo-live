/**
 * PageHero — hero section for SEO content pages.
 */
const STYLES = `
  .page-hero {
    padding: clamp(60px,10vh,100px) clamp(20px,5vw,60px) clamp(48px,8vh,80px);
    text-align: center; position: relative; overflow: hidden;
    background: var(--ivory);
  }
  .page-hero-bg {
    position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
    width: 900px; height: 600px; pointer-events: none;
    background: radial-gradient(ellipse, rgba(13,148,136,.08) 0%, transparent 70%);
  }
  .page-hero-inner { position: relative; max-width: 860px; margin: 0 auto; }
  .page-hero-tag {
    display: inline-flex; align-items: center; gap: 6px;
    background: var(--teal-light); color: var(--teal-dark);
    font-size: 11.5px; font-weight: 700; letter-spacing: 0.07em;
    text-transform: uppercase; padding: 5px 14px; border-radius: 999px;
    margin-bottom: 22px; border: 1px solid rgba(13,148,136,.2);
  }
  .page-hero-heading {
    font-size: clamp(36px,6vw,68px); font-weight: 800; line-height: 1.06;
    letter-spacing: -0.03em; color: var(--slate); margin: 0 0 20px;
  }
  .page-hero-sub {
    font-size: clamp(15px,2vw,18px); color: var(--slate-500);
    max-width: 640px; margin: 0 auto 32px; line-height: 1.68;
  }
  .page-hero-ctas { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
`;

export default function PageHero({ tag, heading, subheading, ctaButtons }) {
  return (
    <>
      <style>{STYLES}</style>
      <section className="page-hero">
        <div className="page-hero-bg" />
        <div className="page-hero-inner fade-in-up">
          {tag && <div className="page-hero-tag">{tag}</div>}
          <h1 className="brig page-hero-heading">{heading}</h1>
          {subheading && <p className="page-hero-sub">{subheading}</p>}
          {ctaButtons && ctaButtons.length > 0 && (
            <div className="page-hero-ctas">
              {ctaButtons.map((btn, i) => (
                <button
                  key={i}
                  className={i === 0 ? "btn-primary" : "btn-secondary"}
                  onClick={btn.onClick}
                  style={{ fontSize: 14, padding: "11px 22px" }}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
