export default function SectionHead({ eyebrow, title, text, style }: { eyebrow?: string | null; title?: string | null; text?: string | null; style?: React.CSSProperties }) {
  return (
    <div className="section-head" style={style}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {text && <p className="lede">{text}</p>}
    </div>
  );
}
