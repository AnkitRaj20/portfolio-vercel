import portfolioData from "@/data/portfolio.json";
import { ContactPage } from "@/components/ContactPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & Collaboration | Ankit Raj",
  description: "Direct outreach and contact channels for Ankit Raj.",
};

export default function Page() {
  return <ContactPage data={portfolioData} />;
}
