"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

type Props = {
  services: string[];
  days: string[];
  slotsHint?: string | null;
  notesLabel?: string | null;
  notesPlaceholder?: string | null;
  submitLabel?: string | null;
  paymentNote?: string | null;
  successTitle?: string | null;
  successText?: string | null;
};

export default function BookingForm(p: Props) {
  const params = useSearchParams();
  const preset = params.get("service") ?? "";
  const [service, setService] = useState(p.services.includes(preset) ? preset : "");
  const [days, setDays] = useState<string[]>([]);
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      service, days,
      name: String(fd.get("name") || ""), phone: String(fd.get("phone") || ""),
      email: String(fd.get("email") || ""), notes: String(fd.get("notes") || ""),
      company: String(fd.get("company") || ""),
    };
    if (!payload.service || !payload.name || !payload.phone || !payload.email) { setError("Please fill in the session, your name, phone, and email."); return; }
    setState("sending"); setError("");
    try {
      const r = await fetch("/api/book", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!r.ok) throw new Error((await r.json().catch(() => ({}))).error || "Something went wrong");
      setState("sent");
    } catch (err: any) { setState("error"); setError(err.message || "Something went wrong. Please email us instead."); }
  }

  if (state === "sent") {
    return (
      <div className="sent-state show" role="status">
        <h3>{p.successTitle ?? "Request received"}</h3>
        <p>{p.successText}</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate>
      <div className="field">
        <label htmlFor="service">Session</label>
        <select id="service" name="service" required value={service} onChange={(e) => setService(e.target.value)}>
          <option value="">Choose a session</option>
          {p.services.map((s) => <option key={s} value={s}>{s}</option>)}
          <option value="Not sure, help me choose">Not sure, help me choose</option>
        </select>
      </div>
      <div className="field">
        <span className="hint" style={{ fontWeight: 600, color: "var(--ink)" }}>Days that work</span>
        <div className="days" role="group" aria-label="Days that work">
          {p.days.map((d) => (
            <label key={d}>
              <input type="checkbox" name="day" value={d} checked={days.includes(d)} onChange={(e) => setDays(e.target.checked ? [...days, d] : days.filter((x) => x !== d))} /> {d}
            </label>
          ))}
        </div>
        {p.slotsHint && <span className="hint">{p.slotsHint}</span>}
      </div>
      <div className="two">
        <div className="field"><label htmlFor="name">Name</label><input id="name" name="name" autoComplete="name" required /></div>
        <div className="field"><label htmlFor="phone">Phone</label><input id="phone" name="phone" type="tel" autoComplete="tel" required /></div>
      </div>
      <div className="field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" autoComplete="email" required /></div>
      <div className="field">
        <label htmlFor="notes">{p.notesLabel ?? "What's going on with your riding?"}</label>
        <textarea id="notes" name="notes" placeholder={p.notesPlaceholder ?? ""} />
      </div>
      <div className="sr-only" aria-hidden="true"><label htmlFor="company">Company</label><input id="company" name="company" tabIndex={-1} autoComplete="off" /></div>
      <div>
        <button className="btn mark" type="submit" disabled={state === "sending"}>{state === "sending" ? "Sending…" : (p.submitLabel ?? "Request a time")}</button>
        {error && <p className="hint" style={{ margin: "12px 0 0", color: "var(--orange-text)" }}>{error}</p>}
        {p.paymentNote && <p className="hint" style={{ margin: "12px 0 0" }}>{p.paymentNote}</p>}
      </div>
    </form>
  );
}
