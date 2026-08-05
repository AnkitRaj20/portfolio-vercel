"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sun, Moon, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";

export const Shell = ({ data, children }: { data: any; children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const isDarkStored = localStorage.getItem("craft_theme");
    if (isDarkStored !== null) {
      setIsDark(isDarkStored === "dark");
    }
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("craft_theme", isDark ? "dark" : "light");
  }, [isDark]);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/timeline", label: "Timeline" },
    { path: "/projects", label: "Projects" },
    { path: "/contact", label: "Contact" },
  ];

  const personal = data.personal || data.personal_info || {};
  const fullName = personal.name || personal.full_name || data.name || "Developer";
  const resumeUrl = "/resume.pdf";
  const linkedinUrl = data.social?.linkedin || personal.social_links?.linkedin || personal.linkedin || "";
  const githubUrl = data.social?.github || personal.social_links?.github || personal.github || "";
  const email = personal.email || data.email || "";

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/85 dark:bg-gray-950/85 border-b border-neutral-200/80 dark:border-neutral-800/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="text-lg font-bold tracking-tight text-gray-900 dark:text-white hover:text-teal-600 dark:hover:text-teal-400 transition-colors flex items-center gap-2"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse" />
            {fullName}
          </Link>

          <nav className="hidden md:flex items-center gap-1 sm:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`px-3.5 py-1.5 rounded-md text-sm font-medium transition-all ${
                    isActive
                      ? "text-teal-600 dark:text-teal-400 bg-teal-500/10 font-semibold"
                      : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-neutral-800/60"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-gray-100 dark:hover:bg-neutral-800/60 transition-all flex items-center gap-1"
            >
              Resume <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={() => setIsDark(!isDark)}
              aria-label="Toggle theme"
              className="p-2 ml-1 rounded-md text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-neutral-800/60 transition-colors"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-gray-600" />}
            </button>
          </nav>

          <div className="flex md:hidden items-center gap-1">
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-md text-gray-500 dark:text-gray-400"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-gray-600" />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 dark:text-gray-200"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-gray-950 px-4 py-3 space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-sm font-medium ${
                    isActive
                      ? "text-teal-600 dark:text-teal-400 bg-teal-500/10 font-semibold"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        )}
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {children}
      </main>

      <footer className="border-t border-neutral-200 dark:border-neutral-800/80 py-10 mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} {fullName}. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            {linkedinUrl && (
              <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-teal-600 dark:hover:text-teal-400 flex items-center gap-1">
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
            )}
            {githubUrl && (
              <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-teal-600 dark:hover:text-teal-400 flex items-center gap-1">
                <Github className="w-4 h-4" /> GitHub
              </a>
            )}
            {email && (
              <a href={`mailto:${email}`} className="hover:text-teal-600 dark:hover:text-teal-400 flex items-center gap-1">
                <Mail className="w-4 h-4" /> Email
              </a>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
};
