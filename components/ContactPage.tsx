"use client";
import React, { useState } from "react";
import { Mail, Linkedin, Github, MapPin, Copy, Check, Send } from "lucide-react";

export const ContactPage = ({ data }: { data: any }) => {
  const personal = data.personal || data.personal_info || {};
  const email = personal.email || data.email || "developer@example.com";
  const location = personal.location || data.location || "Remote / Global";
  const linkedinUrl = data.social?.linkedin || personal.social_links?.linkedin || personal.linkedin || "";
  const githubUrl = data.social?.github || personal.social_links?.github || personal.github || "";

  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = "Collaboration Inquiry from " + (formData.name || "Portfolio Visitor");
    const body = formData.message + "\n\nFrom: " + formData.name + " (" + formData.email + ")";
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-2 border-b border-neutral-200 dark:border-neutral-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-teal-600 dark:text-teal-400 bg-teal-500/10 border border-teal-500/20">
          <Mail className="w-3.5 h-3.5" /> Direct Channel
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Contact & Collaboration
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400">
          Have a project in mind, seeking a staff engineer, or just want to connect? Let's talk.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Contact Info Cards (2 cols) */}
        <div className="md:col-span-2 space-y-4">
          <div className="p-6 rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/60 dark:bg-neutral-900/50 space-y-4">
            <h3 className="text-base font-bold text-gray-900 dark:text-white">
              Direct Coordinates
            </h3>

            {/* Email block */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email Address</label>
              <div className="flex items-center justify-between p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-sm">
                <span className="truncate text-gray-800 dark:text-gray-200 font-mono text-xs">{email}</span>
                <button
                  onClick={handleCopyEmail}
                  className="p-1 rounded text-gray-400 hover:text-teal-600 dark:hover:text-teal-400"
                  title="Copy email"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Location block */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Base Location</label>
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-teal-500" /> {location}
              </p>
            </div>

            {/* Social links */}
            {(linkedinUrl || githubUrl) && (
              <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800 space-y-2">
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Networks</label>
                <div className="flex flex-col gap-2">
                  {linkedinUrl && (
                    <a
                      href={linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                    >
                      <Linkedin className="w-4 h-4 text-teal-500" /> LinkedIn Profile
                    </a>
                  )}
                  {githubUrl && (
                    <a
                      href={githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                    >
                      <Github className="w-4 h-4" /> GitHub Repositories
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Message Form (3 cols) */}
        <div className="md:col-span-3">
          <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-8 rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/60 dark:bg-neutral-900/50 space-y-4"
          >
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Send a Direct Message
            </h3>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Your Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Sarah Jenkins (Engineering Manager)"
                className="w-full px-3.5 py-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Your Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                placeholder="sarah@company.com"
                className="w-full px-3.5 py-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Project / Role Details</label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell me about the role, project, or technical challenge..."
                className="w-full px-3.5 py-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg text-sm font-semibold bg-teal-600 text-white hover:bg-teal-700 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" /> Send Message
            </button>

            {submitted && (
              <p className="text-xs text-emerald-500 text-center pt-1">
                Your email application has been launched with the message pre-filled.
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
