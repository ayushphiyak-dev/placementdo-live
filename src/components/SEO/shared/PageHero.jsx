import MotionReveal from "./MotionReveal.jsx";
import useMagneticEffect from "./useMagneticEffect.js";

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
    animation: hero-glow-shift 8s ease-in-out infinite;
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
  @keyframes hero-glow-shift {
    0%, 100% { transform: translate(-50%,-50%) scale(1); opacity: .75; }
    50% { transform: translate(-50%,-51%) scale(1.05); opacity: 1; }
  }
`;

export default function PageHero({ tag, heading, subheading, ctaButtons }) {
  const magneticProps = useMagneticEffect();

  return (
    <>
      <style>{STYLES}</style>
      <section className="page-hero">
        <div className="page-hero-bg" />
        <MotionReveal className="page-hero-inner" distance={22}>
          {tag && (
            <MotionReveal className="page-hero-tag" delay={0.05} distance={14} duration={0.45}>
              {tag}
            </MotionReveal>
          )}
          <MotionReveal delay={0.1} distance={16} duration={0.5}>
            <h1 className="brig page-hero-heading">{heading}</h1>
          </MotionReveal>
          {subheading && (
            <MotionReveal delay={0.16} distance={16} duration={0.5}>
              <p className="page-hero-sub">{subheading}</p>
            </MotionReveal>
          )}
          {ctaButtons && ctaButtons.length > 0 && (
            <div className="page-hero-ctas">
              {ctaButtons.map((btn, i) => (
                <MotionReveal key={i} delay={0.2 + i * 0.06} distance={12} duration={0.45} amount={0.1}>
                  <button
                    className={`${i === 0 ? "btn-primary" : "btn-secondary"} magnetic-btn`}
                    onClick={btn.onClick}
                    onMouseMove={magneticProps.onMouseMove}
                    onMouseLeave={magneticProps.onMouseLeave}
                    style={{ fontSize: 14, padding: "11px 22px" }}
                  >
                    {btn.label}
                  </button>
                </MotionReveal>
              ))}
            </div>
          )}
        </MotionReveal>
      </section>
    </>
  );
}
