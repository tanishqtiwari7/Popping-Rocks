import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const flavors = [
  {
    color: "Red",
    bg: "#ffb3b3",
    accent: "#a80000",
    img: "/red.png",
    desc: "Strawberry Blast",
  },
  {
    color: "Green",
    bg: "#b3ffb3",
    accent: "#008000",
    img: "/green.png",
    desc: "Apple Zest",
  },
  {
    color: "Orange",
    bg: "#ffe0b3",
    accent: "#cc6600",
    img: "/orange.png",
    desc: "Citrus Punch",
  },
  {
    color: "Purple",
    bg: "#e0b3ff",
    accent: "#6600cc",
    img: "/purple.png",
    desc: "Grape Escape",
  },
  {
    color: "Yellow",
    bg: "#ffffb3",
    accent: "#cccc00",
    img: "/yellow.png",
    desc: "Lemon Spark",
  },
  {
    color: "Brown",
    bg: "#d9b3a6",
    accent: "#5c2b29",
    img: "/brown.png",
    desc: "Cola Fizz",
  },
];

const FlavorSlider = ({ activeFlavorIndex = 0, onFlavorChange }) => {
  // Local display state (may differ briefly from prop during animation)
  const [displayedIndex, setDisplayedIndex] = useState(activeFlavorIndex);

  // Refs
  const isAnimatingRef = useRef(false);
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const circleRef = useRef(null);

  // Initial Entrance
  useGSAP(
    () => {
      gsap.from(containerRef.current, { opacity: 0, duration: 1 });
    },
    { scope: containerRef }
  );

  // Sync with prop changes (e.g. from ScrollTrigger)
  useEffect(() => {
    if (activeFlavorIndex !== displayedIndex && !isAnimatingRef.current) {
      animateTransition(activeFlavorIndex);
    }
  }, [activeFlavorIndex]);

  const animateTransition = (newIndex) => {
    if (newIndex === displayedIndex || isAnimatingRef.current) return;

    isAnimatingRef.current = true;
    const tl = gsap.timeline({
      onComplete: () => {
        isAnimatingRef.current = false;
      },
    });

    // 1. Out
    tl.to(imageRef.current, {
      opacity: 0,
      y: -20,
      scale: 0.8,
      duration: 0.3,
      ease: "power2.in",
    })
      .to(titleRef.current, { opacity: 0, x: -50, duration: 0.2 }, "<")
      .to(circleRef.current, { scale: 0, duration: 0.3 }, "<");

    // 2. Swap Data
    tl.call(() => {
      setDisplayedIndex(newIndex);
    });

    // 3. In
    tl.to(imageRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.5,
      ease: "back.out(1.7)",
    })
      .to(titleRef.current, { opacity: 1, x: 0, duration: 0.4 }, "-=0.3")
      .to(circleRef.current, { scale: 1, duration: 0.5 }, "-=0.4");
  };

  const handleManualClick = (index) => {
    // If parent provided handler, use it. Otherwise loopback to local animation.
    if (onFlavorChange) {
      onFlavorChange(index);
    } else {
      animateTransition(index);
    }
  };

  // Safe data access
  const currentFlavor = flavors[displayedIndex] || flavors[0];

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex flex-col md:flex-row items-center justify-center p-4"
    >
      {/* Active Flavor Display */}
      <div
        className="relative w-full md:w-[600px] h-[500px] rounded-[3rem] overflow-hidden shadow-2xl flex items-center justify-center"
        style={{ backgroundColor: currentFlavor.bg }}
      >
        <div
          ref={circleRef}
          className="absolute w-[300px] h-[300px] rounded-full opacity-30 blur-2xl"
          style={{ backgroundColor: currentFlavor.accent }}
        />

        <div className="relative z-10 flex flex-col items-center">
          <img
            ref={imageRef}
            src={currentFlavor.img}
            className="w-64 h-64 object-contain drop-shadow-xl"
            draggable="false"
          />
          <div ref={titleRef} className="mt-8 text-center">
            <h3
              className="text-4xl font-extrabold uppercase tracking-tighter"
              style={{ color: currentFlavor.accent }}
            >
              {currentFlavor.desc}
            </h3>
            <p
              className="font-bold opacity-60 uppercase tracking-widest mt-2"
              style={{ color: currentFlavor.accent }}
            >
              {currentFlavor.color} Edition
            </p>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="absolute bottom-6 left-0 w-full flex justify-center gap-3 z-20">
          {flavors.map((_, i) => (
            <button
              key={i}
              onClick={() => handleManualClick(i)}
              className={`w-4 h-4 rounded-full transition-all border-2 border-white/50 ${
                i === displayedIndex ? "w-10 bg-white" : "hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Side Selector */}
      <div className="mt-6 md:mt-0 flex md:flex-col gap-3 md:gap-4 md:ml-8 overflow-x-auto md:overflow-visible px-2 md:px-0">
        {flavors.map((f, i) => (
          <div
            key={f.color}
            onClick={() => handleManualClick(i)}
            className={`cursor-pointer flex items-center gap-2 md:gap-4 p-2 rounded-xl transition-all ${
              i === displayedIndex
                ? "bg-white/80 shadow-md scale-105"
                : "opacity-60 hover:opacity-100 hover:scale-105"
            }`}
          >
            <div
              className="md:w-12 md:h-12 w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: f.bg }}
            >
              <img src={f.img} className="w-full h-full object-contain" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlavorSlider;
