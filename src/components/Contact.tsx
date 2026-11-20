import { Github, Linkedin, Mail } from "lucide-react";
import { personalInfo } from "@/data/resume-data";
import AskAiButton from "./AskAiButton";

export default function Contact() {
  const channels = [
    { label: "Email", value: personalInfo.email, href: `mailto:${personalInfo.email}`, Icon: Mail },
    { label: "LinkedIn", value: "sravani-n", href: personalInfo.linkedin, Icon: Linkedin },
    { label: "GitHub", value: "sravani551", href: personalInfo.github, Icon: Github },
  ];

  return (
    <section id="contact" className="section">
      <div className="card relative overflow-hidden p-8 sm:p-12">
        <div className="hero-glow pointer-events-none absolute inset-0 opacity-70" aria-hidden />
        <div className="relative">
          <p className="eyebrow">04 · Contact</p>
          <h2 className="heading max-w-2xl">Let&apos;s build something reliable together.</h2>
          <p className="mt-4 max-w-xl text-slate-400">
            Whether it&apos;s a role, a project or a question about my work, I&apos;m happy to talk. Email or LinkedIn is the fastest way to reach me.
          </p>

          <ul className="mt-10 grid gap-4 sm:grid-cols-3">
            {channels.map(({ label, value, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-ink-950/60 p-4 transition-colors hover:border-accent/30"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent">
                    <Icon size={18} aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs text-slate-500">{label}</span>
                    <span className="block truncate text-sm font-medium text-white">{value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <AskAiButton label="Or ask my AI assistant first" prompt="What has Sravani built with Spring Boot and microservices?" />
          </div>
        </div>
      </div>
    </section>
  );
}
