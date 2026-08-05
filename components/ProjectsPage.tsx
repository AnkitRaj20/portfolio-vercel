"use client";
import React from "react";
import Link from "next/link";
import { DevIcon } from "./DevIcon";
import { Github, ArrowUpRight, Code, Sparkles } from "lucide-react";

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

export const ProjectsPage = ({ data }: { data: any }) => {
  const allProjects = (data.custom_projects?.length ? data.custom_projects : data.projects) || [];

  return (
    <div className="space-y-12">
      <div className="space-y-2 border-b border-neutral-200 dark:border-neutral-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-teal-600 dark:text-teal-400 bg-teal-500/10 border border-teal-500/20">
          <Code className="w-3.5 h-3.5" /> Engineering Portfolio
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">All Projects</h1>
        <p className="text-base text-gray-600 dark:text-gray-400">A curated index of production applications, distributed backends, and systems I've engineered.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {allProjects.map((project: any, index: number) => {
          const title = project.title || project.name || `Project ${index + 1}`;
          const description = project.description || project.summary || "";
          const liveUrl = project.live_url || project.demo_url || project.demo || project.link || "";
          const githubUrl = project.github_url || project.github || project.repo_url || "";
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
    </div>
  );
};
