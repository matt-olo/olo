"use client";

import { useState, useEffect, useRef } from "react";
import jsPDF from "jspdf";
import { toPng } from "html-to-image";
import { Button } from "@/components/ui/button";
import { Download, Loader2, Image } from "lucide-react";
import { OloAppUI } from "@/components/olo-app-mockup";
import "@/styles/phone-mockup.scss";

// ============================================================================
// SLIDE DATA - Edit your content here
// ============================================================================

const slideGradients: { start: string; end: string }[] = [
  { start: "#061a2e", end: "#0a2a2a" },
  { start: "#040e14", end: "#0a2a2a" },
  { start: "#040e14", end: "#0a2a2a" },
  { start: "#040e14", end: "#0a2a2a" },
  { start: "#040e14", end: "#0a2a2a" },
  { start: "#040e14", end: "#0a2a2a" },
  { start: "#040e14", end: "#0a2a2a" },
  { start: "#040e14", end: "#0a2a2a" },
  { start: "#040e14", end: "#0a2a2a" },
  { start: "#040e14", end: "#0a2a2a" },
  { start: "#040e14", end: "#0a2a2a" },
  { start: "#030d12", end: "#040e14" },
];

const slidesData = [
  {
    id: 1,
    title: "DELETE YOUR OVERHEAD",
    subtitle: "",
    content: "CONFIDENTIAL - OLO AI INTERNAL - 2026",
    bgColor: "bg-[#061a2e]",
    type: "title" as const,
  },
  {
    id: 2,
    title: "problem",
    subtitle: "Small to medium businesses (SMBs) are {{red}}drowning{{/red}} in administrative overhead.",
    bullets: [
      "AI can fix this, but today\u2019s automation tools are too {{red}}high-friction{{/red}} for the businesses that need them most. Business owners are not going to research tools, learn how to manage prompts, agents, and dashboards, and coordinate disconnected apps just to get routine work done.",
      "Entrepreneurs spend {{turq}}36% of their workweek{{/turq}} [1] on non-revenue-generating administrative work. Meanwhile, {{turq}}1 in 3 SMBs{{/turq}} [2] {{red}}still lacked a basic website in 2025{{/red}}, showing how far the market remains from adopting current automation tools.",
    ],
    content: "{{turq}}The{{/turq}} {{red}}blocker{{/red}} {{turq}}is{{/turq}} {{turq}}usability{{/turq}}. {{turq}}The{{/turq}} {{red}}burden{{/red}} {{turq}}is{{/turq}} {{turq}}administrative{{/turq}}. {{turq}}The{{/turq}} {{red}}cost{{/red}} {{turq}}is{{/turq}} {{turqunderline}}real{{/turqunderline}}.",
    bgColor: "bg-[#040e14]",
    footer: "Source: [1] Time Etc Survey, [2] Visual Objects Survey",
  },
  {
    id: 3,
    title: "solution",
    subtitle: "The {{white}}solution{{/white}} is {{turq}}automation{{/turq}} with {{turq}}olo{{/turq}}.",
    bullets: [
      "olo acts as a **contractor** for powerful AI tools \u2014 it detects routine admin work \u2014 {{turq}}calls{{/turq}}, {{turq}}emails{{/turq}}, {{turq}}invoicing{{/turq}}, {{turq}}payroll{{/turq}}, {{turq}}CRM{{/turq}}, and {{turq}}scheduling{{/turq}}, coordinates with the right automation tool for the job, and validates the output \u2014 completing the task from start to finish with **you in complete control**.",
    ],
    content: "{{red}}No{{/red}} prompts. {{red}}No{{/red}} app-switching. {{red}}No{{/red}} manual coordination.",
    footer: "",
    bgColor: "bg-[#040e14]",
  },
  {
    id: 4,
    title: "problem",
    subtitle: "{{red}}Isolation{{/red}} {{white}}={{/white}} {{red}}Inefficiency{{/red}}",
    bullets: [
      "AI tools are powerful in isolation, but SMB owners cannot babysit a multitude of **prompts**, **agents**, **dashboards**, and **disconnected apps**.",
      "Their work does not live in one tool or software. It moves across {{turq}}calls{{/turq}}, {{turq}}email{{/turq}}, {{turq}}scheduling{{/turq}}, {{turq}}accounting{{/turq}}, {{turq}}invoicing{{/turq}}, {{turq}}payroll{{/turq}}, {{turq}}customer messages{{/turq}}, and more.",
      "When each tool needs direction, context, and follow-up, {{underline}}the user becomes the manager of the automation layer.{{/underline}}",
    ],
    content: "This is the new administrative overhead.",
    bgColor: "bg-[#040e14]",
  },
  {
    id: 5,
    title: "solution",
    subtitle: "{{strike}}the user{{/strike}} {{turq}}olo{{/turq}} manages the **automation layer**",
    bullets: [
      "olo manages the automation layer — connecting isolated tools to share context, coordinate actions, and log outcomes so the user stays in control without doing any of the coordination.",
    ],
    content: "One call becomes a completed workflow. {{underlinewhite}}Coordination is the multiplier.{{/underlinewhite}}",
    bgColor: "bg-[#040e14]",
    flow: [
      "Customer calls to reschedule",
      "olo answers & coordinates tools",
      "Schedule & invoice updated + Email confirmation sent",
      "Task notated in olo\u2019s work log for user [\u2713]",
    ],
  },
  {
    id: 6,
    title: "meet olo",
    subtitle: "Autonomous SMB Automation",
    content: "olo sits between business signals and automation tools — continuously detecting work, routing tasks, validating outputs, and improving + learning how the business operates.",
    bullets: [
      "Built for autonomy with human-centric control",
      "**Orchestrate** workflows across tools",
      "**Reduce** cost/latency on proven workflows",
      "**Execute** through connected automation tools",
      "**Validate** before acting",
      "**User-controlled** autonomy by risk level",
      "**Improve** over time from outcomes & observation",
      "**Data Privacy:** Built to delete overhead, not exploit your data",
    ],
    bgColor: "bg-[#040e14]",
  },
  {
    id: 11,
    title: "onboarding",
    subtitle: "Keep your software. Nix the overhead.",
    content: "olo works with the software your business already uses — QuickBooks, Google, phone, email, calendar, and more. Your software stays in place. olo connects to it, coordinates the work, and starts with you in complete control.",
    onboardingSteps: [
      "**Create olo Account** — Create your business workspace and owner profile.",
      "**Billing** — Add payment for the connected tooling olo will configure and run.",
      "**Google Login** — A single login connects all the tools olo needs.",
      "**Connect QuickBooks** — Your QuickBooks stays in place. olo simply connects to it and automates payroll, accounting, and more.",
      "**Phone Setup** — olo configures a phone agent to answer calls, capture requests, and escalate when needed.",
      "**Meet with olo** — olo learns your business and expectations in a guided interview.",
    ],
    footer: "Go live with you in control — olo starts by asking before acting and logging every task — until you decide it is ready for a promotion.",
    bgColor: "bg-[#040e14]",
  },
  {
    id: 7,
    title: "opportunity",
    subtitle: "There is {{turq}}$940B/year{{/turq}} in SMB administrative overhead we built olo to {{red}}delete{{/red}}",
    bullets: [
      "The U.S. has **36.2M** [1] small businesses.",
      "The average entrepreneur loses an estimated **~$26K/year** in labor value to administrative work, based on spending 36% of the workweek on admin and using the average small-business wage of $30.42/hour. [2]",
    ],
    content: "Capture a fraction of the overhead olo deletes",
    footer: "At 1% U.S. SMB penetration, with recurring subscription pricing modeled at 10% of estimated admin labor value saved, olo represents a **~$940M ARR** opportunity.",
    source: "Sources: [1] SBA Office of Advocacy Data, [2] Glassdoor",
    bgColor: "bg-[#040e14]",
  },
  {
    id: 8,
    title: "business model",
    subtitle: "{{turq}}High-touch bespoke pilot{{/turq}} → {{turq}}scalable subscription model{{/turq}}",
    content: "olo begins with hands-on pilot relationships that test, tune, and shape the release candidate while producing the pricing, onboarding, and workflow patterns needed for full release.",
    pilotRelease: {
      items: [
        "**100** service-focused SMBs",
        "**$1.5K–$7.5K** setup fee — 30-day refundable, based on size & scope of the SMB",
        "**Value-based subscription** — 10–25% of measured savings / additional revenue",
        "**Bundled tooling** + hands-on support",
      ],
      footer: "The value-based pilot model acts as a trust accelerator: olo is positioned as a savings partner, not another SaaS subscription.",
    },
    fullRelease: {
      items: [
        "**Broader** SMB addressable market",
        "**Repeatable** automated onboarding",
        "**Flat-rate** subscription tiers by SMB size",
        "**Volume-discounted** tooling",
      ],
      footer: "Flat-rate pricing enables scalability through self-serve onboarding.",
    },
    bgColor: "bg-[#040e14]",
  },
  {
    id: 12,
    title: "ask",
    subtitle: "Raising $375K on a $7.5M SAFE",
    funds: [
      { label: "Engineering", pct: "60%", amount: "$225K", desc: "3 developers over the first year to ship MVP with core automation layer, olo Admin app, initial connectors, then full release + extended connector sets." },
      { label: "Operations", pct: "27%", amount: "$100K", desc: "First-year runway buffer covering company operations, infrastructure, tooling, legal, admin, and support overhead." },
      { label: "Sales & Support", pct: "13%", amount: "$50K", desc: "Targeted pilot sales, onboarding support, customer success, and workflow setup for early SMB deployments." },
    ],
    milestones: [
      "MVP + Release Candidate shipped",
      "100 SMB deployments live",
      "$250K+ MRR",
      "One-year operating runway",
      "Seed-ready metrics",
    ],
    bgColor: "bg-[#040e14]",
  },
  {
    id: 9,
    title: "roadmap",
    subtitle: "Goal",
    content: "Launch-ready autonomous SMB automation platform with proven pilot usage, repeatable onboarding, and an initial customer base.",
    phases: [
      {
        label: "Phase 1",
        name: "Bootstrap & MVP Development",
        highlight: "Raise **$375,000** at a **$7.5M** post-money cap.",
        desc: "Funds will be used to develop the core orchestration layer, initial connectors, validation loop, and olo Admin app for trust controls and interview-based setup.",
      },
      {
        label: "Phase 2",
        name: "Deploy with 100 Pilot SMBs",
        highlight: "Current traction: **50** SMBs already on the olo pilot waitlist, **5** SMBs received overhead diagnostics.",
        desc: "Hands-on onboarding, real-world testing, workflow development, and support.",
      },
      {
        label: "Phase 3",
        name: "Standardize & Finalize RC",
        highlight: "Turn MVP and pilot learnings into a release candidate by expanding connectors for broader SMB workflows, automating onboarding from proven implementation patterns, and finalizing repeatable pricing, support, and tooling partnerships.",
        desc: "",
      },
    ],
    bgColor: "bg-[#040e14]",
  },
  {
    id: 10,
    title: "the olo team",
    subtitle: "Two founders. **$22M raised** across prior ventures.",
    content: "Building olo to attack one clear, expensive SMB pain point at the center of the AI automation wave.",
    founders: [
      { name: "Josh Edward" },
      { name: "Matt Martin" },
    ],
    bgColor: "bg-[#030d12]",
  },
];

// ============================================================================
// CANVAS RENDERING - Draw slides directly to canvas (no html2canvas)
// ============================================================================

function drawSlideToCanvas(
  ctx: CanvasRenderingContext2D,
  slide: (typeof slidesData)[0],
  gradient: { start: string; end: string }
) {
  const W = 1920;
  const H = 1080;

  // Draw gradient background
  const grd = ctx.createLinearGradient(0, 0, W, H);
  grd.addColorStop(0, gradient.start);
  grd.addColorStop(1, gradient.end);
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, W, H);

  ctx.textBaseline = "top";

  if (slide.id === 1) {
    // Title slide - dark bg with gradient striping, logo, tagline
    const turquoise = "#2dd4bf";

    // Draw subtle vertical stripes
    // Bold diagonal stripes using darkened palette colors
    ctx.save();
    const stripeColors = [
      "rgba(6,40,50,0.9)",
      "rgba(15,80,90,0.5)",
      "rgba(4,25,35,0.9)",
      "rgba(0,120,130,0.3)",
      "rgba(8,50,65,0.9)",
      "rgba(45,212,191,0.22)",
      "rgba(10,30,55,0.9)",
      "rgba(0,90,100,0.35)",
    ];
    const stripeWidths = [40, 2, 48, 2, 48, 2, 58, 2];
    // Draw diagonal stripes
    ctx.rotate(-0.78); // ~135deg
    let sx = -H;
    for (let rep = 0; rep < 20; rep++) {
      for (let s = 0; s < stripeColors.length; s++) {
        ctx.fillStyle = stripeColors[s];
        ctx.fillRect(sx, -H, stripeWidths[s], H * 3);
        sx += stripeWidths[s];
      }
    }
    ctx.restore();

    // Radial glow to lift the center
    const radial = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, 500);
    radial.addColorStop(0, "rgba(10, 50, 50, 0.6)");
    radial.addColorStop(1, "transparent");
    ctx.fillStyle = radial;
    ctx.fillRect(0, 0, W, H);

    // Draw O|O logo
    const logoY = 360;
    const circleRadius = 70;
    const logoSpacing = 15;
    ctx.strokeStyle = turquoise;
    ctx.lineWidth = 6;

    // Left O
    ctx.beginPath();
    ctx.arc(W / 2 - circleRadius - logoSpacing, logoY, circleRadius, 0, Math.PI * 2);
    ctx.stroke();

    // Right O
    ctx.beginPath();
    ctx.arc(W / 2 + circleRadius + logoSpacing, logoY, circleRadius, 0, Math.PI * 2);
    ctx.stroke();

    // Center bar
    ctx.fillStyle = turquoise;
    ctx.fillRect(W / 2 - 3, logoY - 80, 6, 160);

    // Tagline: [ DELETE YOUR OVERHEAD ]
    const taglineY = 530;
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.font = "bold 48px Montserrat, system-ui, sans-serif";

    // Measure parts
    const bracketFont = "300 40px Montserrat, system-ui, sans-serif";
    const wordFont = "bold 48px Montserrat, system-ui, sans-serif";

    ctx.font = wordFont;
    const deleteW = ctx.measureText("DELETE ").width;
    const yourW = ctx.measureText("YOUR ").width;
    const overheadW = ctx.measureText("OVERHEAD").width;
    ctx.font = bracketFont;
    const bracketW = ctx.measureText("[  ").width;
    const totalW = bracketW * 2 + deleteW + yourW + overheadW;

    let xPos = (W - totalW) / 2;

    // Left bracket
    ctx.font = bracketFont;
    ctx.fillStyle = "rgba(45, 212, 191, 0.6)";
    ctx.textAlign = "left";
    ctx.fillText("[", xPos, taglineY);
    xPos += bracketW;

    // DELETE
    ctx.font = wordFont;
    ctx.fillStyle = "#ffffff";
    ctx.fillText("DELETE ", xPos, taglineY);
    xPos += deleteW;

    // YOUR
    ctx.fillStyle = turquoise;
    ctx.fillText("YOUR ", xPos, taglineY);
    xPos += yourW;

    // OVERHEAD
    ctx.fillStyle = "#ef4444";
    ctx.fillText("OVERHEAD", xPos, taglineY);
    xPos += overheadW;

    // Right bracket
    ctx.font = bracketFont;
    ctx.fillStyle = "rgba(45, 212, 191, 0.6)";
    ctx.fillText("]", xPos, taglineY);

    // CONFIDENTIAL - 2026
    ctx.textAlign = "center";
    ctx.font = "400 16px Montserrat, system-ui, sans-serif";
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    ctx.letterSpacing = "4px";
    ctx.fillText("CONFIDENTIAL - OLO AI INTERNAL - 2026", W / 2, H - 80);

    return;
  }

  if (slide.id === 10) {
    const turq = "#2dd4bf";

    // Grid with diagonal slashes
    ctx.lineWidth = 2;
    // Horizontal grid
    ctx.strokeStyle = "rgba(0, 120, 130, 0.1)";
    for (let y = 92; y < H; y += 92) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }
    // Vertical grid
    for (let x = 92; x < W; x += 92) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
      ctx.stroke();
    }
    // Diagonal slashes
    ctx.strokeStyle = "rgba(45, 212, 191, 0.07)";
    for (let d = -H; d < W + H; d += 64) {
      ctx.beginPath();
      ctx.moveTo(d, 0);
      ctx.lineTo(d - H, H);
      ctx.stroke();
    }

    // Center glow
    const rg10 = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, 500);
    rg10.addColorStop(0, "rgba(10, 55, 55, 0.6)");
    rg10.addColorStop(1, "transparent");
    ctx.fillStyle = rg10;
    ctx.fillRect(0, 0, W, H);

    ctx.textAlign = "center";

    // Heading
    ctx.fillStyle = "rgba(45, 212, 191, 0.7)";
    ctx.font = "500 28px Montserrat, system-ui, sans-serif";
    ctx.fillText("THE OLO TEAM", W / 2, 200);

    // Stats line
    ctx.font = "bold 52px Montserrat, system-ui, sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("Two founders.", W / 2 - 200, 300);
    ctx.fillText("$22M raised", W / 2 + 130, 300);
    ctx.font = "400 52px Montserrat, system-ui, sans-serif";
    // Re-render properly
    ctx.font = "bold 52px Montserrat, system-ui, sans-serif";
    const t10p1 = "Two founders. ";
    const t10p2 = "$22M raised";
    const t10p3 = " across prior ventures.";
    const t10total = ctx.measureText(t10p1 + t10p2 + t10p3).width;
    const t10start = (W - t10total) / 2;
    ctx.textAlign = "left";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(t10p1, t10start, 300);
    const t10w1 = ctx.measureText(t10p1).width;
    ctx.fillStyle = "#ffffff";
    ctx.font = "900 52px Montserrat, system-ui, sans-serif";
    ctx.fillText(t10p2, t10start + t10w1, 300);
    const t10w2 = ctx.measureText(t10p2).width;
    ctx.font = "bold 52px Montserrat, system-ui, sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(t10p3, t10start + t10w1 + t10w2, 300);

    // Mission
    ctx.textAlign = "center";
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.font = "400 28px Montserrat, system-ui, sans-serif";
    ctx.fillText("Building olo to attack one clear, expensive SMB pain point", W / 2, 400);
    ctx.fillText("at the center of the AI automation wave.", W / 2, 440);

    // Founders
    const founders = ["Josh Edward", "Matt Martin"];
    const fStartX = W / 2 - 150;
    founders.forEach((name, idx) => {
      const fx = fStartX + idx * 300;

      // Circle
      ctx.strokeStyle = "rgba(45, 212, 191, 0.4)";
      ctx.lineWidth = 2;
      ctx.fillStyle = "rgba(45, 212, 191, 0.1)";
      ctx.beginPath();
      ctx.arc(fx, 570, 60, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Initials
      ctx.fillStyle = turq;
      ctx.font = "bold 40px Montserrat, system-ui, sans-serif";
      const initials = name.split(" ").map(n => n[0]).join("");
      ctx.fillText(initials, fx, 560);

      // Name
      ctx.fillStyle = "#ffffff";
      ctx.font = "600 28px Montserrat, system-ui, sans-serif";
      ctx.fillText(name, fx, 660);
    });

    // URL
    ctx.fillStyle = turq;
    ctx.font = "500 24px Montserrat, system-ui, sans-serif";
    ctx.fillText("oloai.com", W / 2, 780);

    // Confidential
    ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
    ctx.font = "400 14px Montserrat, system-ui, sans-serif";
    ctx.fillText("CONFIDENTIAL - OLO AI INTERNAL - 2026", W / 2, H - 60);

    return;
  }

  // Standard slides - left aligned with padding
  const leftPad = 120;
  ctx.textAlign = "left";

  // Slide 2 - Problem slide custom layout
  if (slide.id === 2) {
    const turq = "#2dd4bf";

    // Draw vertical stripes (reversed from slide 1)
    ctx.save();
    const vStripeColors = [
      "rgba(4,25,35,0.9)", "rgba(0,100,110,0.2)",
      "rgba(8,45,55,0.9)", "rgba(45,212,191,0.08)",
      "rgba(6,35,45,0.9)", "rgba(15,70,80,0.3)",
    ];
    const vStripeWidths = [50, 2, 58, 2, 58, 2];
    let vx = 0;
    for (let rep = 0; rep < 15; rep++) {
      for (let s = 0; s < vStripeColors.length; s++) {
        ctx.fillStyle = vStripeColors[s];
        ctx.fillRect(vx, 0, vStripeWidths[s], H);
        vx += vStripeWidths[s];
      }
    }
    ctx.restore();

    // Radial glow
    const rg = ctx.createRadialGradient(W * 0.7, H * 0.3, 0, W * 0.7, H * 0.3, 500);
    rg.addColorStop(0, "rgba(10, 50, 50, 0.5)");
    rg.addColorStop(1, "transparent");
    ctx.fillStyle = rg;
    ctx.fillRect(0, 0, W, H);

    // "problem" heading top left
    ctx.fillStyle = "rgba(45, 212, 191, 0.7)";
    ctx.font = "500 28px Montserrat, system-ui, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("PROBLEM", leftPad, 100);

    // Main title with red highlights
    ctx.font = "bold 42px Montserrat, system-ui, sans-serif";
    ctx.textAlign = "left";
    let tx = leftPad;
    let ty = 260;

    ctx.fillStyle = "#ffffff";
    ctx.fillText("SMBs are ", tx, ty);
    tx += ctx.measureText("SMBs are ").width;
    ctx.fillStyle = "#ef4444";
    ctx.fillText("drowning", tx, ty);
    tx += ctx.measureText("drowning").width;
    ctx.fillStyle = "#ffffff";
    ctx.fillText(" in overhead. AI can fix it, but today\u2019s", tx, ty);

    tx = leftPad;
    ty += 55;
    ctx.fillStyle = "#ffffff";
    ctx.fillText("tools are too ", tx, ty);
    tx += ctx.measureText("tools are too ").width;
    ctx.fillStyle = "#ef4444";
    ctx.fillText("high-friction", tx, ty);
    tx += ctx.measureText("high-friction").width;
    ctx.fillStyle = "#ffffff";
    ctx.fillText(" for SMBs to adopt.", tx, ty);

    // Body paragraphs
    let by = 420;
    ctx.font = "400 28px Montserrat, system-ui, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    ctx.fillText("Entrepreneurs spend an average of", leftPad, by);
    ctx.font = "bold 28px Montserrat, system-ui, sans-serif";
    ctx.fillStyle = turq;
    const m1 = ctx.measureText("Entrepreneurs spend an average of ").width;
    ctx.fillText("36% of their workweek", leftPad + m1, by);
    ctx.font = "400 28px Montserrat, system-ui, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    const m2 = m1 + ctx.measureText("36% of their workweek ").width;
    ctx.fillText("[1] on non-revenue-generating", leftPad + m2, by);
    by += 44;
    ctx.fillText("administrative work.", leftPad, by);

    by += 70;
    ctx.fillText("At the same time, the market remains under-digitized:", leftPad, by);
    by += 44;
    ctx.font = "bold 28px Montserrat, system-ui, sans-serif";
    ctx.fillStyle = turq;
    ctx.fillText("1 out of every 3 SMBs", leftPad, by);
    ctx.font = "400 28px Montserrat, system-ui, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    const m3 = ctx.measureText("1 out of every 3 SMBs ").width;
    ctx.fillText("[2] still lacked even a basic website in 2025 \u2014 let alone", leftPad + m3, by);
    by += 44;
    ctx.fillText("the capacity to adopt AI automation.", leftPad, by);

    // Big turquoise statement with underline on "real"
    by += 80;
    ctx.font = "bold 38px Montserrat, system-ui, sans-serif";
    ctx.fillStyle = turq;
    const footerParts = "The blocker is usability. The burden is administrative. The cost is ";
    ctx.fillText(footerParts, leftPad, by);
    const fpWidth = ctx.measureText(footerParts).width;
    ctx.fillText("real", leftPad + fpWidth, by);
    const realWidth = ctx.measureText("real").width;
    // Underline
    ctx.strokeStyle = turq;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(leftPad + fpWidth, by + 42);
    ctx.lineTo(leftPad + fpWidth + realWidth, by + 42);
    ctx.stroke();
    ctx.fillText(".", leftPad + fpWidth + realWidth, by);

    // Source footer
    ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
    ctx.font = "400 16px Montserrat, system-ui, sans-serif";
    ctx.fillText("Source: [1] Time Etc Survey, [2] Visual Objects Survey", leftPad, H - 60);

    return;
  }

  // Slide 3 - Solution slide
  if (slide.id === 3) {
    const turq = "#2dd4bf";

    // Horizontal stripes
    const hStripeColors = [
      "rgba(5,30,40,0.9)", "rgba(0,110,120,0.2)",
      "rgba(8,40,55,0.9)", "rgba(45,212,191,0.06)",
      "rgba(4,20,30,0.9)", "rgba(15,75,85,0.25)",
    ];
    const hStripeWidths = [60, 2, 68, 2, 68, 2];
    let hy = 0;
    for (let rep = 0; rep < 10; rep++) {
      for (let s = 0; s < hStripeColors.length; s++) {
        ctx.fillStyle = hStripeColors[s];
        ctx.fillRect(0, hy, W, hStripeWidths[s]);
        hy += hStripeWidths[s];
      }
    }

    // Radial glow
    const rg = ctx.createRadialGradient(W * 0.3, H * 0.7, 0, W * 0.3, H * 0.7, 500);
    rg.addColorStop(0, "rgba(10, 50, 50, 0.5)");
    rg.addColorStop(1, "transparent");
    ctx.fillStyle = rg;
    ctx.fillRect(0, 0, W, H);

    // "SOLUTION" heading
    ctx.fillStyle = "rgba(45, 212, 191, 0.7)";
    ctx.font = "500 28px Montserrat, system-ui, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("SOLUTION", leftPad, 100);

    // Title: "The solution is automation with olo."
    let tx3 = leftPad;
    const ty3 = 300;
    ctx.font = "bold 52px Montserrat, system-ui, sans-serif";

    ctx.fillStyle = "#ffffff";
    ctx.fillText("The ", tx3, ty3);
    tx3 += ctx.measureText("The ").width;

    // "solution" in turquoise
    ctx.fillStyle = turq;
    ctx.fillText("solution", tx3, ty3);
    tx3 += ctx.measureText("solution").width;

    // "is" in turquoise
    ctx.fillText(" is", tx3, ty3);
    tx3 += ctx.measureText(" is").width;

    ctx.fillStyle = "#ffffff";
    ctx.fillText(" ", tx3, ty3);
    tx3 += ctx.measureText(" ").width;

    // "automation" underlined
    ctx.fillText("automation", tx3, ty3);
    const autoW = ctx.measureText("automation").width;
    ctx.strokeStyle = turq;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(tx3, ty3 + 56);
    ctx.lineTo(tx3 + autoW, ty3 + 56);
    ctx.stroke();
    tx3 += autoW;

    ctx.fillStyle = "#ffffff";
    ctx.fillText(" with ", tx3, ty3);
    tx3 += ctx.measureText(" with ").width;

    // "olo" in turquoise bold
    ctx.fillStyle = turq;
    ctx.fillText("olo", tx3, ty3);
    tx3 += ctx.measureText("olo").width;

    ctx.fillStyle = "#ffffff";
    ctx.fillText(".", tx3, ty3);

    // Sub line
    let ty3b = 420;
    ctx.font = "400 34px Montserrat, system-ui, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.85)";
    ctx.fillText("olo automates routine SMB admin work", leftPad, ty3b);
    ctx.font = "bold 34px Montserrat, system-ui, sans-serif";
    ctx.fillStyle = "#ffffff";
    const m = ctx.measureText("olo automates routine SMB admin work ").width;
    ctx.fillText("end-to-end", leftPad + m, ty3b);
    ctx.font = "400 34px Montserrat, system-ui, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.85)";
    const m2b = m + ctx.measureText("end-to-end").width;
    ctx.fillText(" \u2014 from task detection to", leftPad + m2b, ty3b);
    ty3b += 50;
    ctx.fillText("validated completion.", leftPad, ty3b);

    // Body text - needs to pop
    ty3b += 90;
    ctx.font = "600 32px Montserrat, system-ui, sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("No prompts. No app-switching. No manual coordination.", leftPad, ty3b);

    // Italic closer with left border accent
    ty3b += 80;
    ctx.fillStyle = "rgba(45, 212, 191, 0.4)";
    ctx.fillRect(leftPad, ty3b - 5, 4, 50);
    ctx.font = "italic 30px Montserrat, system-ui, sans-serif";
    ctx.fillStyle = turq;
    ctx.fillText("Most importantly \u2014", leftPad + 24, ty3b);
    const miW = ctx.measureText("Most importantly \u2014 ").width;
    ctx.font = "italic bold 30px Montserrat, system-ui, sans-serif";
    ctx.fillText("no more wasting time and money on work that creates", leftPad + 24 + miW, ty3b);
    ty3b += 44;
    // "headaches" in red
    ctx.fillStyle = "#ef4444";
    ctx.fillText("headaches", leftPad + 24, ty3b);
    const hW = ctx.measureText("headaches").width;
    // "instead of" in turquoise
    ctx.fillStyle = turq;
    ctx.fillText(" instead of ", leftPad + 24 + hW, ty3b);
    const ioW = hW + ctx.measureText(" instead of ").width;
    // "revenue" in white
    ctx.fillStyle = "#ffffff";
    ctx.fillText("revenue", leftPad + 24 + ioW, ty3b);
    const revW = ioW + ctx.measureText("revenue").width;
    ctx.fillStyle = turq;
    ctx.fillText(".", leftPad + 24 + revW, ty3b);

    return;
  }

  // Slide 4 - Problem 2: Isolation = Inefficiency
  if (slide.id === 4) {
    const turq = "#2dd4bf";

    // Angled stripes (225deg)
    ctx.save();
    const s4Colors = [
      "rgba(5,25,35,0.9)", "rgba(120,20,20,0.12)",
      "rgba(8,35,45,0.9)", "rgba(45,212,191,0.05)",
      "rgba(4,18,28,0.9)", "rgba(80,15,15,0.08)",
    ];
    const s4Widths = [45, 2, 53, 2, 58, 2];
    ctx.rotate(0.78); // 225deg equivalent
    let s4x = -H;
    for (let rep = 0; rep < 20; rep++) {
      for (let s = 0; s < s4Colors.length; s++) {
        ctx.fillStyle = s4Colors[s];
        ctx.fillRect(s4x, -W, s4Widths[s], W * 3);
        s4x += s4Widths[s];
      }
    }
    ctx.restore();

    // Radial red tint
    const rg4 = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, 500);
    rg4.addColorStop(0, "rgba(80, 10, 10, 0.12)");
    rg4.addColorStop(1, "transparent");
    ctx.fillStyle = rg4;
    ctx.fillRect(0, 0, W, H);

    // "PROBLEM" heading
    ctx.fillStyle = "rgba(45, 212, 191, 0.7)";
    ctx.font = "500 28px Montserrat, system-ui, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("PROBLEM", leftPad, 100);

    // Big title: Isolation = Inefficiency
    ctx.font = "900 72px Montserrat, system-ui, sans-serif";
    ctx.fillStyle = "#ef4444";
    ctx.fillText("Isolation", leftPad, 260);
    ctx.fillStyle = "#ffffff";
    const isoW = ctx.measureText("Isolation ").width;
    ctx.fillText("=", leftPad + isoW, 260);
    const eqW = isoW + ctx.measureText("= ").width;
    ctx.fillStyle = "#ef4444";
    ctx.fillText("Inefficiency", leftPad + eqW, 260);

    // Body paragraphs
    let b4y = 380;
    ctx.font = "400 28px Montserrat, system-ui, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    ctx.fillText("AI tools are powerful in isolation, but SMB workflows are", leftPad, b4y);
    b4y += 42;
    ctx.font = "bold 28px Montserrat, system-ui, sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("not isolated", leftPad, b4y);
    ctx.font = "400 28px Montserrat, system-ui, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    const niW = ctx.measureText("not isolated").width;
    ctx.fillText(". They are chains of dependent work across calls, email,", leftPad + niW, b4y);
    b4y += 42;
    ctx.fillText("scheduling, accounting, invoicing, payroll, and more.", leftPad, b4y);

    b4y += 65;
    ctx.fillText("This isolation doesn\u2019t just create a poor ", leftPad, b4y);
    ctx.font = "bold 28px Montserrat, system-ui, sans-serif";
    ctx.fillStyle = "#ffffff";
    const peW = ctx.measureText("This isolation doesn\u2019t just create a poor ").width;
    ctx.fillText("user experience", leftPad + peW, b4y);
    ctx.font = "400 28px Montserrat, system-ui, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    const ueW = peW + ctx.measureText("user experience").width;
    ctx.fillText(" \u2014 it limits what", leftPad + ueW, b4y);
    b4y += 42;
    ctx.fillText("automation can ", leftPad, b4y);
    ctx.font = "bold 28px Montserrat, system-ui, sans-serif";
    ctx.fillStyle = turq;
    const acW = ctx.measureText("automation can ").width;
    ctx.fillText("unlock", leftPad + acW, b4y);
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    ctx.font = "400 28px Montserrat, system-ui, sans-serif";
    const unlW = acW + ctx.measureText("unlock").width;
    ctx.fillText(".", leftPad + unlW, b4y);

    b4y += 65;
    ctx.font = "bold 30px Montserrat, system-ui, sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("When tools do not know about one another, the user becomes the orchestration layer.", leftPad, b4y);
    // Underline "the user becomes the orchestration layer."
    const orchStart = leftPad + ctx.measureText("When tools do not know about one another, ").width;
    const orchW = ctx.measureText("the user becomes the orchestration layer.").width;
    ctx.strokeStyle = turq;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(orchStart, b4y + 36);
    ctx.lineTo(orchStart + orchW, b4y + 36);
    ctx.stroke();

    // Closing punch with turquoise left border
    b4y += 90;
    ctx.fillStyle = "rgba(45, 212, 191, 0.6)";
    ctx.fillRect(leftPad, b4y - 5, 4, 50);
    ctx.font = "italic bold 36px Montserrat, system-ui, sans-serif";
    ctx.fillStyle = turq;
    ctx.fillText("This is the new form of administrative overhead.", leftPad + 24, b4y);

    return;
  }

  // Slide 5 - Solution 2: olo is the orchestration layer
  if (slide.id === 5) {
    const turq = "#2dd4bf";

    // Grid with diagonal slashes
    ctx.lineWidth = 2;

    // Horizontal grid lines
    ctx.strokeStyle = "rgba(0, 130, 140, 0.12)";
    for (let y = 80; y < H; y += 80) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }

    // Vertical grid lines
    for (let x = 80; x < W; x += 80) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
      ctx.stroke();
    }

    // Diagonal slashes cutting through
    ctx.strokeStyle = "rgba(45, 212, 191, 0.1)";
    for (let d = -H; d < W + H; d += 56) {
      ctx.beginPath();
      ctx.moveTo(d, 0);
      ctx.lineTo(d - H, H);
      ctx.stroke();
    }

    // Center glow
    const rg5 = ctx.createRadialGradient(W * 0.5, H * 0.45, 0, W * 0.5, H * 0.45, 500);
    rg5.addColorStop(0, "rgba(10, 55, 55, 0.4)");
    rg5.addColorStop(1, "transparent");
    ctx.fillStyle = rg5;
    ctx.fillRect(0, 0, W, H);

    // "SOLUTION" heading
    ctx.fillStyle = "rgba(45, 212, 191, 0.7)";
    ctx.font = "500 28px Montserrat, system-ui, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("SOLUTION", leftPad, 100);

    // Title: strikethrough "the user" + olo is the orchestration layer
    let tx5 = leftPad;
    const ty5 = 240;
    ctx.font = "bold 56px Montserrat, system-ui, sans-serif";

    // "the user" with strikethrough
    ctx.fillStyle = "rgba(255,255,255,0.4)";
    ctx.fillText("the user", tx5, ty5);
    const tuW = ctx.measureText("the user").width;
    ctx.strokeStyle = "#ef4444";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(tx5, ty5 + 22);
    ctx.lineTo(tx5 + tuW, ty5 + 22);
    ctx.stroke();
    tx5 += tuW;

    ctx.fillStyle = "#ffffff";
    ctx.fillText(" ", tx5, ty5);
    tx5 += ctx.measureText(" ").width;

    // "olo" turquoise
    ctx.fillStyle = turq;
    ctx.fillText("olo", tx5, ty5);
    tx5 += ctx.measureText("olo").width;

    ctx.fillStyle = "#ffffff";
    ctx.fillText(" is the ", tx5, ty5);
    tx5 += ctx.measureText(" is the ").width;

    // "orchestration layer" bold
    ctx.fillText("orchestration layer", tx5, ty5);

    // Description
    let dy5 = 360;
    ctx.font = "400 28px Montserrat, system-ui, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    ctx.fillText("olo connects isolated automation tools into one unified system \u2014 letting them share", leftPad, dy5);
    dy5 += 42;
    ctx.fillText("context, coordinate actions, and compound the value of every tool plugged in.", leftPad, dy5);

    // Flow diagram
    dy5 += 80;
    const flowSteps = [
      "Customer calls to reschedule",
      "olo answers & coordinates tools",
      "Schedule & invoice updated +\nEmail confirmation sent",
      "Task notated in olo\u2019s work log\nfor user [\u2713]",
    ];
    let fx = leftPad;
    ctx.font = "500 16px Montserrat, system-ui, sans-serif";
    flowSteps.forEach((step, idx) => {
      // Box
      ctx.strokeStyle = "rgba(45, 212, 191, 0.3)";
      ctx.lineWidth = 1;
      ctx.fillStyle = "rgba(45, 212, 191, 0.05)";
      const boxW = 340;
      const boxH = 70;
      roundRect(ctx, fx, dy5, boxW, boxH, 8);
      ctx.fill();
      ctx.stroke();

      // Text
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.textAlign = "left";
      const lines = step.split("\n");
      lines.forEach((line, li) => {
        ctx.fillText(line, fx + 16, dy5 + 20 + li * 22);
      });

      // Arrow
      if (idx < flowSteps.length - 1) {
        ctx.fillStyle = turq;
        ctx.font = "400 24px system-ui, sans-serif";
        ctx.fillText("\u2192", fx + boxW + 10, dy5 + 30);
        ctx.font = "500 16px Montserrat, system-ui, sans-serif";
      }

      fx += boxW + 45;
    });

    // Bottom title
    dy5 += 150;
    ctx.textAlign = "left";
    ctx.font = "bold 36px Montserrat, system-ui, sans-serif";
    ctx.fillStyle = turq;
    ctx.fillText("One call becomes a completed workflow. ", leftPad, dy5);
    const ocW = ctx.measureText("One call becomes a completed workflow. ").width;
    ctx.fillStyle = "#ffffff";
    ctx.fillText("Coordination is the multiplier.", leftPad + ocW, dy5);
    // Underline "Coordination is the multiplier."
    const cmW = ctx.measureText("Coordination is the multiplier.").width;
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(leftPad + ocW, dy5 + 40);
    ctx.lineTo(leftPad + ocW + cmW, dy5 + 40);
    ctx.stroke();

    return;
  }

  // Slide 6 - Meet olo
  if (slide.id === 6) {
    const turq = "#2dd4bf";

    // Same diagonal striping as title page
    ctx.save();
    const s6Colors = [
      "rgba(6,40,50,0.9)", "rgba(15,80,90,0.5)",
      "rgba(4,25,35,0.9)", "rgba(0,120,130,0.3)",
      "rgba(8,50,65,0.9)", "rgba(45,212,191,0.22)",
      "rgba(10,30,55,0.9)", "rgba(0,90,100,0.35)",
    ];
    const s6Widths = [40, 2, 48, 2, 48, 2, 58, 2];
    ctx.rotate(-0.78);
    let s6x = -H;
    for (let rep = 0; rep < 20; rep++) {
      for (let s = 0; s < s6Colors.length; s++) {
        ctx.fillStyle = s6Colors[s];
        ctx.fillRect(s6x, -H, s6Widths[s], H * 3);
        s6x += s6Widths[s];
      }
    }
    ctx.restore();

    // Center glow
    const rg6 = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, 500);
    rg6.addColorStop(0, "rgba(10, 50, 50, 0.6)");
    rg6.addColorStop(1, "transparent");
    ctx.fillStyle = rg6;
    ctx.fillRect(0, 0, W, H);

    // "MEET OLO" heading
    ctx.fillStyle = "rgba(45, 212, 191, 0.7)";
    ctx.font = "500 28px Montserrat, system-ui, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("MEET OLO", leftPad, 100);

    // Left side - title
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 48px Montserrat, system-ui, sans-serif";
    ctx.fillText("The autonomous orchestration", leftPad, 220);
    ctx.fillText("layer for SMB workflows", leftPad, 280);

    // Left side - description
    ctx.fillStyle = "rgba(255,255,255,0.75)";
    ctx.font = "400 24px Montserrat, system-ui, sans-serif";
    const desc = "olo sits between business signals and automation tools \u2014";
    const desc2 = "continuously detecting work, routing tasks, validating";
    const desc3 = "outputs, and improving + learning how the business operates.";
    ctx.fillText(desc, leftPad, 380);
    ctx.fillText(desc2, leftPad, 416);
    ctx.fillText(desc3, leftPad, 452);

    // Right side - header with underline
    const rightX = W / 2 + 60;

    // Vertical divider
    ctx.strokeStyle = "rgba(45, 212, 191, 0.15)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(W / 2 + 20, 160);
    ctx.lineTo(W / 2 + 20, H - 100);
    ctx.stroke();

    ctx.fillStyle = turq;
    ctx.font = "bold 26px Montserrat, system-ui, sans-serif";
    ctx.fillText("Built for autonomy with human-centric control", rightX, 220);
    // Header underline
    ctx.strokeStyle = "rgba(45, 212, 191, 0.2)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(rightX, 252);
    ctx.lineTo(rightX + ctx.measureText("Built for autonomy with human-centric control").width, 252);
    ctx.stroke();

    // Right side - bullets with bold first word + numbered
    const rightBullets = [
      { bold: "Orchestrate", rest: " workflows across tools" },
      { bold: "Reduce", rest: " cost/latency on proven workflows" },
      { bold: "Execute", rest: " through connected automation tools" },
      { bold: "Validate", rest: " before acting" },
      { bold: "User-controlled", rest: " autonomy by risk level" },
      { bold: "Improve", rest: " over time from outcomes & observation" },
    ];
    ctx.font = "400 22px Montserrat, system-ui, sans-serif";
    let rby = 290;
    rightBullets.forEach((bullet, idx) => {
      // Number badge
      ctx.fillStyle = "rgba(45, 212, 191, 0.15)";
      roundRect(ctx, rightX, rby - 4, 24, 24, 4);
      ctx.fill();
      ctx.fillStyle = turq;
      ctx.font = "bold 12px Montserrat, system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(String(idx + 1), rightX + 12, rby + 3);
      ctx.textAlign = "left";

      // Bold first word
      ctx.font = "bold 22px Montserrat, system-ui, sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.fillText(bullet.bold, rightX + 34, rby);
      const bw = ctx.measureText(bullet.bold).width;

      // Rest of text
      ctx.font = "400 22px Montserrat, system-ui, sans-serif";
      ctx.fillStyle = "rgba(255,255,255,0.85)";
      ctx.fillText(bullet.rest, rightX + 34 + bw, rby);

      rby += 50;
    });

    return;
  }

  // Slide 7 - Market
  if (slide.id === 7) {
    const turq = "#2dd4bf";

    // Vertical stripes (like slide 2)
    const v7Colors = [
      "rgba(4,25,35,0.9)", "rgba(0,100,110,0.2)",
      "rgba(8,45,55,0.9)", "rgba(45,212,191,0.08)",
      "rgba(6,35,45,0.9)", "rgba(15,70,80,0.3)",
    ];
    const v7Widths = [50, 2, 58, 2, 58, 2];
    let vx7 = 0;
    for (let rep = 0; rep < 15; rep++) {
      for (let s = 0; s < v7Colors.length; s++) {
        ctx.fillStyle = v7Colors[s];
        ctx.fillRect(vx7, 0, v7Widths[s], H);
        vx7 += v7Widths[s];
      }
    }

    // Radial glow
    const rg7 = ctx.createRadialGradient(W * 0.7, H * 0.3, 0, W * 0.7, H * 0.3, 500);
    rg7.addColorStop(0, "rgba(10, 50, 50, 0.5)");
    rg7.addColorStop(1, "transparent");
    ctx.fillStyle = rg7;
    ctx.fillRect(0, 0, W, H);

    // "MARKET" heading
    ctx.fillStyle = "rgba(45, 212, 191, 0.7)";
    ctx.font = "500 28px Montserrat, system-ui, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("OPPORTUNITY", leftPad, 100);

    // Title
    ctx.font = "bold 46px Montserrat, system-ui, sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("There is ", leftPad, 220);
    let t7x = leftPad + ctx.measureText("There is ").width;
    ctx.fillStyle = turq;
    ctx.fillText("$940B/year", t7x, 220);
    t7x += ctx.measureText("$940B/year").width;
    ctx.fillStyle = "#ffffff";
    ctx.fillText(" in SMB administrative overhead", t7x, 220);
    ctx.fillText("we built olo to ", leftPad, 278);
    const wbt = ctx.measureText("we built olo to ").width;
    ctx.fillStyle = "#ef4444";
    ctx.font = "bold 46px Montserrat, system-ui, sans-serif";
    ctx.fillText("delete", leftPad + wbt, 278);

    // Number cards
    const cardY = 380;
    const cardW = 460;
    const cardH = 130;
    const cardGap = 50;
    const cards = [
      { num: "36.2M", label: "U.S. small businesses [1]", color: turq },
      { num: "~$26K", label: "lost per entrepreneur/year to admin [2]", color: turq },
      { num: "$940B", label: "total addressable overhead/year", color: "#ffffff" },
    ];

    cards.forEach((card, idx) => {
      const cx = leftPad + idx * (cardW + cardGap);
      // Card bg
      ctx.fillStyle = "rgba(45, 212, 191, 0.05)";
      ctx.strokeStyle = "rgba(45, 212, 191, 0.2)";
      ctx.lineWidth = 1;
      roundRect(ctx, cx, cardY, cardW, cardH, 12);
      ctx.fill();
      ctx.stroke();
      // Number
      ctx.fillStyle = card.color;
      ctx.font = "900 56px Montserrat, system-ui, sans-serif";
      ctx.fillText(card.num, cx + 28, cardY + 30);
      // Label
      ctx.fillStyle = "rgba(255,255,255,0.7)";
      ctx.font = "400 18px Montserrat, system-ui, sans-serif";
      ctx.fillText(card.label, cx + 28, cardY + 95);
    });

    // Bottom statement with left bar
    const bsy = 580;
    ctx.fillStyle = "rgba(45, 212, 191, 0.4)";
    ctx.fillRect(leftPad, bsy, 4, 90);

    ctx.fillStyle = turq;
    ctx.font = "bold 30px Montserrat, system-ui, sans-serif";
    ctx.fillText("Capture a fraction of the overhead olo deletes", leftPad + 24, bsy + 10);

    ctx.fillStyle = "rgba(255,255,255,0.8)";
    ctx.font = "400 22px Montserrat, system-ui, sans-serif";
    ctx.fillText("At 1% U.S. SMB penetration, modeled at 10% of estimated admin labor value saved,", leftPad + 24, bsy + 55);
    ctx.fillText("olo represents a ", leftPad + 24, bsy + 85);
    const repW = ctx.measureText("olo represents a ").width;
    ctx.font = "bold 22px Montserrat, system-ui, sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("~$940M ARR", leftPad + 24 + repW, bsy + 85);
    const arrW = repW + ctx.measureText("~$940M ARR").width;
    ctx.font = "400 22px Montserrat, system-ui, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    ctx.fillText(" opportunity.", leftPad + 24 + arrW, bsy + 85);

    // Sources
    ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
    ctx.font = "400 14px Montserrat, system-ui, sans-serif";
    ctx.fillText("Sources: [1] SBA Office of Advocacy Data, [2] Glassdoor", leftPad, H - 50);

    return;
  }

  // Slide 8 - Business Model
  if (slide.id === 8) {
    const turq = "#2dd4bf";

    // Horizontal stripes (like slide 3)
    const h8Colors = [
      "rgba(5,30,40,0.9)", "rgba(0,110,120,0.2)",
      "rgba(8,40,55,0.9)", "rgba(45,212,191,0.06)",
      "rgba(4,20,30,0.9)", "rgba(15,75,85,0.25)",
    ];
    const h8Widths = [60, 2, 68, 2, 68, 2];
    let h8y = 0;
    for (let rep = 0; rep < 10; rep++) {
      for (let s = 0; s < h8Colors.length; s++) {
        ctx.fillStyle = h8Colors[s];
        ctx.fillRect(0, h8y, W, h8Widths[s]);
        h8y += h8Widths[s];
      }
    }

    // Glow
    const rg8 = ctx.createRadialGradient(W * 0.3, H * 0.6, 0, W * 0.3, H * 0.6, 500);
    rg8.addColorStop(0, "rgba(10, 50, 50, 0.5)");
    rg8.addColorStop(1, "transparent");
    ctx.fillStyle = rg8;
    ctx.fillRect(0, 0, W, H);

    // "BUSINESS MODEL" heading
    ctx.fillStyle = "rgba(45, 212, 191, 0.7)";
    ctx.font = "500 28px Montserrat, system-ui, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("BUSINESS MODEL", leftPad, 100);

    // Title: high touch beta → repeatable product
    ctx.font = "bold 56px Montserrat, system-ui, sans-serif";
    let t8x = leftPad;
    ctx.fillStyle = turq;
    ctx.fillText("high touch beta", t8x, 210);
    t8x += ctx.measureText("high touch beta").width;
    ctx.fillStyle = "#ffffff";
    ctx.fillText(" \u2192 ", t8x, 210);
    t8x += ctx.measureText(" \u2192 ").width;
    ctx.fillStyle = turq;
    ctx.fillText("repeatable product", t8x, 210);

    // Description
    ctx.fillStyle = "rgba(255,255,255,0.75)";
    ctx.font = "400 26px Montserrat, system-ui, sans-serif";
    ctx.fillText("olo launches with 100 beta SMBs through hands-on implementation deals that test, tune,", leftPad, 310);
    ctx.fillText("and shape the release candidate.", leftPad, 348);

    // "Revenue comes from:" label
    ctx.fillStyle = "rgba(255,255,255,0.5)";
    ctx.font = "600 22px Montserrat, system-ui, sans-serif";
    ctx.fillText("REVENUE COMES FROM:", leftPad, 430);

    // Three revenue cards
    const cards8 = [
      { title: "Setup", desc: "onboarding, configuration,\nconnector activation, and support" },
      { title: "Value-based subscription", desc: "recurring access to olo\u2019s autonomous\norchestration layer, anchored to\nmeasurable overhead reduction" },
      { title: "Bundled tooling", desc: "one package covering the AI tools,\nautomation services, and\ninfrastructure olo runs on" },
    ];

    const c8W = 480;
    const c8H = 200;
    const c8Gap = 40;
    const c8StartX = leftPad;
    const c8Y = 490;

    cards8.forEach((card, idx) => {
      const cx = c8StartX + idx * (c8W + c8Gap);

      // Card border
      ctx.fillStyle = "rgba(45, 212, 191, 0.03)";
      ctx.strokeStyle = "rgba(45, 212, 191, 0.2)";
      ctx.lineWidth = 1;
      roundRect(ctx, cx, c8Y, c8W, c8H, 12);
      ctx.fill();
      ctx.stroke();

      // Number badge
      ctx.fillStyle = "rgba(45, 212, 191, 0.15)";
      roundRect(ctx, cx + 24, c8Y + 24, 30, 30, 6);
      ctx.fill();
      ctx.fillStyle = turq;
      ctx.font = "bold 14px Montserrat, system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(String(idx + 1), cx + 39, c8Y + 35);
      ctx.textAlign = "left";

      // Title
      ctx.fillStyle = turq;
      ctx.font = "bold 22px Montserrat, system-ui, sans-serif";
      ctx.fillText(card.title, cx + 66, c8Y + 38);

      // Desc
      ctx.fillStyle = "rgba(255,255,255,0.7)";
      ctx.font = "400 18px Montserrat, system-ui, sans-serif";
      const lines = card.desc.split("\n");
      lines.forEach((line, li) => {
        ctx.fillText(line, cx + 24, c8Y + 85 + li * 28);
      });
    });

    return;
  }

  // Slide 9 - Roadmap
  if (slide.id === 9) {
    const turq = "#2dd4bf";

    // Diagonal stripes like title page
    ctx.save();
    const s9Colors = [
      "rgba(6,40,50,0.9)", "rgba(15,80,90,0.5)",
      "rgba(4,25,35,0.9)", "rgba(0,120,130,0.3)",
      "rgba(8,50,65,0.9)", "rgba(45,212,191,0.22)",
      "rgba(10,30,55,0.9)", "rgba(0,90,100,0.35)",
    ];
    const s9Widths = [40, 2, 48, 2, 48, 2, 58, 2];
    ctx.rotate(-0.78);
    let s9x = -H;
    for (let rep = 0; rep < 20; rep++) {
      for (let s = 0; s < s9Colors.length; s++) {
        ctx.fillStyle = s9Colors[s];
        ctx.fillRect(s9x, -H, s9Widths[s], H * 3);
        s9x += s9Widths[s];
      }
    }
    ctx.restore();

    // Center glow
    const rg9 = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, 500);
    rg9.addColorStop(0, "rgba(10, 50, 50, 0.65)");
    rg9.addColorStop(1, "transparent");
    ctx.fillStyle = rg9;
    ctx.fillRect(0, 0, W, H);

    // "ROADMAP" heading
    ctx.fillStyle = "rgba(45, 212, 191, 0.7)";
    ctx.font = "500 28px Montserrat, system-ui, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("ROADMAP", leftPad, 90);

    // Phase circles + connector lines
    const phases = [
      { label: "Phase 1", name: "Bootstrap & MVP Development", highlight: "Raise $375,000 at a $7.5M\npost-money cap.", highlightBold: ["$375,000", "$7.5M"], desc: "Funds will be used to develop the core\norchestration layer, initial connectors,\nvalidation loop, and olo Admin app." },
      { label: "Phase 2", name: "Deploy with 100 Pilot SMBs", highlight: "Current traction: 50 SMBs on\nwaitlist, 5 received diagnostics.", highlightBold: ["50", "5"], desc: "Hands-on onboarding, real-world testing,\nworkflow development, and support." },
      { label: "Phase 3", name: "Standardize & Finalize RC", highlight: "", highlightBold: [], desc: "Expand connectors, automate onboarding\nfrom proven patterns, finalize repeatable\npricing, support, and tooling." },
    ];

    const phaseW = 480;
    const phaseGap = 40;
    const phaseStartX = leftPad;
    const circleY = 160;
    const cardY = 210;
    const cardH = 360;

    phases.forEach((phase, idx) => {
      const px = phaseStartX + idx * (phaseW + phaseGap);

      // Circle connector
      ctx.strokeStyle = turq;
      ctx.lineWidth = 2;
      ctx.fillStyle = "rgba(45, 212, 191, 0.1)";
      ctx.beginPath();
      ctx.arc(px + 24, circleY, 24, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Number in circle
      ctx.fillStyle = turq;
      ctx.font = "bold 18px Montserrat, system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(String(idx + 1), px + 24, circleY - 4);
      ctx.textAlign = "left";

      // Connector line
      if (idx < phases.length - 1) {
        ctx.strokeStyle = "rgba(45, 212, 191, 0.3)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(px + 50, circleY);
        ctx.lineTo(px + phaseW + phaseGap - 2, circleY);
        ctx.stroke();
      }

      // Card background
      ctx.fillStyle = "rgba(10, 32, 32, 0.6)";
      ctx.strokeStyle = "rgba(45, 212, 191, 0.2)";
      ctx.lineWidth = 1;
      roundRect(ctx, px, cardY, phaseW, cardH, 16);
      ctx.fill();
      ctx.stroke();

      // Phase label
      ctx.fillStyle = "rgba(45, 212, 191, 0.6)";
      ctx.font = "600 14px Montserrat, system-ui, sans-serif";
      ctx.fillText(phase.label.toUpperCase(), px + 28, cardY + 35);

      // Phase name
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 24px Montserrat, system-ui, sans-serif";
      ctx.fillText(phase.name, px + 28, cardY + 75);

      // Phase highlight in white
      let phDescY = cardY + 110;
      if (phase.highlight) {
        ctx.fillStyle = "rgba(255,255,255,0.85)";
        ctx.font = "400 16px Montserrat, system-ui, sans-serif";
        const hLines = phase.highlight.split("\n");
        hLines.forEach((line, li) => {
          ctx.fillText(line, px + 28, phDescY + li * 24);
        });
        phDescY += hLines.length * 24 + 12;
      }
      // Phase desc in turquoise
      ctx.fillStyle = "rgba(45, 212, 191, 0.8)";
      ctx.font = "400 15px Montserrat, system-ui, sans-serif";
      const lines = phase.desc.split("\n");
      lines.forEach((line, li) => {
        ctx.fillText(line, px + 28, phDescY + li * 22);
      });
    });

    // Goal bar at bottom
    const goalY = H - 130;
    ctx.fillStyle = "rgba(45, 212, 191, 0.04)";
    ctx.strokeStyle = "rgba(45, 212, 191, 0.3)";
    ctx.lineWidth = 1;
    roundRect(ctx, leftPad, goalY, W - leftPad * 2, 80, 12);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = turq;
    ctx.font = "bold 20px Montserrat, system-ui, sans-serif";
    ctx.fillText("GOAL", leftPad + 30, goalY + 28);

    // Dash separator
    ctx.fillStyle = "rgba(45, 212, 191, 0.4)";
    ctx.fillRect(leftPad + 100, goalY + 32, 40, 2);

    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.font = "500 20px Montserrat, system-ui, sans-serif";
    ctx.fillText("Launch-ready autonomous SMB automation platform with proven pilot usage, repeatable onboarding, and an initial customer base.", leftPad + 160, goalY + 28);

    return;
  }

  // Title
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 80px system-ui, sans-serif";
  ctx.fillText(slide.title, leftPad, 120);

  // Subtitle
  ctx.fillStyle = "rgba(255,255,255,0.8)";
  ctx.font = "36px system-ui, sans-serif";
  ctx.fillText(slide.subtitle, leftPad, 220);

  let yPos = 320;

  // Bullets
  if (slide.bullets) {
    ctx.fillStyle = "#ffffff";
    ctx.font = "36px system-ui, sans-serif";
    slide.bullets.forEach((bullet) => {
      // Draw bullet point
      ctx.beginPath();
      ctx.arc(leftPad + 8, yPos + 18, 8, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.8)";
      ctx.fill();

      // Draw text
      ctx.fillStyle = "#ffffff";
      ctx.fillText(bullet, leftPad + 40, yPos);
      yPos += 60;
    });
  }

  // Content at bottom
  if (slide.content) {
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.font = "28px system-ui, sans-serif";
    ctx.fillText(slide.content, leftPad, yPos + 40);
  }
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

// ============================================================================
// SLIDE COMPONENTS (for preview - uses Tailwind)
// ============================================================================

function SlideTitle({ slide }: { slide: (typeof slidesData)[0] }) {
  if (slide.id === 1) {
    return (
      <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden font-[var(--font-montserrat)]">
        {/* Gradient striping background effect */}
        <div className="absolute inset-0">
          {/* Base dark */}
          <div className="absolute inset-0 bg-[#040e14]" />
          {/* Bold clashing gradient stripes */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, transparent 0px, transparent 38px, rgba(0,150,160,0.3) 38px, rgba(0,150,160,0.3) 39.5px, transparent 39.5px, transparent 78px, rgba(45,212,191,0.22) 78px, rgba(45,212,191,0.22) 79.5px, transparent 79.5px, transparent 118px, rgba(0,130,140,0.25) 118px, rgba(0,130,140,0.25) 119.5px, transparent 119.5px, transparent 158px, rgba(12,200,190,0.18) 158px, rgba(12,200,190,0.18) 159.5px)",
            }}
          />
          {/* Radial glow to lift the center */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(10,50,50,0.6)_0%,_transparent_60%)]" />
        </div>

        {/* Logo - O|O */}
        <div className="relative mb-16 flex items-center">
          {/* Left O */}
          <div className="h-[140px] w-[140px] rounded-full border-[6px] border-[#2dd4bf]" style={{ boxShadow: '0 0 10px 1px rgba(45,212,191,0.5), 0 0 25px 4px rgba(45,212,191,0.2), 0 0 50px 8px rgba(45,212,191,0.08)' }} />
          {/* Center bar */}
          <div className="mx-3 h-[160px] w-[6px] rounded-full bg-[#2dd4bf]" style={{ boxShadow: '0 0 8px 1px rgba(45,212,191,0.5), 0 0 20px 4px rgba(45,212,191,0.2)' }} />
          {/* Right O */}
          <div className="h-[140px] w-[140px] rounded-full border-[6px] border-[#22d3ee]" style={{ boxShadow: '0 0 10px 1px rgba(34,211,238,0.5), 0 0 25px 4px rgba(34,211,238,0.2), 0 0 50px 8px rgba(34,211,238,0.08)' }} />
        </div>

        {/* Tagline */}
        <div className="relative flex items-center gap-4 text-[48px] font-bold tracking-wider">
          <span className="text-[#2dd4bf]/60 font-light text-[40px]">[</span>
          {/* Keyboard key */}
          <span className="relative inline-flex items-center">
            {/* Key cap - top face */}
            <span className="relative z-10 inline-flex items-center justify-center rounded-[6px] border-[2px] border-[#2dd4bf]/60 bg-gradient-to-b from-[#1a5c5c] to-[#0f3d3d] px-6 py-3 shadow-[inset_0_-2px_0_rgba(0,0,0,0.3),inset_0_1px_0_rgba(45,212,191,0.2)]">
              <span className="text-[36px] font-semibold tracking-wider text-[#2dd4bf] drop-shadow-[0_0_6px_rgba(45,212,191,0.4)]">delete</span>
            </span>
            {/* Key depth/bottom */}
            <span className="absolute inset-x-[2px] -bottom-[4px] h-[8px] rounded-b-[6px] bg-[#0a2a2a] shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />
            {/* Mouse cursor - bottom right */}
            <span className="absolute -bottom-[26px] -right-[20px] z-20">
              <svg viewBox="0 0 24 24" className="h-[56px] w-[56px] drop-shadow-[0_0_8px_rgba(45,212,191,0.4)]" fill="none">
                <path d="M5 3l14 8-6 1.5-3.5 5.5z" fill="#2dd4bf" stroke="#0a2a2a" strokeWidth="1.5" />
              </svg>
            </span>
          </span>
          <span className="bg-gradient-to-r from-[#2dd4bf] to-[#0ea5e9] bg-clip-text text-transparent">your</span>
          <span className="text-red-400">overhead</span>
          <span className="text-[#2dd4bf]/60 font-light text-[40px]">]</span>
        </div>

        {/* Confidential */}
        <div className="absolute bottom-16 text-[16px] tracking-[0.3em] text-white/40">
          CONFIDENTIAL - OLO AI INTERNAL - 2026
        </div>
      </div>
    );
  }

  // Slide 10 (Team) or other title slides
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden font-[var(--font-montserrat)]">
      {/* Background - grid with slashes like slide 5 but subtle */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#030d12]" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(160deg, transparent 0px, transparent 38px, rgba(0,150,160,0.3) 38px, rgba(0,150,160,0.3) 39.5px, transparent 39.5px, transparent 78px, rgba(45,212,191,0.22) 78px, rgba(45,212,191,0.22) 79.5px, transparent 79.5px, transparent 118px, rgba(0,130,140,0.25) 118px, rgba(0,130,140,0.25) 119.5px, transparent 119.5px, transparent 158px, rgba(12,200,190,0.18) 158px, rgba(12,200,190,0.18) 159.5px)",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(10,55,55,0.6)_0%,_transparent_50%)]" />
      </div>

      {/* Content */}
      <div className="relative flex flex-col items-center text-center">
        {/* Heading */}
        <h3 className="mb-12 text-[28px] font-medium uppercase tracking-[0.3em] text-[#2dd4bf]/70">
          {slide.title}
        </h3>

        {/* Stats line */}
        <h1 className="mb-6 text-[52px] font-bold leading-tight text-white">
          <RichText text={slide.subtitle} />
        </h1>

        {/* Mission */}
        <p className="mb-20 max-w-[1100px] text-[28px] leading-relaxed text-white/70">
          {slide.content}
        </p>

        {/* Founders */}
        {slide.founders && (
          <div className="mb-20 flex gap-16">
            {slide.founders.map((founder, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="mb-6 flex h-[120px] w-[120px] items-center justify-center rounded-full border-2 border-[#2dd4bf]/40 bg-[#2dd4bf]/10 text-[40px] font-bold text-[#2dd4bf]">
                  {founder.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="text-[28px] font-semibold text-white">
                  {founder.name}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* URL */}
        <div className="mb-8 text-[24px] font-medium text-[#2dd4bf]">
          oloai.com
        </div>

        {/* Confidential */}
        <div className="text-[14px] tracking-[0.3em] text-white/30">
          CONFIDENTIAL - OLO AI INTERNAL - 2026
        </div>
      </div>
    </div>
  );
}

function SlideBullets({ slide }: { slide: (typeof slidesData)[0] }) {
  return (
    <div className="flex h-full flex-col justify-center px-[120px]">
      <h2 className="mb-4 text-[80px] font-bold text-white">{slide.title}</h2>
      <p className="mb-16 text-[36px] text-white/80">{slide.subtitle}</p>
      {slide.bullets && (
        <ul className="space-y-8">
          {slide.bullets.map((bullet, idx) => (
            <li
              key={idx}
              className="flex items-start gap-6 text-[36px] text-white"
            >
              <span className="mt-2 h-4 w-4 flex-shrink-0 rounded-full bg-white/80" />
              {bullet}
            </li>
          ))}
        </ul>
      )}
      {slide.content && (
        <p className="mt-12 text-[28px] text-white/70">{slide.content}</p>
      )}
    </div>
  );
}

function BoldText({ text, className }: { text: string; className?: string }) {
  // Parse **bold** markdown syntax
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <span className={className}>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <span key={i} className="font-bold text-[#2dd4bf]">
            {part.slice(2, -2)}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
}

function RichText({ text, className }: { text: string; className?: string }) {
  // Parse {{red}}, {{underline}}, {{turq}}, {{white}}, {{strike}}, {{underlinewhite}}, and **bold**
  const parts = text.split(/((?:\{\{redunderline\}\}.*?\{\{\/redunderline\}\})|(?:\{\{turqunderline\}\}.*?\{\{\/turqunderline\}\})|(?:\{\{red\}\}.*?\{\{\/red\}\})|(?:\{\{underlinewhite\}\}.*?\{\{\/underlinewhite\}\})|(?:\{\{underline\}\}.*?\{\{\/underline\}\})|(?:\{\{turq\}\}.*?\{\{\/turq\}\})|(?:\{\{white\}\}.*?\{\{\/white\}\})|(?:\{\{strike\}\}.*?\{\{\/strike\}\})|(?:\*\*.*?\*\*))/g);
  return (
    <span className={className}>
      {parts.map((part, i) => {
        if (part.startsWith("{{redunderline}}") && part.endsWith("{{/redunderline}}")) {
          return (
            <span key={i} className="text-red-500 font-bold underline decoration-red-500 underline-offset-4">
              {part.slice(16, -17)}
            </span>
          );
        }
        if (part.startsWith("{{turqunderline}}") && part.endsWith("{{/turqunderline}}")) {
          return (
            <span key={i} className="font-bold text-[#2dd4bf] underline decoration-[#2dd4bf] underline-offset-4 drop-shadow-[0_0_8px_rgba(45,212,191,0.5)]">
              {part.slice(17, -18)}
            </span>
          );
        }
        if (part.startsWith("{{red}}") && part.endsWith("{{/red}}")) {
          return (
            <span key={i} className="text-red-500 font-bold">
              {part.slice(7, -8)}
            </span>
          );
        }
        if (part.startsWith("{{underlinewhite}}") && part.endsWith("{{/underlinewhite}}")) {
          return (
            <span key={i} className="text-white underline decoration-[#2dd4bf] underline-offset-4">
              {part.slice(18, -19)}
            </span>
          );
        }
        if (part.startsWith("{{underline}}") && part.endsWith("{{/underline}}")) {
          return (
            <span key={i} className="underline decoration-[#2dd4bf] underline-offset-4">
              {part.slice(13, -14)}
            </span>
          );
        }
        if (part.startsWith("{{turq}}") && part.endsWith("{{/turq}}")) {
          return (
            <span key={i} className="font-bold text-[#2dd4bf] drop-shadow-[0_0_8px_rgba(45,212,191,0.5)]">
              {part.slice(8, -9)}
            </span>
          );
        }
        if (part.startsWith("{{white}}") && part.endsWith("{{/white}}")) {
          return (
            <span key={i} className="text-white">
              {part.slice(9, -10)}
            </span>
          );
        }
        if (part.startsWith("{{strike}}") && part.endsWith("{{/strike}}")) {
          return (
            <span key={i} className="line-through text-white/40 decoration-red-500">
              {part.slice(10, -11)}
            </span>
          );
        }
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <span key={i} className="font-bold text-white">
              <RichText text={part.slice(2, -2)} />
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
}

function SlideProblem({ slide }: { slide: (typeof slidesData)[0] }) {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden font-[var(--font-montserrat)]">
      {/* Vertical gradient stripes - reversed direction from slide 1 */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#040e14]" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(195deg, transparent 0px, transparent 38px, rgba(0,150,160,0.3) 38px, rgba(0,150,160,0.3) 39.5px, transparent 39.5px, transparent 78px, rgba(45,212,191,0.22) 78px, rgba(45,212,191,0.22) 79.5px, transparent 79.5px, transparent 118px, rgba(0,130,140,0.25) 118px, rgba(0,130,140,0.25) 119.5px, transparent 119.5px, transparent 158px, rgba(12,200,190,0.18) 158px, rgba(12,200,190,0.18) 159.5px)",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,_rgba(10,50,50,0.5)_0%,_transparent_60%)]" />
      </div>

      {/* Content */}
      <div className="relative flex h-full flex-col justify-between px-[120px] py-[80px]">
        {/* Top left heading */}
        <div>
          <h3 className="mb-2 text-[36px] font-bold uppercase tracking-[0.2em] text-[#2dd4bf] drop-shadow-[0_0_8px_rgba(45,212,191,0.5)]">
            {slide.title}
          </h3>
        </div>

        {/* Main content area */}
        <div className="flex-1 flex flex-col justify-center rounded-2xl border border-[#2dd4bf]/10 bg-[#2dd4bf]/[0.08] px-10 py-8 mt-4">
          {/* Main title */}
          <h1 className="mb-6 text-[42px] font-bold leading-tight text-white">
            Small-to-medium businesses are <span className="font-black" style={{ background: 'linear-gradient(135deg, #fca5a5, #ef4444, #dc2626)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>drowning</span> in administrative overhead.
          </h1>

          {/* Body paragraph */}
          <p className="mt-8 mb-10 text-[26px] leading-relaxed text-white/60 max-w-[1400px]">
            AI can fix this, but today&apos;s automation tools are too <span className="text-red-500 font-bold">high-friction</span> for the businesses that need them most. Business owners are not going to research tools, learn how to manage prompts, agents, and dashboards, and coordinate disconnected apps just to get routine work done.
          </p>

          {/* Stat cards */}
          <div className="flex gap-8 mb-10 mt-14">
            <div className="flex-1 rounded-2xl border-2 border-[#0ea5e9]/25 px-10 py-10" style={{ background: 'linear-gradient(145deg, rgba(4,20,30,0.6) 0%, rgba(6,25,35,0.5) 100%)', boxShadow: '0 6px 28px rgba(14,165,233,0.12), 0 2px 8px rgba(0,0,0,0.3)', position: 'relative' }}>
              <svg style={{ position: 'absolute', top: '22px', right: '12px', opacity: 0.25 }} width="120" height="120" viewBox="0 0 32 36" fill="none" stroke="#0ea5e9" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round">
                {/* Bill sticking out top */}
                <rect x="12" y="0" width="8" height="12" rx="1" />
                <circle cx="16" cy="6" r="3" />
                <line x1="16" y1="4" x2="16" y2="8" />
                <path d="M14.5 5c0-.8.7-1 1.5-1s1.5.2 1.5 1-.7 1-1.5 1-1.5.2-1.5 1 .7 1 1.5 1 1.5-.2 1.5-1" />
                {/* Shredder body */}
                <rect x="6" y="12" width="20" height="10" rx="2" />
                <line x1="8" y1="18" x2="24" y2="18" />
                {/* 4 shredded strips */}
                <line x1="11" y1="22" x2="11" y2="33" />
                <line x1="14" y1="22" x2="14" y2="35" />
                <line x1="18" y1="22" x2="18" y2="34" />
                <line x1="21" y1="22" x2="21" y2="32" />
              </svg>
              <p className="text-[56px] font-black mb-3" style={{ background: 'linear-gradient(135deg, #67e8f9, #0ea5e9, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>36%</p>
              <p className="text-[24px] text-white leading-[1.6]">of owners&apos; workweek spent on admin work</p>
            </div>
            <div className="flex-1 rounded-2xl border-2 border-[#34d399]/30 px-10 py-10" style={{ background: 'linear-gradient(145deg, rgba(5,30,20,0.6) 0%, rgba(8,35,22,0.5) 100%)', boxShadow: '0 6px 28px rgba(52,211,153,0.1), 0 2px 8px rgba(0,0,0,0.3)', position: 'relative' }}>
              <svg style={{ position: 'absolute', top: '15px', right: '20px', opacity: 0.2 }} width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/><line x1="9" y1="7" x2="15" y2="13"/><line x1="15" y1="7" x2="9" y2="13"/></svg>
              <p className="text-[56px] font-black mb-3" style={{ background: 'linear-gradient(135deg, #6ee7b7, #34d399, #10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>1 in 3</p>
              <p className="text-[24px] text-white leading-[1.6]">SMBs still lacked a basic website in 2025</p>
            </div>
          </div>

          {/* Big thesis statement */}
          <h2 className="mt-auto pt-4 text-[34px] font-bold text-[#2dd4bf]">
            <RichText text={slide.content || ""} />
          </h2>
        </div>

        {/* Source footer */}
        {slide.footer && (
          <div className="pt-4">
            <p className="text-[16px] tracking-wide text-white/30">
              {slide.footer}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function SlideProblem2({ slide }: { slide: (typeof slidesData)[0] }) {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden font-[var(--font-montserrat)]">
      {/* Background - angled stripes going opposite to slide 3 */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#040e14]" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(225deg, transparent 0px, transparent 38px, rgba(0,150,160,0.3) 38px, rgba(0,150,160,0.3) 39.5px, transparent 39.5px, transparent 78px, rgba(45,212,191,0.22) 78px, rgba(45,212,191,0.22) 79.5px, transparent 79.5px, transparent 118px, rgba(0,130,140,0.25) 118px, rgba(0,130,140,0.25) 119.5px, transparent 119.5px, transparent 158px, rgba(12,200,190,0.18) 158px, rgba(12,200,190,0.18) 159.5px)",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,_rgba(80,10,10,0.12)_0%,_transparent_55%)]" />
      </div>

      {/* Content */}
      <div className="relative flex h-full px-[120px] py-[70px]">
        {/* Left side - text */}
        <div className="flex w-[55%] flex-col justify-between pr-10">
          {/* Top heading */}
          <div>
            <h3 className="mb-2 text-[28px] font-medium uppercase tracking-[0.2em] text-[#2dd4bf] drop-shadow-[0_0_8px_rgba(45,212,191,0.5)]">
              {slide.title}
            </h3>
          </div>

          {/* Main content */}
          <div className="flex-1 flex flex-col justify-center rounded-2xl border border-[#2dd4bf]/10 bg-[#2dd4bf]/[0.08] px-10 py-8">
            {/* Big title - Isolation = Inefficiency */}
            <h1 className="mb-14 text-[72px] font-black leading-none tracking-tight">
              <RichText text={slide.subtitle} />
            </h1>

            {/* Body paragraphs */}
            <div className="space-y-8 max-w-[1200px]">
              {slide.bullets?.map((bullet, idx) => (
                <p key={idx} className="text-[26px] leading-relaxed text-white/80">
                  <RichText text={bullet} />
                </p>
              ))}
            </div>

            {/* Closing punch */}
            {slide.content && (
              <div className="mt-14 border-l-4 border-[#2dd4bf]/60 pl-8">
                <p className="text-[34px] font-bold italic text-[#2dd4bf]">
                  {slide.content}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right side - isolated tools graphic */}
        <div className="flex w-[45%] items-center justify-center">
          {/* SMB Desktop - outer frame */}
          <div className="relative w-[580px] rounded-xl bg-[#0f3d3d] p-5 shadow-[0_0_40px_rgba(0,0,0,0.6)]">
            {/* Desktop title bar with mac buttons + bottom line */}
            <div className="mb-4 flex items-center gap-2 border-b-2 border-black pb-3">
              <div className="h-3 w-3 rounded-full bg-[#0f766e]" />
              <div className="h-3 w-3 rounded-full bg-[#0f766e]" />
              <div className="h-3 w-3 rounded-full bg-[#0f766e]" />
              <span className="ml-3 text-[14px] font-semibold text-white">SMB Desktop</span>
            </div>

            {/* AI Tool windows inside */}
            <div className="relative h-[460px]">
              {[
                { top: "2%", left: "3%", w: "44%", h: "34%", label: "ChatGPT", bg: "#2dd4bf" },
                { top: "4%", left: "50%", w: "46%", h: "28%", label: "Claude", bg: "#38bdf8" },
                { top: "30%", left: "55%", w: "42%", h: "36%", label: "Gemini", bg: "#5eead4" },
                { top: "38%", left: "5%", w: "46%", h: "30%", label: "Midjourney", bg: "#67e8f9" },
                { top: "65%", left: "28%", w: "44%", h: "32%", label: "v0", bg: "#14b8a6" },
                { top: "70%", left: "0%", w: "32%", h: "27%", label: "Lovable", bg: "#0ea5e9" },
                { top: "60%", left: "70%", w: "28%", h: "30%", label: "Bland", bg: "#06b6d4" },
              ].map((win, idx) => (
                <div
                  key={idx}
                  className="absolute overflow-hidden rounded-md shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
                  style={{ top: win.top, left: win.left, width: win.w, height: win.h, backgroundColor: win.bg }}
                >
                  {/* Window title bar with mac buttons + divider line */}
                  <div className="flex items-center gap-1.5 border-b-2 border-black px-3 py-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-[#0f766e]" />
                    <div className="h-2.5 w-2.5 rounded-full bg-[#0f766e]" />
                    <div className="h-2.5 w-2.5 rounded-full bg-[#0f766e]" />
                    <span className="ml-2 text-[13px] font-bold text-black">{win.label}</span>
                  </div>
                  {/* Text blurb lines */}
                  <div className="px-4 py-3 space-y-2.5">
                    <div className="h-[4px] w-[75%] rounded-full bg-black/20" />
                    <div className="h-[4px] w-[50%] rounded-full bg-black/15" />
                    <div className="h-[4px] w-[65%] rounded-full bg-black/12" />
                  </div>
                  {/* Prompt box at bottom */}
                  <div className="absolute bottom-2 left-3 right-3">
                    <div className="flex items-center rounded-md border border-black/20 bg-black/10 px-2 py-1.5">
                      <div className="h-[3px] w-[40%] rounded-full bg-black/15" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SlideSolution({ slide }: { slide: (typeof slidesData)[0] }) {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden font-[var(--font-montserrat)]">
      {/* Horizontal gradient stripes - clashes with slide 1 diagonal and slide 2 vertical */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#040e14]" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(255deg, transparent 0px, transparent 38px, rgba(0,150,160,0.3) 38px, rgba(0,150,160,0.3) 39.5px, transparent 39.5px, transparent 78px, rgba(45,212,191,0.22) 78px, rgba(45,212,191,0.22) 79.5px, transparent 79.5px, transparent 118px, rgba(0,130,140,0.25) 118px, rgba(0,130,140,0.25) 119.5px, transparent 119.5px, transparent 158px, rgba(12,200,190,0.18) 158px, rgba(12,200,190,0.18) 159.5px)",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_70%,_rgba(10,50,50,0.5)_0%,_transparent_60%)]" />
      </div>

      {/* Content */}
      <div className="relative flex h-full flex-col justify-between px-[120px] py-[80px]">
        {/* Top left heading */}
        <div>
          <h3 className="mb-2 text-[36px] font-bold uppercase tracking-[0.2em] text-[#2dd4bf] drop-shadow-[0_0_8px_rgba(45,212,191,0.5)]">
            {slide.title}
          </h3>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col justify-center rounded-2xl border border-[#2dd4bf]/10 bg-[#2dd4bf]/[0.08] px-10 py-8">
          {/* Title statement */}
          <h1 className="mb-14 text-[52px] font-bold leading-tight text-white">
            <RichText text={slide.subtitle} />
          </h1>

          {/* Sub-title statement */}
          {slide.bullets && (
            <div className="mb-12">
              {slide.bullets.map((bullet, idx) => (
                <p key={idx} className="text-[28px] leading-relaxed text-white/85">
                  <RichText text={bullet} />
                </p>
              ))}
            </div>
          )}

          {/* Winding serpentine road */}
          <div className="mt-8 relative w-full flex justify-center">
            <svg width="100%" height="320" viewBox="-110 -30 1240 340" fill="none" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="roadGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(13,148,136,0.2)" />
                  <stop offset="50%" stopColor="rgba(45,212,191,0.22)" />
                  <stop offset="100%" stopColor="rgba(6,182,212,0.2)" />
                </linearGradient>
                <filter id="roadShadow">
                  <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="rgba(4,20,25,0.7)" />
                </filter>
              </defs>
              {/* Road body */}
              <path d="M -90 140 H 80 V 85 A 85 85 0 0 1 250 85 V 195 A 85 85 0 0 0 420 195 V 85 A 85 85 0 0 1 590 85 V 195 A 85 85 0 0 0 760 195 V 85 A 85 85 0 0 1 930 85 V 140 H 1100" stroke="url(#roadGrad)" strokeWidth="38" strokeLinecap="round" strokeLinejoin="round" filter="url(#roadShadow)" />
              {/* Top/left edge highlight */}
              <path d="M -90 140 H 80 V 85 A 85 85 0 0 1 250 85 V 195 A 85 85 0 0 0 420 195 V 85 A 85 85 0 0 1 590 85 V 195 A 85 85 0 0 0 760 195 V 85 A 85 85 0 0 1 930 85 V 140 H 1100" stroke="rgba(45,212,191,0.08)" strokeWidth="40" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'translate(-1px, -1px)' }} />
              {/* Center dashed */}
              <path d="M -90 140 H 80 V 85 A 85 85 0 0 1 250 85 V 195 A 85 85 0 0 0 420 195 V 85 A 85 85 0 0 1 590 85 V 195 A 85 85 0 0 0 760 195 V 85 A 85 85 0 0 1 930 85 V 140 H 1100" stroke="rgba(45,212,191,0.35)" strokeWidth="2" strokeDasharray="10 7" fill="none" />
            </svg>
          </div>

          {/* Body text */}
          {slide.content && (
            <p className="mt-auto max-w-[1400px] text-[32px] font-semibold leading-relaxed text-white">
              <RichText text={slide.content} />
            </p>
          )}

          {/* Italic closer */}
          {slide.footer && (
            <p className="mt-10 max-w-[1300px] text-[30px] italic text-[#2dd4bf] border-l-4 border-[#2dd4bf]/40 pl-6">
              <RichText text={slide.footer} />
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function SlideRoadmap({ slide }: { slide: (typeof slidesData)[0] }) {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden font-[var(--font-montserrat)]">
      {/* Background - diagonal stripes like title but reversed */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#030d12]" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(285deg, transparent 0px, transparent 38px, rgba(0,150,160,0.3) 38px, rgba(0,150,160,0.3) 39.5px, transparent 39.5px, transparent 78px, rgba(45,212,191,0.22) 78px, rgba(45,212,191,0.22) 79.5px, transparent 79.5px, transparent 118px, rgba(0,130,140,0.25) 118px, rgba(0,130,140,0.25) 119.5px, transparent 119.5px, transparent 158px, rgba(12,200,190,0.18) 158px, rgba(12,200,190,0.18) 159.5px)",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,_rgba(10,50,50,0.65)_0%,_transparent_55%)]" />
      </div>

      {/* Content */}
      <div className="relative flex h-full flex-col px-[120px] py-[70px]">
        {/* Top heading */}
        <div className="mb-8">
          <h3 className="text-[28px] font-medium uppercase tracking-[0.2em] text-[#2dd4bf] drop-shadow-[0_0_8px_rgba(45,212,191,0.5)]">
            {slide.title}
          </h3>
        </div>

        {/* Timeline phases */}
        <div className="flex flex-1 gap-8">
          {slide.phases?.map((phase, idx) => (
            <div key={idx} className="flex flex-1 flex-col">
              {/* Phase connector */}
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#2dd4bf] bg-[#2dd4bf]/10 text-[18px] font-bold text-[#2dd4bf]">
                  {idx + 1}
                </div>
                {idx < (slide.phases?.length ?? 0) - 1 && (
                  <div className="flex-1 h-[2px] bg-gradient-to-r from-[#2dd4bf]/50 to-[#2dd4bf]/10" />
                )}
              </div>

              {/* Card */}
              <div className="flex-1 rounded-2xl border border-[#2dd4bf]/20 bg-[#0a2020]/60 p-8 backdrop-blur-sm">
                <div className="mb-2 text-[16px] font-semibold uppercase tracking-wider text-[#2dd4bf]/60">
                  {phase.label}
                </div>
                <h2 className="mb-5 text-[26px] font-bold text-white leading-tight">
                  {phase.name}
                </h2>
                {phase.highlight && (
                  <p className="mb-4 text-[18px] leading-relaxed text-white/85">
                    <RichText text={phase.highlight} />
                  </p>
                )}
                <p className="text-[17px] leading-relaxed text-[#2dd4bf]/80">
                  {phase.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Goal section at bottom */}
        <div className="mt-8 rounded-xl border border-[#2dd4bf]/30 bg-[#2dd4bf]/[0.04] px-10 py-6">
          <div className="flex items-center gap-4">
            <div className="text-[20px] font-bold uppercase tracking-wider text-[#2dd4bf]">
              {slide.subtitle}
            </div>
            <div className="h-[2px] w-12 bg-[#2dd4bf]/40" />
            <p className="text-[22px] font-medium text-white/90">
              {slide.content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SlideBusinessModel({ slide }: { slide: (typeof slidesData)[0] }) {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden font-[var(--font-montserrat)]">
      {/* Background - horizontal stripes like slide 3 */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#040e14]" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(315deg, transparent 0px, transparent 38px, rgba(0,150,160,0.3) 38px, rgba(0,150,160,0.3) 39.5px, transparent 39.5px, transparent 78px, rgba(45,212,191,0.22) 78px, rgba(45,212,191,0.22) 79.5px, transparent 79.5px, transparent 118px, rgba(0,130,140,0.25) 118px, rgba(0,130,140,0.25) 119.5px, transparent 119.5px, transparent 158px, rgba(12,200,190,0.18) 158px, rgba(12,200,190,0.18) 159.5px)",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_60%,_rgba(10,50,50,0.5)_0%,_transparent_55%)]" />
      </div>

      {/* Content */}
      <div className="relative flex h-full flex-col justify-between px-[120px] py-[70px]">
        {/* Top heading */}
        <div>
          <h3 className="mb-2 text-[28px] font-medium uppercase tracking-[0.2em] text-[#2dd4bf] drop-shadow-[0_0_8px_rgba(45,212,191,0.5)]">
            {slide.title}
          </h3>
        </div>

        {/* Main */}
        <div className="flex-1 flex flex-col justify-center rounded-2xl border border-[#2dd4bf]/10 bg-[#2dd4bf]/[0.08] px-10 py-6">
          {/* Title */}
          <h1 className="mb-4 text-[48px] font-bold leading-tight text-white">
            <RichText text={slide.subtitle} />
          </h1>

          {/* Description */}
          <p className="mb-10 max-w-[1400px] text-[22px] leading-relaxed text-white/70">
            {slide.content}
          </p>

          {/* Two columns: Pilot vs Full Release */}
          <div className="flex gap-8">
            {/* Pilot Release */}
            <div className="flex-1 rounded-xl border border-[#2dd4bf]/25 bg-[#2dd4bf]/[0.08] p-9">
              <h2 className="mb-6 text-[28px] font-bold text-[#2dd4bf]">Pilot release</h2>
              <ul className="mb-6 space-y-4">
                {slide.pilotRelease?.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[21px] text-white/85">
                    <span className="mt-1.5 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-[#2dd4bf]/60" />
                    <RichText text={item} />
                  </li>
                ))}
              </ul>
              <p className="text-[20px] italic text-[#2dd4bf]/80 border-t border-[#2dd4bf]/15 pt-5">
                {slide.pilotRelease?.footer}
              </p>
            </div>

            {/* Full Release */}
            <div className="flex-1 rounded-xl border border-white/15 bg-white/[0.03] p-9">
              <h2 className="mb-6 text-[28px] font-bold text-white">Full release</h2>
              <ul className="mb-6 space-y-4">
                {slide.fullRelease?.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[21px] text-white/85">
                    <span className="mt-1.5 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-white/40" />
                    <RichText text={item} />
                  </li>
                ))}
              </ul>
              <p className="text-[20px] italic text-white/60 border-t border-white/10 pt-5">
                {slide.fullRelease?.footer}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SlideMarket({ slide }: { slide: (typeof slidesData)[0] }) {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden font-[var(--font-montserrat)]">
      {/* Background - vertical stripes like slide 2 */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#040e14]" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(345deg, transparent 0px, transparent 38px, rgba(0,150,160,0.3) 38px, rgba(0,150,160,0.3) 39.5px, transparent 39.5px, transparent 78px, rgba(45,212,191,0.22) 78px, rgba(45,212,191,0.22) 79.5px, transparent 79.5px, transparent 118px, rgba(0,130,140,0.25) 118px, rgba(0,130,140,0.25) 119.5px, transparent 119.5px, transparent 158px, rgba(12,200,190,0.18) 158px, rgba(12,200,190,0.18) 159.5px)",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,_rgba(10,50,50,0.5)_0%,_transparent_60%)]" />
      </div>

      {/* Content */}
      <div className="relative flex h-full flex-col justify-between px-[120px] py-[80px]">
        {/* Top heading */}
        <div>
          <h3 className="mb-2 text-[28px] font-medium uppercase tracking-[0.2em] text-[#2dd4bf] drop-shadow-[0_0_8px_rgba(45,212,191,0.5)]">
            {slide.title}
          </h3>
        </div>

        {/* Main */}
        <div className="flex-1 flex flex-col justify-center rounded-2xl border border-[#2dd4bf]/10 bg-[#2dd4bf]/[0.08] px-10 py-8">
          {/* Big title */}
          <h1 className="mb-14 text-[46px] font-bold leading-tight text-white">
            <RichText text={slide.subtitle} />
          </h1>

          {/* Stats / data points */}
          <div className="mb-12 flex gap-12">
            {/* Big number cards */}
            <div className="flex-1 rounded-xl border border-[#2dd4bf]/20 bg-[#2dd4bf]/5 p-8">
              <div className="mb-2 text-[56px] font-black text-[#2dd4bf]">36.2M</div>
              <div className="text-[20px] text-white/70">U.S. small businesses [1]</div>
            </div>
            <div className="flex-1 rounded-xl border border-[#2dd4bf]/20 bg-[#2dd4bf]/5 p-8">
              <div className="mb-2 text-[56px] font-black text-[#2dd4bf]">~$26K</div>
              <div className="text-[20px] text-white/70">lost per entrepreneur/year to admin [2]</div>
            </div>
            <div className="flex-1 rounded-xl border border-[#2dd4bf]/20 bg-[#2dd4bf]/5 p-8">
              <div className="mb-2 text-[56px] font-black text-white">$940B</div>
              <div className="text-[20px] text-white/70">total addressable overhead/year</div>
            </div>
          </div>

          {/* Bottom statement */}
          <div className="border-l-4 border-[#2dd4bf]/40 pl-8">
            <h2 className="mb-3 text-[30px] font-bold text-[#2dd4bf]">
              {slide.content}
            </h2>
            {slide.footer && (
              <p className="text-[26px] leading-relaxed text-white">
                <RichText text={slide.footer} />
              </p>
            )}
          </div>
        </div>

        {/* Source */}
        {slide.source && (
          <div className="pt-4">
            <p className="text-[14px] tracking-wide text-white/30">
              {slide.source}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function SlideMeetOlo({ slide }: { slide: (typeof slidesData)[0] }) {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden font-[var(--font-montserrat)]">
      {/* Background - same diagonal striping as title page */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#040e14]" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(15deg, transparent 0px, transparent 38px, rgba(0,150,160,0.3) 38px, rgba(0,150,160,0.3) 39.5px, transparent 39.5px, transparent 78px, rgba(45,212,191,0.22) 78px, rgba(45,212,191,0.22) 79.5px, transparent 79.5px, transparent 118px, rgba(0,130,140,0.25) 118px, rgba(0,130,140,0.25) 119.5px, transparent 119.5px, transparent 158px, rgba(12,200,190,0.18) 158px, rgba(12,200,190,0.18) 159.5px)",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(10,50,50,0.6)_0%,_transparent_60%)]" />
      </div>

      {/* Content - left text, right phone */}
      <div className="relative flex h-full px-[80px] py-[35px]">
        {/* Left side - text */}
        <div className="flex w-[58%] flex-col justify-center pr-10">
          <div className="rounded-2xl border border-[#2dd4bf]/10 bg-[#2dd4bf]/[0.08] px-10 py-8">
          {/* Heading */}
          <h3 className="mb-4 text-[28px] font-medium uppercase tracking-[0.2em] text-[#2dd4bf] drop-shadow-[0_0_8px_rgba(45,212,191,0.5)]">
            {slide.title}
          </h3>

          {/* Title */}
          <h1 className="mb-3 text-[42px] font-bold leading-tight text-white">
            {slide.subtitle}
          </h1>

          {/* Subheadline */}
          <p className="mb-6 text-[24px] font-medium text-[#2dd4bf]">The power of automation without any of the complexity.</p>

          {/* Description */}
          <p className="mb-8 text-[22px] leading-relaxed text-white/60">
            {slide.content}
          </p>

          {/* Bullets header */}
          <h2 className="mb-5 text-[22px] font-bold text-[#2dd4bf] border-b border-[#2dd4bf]/20 pb-3">
            {slide.bullets?.[0]}
          </h2>

          {/* Bullets */}
          <ul className="space-y-3">
            {slide.bullets?.slice(1).map((bullet, idx) => (
              <li key={idx} className="flex items-start gap-3 text-[20px] text-white/75">
                <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded bg-[#2dd4bf]/15 text-[12px] font-bold text-[#2dd4bf]">
                  {idx + 1}
                </span>
                <RichText text={bullet} />
              </li>
            ))}
          </ul>
          </div>
        </div>

        {/* Right side - admin phone PNG */}
        <div className="flex w-[42%] items-center justify-center">
          <img src="/pics/olo-admin (1).png" alt="olo admin" className="h-[900px] object-contain" />
        </div>
      </div>
    </div>
  );
}

function SlideSolution2({ slide }: { slide: (typeof slidesData)[0] }) {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden font-[var(--font-montserrat)]">
      {/* Background - grid with diagonal slashes through it */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#040e14]" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent 0px, transparent 38px, rgba(0,150,160,0.3) 38px, rgba(0,150,160,0.3) 39.5px, transparent 39.5px, transparent 78px, rgba(45,212,191,0.22) 78px, rgba(45,212,191,0.22) 79.5px, transparent 79.5px, transparent 118px, rgba(0,130,140,0.25) 118px, rgba(0,130,140,0.25) 119.5px, transparent 119.5px, transparent 158px, rgba(12,200,190,0.18) 158px, rgba(12,200,190,0.18) 159.5px)",
          }}
        />
        {/* Center glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,_rgba(10,55,55,0.4)_0%,_transparent_50%)]" />
      </div>

      {/* Content */}
      <div className="relative flex h-full flex-col justify-between px-[120px] py-[80px]">
        {/* Top left heading */}
        <div>
          <h3 className="mb-2 text-[28px] font-medium uppercase tracking-[0.2em] text-[#2dd4bf] drop-shadow-[0_0_8px_rgba(45,212,191,0.5)]">
            {slide.title}
          </h3>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col justify-center rounded-2xl border border-[#2dd4bf]/10 bg-[#2dd4bf]/[0.08] px-10 py-8">
          {/* Title */}
          <h1 className="mb-10 text-[56px] font-bold leading-tight text-white">
            <RichText text={slide.subtitle} />
          </h1>

          {/* Description */}
          {slide.bullets && (
            <p className="mb-12 max-w-[1400px] text-[28px] leading-relaxed text-white/80">
              <RichText text={slide.bullets[0]} />
            </p>
          )}

          {/* Flow diagram - illustrated pipeline */}
          {slide.flow && (
            <div className="mb-12">
              <div className="relative flex items-stretch justify-between gap-0">
                {/* Step 1: Trigger */}
                <div className="flex flex-col items-center" style={{ flex: "1 1 0" }}>
                  <div className="mb-5 flex h-[90px] w-[90px] items-center justify-center rounded-full border-2 border-[#2dd4bf] bg-[#2dd4bf]/15 shadow-[0_0_24px_rgba(45,212,191,0.25)]">
                    <svg viewBox="0 0 24 24" className="h-10 w-10 text-[#2dd4bf]" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </div>
                  <div className="rounded-xl border border-[#2dd4bf]/30 bg-[#0a2525]/80 px-5 py-4 text-center shadow-[0_0_16px_rgba(45,212,191,0.1)]">
                    <p className="text-[15px] font-semibold text-white">{slide.flow[0]}</p>
                  </div>
                </div>

                {/* Arrow 1 */}
                <div className="flex items-center px-8 self-center -mt-8">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-[11px] font-medium tracking-wider text-[#2dd4bf]/70">signal</span>
                    <div className="flex items-center">
                      <div className="h-[2px] w-[70px] bg-gradient-to-r from-[#2dd4bf]/60 to-[#2dd4bf]" />
                      <span className="text-[16px] text-[#2dd4bf]">›</span>
                    </div>
                  </div>
                </div>

                {/* Step 2: olo */}
                <div className="flex flex-col items-center" style={{ flex: "1 1 0" }}>
                  <div className="mb-5 flex h-[90px] w-[90px] items-center justify-center rounded-full border-2 border-[#2dd4bf] bg-[#2dd4bf]/20 shadow-[0_0_30px_rgba(45,212,191,0.35)]">
                    <span className="text-[24px] font-black text-[#2dd4bf]">olo</span>
                  </div>
                  <div className="rounded-xl border border-[#2dd4bf]/40 bg-[#2dd4bf]/10 px-5 py-4 text-center shadow-[0_0_20px_rgba(45,212,191,0.22)]">
                    <p className="text-[15px] font-semibold text-[#2dd4bf]">{slide.flow[1]}</p>
                  </div>
                </div>

                {/* Arrow 2 */}
                <div className="flex items-center px-8 self-center -mt-8">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-[11px] font-medium tracking-wider text-[#2dd4bf]/70">execute</span>
                    <div className="flex items-center">
                      <div className="h-[2px] w-[70px] bg-gradient-to-r from-[#2dd4bf] to-[#2dd4bf]/60" />
                      <span className="text-[16px] text-[#2dd4bf]">›</span>
                    </div>
                  </div>
                </div>

                {/* Step 3: Actions */}
                <div className="flex flex-col items-center" style={{ flex: "1 1 0" }}>
                  <div className="mb-5 flex h-[90px] w-[90px] items-center justify-center rounded-full border-2 border-[#2dd4bf] bg-[#2dd4bf]/15 shadow-[0_0_24px_rgba(45,212,191,0.25)]">
                    <svg viewBox="0 0 24 24" className="h-10 w-10 text-[#2dd4bf]" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/>
                    </svg>
                  </div>
                  <div className="rounded-xl border border-[#2dd4bf]/30 bg-[#0a2525]/80 px-5 py-4 text-center shadow-[0_0_16px_rgba(45,212,191,0.1)]">
                    <p className="text-[15px] font-semibold text-white">{slide.flow[2]}</p>
                  </div>
                </div>

                {/* Arrow 3 */}
                <div className="flex items-center px-8 self-center -mt-8">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-[11px] font-medium tracking-wider text-[#2dd4bf]/50">notify</span>
                    <div className="flex items-center">
                      <div className="h-[2px] w-[70px] bg-gradient-to-r from-[#2dd4bf]/60 to-[#2dd4bf]/30" />
                      <span className="text-[16px] text-[#2dd4bf]/60">›</span>
                    </div>
                  </div>
                </div>

                {/* Step 4: Complete */}
                <div className="flex flex-col items-center" style={{ flex: "1 1 0" }}>
                  <div className="mb-5 flex h-[90px] w-[90px] items-center justify-center rounded-full border-2 border-green-400 bg-green-500/15 shadow-[0_0_24px_rgba(74,222,128,0.25)]">
                    <svg viewBox="0 0 24 24" className="h-10 w-10 text-green-400" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <div className="rounded-xl border border-green-400/30 bg-green-900/20 px-5 py-4 text-center shadow-[0_0_16px_rgba(74,222,128,0.1)]">
                    <p className="text-[15px] font-semibold text-green-300">{slide.flow[3]}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bottom title */}
          {slide.content && (
            <div className="mt-4">
              <p className="text-[36px] font-bold text-[#2dd4bf]">
                <RichText text={slide.content} />
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function OnboardingPhoneUI() {
  return (
    <div className="flex flex-col h-full bg-[#060e12] text-white font-[var(--font-montserrat)] overflow-hidden px-5 pt-[50px] pb-[24px]">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-[2px] text-[#2dd4bf]">
          <div className="h-[12px] w-[12px] rounded-full border-[1.2px] border-current" />
          <div className="h-[14px] w-[1.2px] bg-current" />
          <div className="h-[12px] w-[12px] rounded-full border-[1.2px] border-current" />
        </div>
        <span className="text-[11px] text-white/40">Step 1 of 6</span>
      </div>

      {/* Title */}
      <h1 className="text-[22px] font-black text-white leading-tight mb-1">Create your account.</h1>
      <h2 className="text-[20px] font-bold text-[#2dd4bf] mb-6">Delete your overhead.</h2>

      {/* Form card */}
      <div className="rounded-[18px] bg-[#0d9488]/20 border border-[#2dd4bf]/15 p-4 mb-5">
        <div className="space-y-3">
          <div>
            <p className="text-[10px] font-bold text-white/70 mb-1">Business Name</p>
            <div className="rounded-lg bg-[#0a1a1e] border border-white/10 px-3 py-2">
              <span className="text-[11px] text-white/30">Your business name</span>
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold text-white/70 mb-1">Owner Name</p>
            <div className="rounded-lg bg-[#0a1a1e] border border-white/10 px-3 py-2">
              <span className="text-[11px] text-white/30">Full name</span>
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold text-white/70 mb-1">Work Email</p>
            <div className="rounded-lg bg-[#0a1a1e] border border-white/10 px-3 py-2">
              <span className="text-[11px] text-white/30">you@company.com</span>
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold text-white/70 mb-1">Password</p>
            <div className="rounded-lg bg-[#0a1a1e] border border-white/10 px-3 py-2">
              <span className="text-[11px] text-white/30">••••••••</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress text */}
      <p className="text-[11px] text-white/50 mb-4">5 more steps for more <span className="underline text-white/80">automation</span>, less <span className="underline text-[#2dd4bf]">headaches</span>.</p>

      {/* Steps list */}
      <div className="rounded-[14px] bg-[#0a1a1e]/80 border border-white/[0.05] p-3.5 mb-5">
        <div className="space-y-2">
          <div className="flex items-center gap-2.5">
            <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#2dd4bf] text-[8px] font-black text-[#060e12]">1</span>
            <span className="text-[11px] font-bold text-white">Create Account</span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-white/10 text-[8px] font-bold text-white/50">2</span>
            <span className="text-[11px] text-white/40">Billing</span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-white/10 text-[8px] font-bold text-white/50">3</span>
            <span className="text-[11px] text-white/40">Google Login</span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-white/10 text-[8px] font-bold text-white/50">4</span>
            <span className="text-[11px] text-white/40">QuickBooks Migration</span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-white/10 text-[8px] font-bold text-white/50">5</span>
            <span className="text-[11px] text-white/40">Phone Setup</span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-white/10 text-[8px] font-bold text-white/50">6</span>
            <span className="text-[11px] text-white/40">Meet with olo</span>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mt-auto">
        <button className="flex-1 rounded-full bg-[#0d4a4a] py-3 text-[12px] font-bold text-white/60">Back</button>
        <button className="flex-1 rounded-full bg-[#2dd4bf] py-3 text-[12px] font-black text-[#060e12]">Create Account</button>
      </div>
    </div>
  );
}

function SlideAsk({ slide }: { slide: (typeof slidesData)[0] }) {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden font-[var(--font-montserrat)]">
      {/* Background - grid with diagonal slashes like slide 5/team */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#040e14]" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(75deg, transparent 0px, transparent 38px, rgba(0,150,160,0.3) 38px, rgba(0,150,160,0.3) 39.5px, transparent 39.5px, transparent 78px, rgba(45,212,191,0.22) 78px, rgba(45,212,191,0.22) 79.5px, transparent 79.5px, transparent 118px, rgba(0,130,140,0.25) 118px, rgba(0,130,140,0.25) 119.5px, transparent 119.5px, transparent 158px, rgba(12,200,190,0.18) 158px, rgba(12,200,190,0.18) 159.5px)",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,_rgba(10,55,55,0.4)_0%,_transparent_50%)]" />
      </div>

      {/* Content */}
      <div className="relative flex h-full flex-col justify-between px-[120px] py-[60px]">
        {/* Heading */}
        <div>
          <h3 className="mb-2 text-[28px] font-medium uppercase tracking-[0.2em] text-[#2dd4bf] drop-shadow-[0_0_8px_rgba(45,212,191,0.5)]">
            {slide.title}
          </h3>
        </div>

        {/* Main */}
        <div className="flex-1 flex flex-col justify-center rounded-2xl border border-[#2dd4bf]/10 bg-[#2dd4bf]/[0.08] px-10 py-8">
          {/* Big CTA headline with glow */}
          <div className="relative mb-10 text-center">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-[80px] w-[600px] rounded-full bg-[#2dd4bf]/[0.08] blur-[40px]" />
            </div>
            <h1 className="relative text-[52px] font-black text-white">
              Raising <span className="bg-gradient-to-r from-[#2dd4bf] to-[#0ea5e9] bg-clip-text text-transparent">$375K</span> on a <span className="bg-gradient-to-r from-[#2dd4bf] to-[#0ea5e9] bg-clip-text text-transparent">$7.5M</span> SAFE
            </h1>
          </div>

          {/* Use of Funds */}
          <h2 className="mb-6 text-[18px] font-bold uppercase tracking-[0.15em] text-[#2dd4bf]/60">Use of Funds</h2>
          <div className="flex gap-5 mb-10">
            {slide.funds?.map((fund, idx) => (
              <div key={idx} className="flex-1 rounded-2xl border border-[#2dd4bf]/20 bg-[#2dd4bf]/[0.08] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
                <div className="flex items-baseline justify-between mb-3">
                  <span className="text-[17px] font-bold text-[#2dd4bf]">{fund.label}</span>
                  <span className="text-[22px] font-black text-[#2dd4bf]/50">{fund.pct}</span>
                </div>
                <p className="text-[34px] font-black text-white mb-3 drop-shadow-[0_0_8px_rgba(45,212,191,0.22)]">{fund.amount}</p>
                <p className="text-[15px] text-white/50 leading-[1.7]">{fund.desc}</p>
                {/* Progress bar */}
                <div className="mt-4 h-[4px] w-full rounded-full bg-white/[0.06] overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-[#2dd4bf] to-[#0ea5e9]" style={{ width: fund.pct }} />
                </div>
              </div>
            ))}
          </div>

          {/* Milestones */}
          <h2 className="mb-5 text-[18px] font-bold uppercase tracking-[0.15em] text-[#2dd4bf]/60">Milestones This Round Funds</h2>
          <div className="flex flex-wrap gap-3">
            {slide.milestones?.map((m, idx) => (
              <div key={idx} className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#2dd4bf]/[0.1] to-[#0ea5e9]/[0.08] border border-[#2dd4bf]/20 px-5 py-3.5 shadow-[0_0_15px_rgba(45,212,191,0.06)]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2dd4bf" strokeWidth="3" className="shrink-0"><polyline points="20 6 9 17 4 12"/></svg>
                <span className="text-[16px] font-bold text-white/90 whitespace-nowrap">{m}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SlideOnboarding({ slide }: { slide: (typeof slidesData)[0] }) {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden font-[var(--font-montserrat)]">
      {/* Background - reversed diagonal stripes (45deg instead of 135deg) */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#040e14]" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(105deg, transparent 0px, transparent 38px, rgba(0,150,160,0.3) 38px, rgba(0,150,160,0.3) 39.5px, transparent 39.5px, transparent 78px, rgba(45,212,191,0.22) 78px, rgba(45,212,191,0.22) 79.5px, transparent 79.5px, transparent 118px, rgba(0,130,140,0.25) 118px, rgba(0,130,140,0.25) 119.5px, transparent 119.5px, transparent 158px, rgba(12,200,190,0.18) 158px, rgba(12,200,190,0.18) 159.5px)",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(10,50,50,0.6)_0%,_transparent_60%)]" />
      </div>

      {/* Content - left text, right phone */}
      <div className="relative flex h-full px-[80px] py-[50px]">
        {/* Left side - text (bigger) */}
        <div className="flex w-[58%] flex-col justify-center pr-10">
          <div className="rounded-2xl border border-[#2dd4bf]/10 bg-[#2dd4bf]/[0.08] px-10 py-8">
            {/* Heading */}
            <h3 className="mb-4 text-[28px] font-medium uppercase tracking-[0.2em] text-[#2dd4bf] drop-shadow-[0_0_8px_rgba(45,212,191,0.5)]">
              {slide.title}
            </h3>

            {/* Title */}
            <h1 className="mb-5 text-[48px] font-bold leading-tight text-white">
              {slide.subtitle}
            </h1>

            {/* Description */}
            <p className="mb-8 text-[24px] leading-relaxed text-white/60">
              {slide.content}
            </p>

            {/* Painless setup header */}
            <h2 className="mb-5 text-[22px] font-bold text-[#2dd4bf] border-b border-[#2dd4bf]/20 pb-3">
              Painless setup
            </h2>

            {/* Steps */}
            <ul className="space-y-3.5 mb-8">
              {slide.onboardingSteps?.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3 text-[20px] text-white/75">
                  <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded bg-[#2dd4bf]/15 text-[12px] font-bold text-[#2dd4bf]">
                    {idx + 1}
                  </span>
                  <RichText text={step} />
                </li>
              ))}
            </ul>

            {/* Footer */}
            {slide.footer && (
              <p className="text-[22px] font-semibold text-[#2dd4bf] border-t border-[#2dd4bf]/15 pt-5">
                {slide.footer}
              </p>
            )}
          </div>
        </div>

        {/* Right side - onboarding phone PNG */}
        <div className="flex w-[42%] items-center justify-center">
          <img src="/pics/olo-onboarding (1).png" alt="olo onboarding" className="h-[900px] object-contain" />
        </div>
      </div>
    </div>
  );
}

function SlideContent({ slide }: { slide: (typeof slidesData)[0] }) {
  if (slide.id === 1 || slide.id === 10) {
    return <SlideTitle slide={slide} />;
  }
  if (slide.id === 2) {
    return <SlideProblem slide={slide} />;
  }
  if (slide.id === 3) {
    return <SlideSolution slide={slide} />;
  }
  if (slide.id === 4) {
    return <SlideProblem2 slide={slide} />;
  }
  if (slide.id === 5) {
    return <SlideSolution2 slide={slide} />;
  }
  if (slide.id === 6) {
    return <SlideMeetOlo slide={slide} />;
  }
  if (slide.id === 11) {
    return <SlideOnboarding slide={slide} />;
  }
  if (slide.id === 12) {
    return <SlideAsk slide={slide} />;
  }
  if (slide.id === 7) {
    return <SlideMarket slide={slide} />;
  }
  if (slide.id === 8) {
    return <SlideBusinessModel slide={slide} />;
  }
  if (slide.id === 9) {
    return <SlideRoadmap slide={slide} />;
  }
  return <SlideBullets slide={slide} />;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function PitchDeck() {
  const [isExporting, setIsExporting] = useState(false);
  const [isExportingImages, setIsExportingImages] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(960);
  const slideRenderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setViewportWidth(window.innerWidth);
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDownloadImages = async () => {
    setIsExportingImages(true);
    try {
      const container = slideRenderRef.current;
      if (!container) return;

      for (let i = 0; i < slidesData.length; i++) {
        setCurrentSlide(i);
        // Wait for render
        await new Promise((r) => setTimeout(r, 500));

        const dataUrl = await toPng(container, {
          width: 1920,
          height: 1080,
          pixelRatio: 1,
        });

        const link = document.createElement("a");
        link.download = `slide-${i + 1}.png`;
        link.href = dataUrl;
        link.click();

        await new Promise((r) => setTimeout(r, 300));
      }
    } catch (error) {
      console.error("Error exporting images:", error);
    } finally {
      setIsExportingImages(false);
    }
  };

  const handleDownloadCurrentSlide = async () => {
    setIsExportingImages(true);
    try {
      const container = slideRenderRef.current;
      if (!container) return;

      // Wait for render
      await new Promise((r) => setTimeout(r, 500));

      const dataUrl = await toPng(container, {
        width: 1920,
        height: 1080,
        pixelRatio: 1,
      });

      const link = document.createElement("a");
      link.download = `slide-${currentSlide + 1}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Error exporting image:", error);
    } finally {
      setIsExportingImages(false);
    }
  };

  const handleDownloadPDF = async () => {
    setIsExporting(true);

    try {
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [1920, 1080],
      });

      // Create offscreen canvas
      const canvas = document.createElement("canvas");
      canvas.width = 1920;
      canvas.height = 1080;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Could not get canvas context");

      for (let i = 0; i < slidesData.length; i++) {
        // Draw slide to canvas
        drawSlideToCanvas(ctx, slidesData[i], slideGradients[i]);

        // Convert to image and add to PDF
        const imgData = canvas.toDataURL("image/jpeg", 0.95);

        if (i > 0) {
          pdf.addPage([1920, 1080], "landscape");
        }
        pdf.addImage(imgData, "JPEG", 0, 0, 1920, 1080);
      }

      pdf.save("pitch-deck.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header with controls */}
      <div className="sticky top-0 z-50 flex items-center justify-between border-b bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-gray-800">Pitch Deck</h1>
          <span className="text-sm text-gray-500">
            {slidesData.length} slides
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
              disabled={currentSlide === 0}
            >
              Previous
            </Button>
            <span className="min-w-[80px] text-center text-sm text-gray-600">
              {currentSlide + 1} / {slidesData.length}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentSlide(
                  Math.min(slidesData.length - 1, currentSlide + 1)
                )
              }
              disabled={currentSlide === slidesData.length - 1}
            >
              Next
            </Button>
          </div>
          <Button
            onClick={handleDownloadPDF}
            disabled={isExporting}
            className="gap-2"
          >
            {isExporting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Exporting...
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                Download PDF
              </>
            )}
          </Button>
          <Button
            onClick={handleDownloadImages}
            disabled={isExportingImages}
            variant="outline"
            className="gap-2"
          >
            {isExportingImages ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Exporting...
              </>
            ) : (
              <>
                <Image className="h-4 w-4" />
                Download All
              </>
            )}
          </Button>
          <Button
            onClick={handleDownloadCurrentSlide}
            disabled={isExportingImages}
            variant="outline"
            className="gap-2"
          >
            <Image className="h-4 w-4" />
            This Slide
          </Button>
        </div>
      </div>
      <div className="border-b bg-gray-50 px-6 py-4">
        <div className="flex gap-3 overflow-x-auto pb-2">
          {slidesData.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setCurrentSlide(idx)}
              className={`flex-shrink-0 rounded-lg border-2 p-1 transition-all ${
                currentSlide === idx
                  ? "border-blue-500 ring-2 ring-blue-200"
                  : "border-transparent hover:border-gray-300"
              }`}
            >
              <div
                className={`flex h-[54px] w-[96px] items-center justify-center rounded text-xs font-medium text-white ${slide.bgColor}`}
              >
                {idx + 1}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main slide preview area */}
      <div className="flex justify-center p-8">
        <div
          className="overflow-hidden rounded-lg shadow-2xl"
          style={{
            width: "min(90vw, 960px)",
            aspectRatio: "16/9",
          }}
        >
          {/* Scaled slide container */}
          <div
            style={{
              width: "1920px",
              height: "1080px",
              transform: `scale(${Math.min(0.9 * viewportWidth / 1920, 0.5)})`,
              transformOrigin: "top left",
            }}
          >
            <div
              className={`h-[1080px] w-[1920px] overflow-hidden ${slidesData[currentSlide].bgColor}`}
            >
              <SlideContent slide={slidesData[currentSlide]} />
            </div>
          </div>
        </div>
      </div>

      {/* Hidden full-size render target for image export */}
      <div className="fixed left-[-9999px] top-0">
        <div
          ref={slideRenderRef}
          style={{ width: "1920px", height: "1080px" }}
          className={`overflow-hidden ${slidesData[currentSlide].bgColor}`}
        >
          <SlideContent slide={slidesData[currentSlide]} />
        </div>
      </div>
    </div>
  );
}
