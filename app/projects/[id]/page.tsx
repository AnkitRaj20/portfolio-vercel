import portfolioData from "@/data/portfolio.json";
import { ProjectDetailPage } from "@/components/ProjectDetailPage";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const allProjects = (portfolioData as any).custom_projects?.length
    ? (portfolioData as any).custom_projects
    : ((portfolioData as any).projects || []);

  return allProjects.map((_: any, index: number) => ({
    id: String(index),
  }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const allProjects = (portfolioData as any).custom_projects?.length
    ? (portfolioData as any).custom_projects
    : ((portfolioData as any).projects || []);
  const project = allProjects[parseInt(params.id, 10)] || allProjects[0];

  return {
    title: project ? `${project.title || project.name} | ${portfolioData.personal_info?.full_name || "Project"}` : "Project Details",
    description: project?.description ? project.description.slice(0, 160) : "Detailed architectural case study.",
  };
}

export default function Page({ params }: { params: { id: string } }) {
  const allProjects = (portfolioData as any).custom_projects?.length
    ? (portfolioData as any).custom_projects
    : ((portfolioData as any).projects || []);
  const index = parseInt(params.id, 10);
  if (isNaN(index) || !allProjects[index]) {
    notFound();
  }

  return <ProjectDetailPage data={portfolioData} projectId={params.id} />;
}
