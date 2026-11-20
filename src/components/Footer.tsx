import { personalInfo } from "@/data/resume-data";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06]">
      <div className="mx-auto flex max-w-page flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-slate-500 sm:flex-row">
        <p>
          © {new Date().getFullYear()} {personalInfo.name}
        </p>
        <p>
          Built with Next.js, TypeScript and Tailwind CSS ·{" "}
          <a
            href={`${personalInfo.github}/Digital-Profile`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 underline-offset-4 hover:text-white hover:underline"
          >
            Source
          </a>
        </p>
      </div>
    </footer>
  );
}
