"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Silk = dynamic(() => import("./Silk"), {
  ssr: false,
  loading: () => null,
});

type NavigatorWithConnection = Navigator & {
  connection?: {
    saveData?: boolean;
  };
};

export function SiteBackground() {
  const [canAnimate, setCanAnimate] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compactViewport = window.matchMedia("(max-width: 767px)");
    const lowCoreDevice = typeof navigator.hardwareConcurrency === "number" && navigator.hardwareConcurrency <= 2;
    const savesData = Boolean((navigator as NavigatorWithConnection).connection?.saveData);

    const syncAnimationState = () => {
      setCanAnimate(
        !reducedMotion.matches &&
          !compactViewport.matches &&
          !lowCoreDevice &&
          !savesData &&
          document.visibilityState === "visible"
      );
    };

    syncAnimationState();
    reducedMotion.addEventListener("change", syncAnimationState);
    compactViewport.addEventListener("change", syncAnimationState);
    document.addEventListener("visibilitychange", syncAnimationState);

    return () => {
      reducedMotion.removeEventListener("change", syncAnimationState);
      compactViewport.removeEventListener("change", syncAnimationState);
      document.removeEventListener("visibilitychange", syncAnimationState);
    };
  }, []);

  return (
    <div className="site-background" aria-hidden="true">
      <div className="site-background-image" />
      {canAnimate ? (
        <div className="site-background-silk">
          <Silk speed={6.2} scale={1} color="#0149FD" noiseIntensity={0.45} rotation={0} />
        </div>
      ) : null}
    </div>
  );
}
