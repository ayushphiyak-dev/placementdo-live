/**
 * SectionHeading — label + heading + optional description.
 */
export default function SectionHeading({ label, heading, description, align = "left" }) {
  const textAlign = align === "center" ? "center" : "left";
  return (
    <div style={{ textAlign, marginBottom: 40 }}>
      {label && (
        <div style={{
          fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
          color: "var(--teal-dark)", marginBottom: 12,
        }}>
          {label}
        </div>
      )}
      <h2 className="brig" style={{
        fontSize: "clamp(24px,4vw,42px)", fontWeight: 700, color: "var(--slate)",
        letterSpacing: "-0.025em", lineHeight: 1.15, margin: 0,
      }}>
        {heading}
      </h2>
      {description && (
        <p style={{
          fontSize: 15.5, color: "var(--slate-500)", lineHeight: 1.72, marginTop: 12,
          maxWidth: align === "center" ? 640 : "100%",
          marginLeft: align === "center" ? "auto" : undefined,
          marginRight: align === "center" ? "auto" : undefined,
        }}>
          {description}
        </p>
      )}
    </div>
  );
}
