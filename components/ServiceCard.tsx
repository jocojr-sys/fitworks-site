import Link from "next/link";

export type Service = {
  title: string; group: string; order?: number | null; badge?: string | null; duration?: string | null;
  bikeNote?: string | null; disciplines?: string | null; bestFor?: string | null; includes?: (string | null)[] | null;
  price?: string | null; priceNote?: string | null; bookLabel?: string | null; featured?: boolean | null;
};

export const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default function ServiceCard({ s }: { s: Service }) {
  const slug = slugify(s.title);
  const meta = [s.duration && <b key="d">{s.duration}</b>, s.bikeNote, s.disciplines].filter(Boolean);
  return (
    <article className="svc" id={slug}>
      <div>
        {s.badge && <span className="badge">{s.badge}</span>}
        <h3>{s.title}</h3>
        {meta.length > 0 && (
          <div className="meta">{meta.map((m, i) => <span key={i}>{i > 0 && " · "}{m}</span>)}</div>
        )}
      </div>
      <div>
        {s.bestFor && <p className="best"><strong>Best for:</strong> {s.bestFor}</p>}
        {s.includes && s.includes.length > 0 && <ul>{s.includes.map((li, i) => li && <li key={i}>{li}</li>)}</ul>}
      </div>
      <div className="buy">
        <div className="price-tag">{s.price}{s.priceNote && <small>{s.priceNote}</small>}</div>
        <Link className={`btn ${s.featured ? "" : "ghost"} ${s.group === "touchpoint" ? "small" : ""}`} href={`/book-a-fit?service=${encodeURIComponent(s.title)}`}>
          {s.bookLabel ?? "Book"}
        </Link>
      </div>
    </article>
  );
}
