import Link from "next/link";
export default function PageCta({ title, text }: { title?: string | null; text?: string | null }) {
  return (
    <section className="page-cta">
      <div className="wrap">
        <h2>{title ?? "Ready when you are"}</h2>
        {text && <p className="lede">{text}</p>}
        <Link className="btn mark" href="/book-a-fit">Book a fit</Link>
        <Link className="btn ghost" href="/">Back to the start</Link>
      </div>
    </section>
  );
}
