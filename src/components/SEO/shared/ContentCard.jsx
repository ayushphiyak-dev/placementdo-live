import MotionReveal from "./MotionReveal.jsx";

/**
 * ContentCard — card with icon, title, description, optional tags and link.
 */
const STYLES = `
  .content-card {
    background: var(--white); border: 1px solid var(--border); border-radius: 14px;
    padding: 24px 26px; display: flex; flex-direction: column; gap: 10px;
    transition: box-shadow 0.24s cubic-bezier(0.22,1,0.36,1), transform 0.24s cubic-bezier(0.22,1,0.36,1), border-color 0.24s cubic-bezier(0.22,1,0.36,1);
  }
  .content-card:hover { box-shadow: 0 14px 34px rgba(15,23,42,.11); transform: translateY(-4px); border-color: var(--teal-border-hover); }
  .content-card-icon {
    width: 44px; height: 44px; border-radius: 12px; overflow: hidden;
    border: 1px solid var(--border); flex-shrink: 0;
  }
  .content-card-icon img { width: 100%; height: 100%; object-fit: cover; display: block; }
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

const hashString = (value = "") => {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = ((hash << 5) - hash) + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

const createGeneratedIcon = (title = "", icon = "") => {
  const seed = hashString(`${title}-${icon}`);
  const hueA = seed % 360;
  const hueB = (hueA + 35) % 360;
  const initials = (title || icon || "PD")
    .replace(/[^a-zA-Z0-9 ]/g, " ")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("") || "PD";

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88 88" role="img">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="hsl(${hueA} 78% 42%)"/>
          <stop offset="100%" stop-color="hsl(${hueB} 72% 52%)"/>
        </linearGradient>
      </defs>
      <rect width="88" height="88" rx="20" fill="url(#g)"/>
      <text x="50%" y="53%" text-anchor="middle" dominant-baseline="middle" fill="white" font-family="Inter,Arial,sans-serif" font-size="30" font-weight="700" letter-spacing="1">${initials}</text>
    </svg>
  `.trim();

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

export default function ContentCard({ icon, title, description, tags, linkText, onClick }) {
  const generatedIcon = createGeneratedIcon(title, icon);
  return (
    <>
      <style>{STYLES}</style>
      <MotionReveal className="content-card" distance={14} duration={0.45}>
        {(icon || title) && (
          <div className="content-card-icon">
            <img src={generatedIcon} alt={`${title} icon`} loading="lazy" />
          </div>
        )}
        <h3 className="brig content-card-title">{title}</h3>
        {description && <p className="content-card-desc">{description}</p>}
        {tags && tags.length > 0 && (
          <div className="content-card-tags">
            {tags.map((t) => <span key={t} className="content-card-tag">{t}</span>)}
          </div>
        )}
        {linkText && onClick && (
          <button className="content-card-link" onClick={onClick}>{linkText} →</button>
        )}
      </MotionReveal>
    </>
  );
}
