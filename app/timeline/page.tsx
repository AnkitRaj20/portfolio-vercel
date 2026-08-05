import portfolioData from "@/data/portfolio.json";
import { TimelinePage } from "@/components/TimelinePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience & Timeline | Ankit Raj",
  description: "Career timeline, engineering milestones, and academic background of Ankit Raj.",
};

export default function Page() {
  return <TimelinePage data={portfolioData} />;
}
