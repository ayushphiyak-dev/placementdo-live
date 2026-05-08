import MotionReveal from "./MotionReveal.jsx";

/**
 * ContentCard — card with icon, title, description, optional tags and link.
 */
const STYLES = `
  .content-card {
    background: var(--white); border: 1px solid var(--border); border-radius: 14px;
    padding: 24px 26px; display: flex; flex-direction: column; gap: 10px;
    transition: box-shadow 0.24s cubic-bezier(0.22,1,0.36,1), transform 0.24s cubic-bezier(0.22,1,0.36,1), border-color 0.24s cubic-bezier(0.22,1,0.36,1), background 0.24s cubic-bezier(0.22,1,0.36,1);
    transform: translateZ(0);
  }
  .content-card:hover { box-shadow: 0 14px 34px rgba(15,23,42,.11); transform: translateY(-4px); border-color: var(--teal-border-hover); background: linear-gradient(180deg, var(--white), rgba(248,250,252,.7)); }
  .content-card-icon { font-size: 28px; line-height: 1; }
  .content-card-title { font-size: 16.5px; font-weight: 700; color: var(--slate); letter-spacing: -0.015em; margin: 0; }
  .content-card-desc { font-size: 14px; color: var(--slate-500); line-height: 1.7; margin: 0; flex: 1; }
  .content-card-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 4px; }
  .content-card-tag {
    font-size: 11px; font-weight: 600; padding: 3px 10px; border-radius: 999px;
    background: var(--teal-light); color: var(--teal-dark); letter-spacing: 0.03em;
  }
  .content-card-link {
    font-size: 13px; font-weight: 600; color: var(--teal); background: none; border: none;
    cursor: pointer; padding: 0; margin-top: 4px; text-align: left;
    font-family: 'DM Sans', sans-serif; display: inline-flex; align-items: center; gap: 4px;
    transition: color 0.18s, transform 0.18s;
  }
  .content-card-link:hover { color: var(--teal-dark); transform: translateX(2px); }
`;

export default function ContentCard({ icon, title, description, tags, linkText, onClick }) {
  return (
    <>
      <style>{STYLES}</style>
      <MotionReveal className="content-card card-premium" distance={14} duration={0.45}>
        {icon && <div className="content-card-icon">{icon}</div>}
        <h3 className="brig content-card-title">{title}</h3>
        {description && <p className="content-card-desc">{description}</p>}
        {tags && tags.length > 0 && (
          <div className="content-card-tags">
            {tags.map((t) => <span key={t} className="content-card-tag">{t}</span>)}
          </div>
        )}
        {linkText && onClick && (
          <button className="content-card-link" onClick={onClick} aria-label={`${linkText} for ${title}`}>{linkText} →</button>
        )}
      </MotionReveal>
    </>
  );
}
