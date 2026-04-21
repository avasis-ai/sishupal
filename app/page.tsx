"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ──────────────────────────────────────────────
   ASHOKA CHAKRA SVG COMPONENT
   ────────────────────────────────────────────── */
function AshokaChakra({ size = 120, className = "" }: { size?: number; className?: string }) {
  const spokes = 24;
  const r = size / 2;
  const innerR = r * 0.35;
  const outerR = r * 0.85;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      fill="none"
    >
      {/* Outer circle */}
      <circle cx={r} cy={r} stroke="currentColor" strokeWidth="1.5" r={outerR} opacity="0.3" />
      {/* Inner circle */}
      <circle cx={r} cy={r} stroke="currentColor" strokeWidth="1" r={innerR} opacity="0.2" />
      {/* Spokes */}
      {Array.from({ length: spokes }).map((_, i) => {
        const angle = (i * 360) / spokes;
        const rad = (angle * Math.PI) / 180;
        const x1 = r + innerR * Math.cos(rad);
        const y1 = r + innerR * Math.sin(rad);
        const x2 = r + outerR * Math.cos(rad);
        const y2 = r + outerR * Math.sin(rad);
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.25"
          />
        );
      })}
      {/* Center dot */}
      <circle cx={r} cy={r} fill="currentColor" r={3} opacity="0.4" />
    </svg>
  );
}

/* ──────────────────────────────────────────────
   WAVEFORM ANIMATION
   ────────────────────────────────────────────── */
function Waveform({ active = false, bars = 40 }: { active?: boolean; bars?: number }) {
  return (
    <div className="flex items-center justify-center gap-[3px] h-16">
      {Array.from({ length: bars }).map((_, i) => (
        <motion.div
          key={i}
          className="w-[3px] rounded-full"
          style={{ backgroundColor: "var(--color-accent)" }}
          animate={
            active
              ? {
                  height: [4, Math.random() * 40 + 8, 4],
                  opacity: [0.4, 1, 0.4],
                }
              : { height: 4, opacity: 0.3 }
          }
          transition={
            active
              ? {
                  duration: 0.6 + Math.random() * 0.4,
                  repeat: Infinity,
                  delay: i * 0.03,
                  ease: "easeInOut",
                }
              : { duration: 0.3 }
          }
        />
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────────
   CHAT DEMO
   ────────────────────────────────────────────── */
function ChatDemo() {
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  const demoResponses: Record<string, string> = {
    default:
      "I'm Sishupal — your fully controllable AI agent. I can see your screen, run commands, browse the web, and control your entire machine. What would you like me to do?",
    hello: "Hey! I'm here. What are we building today?",
    hi: "Hello! Sishupal is online and ready. Ask me anything.",
    "what can you do":
      "I can: 🔧 Control your Mac (apps, files, terminal) · 🌐 Browse the web · 📸 See your screen · 🎙️ Hear your voice · 💻 Write & deploy code · 📱 Send messages · 🧠 Remember everything. Think of me as Jarvis, but open source.",
    "who built you":
      "I was built by Avasis — an Indian AI company founded by Abhay Talreja. I'm India's first fully controllable AI agent. Proudly made in India 🇮🇳",
    india:
      "🇮🇳 Built in India, for the world. I carry the spirit of innovation that defines India's tech story — from ISRO to UPI to now, fully controllable AI agents.",
    jarvis:
      "Think Jarvis, but real. And open source. I run on your machine, under your control. No cloud dependency, no data leaks. Your agent, your rules.",
  };

  const getResponse = (msg: string): string => {
    const lower = msg.toLowerCase();
    for (const [key, resp] of Object.entries(demoResponses)) {
      if (key !== "default" && lower.includes(key)) return resp;
    }
    return demoResponses.default;
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: getResponse(userMsg) },
      ]);
      setIsTyping(false);
    }, 800 + Math.random() * 1200);
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Terminal-style container */}
      <div className="border border-[var(--color-border)] rounded-lg overflow-hidden bg-[var(--color-bg-alt)]">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-[var(--color-surface)] border-b border-[var(--color-border)]">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 text-xs font-mono text-[var(--color-text-dim)]">
            sishupal@avasis ~ agent --interactive
          </span>
        </div>

        {/* Chat area */}
        <div
          ref={chatRef}
          className="h-[400px] overflow-y-auto p-6 space-y-4 scroll-smooth"
        >
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-[var(--color-text-dim)]">
              <Waveform active={isListening} bars={30} />
              <p className="text-sm font-mono">
                {isListening ? "Listening..." : "Say something to Sishupal"}
              </p>
            </div>
          )}

          <AnimatePresence>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-lg text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-[var(--color-accent)] text-black font-medium"
                      : "bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)]"
                  }`}
                >
                  {msg.role === "assistant" && (
                    <span className="text-[var(--color-accent)] font-mono text-xs block mb-1">
                      sishupal
                    </span>
                  )}
                  {msg.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-[var(--color-surface)] border border-[var(--color-border)] px-4 py-3 rounded-lg">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[var(--color-text-dim)] typing-dot" />
                  <div className="w-2 h-2 rounded-full bg-[var(--color-text-dim)] typing-dot" />
                  <div className="w-2 h-2 rounded-full bg-[var(--color-text-dim)] typing-dot" />
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Input */}
        <div className="flex items-center gap-3 p-4 border-t border-[var(--color-border)] bg-[var(--color-surface)]">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Talk to Sishupal..."
            className="flex-1 bg-[var(--color-bg-alt)] border border-[var(--color-border)] rounded-lg px-4 py-2.5 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-dim)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-colors"
          />
          <button
            onClick={sendMessage}
            className="bg-gradient-accent text-black font-semibold px-5 py-2.5 rounded-lg text-sm hover:opacity-90 transition-opacity"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   FEATURE CARD
   ────────────────────────────────────────────── */
function FeatureCard({
  icon,
  title,
  description,
  delay = 0,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="border border-[var(--color-border)] rounded-xl p-6 bg-[var(--color-surface)] hover:border-[var(--color-accent)] transition-colors group"
    >
      <div className="w-10 h-10 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)] flex items-center justify-center mb-4 text-[var(--color-accent)] group-hover:border-[var(--color-accent)] transition-colors">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2">
        {title}
      </h3>
      <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
   MAIN LANDING PAGE
   ────────────────────────────────────────────── */
export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-bg)] grid-pattern">
      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-accent flex items-center justify-center text-black font-bold text-sm">
              S
            </div>
            <span className="font-semibold text-[var(--color-text)] tracking-tight">
              Sishupal
            </span>
            <span className="text-xs font-mono text-[var(--color-text-dim)] bg-[var(--color-surface)] px-2 py-0.5 rounded border border-[var(--color-border)]">
              by Avasis
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-[var(--color-text-muted)]">
            <a href="#features" className="hover:text-[var(--color-text)] transition-colors">
              Features
            </a>
            <a href="#demo" className="hover:text-[var(--color-text)] transition-colors">
              Demo
            </a>
            <a
              href="https://github.com/avasis-ai"
              target="_blank"
              className="hover:text-[var(--color-text)] transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://avasis.ai"
              target="_blank"
              className="bg-[var(--color-surface)] border border-[var(--color-border)] px-4 py-2 rounded-lg text-[var(--color-text)] hover:border-[var(--color-accent)] transition-colors text-sm"
            >
              Avasis
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[var(--color-accent)] opacity-[0.03] blur-[120px] pointer-events-none" />

        {/* Ashoka Chakra - background decoration */}
        <div className="absolute top-20 right-10 opacity-[0.04] animate-spin-slow pointer-events-none">
          <AshokaChakra size={400} />
        </div>
        <div className="absolute bottom-10 left-10 opacity-[0.03] animate-spin-slow pointer-events-none" style={{ animationDirection: "reverse" }}>
          <AshokaChakra size={300} />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-sm mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[var(--color-text-muted)]">
              India&apos;s first fully controllable AI agent
            </span>
            <span className="text-[var(--color-accent)]">🇮🇳</span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-6"
          >
            <span className="text-[var(--color-text)]">Meet </span>
            <span className="text-gradient">Sishupal</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl sm:text-2xl text-[var(--color-text-muted)] max-w-2xl mx-auto mb-4"
          >
            Think <span className="text-[var(--color-text)] font-medium">Jarvis</span>.
            But real. And built in{" "}
            <span className="text-gradient font-semibold">India</span>.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={mounted ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base text-[var(--color-text-dim)] max-w-xl mx-auto mb-10"
          >
            A voice-enabled, vision-capable, fully controllable AI agent that runs on your machine.
            Your agent. Your rules. Your data.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#demo"
              className="bg-gradient-accent text-black font-semibold px-8 py-3.5 rounded-xl text-base hover:opacity-90 transition-opacity glow-accent-sm"
            >
              Talk to Sishupal
            </a>
            <a
              href="https://github.com/avasis-ai"
              target="_blank"
              className="border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] font-medium px-8 py-3.5 rounded-xl text-base hover:border-[var(--color-accent)] transition-colors"
            >
              View on GitHub →
            </a>
          </motion.div>

          {/* Waveform visualization */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={mounted ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-16"
          >
            <Waveform active bars={60} />
          </motion.div>
        </div>
      </section>

      {/* ── TRICOLOR DIVIDER ── */}
      <div className="flex h-[2px] max-w-4xl mx-auto">
        <div className="flex-1 bg-[var(--color-saffron)]" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-[var(--color-navy)]" />
      </div>

      {/* ── FEATURES ── */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text)] mb-4">
              Everything an agent needs.
              <br />
              <span className="text-gradient">Nothing it doesn&apos;t.</span>
            </h2>
            <p className="text-[var(--color-text-muted)] max-w-lg mx-auto">
              Sishupal is not a chatbot. It&apos;s a fully controllable AI system
              with vision, voice, tools, and memory.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<span className="text-lg">🎙️</span>}
              title="Voice Control"
              description="Talk to Sishupal like you'd talk to a person. Natural voice in, natural voice out. Powered by state-of-the-art STT and TTS."
              delay={0}
            />
            <FeatureCard
              icon={<span className="text-lg">📸</span>}
              title="Screen Vision"
              description="Sishupal can see your screen, understand UI elements, click buttons, fill forms, and navigate any application."
              delay={0.1}
            />
            <FeatureCard
              icon={<span className="text-lg">💻</span>}
              title="Full Machine Control"
              description="Terminal, files, apps, browser — Sishupal controls your entire machine. With safety rails you define."
              delay={0.2}
            />
            <FeatureCard
              icon={<span className="text-lg">🧠</span>}
              title="Persistent Memory"
              description="Remembers your preferences, projects, and context across sessions. Your agent gets better the more you use it."
              delay={0.3}
            />
            <FeatureCard
              icon={<span className="text-lg">📱</span>}
              title="Multi-Channel"
              description="Reach Sishupal via web, Telegram, WhatsApp, Discord, or Signal. One brain, many touchpoints."
              delay={0.4}
            />
            <FeatureCard
              icon={<span className="text-lg">🔒</span>}
              title="Your Data, Your Rules"
              description="Runs on your machine. No cloud dependency. No data leaks. You approve every destructive action."
              delay={0.5}
            />
          </div>
        </div>
      </section>

      {/* ── DEMO ── */}
      <section id="demo" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text)] mb-4">
              Try it. <span className="text-gradient">Right now.</span>
            </h2>
            <p className="text-[var(--color-text-muted)] max-w-md mx-auto">
              This is a local demo. In production, Sishupal connects to your
              OpenClaw gateway and controls your actual machine.
            </p>
          </motion.div>

          <ChatDemo />
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section className="py-24 px-6 border-t border-[var(--color-border)]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-[var(--color-text)] mb-8">
            Built with the best of open source
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-8 text-[var(--color-text-dim)] text-sm">
            <span className="px-4 py-2 border border-[var(--color-border)] rounded-lg bg-[var(--color-surface)]">
              Next.js
            </span>
            <span className="px-4 py-2 border border-[var(--color-border)] rounded-lg bg-[var(--color-surface)]">
              OpenClaw
            </span>
            <span className="px-4 py-2 border border-[var(--color-border)] rounded-lg bg-[var(--color-surface)]">
              FastAPI
            </span>
            <span className="px-4 py-2 border border-[var(--color-border)] rounded-lg bg-[var(--color-surface)]">
              Whisper
            </span>
            <span className="px-4 py-2 border border-[var(--color-border)] rounded-lg bg-[var(--color-surface)]">
              Tailwind CSS
            </span>
            <span className="px-4 py-2 border border-[var(--color-border)] rounded-lg bg-[var(--color-surface)]">
              Framer Motion
            </span>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-[var(--color-text)] mb-6">
            Ready to build with{" "}
            <span className="text-gradient">Sishupal</span>?
          </h2>
          <p className="text-[var(--color-text-muted)] mb-8 text-lg">
            Join the waitlist. Be the first to run India&apos;s most powerful AI
            agent on your machine.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <input
              type="email"
              placeholder="your@email.com"
              className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl px-6 py-3.5 text-base text-[var(--color-text)] placeholder:text-[var(--color-text-dim)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] w-full sm:w-80 transition-colors"
            />
            <button className="bg-gradient-accent text-black font-semibold px-8 py-3.5 rounded-xl text-base hover:opacity-90 transition-opacity w-full sm:w-auto">
              Join Waitlist
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-[var(--color-border)] py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-accent flex items-center justify-center text-black font-bold text-sm">
                S
              </div>
              <div>
                <span className="font-semibold text-[var(--color-text)] block text-sm">
                  Sishupal
                </span>
                <span className="text-xs text-[var(--color-text-dim)]">
                  by Avasis
                </span>
              </div>
            </div>

            {/* India badge */}
            <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
              <span>Made with</span>
              <span className="text-[var(--color-saffron)]">❤</span>
              <span>in India</span>
              <span>🇮🇳</span>
            </div>

            {/* Links */}
            <div className="flex items-center gap-6 text-sm text-[var(--color-text-dim)]">
              <a
                href="https://avasis.ai"
                target="_blank"
                className="hover:text-[var(--color-text)] transition-colors"
              >
                Avasis
              </a>
              <a
                href="https://github.com/avasis-ai"
                target="_blank"
                className="hover:text-[var(--color-text)] transition-colors"
              >
                GitHub
              </a>
              <span className="text-[var(--color-text-dim)]">
                © 2026 Avasis
              </span>
            </div>
          </div>

          {/* Tricolor bottom bar */}
          <div className="flex h-[2px] mt-8">
            <div className="flex-1 bg-[var(--color-saffron)] opacity-30" />
            <div className="flex-1 bg-white opacity-30" />
            <div className="flex-1 bg-[var(--color-navy)] opacity-30" />
          </div>
        </div>
      </footer>
    </div>
  );
}
