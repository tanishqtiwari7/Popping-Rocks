import React, { useState } from "react";
import Home from "./pages/Home";
import Loader from "./components/Loader";
import gsap from "gsap";
import { ScrollTrigger, ScrollSmoother } from "gsap/all";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function App() {
  const [loaderFinished, setLoaderFinished] = useState(false);

  useGSAP(() => {
    // Initialize smoother immediately so content is ready behind loader
    ScrollSmoother.create({
      smooth: 2,
      effects: true,
    });
  }, []);

  return (
    <>
      {/* Loader acts as an overlay. It unmounts only after its exit animation completes. */}
      {!loaderFinished && <Loader onComplete={() => setLoaderFinished(true)} />}

      {/* Content is always rendered underneath to prevent white flash */}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <Home />
        </div>
      </div>
    </>
  );
}

export default App;
