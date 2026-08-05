"use client";
import React from "react";
import { Briefcase, GraduationCap, Calendar, MapPin, Building } from "lucide-react";

export const TimelinePage = ({ data }: { data: any }) => {
  const experiences = (data.custom_experience?.length ? data.custom_experience : data.experience) || [];
  const educations = (data.custom_education?.length ? data.custom_education : data.education) || [];

  interface TimelineItem {
    id: string;
    type: "experience" | "education";
    title: string;
    organization: string;
    date: string;
    location?: string;
    description?: string;
    bullets?: string[];
  }

  const timelineItems: TimelineItem[] = [];

  experiences.forEach((exp: any, index: number) => {
    const period = exp.period || exp.duration || (exp.start_date ? `${exp.start_date} - ${exp.end_date || "Present"}` : `Milestone ${index + 1}`);
    timelineItems.push({
      id: `exp-${index}`,
      type: "experience",
      title: exp.position || exp.role || exp.title || "Software Engineer",
      organization: exp.company || exp.organization || "Company",
      date: period,
      location: exp.location,
      description: exp.description || exp.summary,
      bullets: exp.responsibilities || exp.achievements || exp.highlights,
    });
  });

  educations.forEach((edu: any, index: number) => {
    const period = edu.year || edu.duration || (edu.start_date ? `${edu.start_date} - ${edu.end_date || "Graduated"}` : "");
    timelineItems.push({
      id: `edu-${index}`,
      type: "education",
      title: edu.degree || edu.field_of_study || edu.title || "Degree",
      organization: edu.institution || edu.school || edu.university || "University",
      date: period || "Graduated",
      location: edu.location,
      description: edu.description,
      bullets: edu.achievements || edu.activities,
    });
  });

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-2 border-b border-neutral-200 dark:border-neutral-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-teal-600 dark:text-teal-400 bg-teal-500/10 border border-teal-500/20">
          <Calendar className="w-3.5 h-3.5" /> Career & Education Timeline
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          My Journey
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400">
          A chronological timeline of my engineering roles, technical milestones, and academic background.
        </p>
      </div>

      {/* Timeline Stream */}
      <div className="relative border-l-2 border-neutral-200 dark:border-neutral-800 ml-4 sm:ml-8 space-y-12 pb-4">
        {timelineItems.map((item) => (
          <div key={item.id} className="relative pl-6 sm:pl-8 group">
            {/* Timeline Node Icon */}
            <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-white dark:bg-gray-950 border-2 border-teal-500 flex items-center justify-center shadow-xs transition-transform duration-200 group-hover:scale-110">
              {item.type === "experience" ? (
                <Briefcase className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              ) : (
                <GraduationCap className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              )}
            </div>

            {/* Timeline Card Content */}
            <div className="p-5 sm:p-6 rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/60 dark:bg-neutral-900/50 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all space-y-3">
              {/* Date Badge & Type */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold font-mono bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
                  {item.date}
                </span>
                <span className="text-xs uppercase tracking-wider font-semibold text-gray-400">
                  {item.type === "experience" ? "Work Experience" : "Education"}
                </span>
              </div>

              {/* Title & Organization */}
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-sm font-semibold text-teal-600 dark:text-teal-400 flex items-center gap-1.5 mt-0.5">
                  <Building className="w-3.5 h-3.5" /> {item.organization}
                  {item.location && (
                    <span className="text-gray-400 font-normal flex items-center gap-1 ml-2">
                      <MapPin className="w-3 h-3" /> {item.location}
                    </span>
                  )}
                </p>
              </div>

              {/* Description */}
              {item.description && (
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {item.description}
                </p>
              )}

              {/* Bullet Points */}
              {item.bullets && item.bullets.length > 0 && (
                <ul className="space-y-1.5 pt-1">
                  {item.bullets.map((bullet, i) => (
                    <li key={i} className="text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}

        {timelineItems.length === 0 && (
          <div className="pl-6 text-sm text-gray-400">
            No timeline records found. Add work experience or education in your profile.
          </div>
        )}
      </div>
    </div>
  );
};
