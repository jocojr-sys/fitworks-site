import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { client } from "../tina/__generated__/client";
import Header from "../components/Header";
import Footer from "../components/Footer";

const poppins = Poppins({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-poppins", display: "swap" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-inter", display: "swap" });

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await client.queries.settings({ relativePath: "global.json" });
  return {
    title: { default: `${data.settings.siteName} | Bike fitting, measured in motion`, template: `%s | ${data.settings.siteName}` },
    description: data.settings.tagline ?? undefined,
    icons: { icon: "/icon.png" },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { data } = await client.queries.settings({ relativePath: "global.json" });
  const s = data.settings;
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body>
        <Header nav={s.nav ?? []} bookCta={s.bookCta ?? null} siteName={s.siteName} />
        <main id="top">{children}</main>
        <Footer settings={s} />
      </body>
    </html>
  );
}
