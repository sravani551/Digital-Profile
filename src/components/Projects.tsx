import { ArrowUpRight, Github } from "lucide-react";
import { featuredProjects, personalInfo } from "@/data/resume-data";
import SectionHeader from "./SectionHeader";

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeader
          index="02"
          label="Projects"
          title="Selected work"
          intro="Open-source projects with tests, CI and design notes. Each README explains the trade-offs behind the code."
        />
        <a
          href={`${personalInfo.github}?tab=repositories`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-soft"
        >
          All repositories <ArrowUpRight size={16} aria-hidden />
        </a>
      </div>

      <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((p) => (
          <li key={p.repo}>
            <a
              href={p.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="card card-hover group flex h-full flex-col p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-base font-semibold text-white">{p.title}</h3>
                <Github size={18} className="shrink-0 text-slate-500 transition-colors group-hover:text-accent" aria-hidden />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{p.summary}</p>
              <ul className="mt-4 space-y-1.5">
                {p.highlights.map((h) => (
                  <li key={h} className="flex gap-2.5 text-[13px] leading-relaxed text-slate-300">
                    <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                    {h}
                  </li>
                ))}
              </ul>
              <ul className="mt-auto flex flex-wrap gap-1.5 pt-6" aria-label="Technologies">
                {p.tech.map((t) => (
                  <li key={t} className="chip">
                    {t}
                  </li>
                ))}
              </ul>
              <span className="sr-only"> (opens GitHub repository)</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
