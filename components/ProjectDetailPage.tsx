"use client";
import React from "react";
import Link from "next/link";
import { DevIcon } from "./DevIcon";
import { ArrowLeft, ArrowUpRight, Github, Sparkles, Layers } from "lucide-react";

const FormattedMarkdown = ({ content }: { content: string }) => {
  if (!content) return null;
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let currentList: string[] = [];

  const flushList = (keyPrefix: string) => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`${keyPrefix}-list`} className="space-y-2 my-3 pl-5 list-disc text-neutral-700 dark:text-neutral-300">
          {currentList.map((item, i) => (
            <li key={i} className="leading-relaxed">
              {renderInlineFormatting(item)}
            </li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  const renderInlineFormatting = (text: string) => {
    const parts = text.split("**");
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return (
          <strong key={index} className="font-semibold text-neutral-900 dark:text-white">
            {part}
          </strong>
        );
      }
      return part;
    });
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
      currentList.push(trimmed.slice(2));
      return;
    }
    flushList(`line-${index}`);

    if (trimmed.startsWith("### ")) {
      elements.push(
        <h4 key={index} className="text-lg font-bold text-neutral-900 dark:text-white mt-6 mb-2">
          {trimmed.slice(4)}
        </h4>
      );
    } else if (trimmed.startsWith("## ")) {
      elements.push(
        <h3 key={index} className="text-xl font-bold text-neutral-900 dark:text-white mt-8 mb-3">
          {trimmed.slice(3)}
        </h3>
      );
    } else if (trimmed.startsWith("# ")) {
      elements.push(
        <h2 key={index} className="text-2xl font-black text-neutral-900 dark:text-white mt-8 mb-4">
          {trimmed.slice(2)}
        </h2>
      );
    } else if (trimmed.startsWith("> ")) {
      elements.push(
        <blockquote key={index} className="border-l-4 border-teal-500 pl-4 py-1.5 my-4 bg-teal-500/5 dark:bg-teal-500/10 text-neutral-700 dark:text-neutral-300 italic rounded-r-md text-sm">
          {renderInlineFormatting(trimmed.slice(2))}
        </blockquote>
      );
    } else if (trimmed === "---") {
      elements.push(<hr key={index} className="border-neutral-200 dark:border-neutral-800 my-6" />);
    } else if (trimmed.length > 0) {
      elements.push(
        <p key={index} className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed my-3">
          {renderInlineFormatting(trimmed)}
        </p>
      );
    }
  });

  flushList("end");
  return <div className="space-y-1">{elements}</div>;
};

export const ProjectDetailPage = ({ data, projectId }: { data: any; projectId: string }) => {
  const allProjects = (data.custom_projects?.length ? data.custom_projects : data.projects) || [];
  const index = parseInt(projectId, 10);
  const project = (!isNaN(index) && allProjects[index]) ? allProjects[index] : allProjects[0];

  if (!project) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Project Not Found</h2>
        <Link href="/projects" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-600 text-white text-sm font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Projects
        </Link>
      </div>
    );
  }

  const title = project.title || project.name || "Case Study";
  const description = project.description || project.summary || "";
  const liveUrl = project.live_url || project.demo_url || project.demo || project.link || "";
  const githubUrl = project.github_url || project.github || project.repo_url || "";
  const coverImage = project.image_url || project.cover_image || project.image || "";
  const stack = (project.technologies || project.tech_stack || project.tags || []) as string[];
  const categoryTag = project.category || project.tag || (stack[0] ? `${stack[0].toUpperCase()}` : "FEATURED PROJECT");

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <Link href="/projects" className="group inline-flex items-center gap-2 text-sm font-medium text-neutral-500 dark:text-neutral-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
              {title}
            </h1>
            <div className="flex flex-wrap items-center gap-3">
              {liveUrl && (
                <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-teal-600 text-white hover:bg-teal-700 shadow-sm transition-all">
                  Visit Live <ArrowUpRight className="w-4 h-4" />
                </a>
              )}
              {githubUrl && (
                <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium border border-neutral-300 dark:border-neutral-800 bg-neutral-100/80 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-all">
                  <Github className="w-4 h-4" /> Source Code
                </a>
              )}
            </div>
          </div>

          <div className="rounded-xl overflow-hidden border border-neutral-200/80 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 shadow-md">
            {coverImage ? (
              <img src={coverImage} alt={title} className="w-full h-auto max-h-[360px] object-cover object-top" />
            ) : (
              <div className="h-52 w-full bg-gradient-to-br from-teal-950/40 via-neutral-900 to-zinc-900 flex flex-col items-center justify-center p-6 text-center">
                <Sparkles className="w-8 h-8 text-teal-400 mb-2" />
                <span className="font-mono text-xs text-teal-300 uppercase tracking-widest">{categoryTag}</span>
              </div>
            )}
          </div>

          {stack.length > 0 && (
            <div className="p-5 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Technology Used</h3>
              <div className="flex flex-wrap gap-2.5">
                {stack.map((tech: string, i: number) => (
                  <div key={i} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-gray-800 dark:text-gray-200 text-xs font-medium">
                    <DevIcon name={tech} size={16} className="w-4 h-4" />
                    <span>{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-7 space-y-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold font-mono uppercase tracking-wider bg-indigo-600/10 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30">
              <Layers className="w-3.5 h-3.5" /> {categoryTag}
            </span>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 shadow-xs">
            <FormattedMarkdown content={description} />
          </div>
        </div>
      </div>
    </div>
  );
};
