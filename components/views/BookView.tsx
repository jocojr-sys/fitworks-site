"use client";
import Image from "next/image";
import { useTina } from "tinacms/dist/react";
import type { BookQuery } from "../../tina/__generated__/types";
import SectionHead from "../SectionHead";
import BookingForm from "../BookingForm";

export default function BookView(props: { data: BookQuery; variables: { relativePath: string }; query: string; services: string[] }) {
  const { data } = useTina({ data: props.data, variables: props.variables, query: props.query });
  const b = data.book;
  return (
    <section className="book" id="book">
      <div className="wrap">
        <SectionHead eyebrow={b.head?.eyebrow} title={b.head?.title} text={b.head?.text} />
        <div className="book-grid">
          <div>
            <BookingForm
              services={props.services}
              days={(b.days ?? []).filter((d): d is string => !!d)}
              slotsHint={b.slotsHint} notesLabel={b.notesLabel} notesPlaceholder={b.notesPlaceholder}
              submitLabel={b.submitLabel} paymentNote={b.paymentNote} successTitle={b.successTitle} successText={b.successText}
            />
          </div>
          <aside className="book-aside">
            {(b.cards ?? []).map((c, i) => c && (
              <div className="card" key={i}>
                <h3>{c.title}</h3>
                {c.bulleted ? <ul>{(c.lines ?? []).map((l, j) => l && <li key={j}>{l}</li>)}</ul>
                  : <p>{(c.lines ?? []).map((l, j) => <span key={j}>{j > 0 && <br />}{l}</span>)}</p>}
                {c.note && <p style={{ marginTop: 8 }}>{c.note}</p>}
              </div>
            ))}
            {b.photo && (
              <figure style={{ margin: 0 }}>
                <Image src={b.photo} alt={b.photoCaption ?? ""} width={1600} height={900} style={{ width: "100%", height: "auto", borderRadius: 16 }} />
                {b.photoCaption && <figcaption className="muted" style={{ fontSize: ".85rem", marginTop: 8 }}>{b.photoCaption}</figcaption>}
              </figure>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
