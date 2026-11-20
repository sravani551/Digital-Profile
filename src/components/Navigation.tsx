"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Sparkles, X } from "lucide-react";
import { personalInfo } from "@/data/resume-data";
import { openChat } from "./openChat";

const links = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${
        scrolled || open ? "border-b border-white/[0.06] bg-ink-950/85 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-page items-center justify-between px-6">
        <Link href="#top" className="flex items-center gap-2.5 text-sm font-semibold text-white" onClick={() => setOpen(false)}>
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent/15 font-mono text-xs text-accent ring-1 ring-accent/30">
            SN
          </span>
          {personalInfo.name}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm text-slate-400 transition-colors hover:text-white"
            >
              {link.name}
            </a>
          ))}
          <button type="button" onClick={() => openChat()} className="btn-secondary ml-3 !px-3.5 !py-2">
            <Sparkles size={15} className="text-accent" aria-hidden />
            Ask my AI
          </button>
        </nav>

        <button
          type="button"
          className="rounded-md p-2 text-slate-300 hover:text-white md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav aria-label="Mobile" className="border-t border-white/[0.06] px-6 pb-6 pt-2 md:hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block rounded-md py-3 text-base text-slate-300 hover:text-white"
            >
              {link.name}
            </a>
          ))}
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              openChat();
            }}
            className="btn-primary mt-3 w-full justify-center"
          >
            <Sparkles size={16} aria-hidden />
            Ask my AI assistant
          </button>
        </nav>
      )}
    </header>
  );
}
