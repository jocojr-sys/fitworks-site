import { NextResponse } from "next/server";

export const runtime = "nodejs";

function esc(s: string) { return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string)); }

export async function POST(req: Request) {
  let body: any;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Bad request" }, { status: 400 }); }
  if (body.company) return NextResponse.json({ ok: true }); // honeypot: silently accept bots

  const { service, days = [], name, phone, email, notes = "" } = body;
  if (!service || !name || !phone || !email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: "Please fill in the session, your name, phone, and a valid email." }, { status: 400 });
  }

  const to = process.env.BOOKING_TO_EMAIL;
  const from = process.env.BOOKING_FROM_EMAIL || "bookings@fitworksstudio.com";
  const key = process.env.RESEND_API_KEY;
  if (!key || !to) {
    console.error("Booking request received but RESEND_API_KEY / BOOKING_TO_EMAIL are not set", { service, name, email });
    return NextResponse.json({ error: "Booking email is not configured yet. Please email us directly." }, { status: 500 });
  }

  const html = `
    <h2>New fit request</h2>
    <p><b>Session:</b> ${esc(String(service))}</p>
    <p><b>Days that work:</b> ${esc(Array.isArray(days) ? days.join(", ") : String(days)) || "not specified"}</p>
    <p><b>Name:</b> ${esc(String(name))}<br><b>Phone:</b> ${esc(String(phone))}<br><b>Email:</b> ${esc(String(email))}</p>
    <p><b>Notes:</b><br>${esc(String(notes)).replace(/\n/g, "<br>") || "none"}</p>`;

  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: [to], reply_to: email, subject: `Fit request: ${service} for ${name}`, html }),
  });
  if (!r.ok) {
    console.error("Resend error", await r.text());
    return NextResponse.json({ error: "We couldn't send your request. Please email us directly." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
