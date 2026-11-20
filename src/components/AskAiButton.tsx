"use client";

import { Sparkles } from "lucide-react";
import { openChat } from "./openChat";

export default function AskAiButton({
  label = "Ask my AI assistant",
  prompt,
  variant = "secondary",
}: {
  label?: string;
  prompt?: string;
  variant?: "primary" | "secondary";
}) {
  return (
    <button
      type="button"
      onClick={() => openChat(prompt)}
      className={variant === "primary" ? "btn-primary" : "btn-secondary"}
    >
      <Sparkles size={16} className={variant === "primary" ? "" : "text-accent"} aria-hidden />
      {label}
    </button>
  );
}
