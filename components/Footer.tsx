import Link from "next/link";
import Image from "next/image";

type LinkItem = { label?: string | null; href?: string | null } | null;
type Settings = {
  siteName: string; tagline?: string | null; email?: string | null;
  address?: { line1?: string | null; line2?: string | null } | null;
  footerFits?: LinkItem[] | null; footerStudio?: LinkItem[] | null; legalLinks?: LinkItem[] | null;
};

function List({ items }: { items?: LinkItem[] | null }) {
  return <ul>{(items ?? []).map((l, i) => l?.href ? <li key={i}><Link href={l.href}>{l.label}</Link></li> : null)}</ul>;
}

export default function Footer({ settings: s }: { settings: Settings }) {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <Link className="logo" href="/" aria-label={`${s.siteName} home`} style={{ marginBottom: 14 }}>
              <Image className="lockup" src="/images/logo-horizontal-white.png" alt={s.siteName} width={1976} height={265} />
            </Link>
            {s.tagline && <p className="muted" style={{ maxWidth: "36ch" }}>{s.tagline}</p>}
          </div>
          <div><h4>Fits</h4><List items={s.footerFits} /></div>
          <div><h4>Studio</h4><List items={s.footerStudio} /></div>
          <div>
            <h4>Contact</h4>
            <ul>
              {s.email && <li><a href={`mailto:${s.email}`}>{s.email}</a></li>}
              <li>{s.siteName}<br />{s.address?.line1}<br />{s.address?.line2}</li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© {new Date().getFullYear()} {s.siteName}</span>
          <span>{(s.legalLinks ?? []).map((l, i) => l?.href ? <span key={i}>{i > 0 && " · "}<Link href={l.href}>{l.label}</Link></span> : null)}</span>
        </div>
      </div>
    </footer>
  );
}
