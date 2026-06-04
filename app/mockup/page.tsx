"use client";

import { useRef } from "react";
import OloAppMockup from "@/components/olo-app-mockup";

export default function MockupPage() {
  const phone1Ref = useRef<HTMLDivElement>(null);
  const phone2Ref = useRef<HTMLDivElement>(null);

  async function handleDownload(ref: React.RefObject<HTMLDivElement | null>, filename: string) {
    const { toPng } = await import("html-to-image");
    if (!ref.current) return;
    const dataUrl = await toPng(ref.current, {
      backgroundColor: "transparent",
      pixelRatio: 3,
    });
    const link = document.createElement("a");
    link.download = filename;
    link.href = dataUrl;
    link.click();
  }

  return (
    <div className="min-h-screen bg-transparent flex flex-col items-center py-[40px]">
      <div className="fixed top-4 right-4 z-50 flex gap-[8px]">
        <button
          onClick={() => handleDownload(phone1Ref, "olo-admin.png")}
          className="rounded-[10px] bg-[#2dd4bf] px-[16px] py-[10px] text-[13px] font-semibold text-[#060e10] hover:bg-[#5eead4] transition-colors"
        >
          Save Admin
        </button>
        <button
          onClick={() => handleDownload(phone2Ref, "olo-onboarding.png")}
          className="rounded-[10px] bg-[#2dd4bf] px-[16px] py-[10px] text-[13px] font-semibold text-[#060e10] hover:bg-[#5eead4] transition-colors"
        >
          Save Onboarding
        </button>
      </div>
      <OloAppMockup phone1Ref={phone1Ref} phone2Ref={phone2Ref} />
    </div>
  );
}
