import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Helper to manually split text into chars for animation without SplitText plugin
const SplitChars = ({ children, className }) => {
  return (
    <span className={className} style={{ display: "inline-block" }}>
      {children.split("").map((char, i) => (
        <span
          key={i}
          className="char inline-block whitespace-pre"
          style={{ willChange: "transform" }}
        >
          {char}
        </span>
      ))}
    </span>
  );
};

const FlavorTitle = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // 1. First Text Animation
      gsap.from(".first-text-chars .char", {
        yPercent: 200,
        stagger: 0.02,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        },
      });

      // 2. Middle "POP" clip path reveal
      gsap.to(".pop-text-scroll", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 50%",
        },
      });

      // 3. Second Text Animation
      gsap.from(".second-text-chars .char", {
        yPercent: 200,
        stagger: 0.02,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 40%",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center lg:items-start justify-center gap-4 lg:gap-8 h-full py-10 lg:pl-20"
    >
      {/* 1. "Check out our" */}
      <div className="overflow-hidden">
        <h1 className="first-text-chars text-4xl md:text-6xl font-bold text-[#6B1F14] leading-none">
          <SplitChars>Check out our</SplitChars>
        </h1>
      </div>

      {/* 2. "POPPING" (Revealed) */}
      <div
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)", // Start hidden
        }}
        className="pop-text-scroll bg-[#6B1F14] px-6 py-2 transform -rotate-2"
      >
        <h2 className="text-[#FFF3E6] text-5xl md:text-7xl font-black uppercase tracking-widest">
          POPPING
        </h2>
      </div>

      {/* 3. "Flavors" */}
      <div className="overflow-hidden">
        <h1 className="second-text-chars text-4xl md:text-6xl font-bold text-[#6B1F14] leading-none mt-2">
          <SplitChars>flavors lineup.</SplitChars>
        </h1>
      </div>
    </div>
  );
};

export default FlavorTitle;
