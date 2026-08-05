import portfolioData from "@/data/portfolio.json";
import { HomePage } from "@/components/HomePage";

export default function Page() {
  return <HomePage data={portfolioData} />;
}
