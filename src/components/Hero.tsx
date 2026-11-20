import { ArrowRight, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { experience, focusAreas, personalInfo, stats } from "@/data/resume-data";
import AskAiButton from "./AskAiButton";

export default function Hero() {
  const current = experience[0];

  return (
    <section id="about" className="hero-glow relative">
      <div className="mx-auto grid max-w-page items-center gap-14 px-6 pb-20 pt-32 sm:pt-40 lg:grid-cols-[1.35fr_1fr] lg:pb-28">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-slate-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
            Currently at {current.company.replace(/^The /, "").replace(/ Companies$/, "")}
          </p>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {personalInfo.name}
          </h1>
          <p className="mt-3 text-xl font-medium text-slate-200 sm:text-2xl">{personalInfo.title}</p>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">{personalInfo.summary}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#projects" className="btn-primary">
              View projects <ArrowRight size={16} aria-hidden />
            </a>
            <AskAiButton />
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-400">
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={15} aria-hidden /> {personalInfo.location}
            </span>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-white">
              <Linkedin size={15} aria-hidden /> LinkedIn
            </a>
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-white">
              <Github size={15} aria-hidden /> GitHub
            </a>
            <a href={`mailto:${personalInfo.email}`} className="inline-flex items-center gap-1.5 hover:text-white">
              <Mail size={15} aria-hidden /> Email
            </a>
          </div>
        </div>

        <aside className="card p-6 sm:p-8" aria-label="At a glance">
          <p className="eyebrow">At a glance</p>
          <dl className="mt-6 grid grid-cols-2 gap-6">
            {stats.map((s) => (
              <div key={s.label} className={s.value.length > 4 ? "col-span-2" : ""}>
                <dt className="text-xs text-slate-500">{s.label}</dt>
                <dd className="mt-1 text-2xl font-semibold tracking-tight text-white">{s.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 border-t border-white/[0.06] pt-6">
            <p className="text-xs text-slate-500">Focus areas</p>
            <ul className="mt-3 space-y-2.5">
              {focusAreas.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-slate-300">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}
