import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import RevealText from "../components/RevealText";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const QuoteSection = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 50%",
      end: "+=100%",

      scrub: true,
      anticipatePin: 0.2,
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden md:mt-60 md:mb-20 bg-[#FFF3E6]"
    >
      <RevealText
        lines={["Sugar that doesn’t whisper.", "It hits.", "It explodes."]}
        className="
          text-center font-extrabold tracking-tight leading-tight
          text-[#6B1F14]
          text-[2.4rem] md:text-[3.8rem] lg:text-[5.2rem]
          max-w-[90%]
        "
      />
    </section>
  );
};

export default QuoteSection;
