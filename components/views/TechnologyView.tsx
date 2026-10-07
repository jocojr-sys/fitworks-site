"use client";
import { useTina } from "tinacms/dist/react";
import type { TechnologyQuery } from "../../tina/__generated__/types";
import SectionHead from "../SectionHead";
import PageCta from "../PageCta";

const ICONS: Record<string, React.ReactElement> = {
  capture: <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3" /><path d="M3 12h3M18 12h3M12 3v3M12 18v3" /><circle cx="12" cy="12" r="9" /></svg>,
  power: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 17l5-8 4 5 4-9 5 12" /><path d="M3 21h18" /></svg>,
  fitbike: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 18h16M6 18V9l6-4 6 4v9" /><path d="M10 18v-4h4v4" /></svg>,
  measure: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20l4-1 11-11-3-3L5 16z" /><path d="M14 7l3 3" /></svg>,
  report: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h9l4 4v14H6z" /><path d="M9 12h6M9 16h6" /></svg>,
  coords: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20V4M4 20h16" /><path d="M8 16l4-6 4 3 4-7" /></svg>,
  clock: <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>,
  check: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12l5 5L20 6" /></svg>,
};

export default function TechnologyView(props: { data: TechnologyQuery; variables: { relativePath: string }; query: string }) {
  const { data } = useTina(props);
  const t = data.technology;
  const th = t.takehome;
  return (
    <>
      <section className="tech" id="technology">
        <div className="wrap">
          <SectionHead eyebrow={t.head?.eyebrow} title={t.head?.title} text={t.head?.text} />
          <div className="tech-grid">
            {(t.tools ?? []).map((tool, i) => tool && (
              <div className="tool" key={i}>
                <h3>{ICONS[tool.icon ?? "capture"]}{tool.title}</h3>
                {tool.text && <p className="muted">{tool.text}</p>}
                <dl>
                  <dt>Tells us</dt><dd>{tool.tellsUs}</dd>
                  <dt>Why it matters</dt><dd>{tool.whyItMatters}</dd>
                </dl>
              </div>
            ))}
          </div>
          {t.note && <p className="muted" style={{ margin: "28px auto 0", maxWidth: "70ch" }}>{t.note}</p>}
          <div className="tech-rule">
            {(t.rules ?? []).map((r, i) => r && <div key={i}><h3>{r.title}</h3><p>{r.text}</p></div>)}
          </div>
        </div>
      </section>

      <section id="takehome">
        <div className="wrap home-grid">
          <div>
            <SectionHead eyebrow={th?.eyebrow} title={th?.title} text={th?.text} style={{ marginBottom: 28 }} />
            <ul className="takehome">
              {(th?.items ?? []).map((it, i) => it && (
                <li key={i}>{ICONS[it.icon ?? "check"]}<div><b>{it.title}</b><span>{it.text}</span></div></li>
              ))}
            </ul>
            {th?.guarantee && (
              <div className="guarantee">
                <div className="stamp">{th.guarantee.stamp}</div>
                <div><h3>{th.guarantee.title}</h3><p>{th.guarantee.text}</p></div>
              </div>
            )}
          </div>
          {th?.report && (
            <div>
              <div className="report" aria-label="Example fit report excerpt">
                <div className="report-head"><b>{th.report.title}</b><span className="muted">{th.report.subtitle}</span></div>
                <table><tbody>
                  {(th.report.rows ?? []).map((r, i) => r && (
                    <tr key={i}><td>{r.label}</td><td>{r.value}{r.delta && <span className="delta">{r.delta}</span>}</td></tr>
                  ))}
                </tbody></table>
                {th.report.footnote && <p className="report-foot">{th.report.footnote}</p>}
              </div>
            </div>
          )}
        </div>
      </section>

      <PageCta title={t.cta?.title} text={t.cta?.text} />
    </>
  );
}
