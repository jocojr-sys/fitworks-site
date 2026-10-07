import type { Metadata } from "next";
import { client } from "../../tina/__generated__/client";
import TechnologyView from "../../components/views/TechnologyView";

export const metadata: Metadata = { title: "Fitting Technology" };

export default async function TechnologyPage() {
  const res = await client.queries.technology({ relativePath: "technology.json" });
  return <TechnologyView {...res} />;
}
