import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const stones = [
  { src: "/red.png", top: "15%", left: "20%", size: 120 },
  { src: "/green.png", top: "65%", left: "30%", size: 90 },
  { src: "/orange.png", top: "30%", left: "55%", size: 140 },
  { src: "/purple.png", top: "70%", left: "60%", size: 110 },
  { src: "/yellow.png", top: "20%", left: "75%", size: 100 },
  { src: "/brown.png", top: "50%", left: "85%", size: 130 },
];

const FooterSection = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;

      // Horizontal scroll for ALL screens
      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${track.scrollWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Floating parallax stones
      gsap.to(".footer-stone", {
        y: (i) => (i % 2 === 0 ? -60 : 60),
        rotation: (i) => (i % 2 === 0 ? 20 : -20),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${track.scrollWidth}`,
          scrub: 1,
        },
      });

      // Intro pop animation
      gsap.fromTo(
        ".footer-stone",
        {
          opacity: 0,
          scale: 0.5,
          y: 100,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          stagger: 0.2,
          ease: "back.out(1)",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-[#FFF3E6]"
    >
      {/* Horizontal Track */}
      <div ref={trackRef} className="flex flex-row w-[200vw] h-screen">

        {/* STONES PANEL */}
        <div className="relative w-screen h-screen shrink-0 overflow-x-visible">

          {stones.map((s, i) => (
            <img
              key={i}
              src={s.src}
              className="footer-stone absolute object-contain drop-shadow-xl select-none pointer-events-none"
              style={{
                top: s.top,
                left: s.left,
                width: `${s.size}px`,
                maxWidth: "30vw",
              }}
              draggable="false"
            />
          ))}

          {/* Billboard Text */}
          <h2 className="absolute inset-0 flex items-center justify-center text-[18vw] lg:text-[10rem] font-extrabold text-[#6B1F14] opacity-10 pointer-events-none select-none tracking-tight">
            KEEP POPPING
          </h2>
        </div>

        {/* FOOTER CONTENT PANEL */}
        <div className="w-screen h-screen flex items-center justify-center px-6 lg:px-20 shrink-0 bg-[#FFF3E6]">
          <div className="max-w-xl text-center lg:text-left">

            <h2 className="text-[#6B1F14] text-4xl lg:text-6xl font-extrabold mb-6">
              POPPING ROCKS
            </h2>

            <p className="text-[#6B1F14] text-lg lg:text-xl leading-relaxed opacity-80">
              Built to pop. Designed to move. A scroll-driven sugar experiment
              that refuses to end quietly.
            </p>

            <div className="mt-10 pt-6 border-t border-[#6B1F14]/20 flex flex-col items-center lg:items-start">
              <p className="font-bold text-[#6B1F14]">
                Made by{" "}
                <a
                  href="https://github.com/tanishqtiwari7"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                  Tanishq
                </a>
              </p>

              <p className="text-sm opacity-70">
                <a
                  href="https://teamzemo.tech"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                  @teamzemo
                </a>
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default FooterSection;
