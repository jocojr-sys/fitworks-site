import Link from "next/link";
export default function NotFound() {
  return (
    <section><div className="wrap" style={{ textAlign: "center" }}>
      <h1>Page not found</h1>
      <p className="lede" style={{ margin: "16px auto 28px" }}>That link has moved or never existed.</p>
      <Link className="btn" href="/">Back to the start</Link>
    </div></section>
  );
}
