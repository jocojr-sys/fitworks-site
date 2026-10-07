import type { Metadata } from "next";
import { Suspense } from "react";
import { client } from "../../tina/__generated__/client";
import BookView from "../../components/views/BookView";

export const metadata: Metadata = { title: "Book a fit" };

export default async function BookPage() {
  const res = await client.queries.book({ relativePath: "book.json" });
  const svc = await client.queries.servicesConnection({ first: 50 });
  const names = (svc.data.servicesConnection.edges ?? []).map((e) => e?.node).filter(Boolean)
    .sort((a, b) => (a!.order ?? 99) - (b!.order ?? 99)).map((n) => n!.title);
  return (
    <Suspense fallback={null}>
      <BookView {...res} services={names} />
    </Suspense>
  );
}
