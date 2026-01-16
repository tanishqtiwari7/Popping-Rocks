import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import RevealText from "../components/RevealText";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const QuoteSection = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(() => {
    gsap.to(contentRef.current, {
      scale: 0.82,
      opacity: 0,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=90%",
        pin: true,
        pinSpacing: false,
        scrub: true,
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative h-screen w-full
        flex items-center justify-center
        md:mt-32 lg:mt-60
        overflow-hidden
        bg-[#FFF3E6]
      "
    >
      <div ref={contentRef} className="w-full flex justify-center">
        <RevealText
          lines={["Sugar that doesn’t whisper.", "It hits.", "It explodes."]}
          className="
            text-center font-extrabold tracking-tight leading-tight text-[#6B1F14] text-[2.4rem] md:text-[3.8rem] lg:text-[5.2rem] max-w-[90%] "
        />
      </div>
    </section>
  );
};

export default QuoteSection;
