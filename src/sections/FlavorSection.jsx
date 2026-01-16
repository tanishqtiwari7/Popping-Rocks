import React from "react";
import FlavorTitle from "../components/FlavorTitle";
import FlavorSlider from "../components/FlavorSlider";

const FlavorSection = () => {
  return (
    <section className="relative w-full min-h-screen bg-[#FFF8F0] overflow-hidden">
      <div
        className="
          container mx-auto h-full flex flex-col lg:flex-row items-center  justify-center gap-12 lg:gap-10 py-20"
      >
        {/* LEFT: Title */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-center">
          <FlavorTitle />
        </div>

        {/* RIGHT: Slider */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <FlavorSlider />
        </div>
      </div>
    </section>
  );
};

export default FlavorSection;
