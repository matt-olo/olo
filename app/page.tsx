"use client";

import { useState, useEffect, useRef } from "react";
import { TextWidget } from "@livechat/widget-react";

import LavaBackground from "@/components/lava-background";

// ============================================================================
// ANIMATED CARD BORDER (gradient highlight that moves along the border)
// ============================================================================

function GlowCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    let raf: number;
    const tick = () => {
      setAngle((prev) => (prev + 0.5) % 360);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div ref={cardRef} onMouseMove={handleMouseMove} className={`group relative overflow-hidden rounded-3xl ${className}`}>
      {/* Animated border glow that follows mouse */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, rgba(45,212,191,0.07), transparent 60%)` }}
      />
      {/* Rotating border light */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl"
        style={{
          padding: '1px',
          background: `conic-gradient(from ${angle}deg, transparent 55%, rgba(45,212,191,0.4) 70%, rgba(103,232,249,0.6) 75%, rgba(45,212,191,0.4) 80%, transparent 95%)`,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
      {/* Content */}
      <div className="relative z-[2]">{children}</div>
    </div>
  );
}

// ============================================================================
// ROTATING BORDER LIGHT (place inside any relative container)
// ============================================================================

function RotatingBorder({ radius = "rounded-3xl" }: { radius?: string }) {
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    let raf: number;
    const tick = () => {
      setAngle((prev) => (prev + 0.4) % 360);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      className={`pointer-events-none absolute inset-0 ${radius}`}
      style={{
        padding: '1px',
        background: `conic-gradient(from ${angle}deg, transparent 55%, rgba(45,212,191,0.35) 70%, rgba(103,232,249,0.5) 75%, rgba(45,212,191,0.35) 80%, transparent 95%)`,
        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor',
        maskComposite: 'exclude',
      }}
    />
  );
}

// ============================================================================
// SECTION DIVIDER (animated line that draws itself)
// ============================================================================

function SectionDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className="flex justify-center py-8">
      <div className={`h-[1px] bg-gradient-to-r from-transparent via-[#2dd4bf]/40 to-transparent transition-all duration-[2s] ease-out ${visible ? "w-[200px] opacity-100" : "w-0 opacity-0"}`} />
    </div>
  );
}

// ============================================================================
// COUNTER (counts up when visible)
// ============================================================================

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting && !started) setStarted(true); }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const duration = 1500;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    tick();
  }, [started, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ============================================================================
// TEXT REVEAL (word by word)
// ============================================================================

function TextReveal({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const words = text.split(" ");
  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className={`inline-block transition-all duration-500 ${visible ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-3 blur-[2px]"}`} style={{ transitionDelay: `${delay + i * 60}ms` }}>
          {word}&nbsp;
        </span>
      ))}
    </span>
  );
}

// ============================================================================
// TYPEWRITER (types out on scroll with blinking cursor)
// ============================================================================

type TypewriterSegment = { text: string; className?: string };

function Typewriter({ segments, className = "", speed = 40 }: { segments: TypewriterSegment[]; className?: string; speed?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [done, setDone] = useState(false);

  const totalLength = segments.reduce((acc, s) => acc + s.text.length, 0);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting && !started) setStarted(true); }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setCharCount(i);
      if (i >= totalLength) { clearInterval(interval); setDone(true); }
    }, speed);
    return () => clearInterval(interval);
  }, [started, totalLength, speed]);

  let charsRendered = 0;
  return (
    <span ref={ref} className={className}>
      {segments.map((seg, idx) => {
        const start = charsRendered;
        charsRendered += seg.text.length;
        const visibleChars = Math.max(0, Math.min(seg.text.length, charCount - start));
        if (visibleChars === 0) return null;
        return <span key={idx} className={seg.className}>{seg.text.slice(0, visibleChars)}</span>;
      })}
      <span className={`inline-block w-[2px] h-[0.85em] bg-[#2dd4bf] ml-[2px] align-middle ${done ? "animate-[blink_1s_step-end_infinite]" : ""}`} />
    </span>
  );
}

// ============================================================================
// MAGNETIC ELEMENT (attracts toward cursor)
// ============================================================================

function Magnetic({ children, className = "", strength = 0.3 }: { children: React.ReactNode; className?: string; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = (e.clientX - centerX) * strength;
    const dy = (e.clientY - centerY) * strength;
    setOffset({ x: dx, y: dy });
  };

  const handleMouseLeave = () => setOffset({ x: 0, y: 0 });

  return (
    <div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className={className} style={{ transform: `translate(${offset.x}px, ${offset.y}px)`, transition: "transform 0.3s cubic-bezier(0.2, 0, 0, 1)" }}>
      {children}
    </div>
  );
}

// ============================================================================
// SCROLL REVEAL
// ============================================================================

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={`transition-all duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

// ============================================================================
// FEATURE GRID (staggered drop-in on scroll)
// ============================================================================

function FeatureGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const cards = [
    { bg: "bg-[#0a2d4a]", border: "border-[#3b82f6]/20", icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2dd4bf" strokeWidth="1.5" className="mb-2"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>, label: "Learns your business" },
    { bg: "bg-[#0a3a2a]", border: "border-[#22c55e]/20", icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1.5" className="mb-2"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 00-4 12.7V17h8v-2.3A7 7 0 0012 2z"/></svg>, label: "Suggests improvements" },
    { bg: "bg-[#0a3d3d]", border: "border-[#2dd4bf]/20", icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="1.5" className="mb-2"><polyline points="20 6 9 17 4 12"/></svg>, label: "Finds admin work to delete" },
    { bg: "bg-[#0a2a20]", border: "border-[#10b981]/20", icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="1.5" className="mb-2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, label: "Always asks before acting" },
    { bg: "bg-[#0a1e3a]", border: "border-[#6366f1]/20", icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="1.5" className="mb-2"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>, label: "Notates work to worklog" },
    { bg: "bg-[#0a2535]", border: "border-[#06b6d4]/20", icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="1.5" className="mb-2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>, label: "Protects your businesses data" },
  ];

  return (
    <div ref={ref} className="grid grid-cols-2 gap-4">
      {cards.map((card, i) => (
        <div
          key={i}
          className={`rounded-xl ${card.bg} border ${card.border} p-5 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"}`}
          style={{ transitionDelay: `${i * 120}ms` }}
        >
          {card.icon}
          <p className="text-[14px] font-bold text-white/80">{card.label}</p>
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// NAV
// ============================================================================

function Nav({ mobileOpen, setMobileOpen }: { mobileOpen: boolean; setMobileOpen: (v: boolean) => void }) {
  const links = [
    { label: "Product", href: "#meet-olo" },
    { label: "Onboarding", href: "#onboarding" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Interested?", href: "#apply" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <nav className="fixed left-8 top-1/2 z-50 hidden -translate-y-1/2 lg:block">
        <div className="flex flex-col items-start gap-0 rounded-2xl border border-[#2dd4bf]/20 bg-[#030d12]/60 px-5 py-6 backdrop-blur-2xl shadow-[0_0_20px_rgba(45,212,191,0.15),inset_0_0_20px_rgba(45,212,191,0.05)]">
          <a href="#" className="mb-5 flex items-center gap-[3px] text-[#2dd4bf]/60 transition-all duration-300 hover:text-[#2dd4bf]">
            <div className="h-[16px] w-[16px] rounded-full border-[2px] border-current" />
            <div className="h-[18px] w-[2px] bg-current" />
            <div className="h-[16px] w-[16px] rounded-full border-[2px] border-current" />
          </a>
          {links.map((link) => (
            <a key={link.href} href={link.href} className="group relative py-2.5 text-[12px] font-medium uppercase tracking-[0.15em] text-white/40 transition-all duration-300 hover:text-[#2dd4bf]">
              <span className="relative">
                {link.label}
                <span className="absolute -bottom-0.5 left-0 h-[1px] w-0 bg-[#2dd4bf] transition-all duration-500 group-hover:w-full" />
              </span>
            </a>
          ))}
        </div>
      </nav>
      <button onClick={() => setMobileOpen(!mobileOpen)} className="fixed right-5 top-5 z-50 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/50 backdrop-blur-xl lg:hidden">
        <div className="flex flex-col gap-1">
          <div className={`h-[1px] w-3.5 bg-white/70 transition-all duration-300 ${mobileOpen ? "translate-y-[3px] rotate-45" : ""}`} />
          <div className={`h-[1px] w-3.5 bg-white/70 transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
          <div className={`h-[1px] w-3.5 bg-white/70 transition-all duration-300 ${mobileOpen ? "-translate-y-[3px] -rotate-45" : ""}`} />
        </div>
      </button>
      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-[#020a0e]/98 backdrop-blur-2xl lg:hidden">
          <div className="flex flex-col gap-8">
            {links.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="text-center text-[24px] font-light tracking-[0.1em] text-white/60 transition-all hover:text-[#2dd4bf]">{link.label}</a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

// ============================================================================
// HERO
// ============================================================================

function Hero() {
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    // Trigger after overhead fades in (1.9s) + a beat
    const timer = setTimeout(() => setClicked(true), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Flash on click */}
      <div className={`absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(45,212,191,0.12)_0%,_transparent_60%)] transition-opacity duration-700 ${clicked ? "opacity-100" : "opacity-0"}`} />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        {/* Logo - starts dim, lights up on click */}
        {/* Logo - starts dim, lights up on click */}
          <div className={`mb-16 flex items-center text-[#2dd4bf] transition-all duration-700 ${clicked ? "opacity-100 drop-shadow-[0_0_20px_rgba(45,212,191,0.6)]" : "opacity-30"}`} style={{ animation: "fadeIn 0.8s ease-out both" }}>
            <div className="h-[90px] w-[90px] rounded-full border-[4px] border-[#2dd4bf]" />
            <div className="mx-2 h-[100px] w-[4px] bg-[#2dd4bf]" />
            <div className="h-[90px] w-[90px] rounded-full border-[4px] border-[#2dd4bf]" />
          </div>

        {/* Headline */}
        <h1 className="mb-8 animate-[fadeIn_0.5s_ease-out_0.5s_both]">
          <span className="flex flex-wrap items-center justify-center gap-5 text-[52px] font-bold tracking-tight sm:text-[72px]">
            {/* Delete key */}
            <span className="relative inline-flex">
              <span className="relative z-10 inline-flex items-center justify-center rounded-lg border border-[#2dd4bf]/50 bg-gradient-to-b from-[#1a5c5c]/80 to-[#0f3d3d]/80 px-6 py-2.5 shadow-[inset_0_1px_0_rgba(45,212,191,0.2),0_4px_0_#0a2020,0_6px_20px_rgba(0,0,0,0.4)] animate-[keyPress_0.3s_ease-out_2.2s_both]">
                <span className="text-[38px] font-semibold tracking-wider text-[#2dd4bf] sm:text-[48px]">delete</span>
              </span>
              {/* Cursor - animated in */}
              <span className="absolute -bottom-4 -right-3 z-20 animate-[cursorIn_0.5s_ease-out_1.8s_both]">
                <svg viewBox="0 0 24 24" className="h-[42px] w-[42px] animate-[clickPulse_0.3s_ease-out_2.2s_both]" style={{ filter: "drop-shadow(0 0 6px rgba(45,212,191,0.5))" }} fill="none">
                  <path d="M5 3l14 8-6 1.5-3.5 5.5z" fill="#2dd4bf" stroke="#0a2a2a" strokeWidth="1.5" />
                </svg>
              </span>
            </span>
            <span className="animate-[fadeIn_0.4s_ease-out_1.0s_both] bg-gradient-to-r from-[#2dd4bf] to-[#0ea5e9] bg-clip-text text-transparent">your</span>
            <span className={`animate-[fadeIn_0.4s_ease-out_1.3s_both] text-red-400 ${clicked ? "line-through decoration-[#2dd4bf] decoration-2" : ""} transition-all duration-300`}>overhead</span>
          </span>
        </h1>

        {/* Sub */}
        <p className="mb-16 max-w-[600px] text-[18px] font-medium leading-relaxed text-white whitespace-nowrap animate-[fadeIn_0.4s_ease-out_2.8s_both]">
          Automate work that creates headaches instead of revenue.
        </p>

        {/* CTAs */}
        <div className="flex gap-4 animate-[fadeIn_0.4s_ease-out_3.2s_both]">
          <a href="#apply" className="rounded-full bg-[#2dd4bf] px-10 py-4 text-[14px] font-bold uppercase tracking-[0.15em] text-[#030d12] transition-all duration-300 hover:shadow-[0_0_40px_rgba(45,212,191,0.4)] shadow-[0_0_20px_rgba(45,212,191,0.3)]">
            Apply for Pilot
          </a>
          <a href="#contact" className="rounded-full border border-white/10 px-10 py-4 text-[14px] font-medium uppercase tracking-[0.15em] text-white/50 transition-all duration-300 hover:border-[#2dd4bf]/30 hover:text-[#2dd4bf]/80 hover:shadow-[0_0_20px_rgba(45,212,191,0.1)]">
            Contact
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center animate-[fadeIn_0.4s_ease-out_3.6s_both]">
        <div className="relative h-[50px] w-[26px] rounded-full border-2 border-white/15">
          <div className="absolute left-1/2 top-2 h-[8px] w-[2px] -translate-x-1/2 animate-bounce rounded-full bg-[#2dd4bf]/70" />
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// APPLY
// ============================================================================

function ApplySection() {
  const [zip, setZip] = useState("");
  const [zipArea, setZipArea] = useState("");
  const [employees, setEmployees] = useState("");
  const [overhead, setOverhead] = useState("");

  const employeeRanges = ["1-5", "6-15", "16-50", "51-100", "100+"];
  const overheadRanges = ["< $2K", "$2K-$5K", "$5K-$10K", "$10K-$25K", "$25K+"];
  const titles = ["Owner", "CEO", "COO", "Operations Manager", "Office Manager", "Other"];

  useEffect(() => {
    if (zip.length === 5) {
      fetch(`https://api.zippopotam.us/us/${zip}`).then((r) => r.json()).then((data) => {
        if (data.places?.[0]) setZipArea(`${data.places[0]["place name"]}, ${data.places[0]["state abbreviation"]}`);
      }).catch(() => setZipArea(""));
    } else { setZipArea(""); }
  }, [zip]);

  const inputClass = "w-full rounded-xl border border-white/[0.08] bg-[#0a1a1e] px-5 py-4 text-[15px] text-white/90 placeholder-white/25 outline-none transition-all duration-300 focus:border-[#2dd4bf]/50 focus:bg-[#0d2228] focus:shadow-[0_0_0_4px_rgba(45,212,191,0.08)] hover:border-white/15";

  const [filledFields, setFilledFields] = useState<Set<string>>(new Set());
  const markFilled = (field: string, value: string) => {
    const next = new Set(filledFields);
    if (value.trim()) next.add(field); else next.delete(field);
    setFilledFields(next);
  };
  const allFilled = filledFields.size >= 4;

  return (
    <section id="apply" className="relative py-28 px-6">
      <Reveal>
        <div className="mx-auto max-w-[640px]">
          <p className="mb-3 text-center text-[12px] font-medium uppercase tracking-[0.3em] text-[#2dd4bf]/60">Limited to <Counter target={100} /> SMBs</p>
          <h2 className="mb-4 text-center text-[36px] font-bold tracking-tight text-white sm:text-[44px]">
            <Typewriter segments={[{ text: "Ready to Join the " }, { text: "Pilot", className: "bg-gradient-to-r from-[#2dd4bf] to-[#0ea5e9] bg-clip-text text-transparent" }, { text: "?" }]} />
          </h2>
          <p className="mb-14 text-center text-[16px] font-light text-white/35">
            Delete your overhead — painlessly.
          </p>

          <GlowCard className="bg-[#2dd4bf]/[0.03] backdrop-blur-xl noise-texture">
            <div className="p-10 sm:p-14 relative z-[1] isolate">
              <div className="space-y-7">
                <div>
                  <label className="mb-2.5 block text-[14px] font-medium uppercase tracking-wider text-white/80">Title</label>
                  <select className={`${inputClass} appearance-none pr-12`} style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.4)' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 1.2rem center", backgroundSize: "12px" }}>
                    <option value="" className="bg-[#0a1a1e]">Select...</option>
                    {titles.map((t) => (<option key={t} value={t} className="bg-[#0a1a1e]">{t}</option>))}
                  </select>
                </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2.5 block text-[14px] font-medium uppercase tracking-wider text-white/80">Name</label>
                  <div className="relative">
                    <input type="text" placeholder="Full name" className={inputClass} onChange={(e) => markFilled("name", e.target.value)} />
                    {filledFields.has("name") && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#2dd4bf] text-[14px] animate-[fadeIn_0.3s_ease-out]">✓</span>}
                  </div>
                </div>
                <div>
                  <label className="mb-2.5 block text-[14px] font-medium uppercase tracking-wider text-white/80">Business</label>
                  <div className="relative">
                    <input type="text" placeholder="Business name" className={inputClass} onChange={(e) => markFilled("business", e.target.value)} />
                    {filledFields.has("business") && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#2dd4bf] text-[14px] animate-[fadeIn_0.3s_ease-out]">✓</span>}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2.5 block text-[14px] font-medium uppercase tracking-wider text-white/80">Phone</label>
                  <div className="flex gap-2">
                    <input type="text" maxLength={3} placeholder="000" className={`${inputClass} w-[70px] text-center`} />
                    <input type="text" maxLength={7} placeholder="000-0000" className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className="mb-2.5 block text-[14px] font-medium uppercase tracking-wider text-white/80">Email</label>
                  <div className="relative">
                    <input type="email" placeholder="you@company.com" className={inputClass} onChange={(e) => markFilled("email", e.target.value)} />
                    {filledFields.has("email") && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#2dd4bf] text-[14px] animate-[fadeIn_0.3s_ease-out]">✓</span>}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2.5 block text-[14px] font-medium uppercase tracking-wider text-white/80">Website <span className="text-white/20">(optional)</span></label>
                  <input type="text" placeholder="www.example.com" className={inputClass} />
                </div>
                <div>
                  <label className="mb-2.5 block text-[14px] font-medium uppercase tracking-wider text-white/80">Industry</label>
                  <div className="relative">
                    <input type="text" placeholder="e.g. HVAC, Legal..." className={inputClass} onChange={(e) => markFilled("industry", e.target.value)} />
                    {filledFields.has("industry") && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#2dd4bf] text-[14px] animate-[fadeIn_0.3s_ease-out]">✓</span>}
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-2.5 block text-[14px] font-medium uppercase tracking-wider text-white/80">Zip Code</label>
                <div className="flex items-center gap-3">
                  <input type="text" maxLength={5} value={zip} onChange={(e) => setZip(e.target.value.replace(/\D/g, ""))} placeholder="00000" className={`${inputClass} w-[120px]`} />
                  {zipArea && <span className="text-[13px] text-[#2dd4bf]/70 animate-[fadeIn_0.3s]">{zipArea}</span>}
                </div>
              </div>

              <div>
                <label className="mb-2.5 block text-[13px] font-medium uppercase tracking-wider text-white">Employees</label>
                <div className="flex flex-wrap gap-2">
                  {employeeRanges.map((r) => (
                    <button key={r} onClick={() => setEmployees(r)} className={`rounded-lg border px-4 py-2 text-[13px] font-medium transition-all duration-200 ${employees === r ? "border-[#2dd4bf]/50 bg-[#2dd4bf]/10 text-[#2dd4bf] shadow-[0_0_12px_rgba(45,212,191,0.15)]" : "border-white/[0.06] text-white/35 hover:border-white/15 hover:text-white/50"}`}>
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2.5 block text-[13px] font-medium uppercase tracking-wider text-white">Monthly Admin Overhead</label>
                <div className="flex flex-wrap gap-2">
                  {overheadRanges.map((r) => (
                    <button key={r} onClick={() => setOverhead(r)} className={`rounded-lg border px-4 py-2 text-[13px] font-medium transition-all duration-200 ${overhead === r ? "border-[#2dd4bf]/50 bg-[#2dd4bf]/10 text-[#2dd4bf] shadow-[0_0_12px_rgba(45,212,191,0.15)]" : "border-white/[0.06] text-white/35 hover:border-white/15 hover:text-white/50"}`}>
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <button className={`mt-6 w-full rounded-xl bg-[#2dd4bf] py-4 text-[14px] font-bold uppercase tracking-[0.15em] text-[#030d12] transition-all duration-300 hover:shadow-[0_0_40px_rgba(45,212,191,0.4)] ${allFilled ? "shadow-[0_0_20px_rgba(45,212,191,0.3)] animate-pulse" : ""}`}>
                Apply for Pilot
              </button>
              </div>
            </div>
          </GlowCard>
        </div>
      </Reveal>
    </section>
  );
}

// ============================================================================
// MEET OLO
// ============================================================================

function MeetOloSection() {
  return (
    <section id="meet-olo" className="relative py-28 px-6">
      <Reveal>
        <div className="mx-auto max-w-[1200px] pl-8">
          <p className="mb-3 text-center text-[12px] font-medium uppercase tracking-[0.3em] text-[#2dd4bf]/60">The Product</p>
          <h2 className="mb-4 text-center text-[36px] font-bold tracking-tight text-white sm:text-[44px]">
            <Typewriter segments={[{ text: "Meet " }, { text: "olo", className: "bg-gradient-to-r from-[#2dd4bf] to-[#0ea5e9] bg-clip-text text-transparent" }]} />
          </h2>
          <p className="mb-16 text-center text-[18px] font-semibold text-white">
            Autonomous Small Business Automation.
          </p>

          <div className="grid gap-8 lg:grid-cols-5 pl-10">
            {/* Left column - text */}
            <div className="lg:col-span-2 relative rounded-3xl border border-[#2dd4bf]/10 bg-[#2dd4bf]/[0.05] shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-xl p-9 min-h-[560px] flex flex-col justify-center overflow-hidden noise-texture mt-6">
              <RotatingBorder />
              <p className="mb-4 text-[22px] font-semibold text-[#2dd4bf]">The power of automation without any of the complexity.</p>
              <p className="mb-10 text-[16px] leading-[1.8] text-white/45">
                olo detects admin work, coordinates the right tools, completes the task, validates the result, and logs what happened — asking before acting whenever your rules require approval.
              </p>
              <h3 className="mb-6 text-[12px] font-bold uppercase tracking-[0.2em] text-white/30">What olo handles</h3>
              <FeatureGrid />
            </div>

            {/* Right column - phone + diagram */}
            <div className="lg:col-span-3 flex items-center justify-center pt-8 relative">
              <div className="absolute inset-0 m-auto w-[300px] h-[500px] rounded-full pointer-events-none" style={{ background: 'rgba(45,212,191,0.12)', filter: 'blur(60px)' }} />
              <img src="/pics/olo-admin (1).png" alt="olo admin" className="relative h-[600px] object-contain cursor-pointer hover:scale-[1.28] transition-transform duration-300 scale-[1.25] origin-center drop-shadow-[0_0_40px_rgba(45,212,191,0.3)]" />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

// ============================================================================
// ONBOARDING
// ============================================================================

function OnboardingSection() {
  return (
    <section id="onboarding" className="relative py-28 px-6">
      <Reveal>
        <div className="mx-auto max-w-[1100px]">
          <p className="mb-3 text-center text-[12px] font-medium uppercase tracking-[0.3em] text-[#2dd4bf]/60">Onboarding</p>
          <h2 className="mb-4 text-center text-[36px] font-bold tracking-tight text-white sm:text-[44px]">
            <Typewriter segments={[{ text: "Keep", className: "text-[#2dd4bf]" }, { text: " Your Software. " }, { text: "Nix", className: "text-red-400" }, { text: " Your " }, { text: "Overhead", className: "text-red-400" }, { text: "." }]} />
          </h2>
          <p className="mb-16 text-center text-[16px] font-light text-white/40 max-w-[700px] mx-auto">
            olo works with the software your business already uses — QuickBooks, Google, phone, email, calendar, and more. Your software stays in place. olo connects to it, coordinates the work, and starts with you in complete control.
          </p>

          <div className="flex justify-center pt-8 relative">
            <div className="absolute inset-0 m-auto w-[300px] h-[500px] rounded-full pointer-events-none" style={{ background: 'rgba(45,212,191,0.12)', filter: 'blur(60px)' }} />
            <img src="/pics/olo-onboarding (1).png" alt="olo onboarding" className="relative h-[600px] object-contain cursor-pointer hover:scale-[1.28] transition-transform duration-300 scale-[1.25] origin-center drop-shadow-[0_0_40px_rgba(45,212,191,0.3)]" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}

// ============================================================================
// TESTIMONIALS
// ============================================================================

function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative py-28 px-6">
      <Reveal>
        <div className="mx-auto max-w-[600px] text-center">
          <p className="mb-3 text-[12px] font-medium uppercase tracking-[0.3em] text-white/30">What they say</p>
          <h2 className="mb-12 text-[36px] font-bold tracking-tight text-white sm:text-[44px]"><Typewriter segments={[{ text: "Testimonials" }]} /></h2>
          <div className="rounded-3xl border border-white/[0.04] bg-white/[0.01] px-12 py-16">
            <p className="text-[18px] font-light italic text-white/25">Coming soon.</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

// ============================================================================
// CONTACT
// ============================================================================

function ContactSection() {
  const inputClass = "w-full rounded-xl border border-white/[0.06] bg-[#0a1a1e] px-5 py-3.5 text-[15px] text-white/90 placeholder-white/20 outline-none transition-all duration-300 focus:border-[#2dd4bf]/40 focus:bg-[#0d2228] focus:shadow-[0_0_0_3px_rgba(45,212,191,0.05)]";

  return (
    <section id="contact" className="relative py-28 px-6">
      <Reveal>
        <div className="mx-auto max-w-[500px]">
          <p className="mb-3 text-center text-[12px] font-medium uppercase tracking-[0.3em] text-white/30">Get in touch</p>
          <h2 className="mb-4 text-center text-[36px] font-bold tracking-tight text-white sm:text-[44px]"><Typewriter segments={[{ text: "Want to talk?" }]} /></h2>
          <p className="mb-12 text-center text-[15px] font-light text-white/35">
            For investor, partner, and general inquiries.
          </p>
          <div className="relative rounded-3xl border border-[#2dd4bf]/10 bg-[#2dd4bf]/[0.05] shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-xl p-8 sm:p-10 overflow-hidden noise-texture">
            <RotatingBorder />
            <div className="space-y-5 relative z-[1] isolate">
              <div>
                <label className="mb-2.5 block text-[14px] font-medium uppercase tracking-wider text-white/80">Name</label>
                <input type="text" placeholder="Your name" className={inputClass} />
              </div>
              <div>
                <label className="mb-2.5 block text-[14px] font-medium uppercase tracking-wider text-white/80">Email</label>
                <input type="email" placeholder="you@company.com" className={inputClass} />
              </div>
              <div>
                <label className="mb-2.5 block text-[14px] font-medium uppercase tracking-wider text-white/80">Message</label>
                <textarea rows={4} placeholder="How can we help?" className={`${inputClass} resize-none`} />
              </div>
              <button className="group relative w-full overflow-hidden rounded-xl bg-[#2dd4bf] py-4 text-[14px] font-bold uppercase tracking-[0.15em] text-[#030d12] transition-all duration-300 hover:shadow-[0_0_40px_rgba(45,212,191,0.4)]">
                <span className="relative z-10">Send Message</span>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-400 group-hover:translate-x-full" />
              </button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

// ============================================================================
// PAGE
// ============================================================================

export default function Page() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      setScrollProgress(maxScroll > 0 ? window.scrollY / maxScroll : 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen font-[var(--font-montserrat)] text-white antialiased">
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 z-[60] h-[2px] bg-[#2dd4bf]/80 shadow-[0_0_8px_rgba(45,212,191,0.5)]" style={{ width: `${scrollProgress * 100}%`, transition: "width 0.1s linear" }} />
      {/* WebGL Lava Background */}
      <LavaBackground />
      {/* Noise grain overlay */}
      <div className="fixed inset-0 -z-[5] opacity-[0.04] pointer-events-none mix-blend-overlay" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />

      <Nav mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <main>
        <Hero />
        <SectionDivider />
        <MeetOloSection />
        <SectionDivider />
        <OnboardingSection />
        <SectionDivider />
        <TestimonialsSection />
        <SectionDivider />
        <ApplySection />
        <SectionDivider />
        <ContactSection />
        <footer className="py-16 text-center">
          <div className="mb-4 flex items-center justify-center gap-1 text-[#2dd4bf]/30">
            <div className="h-[14px] w-[14px] rounded-full border-[1.5px] border-current" />
            <div className="h-[16px] w-[1.5px] bg-current" />
            <div className="h-[14px] w-[14px] rounded-full border-[1.5px] border-current" />
          </div>
          <p className="text-[12px] tracking-[0.2em] text-white/15">oloai.com</p>
          <p className="mt-2 text-[10px] text-white/10">© 2026 SMB Automation R&D LLC. All rights reserved.</p>
        </footer>
      </main>
      <TextWidget organizationId="a2b2017c-8491-4dd1-b030-86837d90d01e" />
    </div>
  );
}
