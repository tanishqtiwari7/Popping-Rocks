import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ProductSection = () => {
  const sectionRef = useRef(null);

  const ingredients = [
    { name: "Sugar Crystals", quantity: "8g" },
    { name: "Carbon Dioxide", quantity: "2g" },
    { name: "Lactose", quantity: "1.5g" },
    { name: "Flavor Base", quantity: "0.8g" },
  ];

  useGSAP(
    () => {
      gsap.from(".product-reveal", {
        y: 80,
        opacity: 0,
        duration: 1.1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
        },
      });

      gsap.to(".floating-packet", {
        y: -15,
        rotation: 1,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

    //   gsap.utils.toArray(".floating-rock").forEach((rock, i) => {
    //     gsap.to(rock, {
    //       y: "random(-30, 30)",
    //       x: "random(-15, 15)",
    //       rotation: "random(-120, 120)",
    //       duration: "random(4, 6)",
    //       repeat: -1,
    //       yoyo: true,
    //       ease: "sine.inOut",
    //       delay: i * 0.3,
    //     });
    //   });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="
        relative min-h-screen w-full
        flex flex-col justify-between
        bg-gradient-to-b from-[#E7A1A1] to-[#cf8282]
        overflow-hidden
        py-16 md:py-24
      "
    >
      {/* Soft background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-white/10 blur-[120px] rounded-full" />
      </div>

      {/* Main content */}
      <div className="container mx-auto px-6 flex-1 flex flex-col md:flex-row items-center gap-16 relative z-20">
        {/* Text */}
        <div className="flex-1 text-center md:text-left product-reveal md:ml-15">
          <h2 className="text-[#6B1F14] text-5xl md:text-7xl font-black leading-[0.95] mb-6">
            TASTE
            <br />
            THE
            <br />
            EXPLOSION
          </h2>
          <p className="text-[#6B1F14]/80 text-lg md:text-xl font-semibold max-w-md mx-auto md:mx-0 leading-relaxed">
            The classic popping sensation that rocks your world. Feel the fizz.
            Hear the pop.
          </p>
        </div>

        <div className="flex-1 flex justify-center md:justify-end relative product-reveal min-h-[420px]">


          {/* Packet */}
          <div className="relative z-20 floating-packet md:mr-20">
            <img
              src="/candy_packet.png"
              alt="Candy Packet"
              className="w-[250px] md:w-[300px] object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.2)] "
            />
          </div>
        </div>
      </div>

      {/* Ingredients bar */}
      <div className="w-full flex justify-center relative z-30 product-reveal px-4">
        <div className="    backdrop-blur-md bg-white/25  border border-white/40  rounded-xl  px-6 py-4 md:px-10   shadow-lg  flex flex-wrap gap-6 md:gap-10   items-center justify-center  max-w-5xl ">
          <span className="hidden md:block text-[#6B1F14]/70 font-black uppercase tracking-widest text-xs pr-6 border-r border-[#6B1F14]/30">
            INGREDIENTS
          </span>

          {ingredients.map((ing, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-[#6B1F14] font-extrabold text-lg md:text-xl">
                {ing.quantity}
              </span>
              <span className="text-[#6B1F14]/70 font-semibold text-[11px] uppercase tracking-tight">
                {ing.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
