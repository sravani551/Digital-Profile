import { experience } from "@/data/resume-data";
import SectionHeader from "./SectionHeader";

export default function Experience() {
  return (
    <section id="experience" className="section">
      <SectionHeader
        index="01"
        label="Experience"
        title="Where I've worked"
        intro="Six years across insurance, finance and technology, from backend services to owning full-stack delivery."
      />

      <ol className="relative mt-14 space-y-6 border-l border-white/[0.08] pl-6 sm:pl-10">
        {experience.map((job) => (
          <li key={`${job.company}-${job.period}`} className="relative">
            <span
              className="absolute -left-[29px] top-7 h-2.5 w-2.5 rounded-full border-2 border-ink-950 bg-accent ring-4 ring-accent/15 sm:-left-[45px]"
              aria-hidden
            />
            <article className="card card-hover p-6 sm:p-8">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-white">{job.title}</h3>
                  <p className="text-slate-400">
                    {job.company} <span className="text-slate-600">·</span> {job.industry}
                  </p>
                </div>
                <p className="shrink-0 font-mono text-xs text-slate-500">{job.period}</p>
              </div>

              <p className="mt-4 text-slate-300">{job.description}</p>
              <ul className="mt-4 space-y-2">
                {job.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-sm leading-relaxed text-slate-400">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-500" aria-hidden />
                    {h}
                  </li>
                ))}
              </ul>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
                {job.tech.map((t) => (
                  <li key={t} className="chip">
                    {t}
                  </li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
