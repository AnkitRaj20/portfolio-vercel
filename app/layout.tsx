import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import portfolioData from "@/data/portfolio.json";
import { Shell } from "@/components/Shell";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ankit Raj | Full-Stack Developer",
  description: "I'm Ankit Raj, a Full-Stack Developer, particularly specializing in backend development. Passionate about building dynamic and scalable web applications. My expertise spans the MERN stack, Vue.js, Next.js and NuxtJs, with a strong focus on crafting robust backend solutions using Node.js. I excel at designing efficient databases with MongoDB, MySQL, and PostgreSQL. My focus is on creating seamless user experiences and delivering production-ready code that truly shines.",
  openGraph: {
    title: "Ankit Raj | Full-Stack Developer",
    description: "I'm Ankit Raj, a Full-Stack Developer, particularly specializing in backend development. Passionate about building dynamic and scalable web applications. My expertise spans the MERN stack, Vue.js, Next.js and NuxtJs, with a strong focus on crafting robust backend solutions using Node.js. I excel at designing efficient databases with MongoDB, MySQL, and PostgreSQL. My focus is on creating seamless user experiences and delivering production-ready code that truly shines.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Shell data={portfolioData}>
          {children}
        </Shell>
      </body>
    </html>
  );
}
