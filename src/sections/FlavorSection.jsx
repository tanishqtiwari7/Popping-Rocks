import React from "react";
import FlavorTitle from "../components/FlavorTitle";
import FlavorSlider from "../components/FlavorSlider";

const FlavorSection = () => {
  return (
    <section className="flavor-section relative w-full min-h-screen bg-[#FFF8F0] overflow-hidden">
      <div className="container mx-auto h-full flex flex-col items-center justify-center py-20 relative">
        {/* Title Area */}
        <div className="w-full mb-10">
          <FlavorTitle />
        </div>

        {/* Slider Area */}
        <div className="w-full flex-1 flex items-center justify-center min-h-[600px]">
          <FlavorSlider />
        </div>
      </div>
    </section>
  );
};

export default FlavorSection;
