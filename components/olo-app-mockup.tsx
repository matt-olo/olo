"use client";

import "@/styles/phone-mockup.scss";

export function OloAppUI() {
  return (
    <div className="relative flex flex-col h-full bg-[#060e10] text-white font-[var(--font-geist)] overflow-y-auto overflow-x-hidden px-[20px] pt-[54px] pb-[20px] gap-[24px]">

      {/* Subtle noise grain overlay */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.035]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

      {/* === TOP ROW === */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-[9px]">
          <div className="flex items-center gap-[3px] text-[#5eead4]">
            <div className="h-[15px] w-[15px] rounded-full border-[2px] border-current" />
            <div className="h-[17px] w-[2px] bg-current rounded-full" />
            <div className="h-[15px] w-[15px] rounded-full border-[2px] border-current" />
          </div>
          <div className="h-[7px] w-[7px] rounded-full bg-[#34d399]" />
        </div>
        <div className="rounded-full bg-[#162d2d] px-[14px] py-[6px] flex items-center gap-[7px] border border-[#1f4040]">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="8" r="4"/><path d="M6 21v-1a6 6 0 0112 0v1"/></svg>
          <span className="text-[12px] font-medium text-white/80">Your Business</span>
        </div>
      </div>

      {/* === STATUS PILLS === */}
      <div className="relative z-10 flex gap-[8px]">
        <div className="rounded-full bg-[#b45309]/20 px-[14px] py-[5px] border border-[#b45309]/30">
          <span className="text-[11px] font-semibold text-[#f59e0b]">Probationary</span>
        </div>
        <div className="rounded-full bg-[#1a4a4a] px-[14px] py-[5px]">
          <span className="text-[11px] font-medium text-[#99f6e4]">Asks Before Acting</span>
        </div>
      </div>

      {/* === IMPACT LINE === */}
      <p className="relative z-10 text-[14px] text-white/40 font-medium"><span className="text-[#5eead4] font-bold">$312</span> saved today · <span className="text-[#5eead4] font-bold">2.1h</span> returned · <span className="text-[#5eead4] font-bold">7</span> tasks handled</p>

      {/* === NEEDS YOU — with glow === */}
      <div className="relative z-10 rounded-[14px] bg-[#123232] p-[16px] border border-[#2dd4bf]/50 shadow-[0_0_50px_0px_rgba(45,212,191,0.3),0_0_100px_-5px_rgba(45,212,191,0.15)]">
        <p className="text-[16px] font-bold text-[#2dd4bf] mb-[6px]">NEEDS YOU</p>
        <p className="text-[22px] font-bold text-white leading-[1.1] mb-[6px] tracking-[-0.02em]">Email Reply Ready</p>
        <p className="text-[13px] text-white/45 leading-[1.4] mb-[10px]">Christina asked about tomorrow. olo drafted a reply for approval.</p>
        <div className="flex gap-[6px] mb-[12px]">
          <span className="rounded-full bg-[#162d2d] px-[10px] py-[3px] text-[10px] font-medium text-white/55 border border-[#1f4040]">Email</span>
          <span className="rounded-full bg-[#b45309]/20 px-[10px] py-[3px] text-[10px] font-semibold text-[#f59e0b] border border-[#b45309]/30">Pending</span>
          <span className="rounded-full bg-[#1e3a5c] px-[10px] py-[3px] text-[10px] font-medium text-[#67e8f9] border border-[#2a5580]">Low risk</span>
        </div>
        <div className="flex gap-[8px]">
          <button className="flex-1 rounded-[10px] bg-[#162d2d] py-[11px] text-[14px] font-medium text-white/70 border border-[#1f4040]">Review</button>
          <button className="flex-1 rounded-[10px] bg-[#2dd4bf] py-[11px] text-[14px] font-semibold text-[#060e10]">Approve</button>
        </div>
      </div>

      {/* === TODAY'S WORK === */}
      <div className="relative z-10">
        <p className="text-[18px] font-bold text-white mb-[10px]">Today&apos;s Work</p>
        <div className="flex flex-col gap-[8px]">
          <div className="rounded-[12px] bg-[#0d3d38] px-[14px] py-[13px] flex items-center gap-[12px]">
            <div className="h-[40px] w-[40px] rounded-[10px] bg-[#0a2d29] flex items-center justify-center shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5eead4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[15px] font-semibold text-white">Call Handled</p>
              <p className="text-[12px] text-white/35 mt-[2px]">Joe rescheduled service</p>
            </div>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>

          <div className="rounded-[12px] bg-[#0c2f3f] px-[14px] py-[13px] flex items-center gap-[12px]">
            <div className="h-[40px] w-[40px] rounded-[10px] bg-[#092333] flex items-center justify-center shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#67e8f9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/><path d="M12 18v-6"/><path d="M9 15h6"/></svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[15px] font-semibold text-white">Invoice Sent</p>
              <p className="text-[12px] text-white/35 mt-[2px]">Bob&apos;s invoice delivered</p>
            </div>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>

          <div className="rounded-[12px] bg-[#1a1212] px-[14px] py-[13px] flex items-center gap-[12px] border border-[#2a1a1a]">
            <div className="h-[40px] w-[40px] rounded-[10px] bg-[#140d0d] flex items-center justify-center shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/></svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[15px] font-semibold text-white">Email Denied</p>
              <p className="text-[12px] text-white/35 mt-[2px]">Christina reply blocked</p>
            </div>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </div>
        </div>
      </div>

      {/* === PRICING INSIGHT === */}
      <div className="relative z-10 rounded-[12px] bg-[#081a1a] px-[14px] py-[16px] border border-[#163830]">
        <div className="flex items-center gap-[10px] mb-[6px]">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6ee7b7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 015 12 4.5 4.5 0 01-1 2H8a4.5 4.5 0 01-1-2 7 7 0 015-12z"/></svg>
          <p className="text-[14px] font-semibold text-white">Pricing Insight</p>
        </div>
        <p className="text-[12px] text-white/40 mb-[10px]">32% higher than competitors</p>
        <div className="flex gap-[8px]">
          <button className="flex-1 rounded-[8px] bg-[#0f2222] py-[9px] text-[12px] font-semibold text-[#5eead4] border border-[#2dd4bf]/30">Review</button>
          <button className="flex-1 rounded-[8px] bg-[#0b1e20] py-[9px] text-[12px] font-medium text-white/40 border border-[#1a3535]">Not Now</button>
        </div>
      </div>

      {/* === BOTTOM CONTROLS === */}
      <div className="relative z-10 flex gap-[8px]">
        <div className="flex-1 rounded-[8px] bg-[#12403e] py-[2px] flex flex-col items-center justify-center gap-[0px] border border-[#1a5555]">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          <p className="text-[11px] font-semibold text-white/70 tracking-[0.04em]">MEET</p>
        </div>
        <div className="flex-1 rounded-[8px] bg-[#122e40] py-[2px] flex flex-col items-center justify-center gap-[0px] border border-[#1a4560]">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15 1.65 1.65 0 0 0 3.17 14H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68 1.65 1.65 0 0 0 10 3.17V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
          <p className="text-[11px] font-semibold text-white/70 tracking-[0.04em]">TRUST</p>
        </div>
        <div className="flex-1 rounded-[8px] bg-[#162828] py-[2px] flex flex-col items-center justify-center gap-[0px] border border-[#1f3a3a]">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          <p className="text-[11px] font-semibold text-white/70 tracking-[0.04em]">HISTORY</p>
        </div>
      </div>

    </div>
  );
}

function OloOnboardingUI() {
  const steps = [
    "Create Account",
    "Billing",
    "Google Login",
    "QuickBooks Migration",
    "Phone Setup",
    "Meet with olo",
  ];

  return (
    <div className="relative flex flex-col h-full bg-[#060e10] text-white font-[var(--font-geist)] overflow-y-auto overflow-x-hidden px-[20px] pt-[54px] pb-[20px] gap-[14px]">

      {/* Noise grain */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.035]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

      {/* Top row */}
      <div className="relative z-10 flex items-center justify-between mb-[24px]">
        <div className="flex items-center gap-[3px] text-[#5eead4]">
          <div className="h-[15px] w-[15px] rounded-full border-[2px] border-current" />
          <div className="h-[17px] w-[2px] bg-current rounded-full" />
          <div className="h-[15px] w-[15px] rounded-full border-[2px] border-current" />
        </div>
        <p className="text-[14px] font-semibold text-white/50">Step 1 of 6</p>
      </div>

      {/* Headline */}
      <div className="relative z-10 mb-[12px]">
        <p className="text-[18px] font-bold text-white mb-[2px]">Create your account.</p>
        <p className="text-[18px] font-bold text-[#2dd4bf]">Delete your overhead.</p>
      </div>

      {/* Form card */}
      <div className="relative z-10 rounded-[14px] bg-[#123232] p-[20px] border border-[#2dd4bf]/30 shadow-[0_0_30px_0px_rgba(45,212,191,0.15),0_0_60px_-5px_rgba(45,212,191,0.08)] mb-[24px]">

        <div className="flex flex-col gap-[12px]">
          <div>
            <p className="text-[13px] font-medium text-white/70 mb-[5px]">Business Name</p>
            <div className="rounded-[8px] bg-[#0a1818] border border-[#1a3535] py-[12px] px-[14px]">
              <p className="text-[13px] text-white/30">Your business name</p>
            </div>
          </div>
          <div>
            <p className="text-[13px] font-medium text-white/70 mb-[5px]">Owner Name</p>
            <div className="rounded-[8px] bg-[#0a1818] border border-[#1a3535] py-[12px] px-[14px]">
              <p className="text-[13px] text-white/30">Full name</p>
            </div>
          </div>
          <div>
            <p className="text-[13px] font-medium text-white/70 mb-[5px]">Work Email</p>
            <div className="rounded-[8px] bg-[#0a1818] border border-[#1a3535] py-[12px] px-[14px]">
              <p className="text-[13px] text-white/30">you@company.com</p>
            </div>
          </div>
          <div>
            <p className="text-[13px] font-medium text-white/70 mb-[5px]">Password</p>
            <div className="rounded-[8px] bg-[#0a1818] border border-[#1a3535] py-[12px] px-[14px]">
              <p className="text-[13px] text-white/30">••••••••</p>
            </div>
          </div>
        </div>
      </div>

      {/* Roadmap heading */}
      <p className="relative z-10 text-[15px] font-medium text-white/40 mb-[6px]">5 more steps for more <span className="font-semibold" style={{ color: '#2dd4bf' }}>automation</span>, less <span className="font-bold" style={{ color: '#f87171' }}>headaches</span>.</p>

      {/* Roadmap card */}
      <div className="relative z-10 rounded-[12px] bg-[#0a1818] border border-[#152525] px-[16px] py-[14px] mb-[20px]">
        <div className="flex flex-col gap-[8px]">
          {steps.map((step, i) => (
            <div key={step} className="flex items-center gap-[10px]">
              <div className={`h-[22px] w-[22px] rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold ${
                i === 0
                  ? "bg-[#2dd4bf] text-[#060e10]"
                  : "bg-[#152525] text-white/40"
              }`}>
                {i + 1}
              </div>
              <p className={`text-[13px] ${
                i === 0
                  ? "font-semibold text-white"
                  : "font-medium text-white/40"
              }`}>{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom nav */}
      <div className="relative z-10 flex gap-[10px]">
        <button className="flex-1 rounded-[10px] bg-[#78350f]/20 py-[13px] text-[14px] font-medium text-[#d97706] border border-[#78350f]/25">Back</button>
        <button className="flex-1 rounded-[10px] bg-[#2dd4bf] py-[13px] text-[14px] font-semibold text-[#060e10]">Create Account</button>
      </div>

    </div>
  );
}

export default function OloAppMockup({ phone1Ref, phone2Ref }: { phone1Ref?: React.RefObject<HTMLDivElement | null>; phone2Ref?: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div className="phone-scene" style={{ gap: '60px' }}>
      <div ref={phone1Ref} style={{ padding: '20px' }}>
        <div className="phone">
        <div className="phone-buttons">
          <div className="left">
            <div className="button" />
            <div className="button" />
            <div className="button" />
          </div>
          <div className="right">
            <div className="button" />
          </div>
        </div>

        <div className="phone-screen-container">
          <div className="phone-bg" />
          <div className="phone-notch-container">
            <div className="phone-notch">
              <div className="phone-camera" />
            </div>
          </div>

          <div className="phone-screen-content">
            <OloAppUI />
          </div>
        </div>
      </div>
      </div>

      <div ref={phone2Ref} style={{ padding: '20px' }}>
      <div className="phone">
        <div className="phone-buttons">
          <div className="left">
            <div className="button" />
            <div className="button" />
            <div className="button" />
          </div>
          <div className="right">
            <div className="button" />
          </div>
        </div>

        <div className="phone-screen-container">
          <div className="phone-bg" />
          <div className="phone-notch-container">
            <div className="phone-notch">
              <div className="phone-camera" />
            </div>
          </div>

          <div className="phone-screen-content">
            <OloOnboardingUI />
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
