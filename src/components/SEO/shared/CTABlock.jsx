import MotionReveal from "./MotionReveal.jsx";
import useMagneticEffect from "./useMagneticEffect.js";

/**
 * CTABlock — full-width centered CTA section.
 */
const STYLES = `
  .cta-block {
    background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 20px; padding: clamp(40px,6vw,64px) clamp(24px,5vw,60px);
    text-align: center; margin: 64px 0;
    position: relative; overflow: hidden;
  }
  .cta-block::before {
    content: "";
    position: absolute; inset: -40% -10%;
    background: radial-gradient(circle at 30% 40%, rgba(45,212,191,.22), transparent 45%);
    pointer-events: none; animation: cta-glow 9s ease-in-out infinite;
  }
  .cta-block-heading {
    font-size: clamp(24px,4vw,40px); font-weight: 800; color: #fff;
    letter-spacing: -0.025em; margin: 0 0 12px; line-height: 1.15;
    position: relative;
  }
  .cta-block-sub { font-size: 15.5px; color: rgba(255,255,255,.78); line-height: 1.65; margin: 0 0 28px; position: relative; }
  .cta-block-btn {
    display: inline-flex; align-items: center; gap: 8px;
    background: linear-gradient(135deg, var(--teal), var(--teal-dark)); color: #fff; border: none; cursor: pointer;
    font-size: 15px; font-weight: 700; padding: 13px 28px; border-radius: 999px;
    transition: transform 0.2s cubic-bezier(0.22,1,0.36,1), box-shadow 0.2s cubic-bezier(0.22,1,0.36,1); font-family: 'DM Sans', sans-serif;
    position: relative;
  }
  .cta-block-btn:hover { transform: translateY(-3px); box-shadow: 0 12px 28px rgba(13,148,136,.36); }
  @keyframes cta-glow {
    0%, 100% { transform: translate3d(0,0,0) scale(1); opacity: .75; }
    50% { transform: translate3d(2%, -1%, 0) scale(1.06); opacity: 1; }
  }
`;

export default function CTABlock({ heading, subtext, buttonLabel, onNav, buttonHref = "/" }) {
  const magneticProps = useMagneticEffect();

  return (
    <>
      <style>{STYLES}</style>
      <MotionReveal className="cta-block" distance={20}>
        <MotionReveal delay={0.04} distance={12} duration={0.45}>
          <h2 className="brig cta-block-heading">{heading}</h2>
        </MotionReveal>
        {subtext && (
          <MotionReveal delay={0.08} distance={12} duration={0.45}>
            <p className="cta-block-sub">{subtext}</p>
          </MotionReveal>
        )}
        <MotionReveal delay={0.12} distance={10} duration={0.4}>
          <button
            className="cta-block-btn magnetic-btn"
            onClick={() => onNav(buttonHref)}
            onMouseMove={magneticProps.onMouseMove}
            onMouseLeave={magneticProps.onMouseLeave}
          >
            {buttonLabel} →
          </button>
        </MotionReveal>
      </MotionReveal>
    </>
  );
}
