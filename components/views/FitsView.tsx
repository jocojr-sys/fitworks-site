"use client";
import { useTina } from "tinacms/dist/react";
import type { FitsQuery } from "../../tina/__generated__/types";
import SectionHead from "../SectionHead";
import PageCta from "../PageCta";
import ServiceCard, { type Service } from "../ServiceCard";

export default function FitsView(props: { data: FitsQuery; variables: { relativePath: string }; query: string; services: Service[] }) {
  const { data } = useTina({ data: props.data, variables: props.variables, query: props.query });
  const f = data.fits;
  const sorted = [...props.services].sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
  const full = sorted.filter((s) => s.group === "full");
  const touch = sorted.filter((s) => s.group === "touchpoint");
  return (
    <>
      <section className="services" id="fits">
        <div className="wrap">
          <SectionHead eyebrow={f.head?.eyebrow} title={f.head?.title} text={f.head?.text} />
          <div className="svc-list">{full.map((s) => <ServiceCard key={s.title} s={s} />)}</div>
          {touch.length > 0 && (
            <>
              <h3 className="svc-group-title">{f.touchpointTitle}</h3>
              <div className="svc-list">{touch.map((s) => <ServiceCard key={s.title} s={s} />)}</div>
            </>
          )}
          {f.included && (
            <div className="included">
              <div><h3>{f.included.title}</h3>{f.included.text && <p className="muted" style={{ margin: "8px 0 0", fontSize: ".95rem" }}>{f.included.text}</p>}</div>
              <ul>{(f.included.items ?? []).map((it, i) => it && <li key={i}>{it}</li>)}</ul>
            </div>
          )}
        </div>
      </section>
      <PageCta title={f.cta?.title} text={f.cta?.text} />
    </>
  );
}
