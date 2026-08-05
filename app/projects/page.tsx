import portfolioData from "@/data/portfolio.json";
import { ProjectsPage } from "@/components/ProjectsPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects & Architecture | Ankit Raj",
  description: "Curated catalog of software engineering systems, platforms, and applications by Ankit Raj.",
};

export default function Page() {
  return <ProjectsPage data={portfolioData} />;
}
