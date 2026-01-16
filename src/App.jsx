import React from "react";
import Home from "./pages/Home";
import gsap from "gsap";
import { ScrollTrigger, ScrollSmoother } from "gsap/all";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
function App() {
  useGSAP(() => {
    ScrollSmoother.create({
      smooth: 2,
      effects: true,
    });
  });

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <Home />
      </div>
    </div>
  );
}

export default App;
