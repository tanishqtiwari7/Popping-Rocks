import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const candies = [
  { color: "Red", img: "/red.png" },
  { color: "Green", img: "/green.png" },
  { color: "Yellow", img: "/yellow.png" },
  { color: "Orange", img: "/orange.png" },
  { color: "Purple", img: "/purple.png" },
  { color: "Brown", img: "/brown.png" },
];

const Hero = () => {
  const containerRef = useRef(null);
  const ringRef = useRef(null);
  const revolutionTween = useRef(null);

  const selfSpinRefs = useRef([]);
  const hoverSpinRefs = useRef([]);

  const speed = useRef({ value: 1 });
  const isTextHovering = useRef(false);
  const isCandyAnimating = useRef(false);
  const decayTween = useRef(null);

  // GSAP-dependent sizing (kept intentionally)
  const vw = typeof window !== "undefined" ? window.innerWidth : 1200;
  const isLaptopUp = vw >= 1024;

  const ringSize = Math.min(vw * 0.85, 520);
  const radius = ringSize * (isLaptopUp ? 0.75 : 0.72);
  const candySize = Math.min(vw * 0.3, isLaptopUp ? 155 : 170);

  useGSAP(
    () => {
      revolutionTween.current = gsap.to(ringRef.current, {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none",
      });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          if (isTextHovering.current || isCandyAnimating.current) return;

          const velocity = Math.abs(self.getVelocity());
          const boostedSpeed = gsap.utils.clamp(1, 20, 1 + velocity / 100);

          if (decayTween.current) decayTween.current.kill();

          gsap.to(speed.current, {
            value: boostedSpeed,
            duration: 0.15,
            ease: "power2.out",
            overwrite: true,
          });

          decayTween.current = gsap.to(speed.current, {
            value: 1,
            duration: 1.2,
            ease: "power2.out",
            delay: 0.1,
          });
        },
      });

      gsap.ticker.add(() => {
        revolutionTween.current.timeScale(speed.current.value);
      });

      selfSpinRefs.current.forEach((el) => {
        if (!el) return;
        gsap.to(el, {
          rotation: 360,
          duration: 30,
          repeat: -1,
          ease: "none",
        });
      });
    },
    { scope: containerRef }
  );

  const handleCandyEnter = (index) => {
    isCandyAnimating.current = true;
    if (decayTween.current) decayTween.current.kill();

    gsap.to(hoverSpinRefs.current[index], {
      rotation: "+=360",
      duration: 0.6,
      ease: "power2.inOut",
      overwrite: "auto",
      onStart: () => {
        gsap.to(speed.current, {
          value: 5,
          duration: 0.2,
          ease: "power2.out",
        });
      },
      onComplete: () => {
        isCandyAnimating.current = false;
        decayTween.current = gsap.to(speed.current, {
          value: 1,
          duration: 1,
          ease: "power2.out",
        });
      },
    });
  };

  const handleTitleEnter = () => {
    isTextHovering.current = true;
    if (decayTween.current) decayTween.current.kill();

    gsap.to(speed.current, {
      value: 6.5,
      duration: 0.8,
      ease: "power2.out",
    });
  };

  const handleTitleLeave = () => {
    isTextHovering.current = false;
    decayTween.current = gsap.to(speed.current, {
      value: 1,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen flex items-center justify-center overflow-visible"
      style={{ backgroundColor: "#FFF3E6" }}
    >
      {/* Center Text */}
      <h1
        onMouseEnter={handleTitleEnter}
        onMouseLeave={handleTitleLeave}
        className="
          absolute font-extrabold text-center leading-none z-20 select-none
          text-[5rem]
          sm:text-[6rem]
          md:text-[6.5rem]
          lg:text-[7.5rem]
        "
        style={{
          color: "#6B1F14",
          textShadow: "0px 3px 1px #3E120C",
          cursor: "crosshair",
          whiteSpace: isLaptopUp ? "nowrap" : "normal",
        }}
      >
        <>
          POPPING
          <br />
          ROCKS
        </>
      </h1>

      {/* Candy Ring */}
      <div
        ref={ringRef}
        className="relative z-10"
        style={{ width: ringSize, height: ringSize }}
      >
        {candies.map((candy, index) => {
          const angle = (index / candies.length) * Math.PI * 2;

          return (
            <div
              key={candy.color}
              className="absolute cursor-pointer"
              style={{
                width: candySize,
                height: candySize,
                left: "50%",
                top: "50%",
                transform: `translate(-50%, -50%) translate(${Math.cos(angle) * radius}px, ${Math.sin(angle) * radius}px)`,
              }}
              onMouseEnter={() => handleCandyEnter(index)}
            >
              <div ref={(el) => (selfSpinRefs.current[index] = el)}>
                <div ref={(el) => (hoverSpinRefs.current[index] = el)}>
                  <img
                    src={candy.img}
                    alt={candy.color}
                    className="w-full h-full object-contain select-none"
                    draggable="false"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Hero;
