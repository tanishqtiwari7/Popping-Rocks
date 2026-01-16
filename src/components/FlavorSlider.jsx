import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

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

const FlavorSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const bgRef = useRef(null);
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const circleRef = useRef(null);

  useGSAP(
    () => {
      // Initial entrance
      gsap.from(containerRef.current, { opacity: 0, duration: 1 });
    },
    { scope: containerRef }
  );

  const handleFlavorChange = (index) => {
    if (index === activeIndex) return;

    const newFlavor = flavors[index];
    const tl = gsap.timeline();

    // 1. Animate OUT old content
    tl.to(imageRef.current, {
      opacity: 0,
      y: -20,
      scale: 0.8,
      duration: 0.3,
      ease: "power2.in",
    })
      .to(titleRef.current, { opacity: 0, x: -50, duration: 0.2 }, "<")
      .to(circleRef.current, { scale: 0, duration: 0.3 }, "<");

    // 2. Change State (Colors/Images) - Using call to sync with animation
    tl.call(() => {
      setActiveIndex(index);
    });

    // 3. Animate IN new content
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

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex flex-col md:flex-row items-center justify-center p-4"
    >
      {/* Active Flavor Display area */}
      <div
        className="relative w-full md:w-[600px] h-[500px] rounded-[3rem] overflow-hidden shadow-2xl transition-colors duration-700 ease-in-out flex items-center justify-center"
        style={{ backgroundColor: flavors[activeIndex].bg }}
      >
        {/* Decorative Circle behind */}
        <div
          ref={circleRef}
          className="absolute w-[300px] h-[300px] rounded-full opacity-30 blur-2xl"
          style={{ backgroundColor: flavors[activeIndex].accent }}
        />

        <div className="relative z-10 flex flex-col items-center">
          <img
            ref={imageRef}
            src={flavors[activeIndex].img}
            alt={flavors[activeIndex].color}
            className="w-64 h-64 object-contain drop-shadow-xl"
          />
          <div ref={titleRef} className="mt-8 text-center">
            <h3
              className="text-4xl font-extrabold uppercase tracking-tighter"
              style={{ color: flavors[activeIndex].accent }}
            >
              {flavors[activeIndex].desc}
            </h3>
            <p
              className="font-bold opacity-60 uppercase tracking-widest mt-2"
              style={{ color: flavors[activeIndex].accent }}
            >
              {flavors[activeIndex].color} Edition
            </p>
          </div>
        </div>

        {/* Pagination / Controls inside card */}
        <div className="absolute bottom-6 left-0 w-full flex justify-center gap-3 z-20">
          {flavors.map((f, i) => (
            <button
              key={f.color}
              onClick={() => handleFlavorChange(i)}
              className={`w-4 h-4 rounded-full transition-all duration-300 border-2 border-white/50 ${
                i === activeIndex
                  ? "w-10 bg-white"
                  : "bg-transparent hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Small List Selector on Right (Desktop) or Bottom (Mobile) */}
      <div className="md:ml-8 mt-8 md:mt-0 flex md:flex-col gap-4 overflow-x-auto md:overflow-visible w-full md:w-auto pb-4 md:pb-0 scrollbar-hide">
        {flavors.map((f, i) => (
          <div
            key={f.color}
            onClick={() => handleFlavorChange(i)}
            className={`cursor-pointer group flex items-center gap-4 p-2 rounded-xl transition-all duration-300 ${
              i === activeIndex
                ? "bg-white/80 shadow-md scale-105"
                : "hover:scale-105 opacity-60 hover:opacity-100"
            }`}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center p-2"
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
