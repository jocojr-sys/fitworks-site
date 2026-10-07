import type { Metadata } from "next";
import { client } from "../../tina/__generated__/client";
import FitsView from "../../components/views/FitsView";

export const metadata: Metadata = { title: "Fits and pricing" };

export default async function FitsPage() {
  const res = await client.queries.fits({ relativePath: "fits.json" });
  const svc = await client.queries.servicesConnection({ first: 50 });
  const services = (svc.data.servicesConnection.edges ?? []).map((e) => e?.node).filter(Boolean).map((n) => n!);
  return <FitsView {...res} services={services} />;
}
