import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const RevealText = ({
  lines = [],
  className = "",
  stagger = 0.15,
}) => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const items = containerRef.current.querySelectorAll(".reveal-line");

    gsap.fromTo(
      items,
      {
        opacity: 0,
        y: 32,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          once: true, // 🔥 VERY IMPORTANT
        },
      }
    );
  }, []);

  return (
    <div ref={containerRef} className={className}>
      {lines.map((line, i) => (
        <div
          key={i}
          className="reveal-line mb-3 last:mb-0 will-change-transform"
        >
          {line}
        </div>
      ))}
    </div>
  );
};

export default RevealText;
