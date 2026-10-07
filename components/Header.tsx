"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";

type NavItem = { label?: string | null; href?: string | null } | null;

export default function Header({ nav, bookCta, siteName }: { nav: NavItem[]; bookCta: { label?: string | null; href?: string | null } | null; siteName: string }) {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  return (
    <>
      <header className="site">
        <div className="wrap nav">
          <Link className="logo" href="/" aria-label={`${siteName} home`} onClick={() => setOpen(false)}>
            <Image className="lockup" src="/images/logo-horizontal.png" alt={siteName} width={1976} height={265} priority />
          </Link>
          <button className="nav-toggle" aria-expanded={open} aria-controls="menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((o) => !o)}>
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          </button>
          <ul id="menu" className={open ? "open" : undefined} onClick={() => setOpen(false)}>
            {nav.map((item, i) =>
              item?.href ? (
                <li key={i}>
                  <Link href={item.href} aria-current={path === item.href ? "page" : undefined}>{item.label}</Link>
                </li>
              ) : null
            )}
            {bookCta?.href && (
              <li className="cta"><Link className="btn small" href={bookCta.href}>{bookCta.label ?? "Book a fit"}</Link></li>
            )}
          </ul>
        </div>
      </header>
      {bookCta?.href && path !== bookCta.href && (
        <div className="sticky-cta"><Link className="btn mark" href={bookCta.href}>{bookCta.label ?? "Book a fit"}</Link></div>
      )}
    </>
  );
}
