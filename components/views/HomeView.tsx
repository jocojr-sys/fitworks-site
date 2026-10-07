"use client";
import Link from "next/link";
import Image from "next/image";
import { useTina } from "tinacms/dist/react";
import type { HomeQuery } from "../../tina/__generated__/types";
import SectionHead from "../SectionHead";
import FitFinder from "../FitFinder";

export default function HomeView(props: { data: HomeQuery; variables: { relativePath: string }; query: string }) {
  const { data } = useTina(props);
  const h = data.home;
  const hero = h.hero, intro = h.intro, sym = h.symptoms, proc = h.process, faq = h.faq;
  return (
    <>
      <section className="hero-tpl" style={{ backgroundImage: `linear-gradient(rgba(23,23,23,.55),rgba(23,23,23,.65)),url('${hero?.image ?? "/images/hero.webp"}')` }}>
        <div className="wrap hero-tpl-inner">
          {hero?.eyebrow && <span className="eyebrow light">{hero.eyebrow}</span>}
          <h1>{hero?.title}</h1>
          {hero?.text && <p>{hero.text}</p>}
          <div className="hero-actions">
            {hero?.primaryCta?.href && <Link className="btn" href={hero.primaryCta.href}>{hero.primaryCta.label}</Link>}
            {hero?.secondaryCta?.href && <Link className="btn outline-light" href={hero.secondaryCta.href}>{hero.secondaryCta.label}</Link>}
          </div>
        </div>
      </section>

      <section className="intro">
        <div className="wrap intro-grid">
          <div className="intro-text">
            {intro?.eyebrow && <span className="eyebrow">{intro.eyebrow}</span>}
            <h2>{intro?.title}</h2>
            {intro?.text && <p className="lede">{intro.text}</p>}
            <div className="fork">
              {(intro?.forks ?? []).map((f, i) => f?.href && (
                <Link key={i} className={f.primary ? "primary" : undefined} href={f.href}><strong>{f.title}</strong><span>{f.text}</span></Link>
              ))}
            </div>
          </div>
          {intro?.image && (
            <figure className="intro-photo">
              <Image src={intro.image} alt={intro.caption ?? ""} width={1600} height={900} />
              {intro.caption && <figcaption>{intro.caption}</figcaption>}
            </figure>
          )}
        </div>
      </section>

      <section className="symptoms" id="symptoms">
        <div className="wrap">
          <SectionHead eyebrow={sym?.eyebrow} title={sym?.title} text={sym?.text} />
          <div className="symptom-grid">
            {(sym?.items ?? []).map((it, i) => it && <div className="symptom" key={i}><h3>{it.title}</h3><p>{it.text}</p></div>)}
          </div>
          {sym?.note && <p className="symptom-note muted">{sym.note}</p>}
        </div>
      </section>

      <section id="finder">
        <div className="wrap">
          <SectionHead eyebrow={h.finder?.eyebrow} title={h.finder?.title} text={h.finder?.text} />
          <FitFinder />
        </div>
      </section>

      <section id="process">
        <div className="wrap">
          <SectionHead eyebrow={proc?.eyebrow} title={proc?.title} text={proc?.text} />
          <div className="steps">
            {(proc?.steps ?? []).map((st, i) => st && (
              <div className="step" key={i}><span className="time">{st.time}</span><h3>{st.title}</h3><p>{st.text}</p></div>
            ))}
          </div>
          {proc?.analogy && <div className="analogy"><p>{proc.analogy}</p></div>}
        </div>
      </section>

      <section className="faq" id="faq">
        <div className="wrap">
          <SectionHead eyebrow={faq?.eyebrow} title={faq?.title} />
          <div className="faq-list">
            {(faq?.items ?? []).map((q, i) => q && (
              <details key={i} open={i === 0}><summary>{q.question}</summary><p>{q.answer}</p></details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
