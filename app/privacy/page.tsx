import type { Metadata } from "next";
export const metadata: Metadata = { title: "Privacy" };
export default function Privacy() {
  return (
    <section><div className="wrap" style={{ maxWidth: 760 }}>
      <h1>Privacy</h1>
      <p className="lede" style={{ marginTop: 16 }}>We collect only what we need to book and deliver your fit: your name, contact details, and what you tell us about your riding. We do not sell or share it. Email us to see or delete what we hold.</p>
    </div></section>
  );
}
