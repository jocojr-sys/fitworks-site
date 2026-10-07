import { client } from "../tina/__generated__/client";
import HomeView from "../components/views/HomeView";

export default async function HomePage() {
  const res = await client.queries.home({ relativePath: "home.json" });
  return <HomeView {...res} />;
}
