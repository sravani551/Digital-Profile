import { certifications, education, skillCategories } from "@/data/resume-data";
import SectionHeader from "./SectionHeader";

export default function Skills() {
  return (
    <section id="skills" className="section">
      <SectionHeader index="03" label="Skills" title="Tools I work with" />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((c) => (
          <div key={c.name} className="card p-6">
            <h3 className="text-sm font-semibold text-white">{c.name}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {c.skills.map((s) => (
                <li key={s} className="chip">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-16 grid gap-5 md:grid-cols-2">
        <div className="card p-6 sm:p-8">
          <p className="eyebrow">Education</p>
          <ul className="mt-5 space-y-4">
            {education.map((e) => (
              <li key={e.degree}>
                <p className="font-medium text-white">{e.degree}</p>
                <p className="mt-1 text-sm text-slate-400">{e.school}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="card p-6 sm:p-8">
          <p className="eyebrow">Certifications</p>
          <ul className="mt-5 space-y-4">
            {certifications.map((c) => (
              <li key={c.title}>
                <p className="font-medium text-white">{c.title}</p>
                <p className="mt-1 text-sm text-slate-400">{c.issuer}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
