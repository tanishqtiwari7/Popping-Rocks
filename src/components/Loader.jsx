import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const stones = [
  "/red.png",
  "/green.png",
  "/orange.png",
  "/purple.png",
  "/yellow.png",
  "/brown.png",
];

const Loader = ({ onComplete }) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        onComplete: onComplete,
      });

      // 1. Stones Drop In (0.0s - 1.0s)
      tl.from(".loader-stone", {
        y: -150,
        opacity: 0,
        scale: 0.5,
        duration: 0.8,
        stagger: 0.1,
        ease: "bounce.out",
      });

      // 2. Float/Rotate (1.0s - 2.0s)
      tl.to(".loader-stone", {
        rotation: 360,
        y: -20,
        duration: 0.6,
        ease: "power1.inOut",
        stagger: {
          each: 0.05,
          yoyo: true,
          repeat: 1,
        },
      });

      // 3. Text Reveal (1.5s)
      tl.from(
        textRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.5,
        },
        "<"
      );



      tl.to(containerRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 0.8,
        ease: "expo.inOut",
        delay: 0.2,
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-[#6B1F14] flex flex-col items-center justify-center overflow-hidden"
      style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
    >
      <div className="flex items-center justify-center gap-2 md:gap-6 mb-8">
        {stones.map((src, i) => (
          <img
            key={i}
            src={src}
            className="loader-stone w-12 h-12 md:w-20 md:h-20 object-contain drop-shadow-2xl"
            alt="loading-stone"
          />
        ))}
      </div>

      <div className="overflow-hidden">
        <h2
          ref={textRef}
          className="text-[#FFF3E6] text-xl md:text-3xl font-black tracking-[0.2em] uppercase"
        >
          Getting Ready to Pop...
        </h2>
      </div>
    </div>
  );
};

export default Loader;
