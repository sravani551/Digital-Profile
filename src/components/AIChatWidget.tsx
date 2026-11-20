"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { MessageSquare, Send, Sparkles, X } from "lucide-react";
import { OPEN_CHAT_EVENT } from "./openChat";

type Message = { role: "user" | "assistant"; content: string };

const GREETING: Message = {
  role: "assistant",
  content: "Hi! I'm Sravani's AI assistant. Ask me about her experience, projects or skills.",
};

const SUGGESTIONS = [
  "Summarize Sravani's experience",
  "What has she built with Kafka?",
  "Which frontend frameworks does she use?",
];

export default function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const send = useCallback(
    async (text: string) => {
      const content = text.trim();
      if (!content || busy) return;
      const next = [...messages, { role: "user" as const, content }];
      setMessages(next);
      setInput("");
      setBusy(true);
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: next.filter((m) => m !== GREETING) }),
        });
        const data = await res.json().catch(() => null);
        const reply = res.ok && typeof data?.content === "string" ? data.content : null;
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: reply ?? "Sorry, I couldn't answer that right now. Please try again." },
        ]);
      } catch {
        setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, I'm having trouble connecting right now." }]);
      } finally {
        setBusy(false);
      }
    },
    [busy, messages],
  );

  // Other buttons on the page open the assistant (optionally with a question) via a window event
  useEffect(() => {
    const onOpen = (e: Event) => {
      setOpen(true);
      const prompt = (e as CustomEvent<{ prompt?: string }>).detail?.prompt;
      if (prompt) void send(prompt);
    };
    window.addEventListener(OPEN_CHAT_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_CHAT_EVENT, onOpen);
  }, [send]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    void send(input);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 sm:bottom-6 sm:right-6">
      {open && (
        <div
          role="dialog"
          aria-label="AI assistant"
          className="absolute bottom-16 right-0 flex h-[32rem] max-h-[75vh] w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-900 shadow-2xl shadow-black/50 sm:w-96"
        >
          <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent/15 text-accent">
                <Sparkles size={16} aria-hidden />
              </span>
              <div>
                <p className="text-sm font-semibold text-white">Ask about Sravani</p>
                <p className="text-[11px] text-slate-500">AI answers based on her resume</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-md p-1.5 text-slate-400 hover:bg-white/5 hover:text-white"
              aria-label="Close assistant"
            >
              <X size={18} />
            </button>
          </div>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto p-4" aria-live="polite">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <p
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "rounded-br-md bg-accent text-ink-950"
                      : "rounded-bl-md border border-white/[0.06] bg-ink-800 text-slate-200"
                  }`}
                >
                  {m.content}
                </p>
              </div>
            ))}
            {busy && (
              <div className="flex gap-1 px-1 py-2" aria-label="Assistant is typing">
                {[0, 150, 300].map((d) => (
                  <span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-500" style={{ animationDelay: `${d}ms` }} />
                ))}
              </div>
            )}
            {messages.length === 1 && !busy && (
              <div className="flex flex-wrap gap-2 pt-1">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => void send(s)}
                    className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-slate-300 hover:border-accent/40 hover:text-white"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form onSubmit={onSubmit} className="border-t border-white/[0.06] p-3">
            <div className="flex items-center gap-2">
              <label htmlFor="chat-input" className="sr-only">
                Your question
              </label>
              <input
                id="chat-input"
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={500}
                placeholder="Ask a question…"
                className="flex-1 rounded-lg border border-white/10 bg-ink-950 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-accent/60 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim() || busy}
                className="grid h-10 w-10 place-items-center rounded-lg bg-accent text-ink-950 transition-colors hover:bg-accent-soft disabled:opacity-40"
                aria-label="Send"
              >
                <Send size={16} />
              </button>
            </div>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="grid h-14 w-14 place-items-center rounded-full bg-accent text-ink-950 shadow-lg shadow-accent/20 transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        aria-label={open ? "Close AI assistant" : "Open AI assistant"}
        aria-expanded={open}
      >
        {open ? <X size={22} /> : <MessageSquare size={22} />}
      </button>
    </div>
  );
}
