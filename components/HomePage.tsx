"use client";
import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { DevIcon } from "./DevIcon";
import { ArrowRight, ArrowDown, ArrowUpRight, Github, Linkedin, Mail, Sparkles, GraduationCap } from "lucide-react";

// Categorize skills strictly from user DB
const categorizeSkills = (skills: Array<string | { name?: string; skill_name?: string }>) => {
  const normalized = (skills || []).map(s => (typeof s === "string" ? s : s?.name || s?.skill_name || "")).filter(Boolean);

  const categories: Record<string, string[]> = {
    Frontend: [],
    Backend: [],
    "Databases & Caching": [],
    "AI Integration": [],
    "Tools & DevOps": [],
    "Other Technologies": [],
  };

  const frontendKeywords = ["react", "next", "vue", "nuxt", "tailwind", "typescript", "javascript", "html", "css", "bootstrap", "svelte", "angular", "redux", "sass", "ui", "shadcn"];
  const backendKeywords = ["node", "express", "fastify", "nest", "php", "laravel", "python", "django", "flask", "golang", "go", "rust", "java", "kafka", "socket", "graphql", "c#", "c++", "ruby", "rest", "grpc"];
  const dbKeywords = ["mongo", "sql", "postgres", "redis", "database", "supabase", "firebase", "prisma", "dynamo", "elasticsearch", "cassandra", "mariadb"];
  const aiKeywords = ["openai", "gemini", "gpt", "openrouter", "claude", "anthropic", "llm", "ai", "langchain", "huggingface", "pytorch", "tensorflow", "vector", "pinecone", "chroma", "rag"];
  const toolsKeywords = ["git", "github", "docker", "kubernetes", "k8s", "aws", "azure", "gcp", "linux", "swagger", "postman", "nginx", "vercel", "figma", "jira", "ci/cd", "vite", "webpack"];

  normalized.forEach(skill => {
    const lower = skill.toLowerCase();
    if (frontendKeywords.some(k => lower.includes(k))) {
      categories.Frontend.push(skill);
    } else if (backendKeywords.some(k => lower.includes(k))) {
      categories.Backend.push(skill);
    } else if (dbKeywords.some(k => lower.includes(k))) {
      categories["Databases & Caching"].push(skill);
    } else if (aiKeywords.some(k => lower.includes(k))) {
      categories["AI Integration"].push(skill);
    } else if (toolsKeywords.some(k => lower.includes(k))) {
      categories["Tools & DevOps"].push(skill);
    } else {
      categories["Other Technologies"].push(skill);
    }
  });

  return categories;
};

const getCleanExcerpt = (text: string, maxLength: number = 150): string => {
  if (!text) return "";
  const clean = text
    .split("\n").join(" ")
    .replace(/[#*\x60_>~]/g, " ")
    .replace(/[\[\]()]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (clean.length <= maxLength) return clean;
  return clean.slice(0, maxLength).trim() + "...";
};

export const HomePage = ({ data }: { data: any }) => {
  const personal = data.personal || data.personal_info || {};
  const fullName = personal.name || personal.full_name || "Developer";
  const rawTitle = personal.title || data.about_me_title || "";
  const bio = personal.bio || personal.shortBio || data.about_me || "";
  const email = personal.email || "";
  const linkedinUrl = data.social?.linkedin || personal.social_links?.linkedin || "";
  const githubUrl = data.social?.github || personal.social_links?.github || "";

  // Dynamic Typewriter Roles - Strictly extracted from DB Job Title
  const roles = useMemo(() => {
    if (!rawTitle) return [];
    const parts = rawTitle
      .split(/[&|,/•\n]/)
      .map((t: string) => t.trim())
      .filter(Boolean);
    return parts.length > 0 ? parts : [rawTitle.trim()];
  }, [rawTitle]);

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (roles.length === 0) {
      setDisplayedRole("");
      return;
    }

    const currentTarget = roles[currentRoleIndex] || roles[0] || "";

    if (roles.length === 1) {
      if (displayedRole.length < currentTarget.length) {
        const timer = setTimeout(() => {
          setDisplayedRole(currentTarget.slice(0, displayedRole.length + 1));
        }, 70);
        return () => clearTimeout(timer);
      }
      return;
    }

    let timer: NodeJS.Timeout;
    if (!isDeleting) {
      if (displayedRole.length < currentTarget.length) {
        timer = setTimeout(() => {
          setDisplayedRole(currentTarget.slice(0, displayedRole.length + 1));
        }, 80);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      if (displayedRole.length > 0) {
        timer = setTimeout(() => {
          setDisplayedRole(currentTarget.slice(0, displayedRole.length - 1));
        }, 40);
      } else {
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayedRole, isDeleting, currentRoleIndex, roles]);

  const skillsData = data.skills || [];
  const categorizedSkills = categorizeSkills(skillsData);
  const hasSkills = Object.values(categorizedSkills).some(arr => arr.length > 0);

  const allProjects = data.projects?.length ? data.projects : (data.custom_projects || []);
  const featuredProjects = allProjects.filter((p: any) => p.featured).length > 0
    ? allProjects.filter((p: any) => p.featured).slice(0, 6)
    : allProjects.slice(0, 6);

  const educations = (data.education?.length ? data.education : (data.custom_education || []));

  return (
    <div className="w-full">
      {/* 1. Full-Screen Height & Width Modern Hero Section */}
      <section className="relative w-full min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-center px-4 sm:px-6 py-20 overflow-hidden select-none">
        {/* Radiant Ambient Aura */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] md:w-[1100px] h-[500px] sm:h-[650px] bg-gradient-to-tr from-cyan-500/15 via-blue-500/10 to-indigo-500/15 dark:from-cyan-500/10 dark:via-blue-600/10 dark:to-teal-500/10 rounded-full blur-[100px] sm:blur-[130px] pointer-events-none -z-10" />

        {/* Ethereal Glow Mesh Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-500/5 via-transparent to-transparent pointer-events-none -z-10" />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none -z-10" />

        {/* Hero Content Wrapper */}
        <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 flex flex-col items-center animate-in fade-in zoom-in-95 duration-500">
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-neutral-900 dark:text-white leading-[1.05]">
            Hi, I'm {fullName}
          </h1>

          {/* Dynamic Rotating Subtitle with Blinking Cursor */}
          {(displayedRole || rawTitle) && (
            <div className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-neutral-400 dark:text-neutral-300 min-h-[1.25em] flex items-center justify-center">
              <span>{displayedRole || rawTitle}</span>
              <span className="inline-block w-[3px] sm:w-[4px] md:w-[5px] h-[0.9em] bg-neutral-900 dark:bg-neutral-100 ml-1.5 animate-pulse align-middle" />
            </div>
          )}

          {/* Bio Description */}
          {bio && (
            <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-300 font-normal leading-relaxed text-center mt-4 sm:mt-6">
              {bio}
            </p>
          )}

          {/* Centered High-Contrast Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-4 sm:pt-6">
            {email ? (
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center justify-center px-7 py-3 rounded-lg text-sm sm:text-base font-semibold bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100 shadow-md hover:shadow-lg active:scale-95 transition-all gap-2"
              >
                Contact Now
              </a>
            ) : (
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-7 py-3 rounded-lg text-sm sm:text-base font-semibold bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100 shadow-md hover:shadow-lg active:scale-95 transition-all gap-2"
              >
                Contact Now
              </Link>
            )}

            {linkedinUrl && (
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-7 py-3 rounded-lg text-sm sm:text-base font-medium border border-neutral-300 dark:border-neutral-800 bg-neutral-100/80 dark:bg-neutral-900/80 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-200/80 dark:hover:bg-neutral-800 active:scale-95 transition-all gap-2"
              >
                LinkedIn <Linkedin className="w-4 h-4 fill-current" />
              </a>
            )}

            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-7 py-3 rounded-lg text-sm sm:text-base font-medium border border-neutral-300 dark:border-neutral-800 bg-neutral-100/80 dark:bg-neutral-900/80 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-200/80 dark:hover:bg-neutral-800 active:scale-95 transition-all gap-2"
              >
                GitHub <Github className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Scroll Cue Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-xs text-neutral-400 dark:text-neutral-500 animate-bounce pointer-events-none">
          <span>Scroll to explore</span>
          <ArrowDown className="w-3.5 h-3.5" />
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-20 sm:pb-28 space-y-20 sm:space-y-28">

        {/* 2. Skills Matrix (Rendered only if user has skills in DB) */}
        {hasSkills && (
          <section className="space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Skills</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Technologies and frameworks I work with daily.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {Object.entries(categorizedSkills).map(([category, skills]) => {
                if (!skills || skills.length === 0) return null;
                return (
                  <div key={category} className="p-5 rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-neutral-900/40 space-y-3">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">{category}</h3>
                    <div className="flex flex-wrap gap-2.5">
                      {skills.map((skill: string, idx: number) => (
                        <div key={idx} className="inline-flex items-center px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-gray-800 dark:text-gray-200 text-xs font-medium shadow-xs hover:border-teal-500/50 dark:hover:border-teal-500/50 hover:text-teal-600 dark:hover:text-teal-400 transition-all cursor-default">
                          <span>{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* 3. Featured Projects */}
        {featuredProjects.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Featured Projects</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Production systems and platforms I've engineered.</p>
              </div>
              <Link href="/projects" className="text-sm font-medium text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1">
                All Projects <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {featuredProjects.map((project: any, index: number) => {
                const title = project.title || project.name || `Project ${index + 1}`;
                const description = project.description || project.summary || "";
                const liveUrl = project.live_url || project.demo_url || project.link || "";
                const githubUrl = project.github_url || project.repo_url || "";
                const coverImage = project.image_url || project.cover_image || project.image || "";
                const stack = (project.technologies || project.tech_stack || project.tags || []) as string[];
                const cleanExcerpt = getCleanExcerpt(description, 140);

                return (
                  <article key={index} className="group flex flex-col justify-between rounded-xl overflow-hidden border border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-neutral-900/70 shadow-xs hover:shadow-xl dark:hover:shadow-neutral-900/50 transition-all duration-300 hover:border-neutral-300 dark:hover:border-neutral-700">
                    <Link href={`/projects/${index}`} className="cursor-pointer overflow-hidden relative">
                      {coverImage ? (
                        <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                          <img src={coverImage} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        </div>
                      ) : (
                        <div className="h-32 w-full bg-gradient-to-br from-teal-950/40 via-neutral-900 to-zinc-900 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between px-6">
                          <span className="font-mono text-xs text-teal-400 uppercase tracking-widest">Case Study // {String(index + 1).padStart(2, "0")}</span>
                          <Sparkles className="w-4 h-4 text-teal-400/50" />
                        </div>
                      )}
                    </Link>

                    <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between space-y-4">
                      <div className="space-y-2">
                        <Link href={`/projects/${index}`} className="text-xl font-bold text-gray-900 dark:text-white hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                          {title}
                        </Link>
                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3">
                          {cleanExcerpt || "Click to view full architectural details and case study specifications."}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800/60 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {stack.slice(0, 4).map((tech: string, i: number) => (
                            <div key={i} className="w-7 h-7 p-1 rounded-md bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center">
                              <DevIcon name={tech} size={14} className="w-3.5 h-3.5" />
                            </div>
                          ))}
                          {stack.length > 4 && (
                            <span className="text-[11px] font-mono text-gray-400">+{stack.length - 4}</span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {githubUrl && (
                            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-md text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors" title="View Source Code">
                              <Github className="w-4 h-4" />
                            </a>
                          )}
                          {liveUrl && (
                            <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-semibold bg-teal-600 text-white hover:bg-teal-700 transition-colors">
                              Live <ArrowUpRight className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {/* 4. Education Section */}
        {educations.length > 0 && (
          <section className="space-y-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-teal-600 dark:text-teal-400 bg-teal-500/10 border border-teal-500/20 mb-2">
                <GraduationCap className="w-3.5 h-3.5" /> Academic Background
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Education</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Academic degrees and qualifications.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {educations.map((edu: any, index: number) => {
                const institution = edu.institution || edu.school || edu.university || edu.college || "University";
                const degree = edu.degree || edu.field_of_study || edu.major || edu.title || "Degree";
                const period = edu.period || edu.duration || edu.year || (edu.start_date ? `${edu.start_date} - ${edu.end_date || "Present"}` : "");
                const description = edu.description || edu.summary || edu.grade || "";

                return (
                  <div key={edu.id || index} className="p-6 rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-neutral-900/40 space-y-3 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all group">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                          {degree}
                        </h3>
                        <div className="flex items-center gap-1.5 text-sm font-medium text-teal-600 dark:text-teal-400">
                          <GraduationCap className="w-4 h-4 shrink-0" />
                          <span>{institution}</span>
                        </div>
                      </div>
                      {period && (
                        <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-neutral-200/60 dark:bg-neutral-800 text-gray-700 dark:text-gray-300 shrink-0">
                          {period}
                        </span>
                      )}
                    </div>
                    {description && (
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line pt-1">{description}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* 5. Get in Touch Section */}
        <section className="p-8 sm:p-10 rounded-2xl border border-teal-500/20 bg-gradient-to-b from-teal-500/5 to-transparent dark:from-teal-950/20 dark:to-transparent space-y-4 text-center sm:text-left sm:flex sm:items-center sm:justify-between">
          <div className="space-y-1 max-w-xl">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Have a project in mind or want to collaborate?</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">I'm always open to discussing system architecture, engineering roles, and new ventures.</p>
          </div>
          {email ? (
            <a href={`mailto:${email}`} className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold bg-teal-600 text-white hover:bg-teal-700 transition-colors shrink-0 shadow-sm gap-2 mt-4 sm:mt-0">
              <Mail className="w-4 h-4" /> Send Email
            </a>
          ) : (
            <Link href="/contact" className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold bg-teal-600 text-white hover:bg-teal-700 transition-colors shrink-0 shadow-sm gap-2 mt-4 sm:mt-0">
              <Mail className="w-4 h-4" /> Get in Touch
            </Link>
          )}
        </section>
      </div>
    </div>
  );
};
