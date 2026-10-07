"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

type Svc = { key: string; name: string; price: string; href: string };
const SERVICES: Record<string, Svc> = {
  complete: { key: "complete", name: "Complete Fit", price: "$395, about 3 hours", href: "/fits-and-pricing#complete-fit" },
  essential: { key: "essential", name: "Essential Fit", price: "$245, about 90 minutes", href: "/fits-and-pricing#essential-fit" },
  fbyb: { key: "fbyb", name: "Fit Before You Buy", price: "$295, includes setup on the new bike", href: "/fits-and-pricing#fit-before-you-buy" },
  aero: { key: "aero", name: "Aero and TT Fit", price: "$495, up to 4 hours", href: "/fits-and-pricing#aero-and-tt-fit" },
  saddle: { key: "saddle", name: "Saddle Session", price: "$125, one hour", href: "/fits-and-pricing#saddle-session" },
  cleat: { key: "cleat", name: "Shoe and Cleat Session", price: "$150, one hour", href: "/fits-and-pricing#shoe-and-cleat-session" },
};

function recommend(goal: string, disc: string, recent: string): { key: string; why: string; alt?: string } {
  if (goal === "newbike") {
    return { key: "fbyb", why: disc === "tri"
      ? "Tri bikes are the least forgiving to size wrong. We build your position on the fit bike first, then give you the frame and extension spec to order against."
      : "Buying first and fitting second is how riders end up with a stem that doesn't exist. Two hours on the fit bike gives you frame size and component spec before the order goes in." };
  }
  if (goal === "faster") {
    return disc === "tri"
      ? { key: "aero", why: "Speed in the aero position is about sustainability. We start from a sound road position and move forward only as far as you can hold with power." }
      : { key: "complete", why: "Going faster on a road, gravel, or mountain bike usually means better power transfer and a position you can hold longer. Motion capture, video, and power on the trainer show which changes actually gain you something." };
  }
  if (goal === "touchpoint") {
    return recent === "yes"
      ? { key: "saddle", alt: "cleat", why: "With a recent fit on file, a touchpoint session is enough. If it's shoes or cleats rather than the saddle, book the Shoe and Cleat Session instead." }
      : { key: "essential", why: "Saddle and cleat work only holds up on top of a sound position. Without a recent fit, the Essential Fit sets the base and covers the touchpoint in the same session." };
  }
  return recent === "yes"
    ? { key: "essential", alt: "complete", why: "If a fit in the last two years left you with pain, something has moved or wasn't finished. The Essential Fit re-establishes the position. If pain is one-sided or persistent, step up to the Complete Fit so we can measure you properly off the bike and capture both sides in 3D." }
    : { key: "complete", why: "Pain that has been around a while usually has more than one cause. The Complete Fit gives us the full picture: your body off the bike, your feet, and how you move under load, with the motion capture data to show the fix worked." };
}

const Q = [
  { name: "goal", legend: "What brings you in?", opts: [["pain", "Pain or discomfort"], ["newbike", "I'm buying a new bike"], ["faster", "I want to go faster"], ["touchpoint", "New shoes, saddle, or cleats"]] },
  { name: "disc", legend: "What do you ride?", opts: [["road", "Road"], ["gravel", "Gravel"], ["tri", "Triathlon or time trial"], ["mtb", "Mountain"]] },
  { name: "recent", legend: "Had a professional fit in the last two years?", opts: [["yes", "Yes"], ["no", "No, or not sure"]] },
] as const;

export default function FitFinder() {
  const [a, setA] = useState<Record<string, string>>({});
  useEffect(() => {
    try { const saved = JSON.parse(localStorage.getItem("fitworks-finder") || "null"); if (saved) setA(saved); } catch {}
  }, []);
  useEffect(() => { try { localStorage.setItem("fitworks-finder", JSON.stringify(a)); } catch {} }, [a]);
  const done = a.goal && a.disc && a.recent;
  const rec = done ? recommend(a.goal, a.disc, a.recent) : null;
  const svc = rec ? SERVICES[rec.key] : null;
  return (
    <div className="finder">
      <form onSubmit={(e) => e.preventDefault()}>
        {Q.map((q) => (
          <div className="q" key={q.name}>
            <fieldset>
              <legend>{q.legend}</legend>
              <div className="chips">
                {q.opts.map(([v, label]) => (
                  <label key={v}>
                    <input type="radio" name={q.name} value={v} checked={a[q.name] === v} onChange={() => setA({ ...a, [q.name]: v })} /> {label}
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
        ))}
      </form>
      <div className={`result ${svc ? "" : "empty"}`} aria-live="polite">
        {svc && rec ? (
          <>
            <div>
              <p className="muted" style={{ margin: "0 0 6px", fontSize: ".9rem" }}>Our recommendation</p>
              <h3>{svc.name}</h3>
              <p className="price" style={{ margin: "6px 0 14px" }}>{svc.price}</p>
              <p className="why">{rec.why}</p>
            </div>
            <div className="result-actions">
              <Link className="btn" href={`/book-a-fit?service=${encodeURIComponent(svc.name)}`}>Book {svc.name}</Link>
              <Link className="btn ghost" href={svc.href}>See what&apos;s included</Link>
              {rec.alt && <Link className="btn ghost" href={SERVICES[rec.alt].href}>Or {SERVICES[rec.alt].name}</Link>}
            </div>
          </>
        ) : (
          <p>Answer the three questions and your recommendation appears here.</p>
        )}
      </div>
    </div>
  );
}
