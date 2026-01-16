import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const RevealText = ({ lines = [], className = "" }) => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const words = containerRef.current.querySelectorAll(".reveal-word");

    gsap.fromTo(
      words,
      { opacity: 0.25 },
      {
        opacity: 1,
        stagger: 0.15,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 65%",
          end: "top 25%",
          scrub: true,
        },
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={className}>
      {lines.map((line, i) => (
        <div key={i} className="mb-4 last:mb-0">
          {line.split(" ").map((word, w) => (
            <span
              key={w}
              className="reveal-word inline-block mr-[0.35em] opacity-25"
            >
              {word}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

export default RevealText;
