"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type * as ThreeNamespace from "three";

type VantaEffect = {
  destroy: () => void;
  resize?: () => void;
};

type VantaFogFactory = (options: {
  el: HTMLElement;
  THREE: typeof ThreeNamespace;
  highlightColor: number;
  midtoneColor: number;
  lowlightColor: number;
  baseColor: number;
  blurFactor: number;
  speed: number;
  zoom: number;
  mouseControls: boolean;
  touchControls: boolean;
  gyroControls: boolean;
  minHeight: number;
  minWidth: number;
}) => VantaEffect;

export function SiteBackground() {
  const fogRef = useRef<HTMLDivElement>(null);
  const effectRef = useRef<VantaEffect | null>(null);
  const [canAnimate, setCanAnimate] = useState(false);

  const destroyFog = useCallback(() => {
    effectRef.current?.destroy();
    effectRef.current = null;
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compactViewport = window.matchMedia("(max-width: 767px)");

    const syncAnimationState = () => {
      setCanAnimate(!reducedMotion.matches && !compactViewport.matches && document.visibilityState === "visible");
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

  useEffect(() => {
    let cancelled = false;
    let startTimer: number | undefined;

    if (!canAnimate || !fogRef.current) {
      destroyFog();
      return undefined;
    }

    startTimer = window.setTimeout(() => {
      Promise.all([import("three"), import("vanta/dist/vanta.fog.min")])
        .then(([THREE, vantaModule]) => {
          if (cancelled || !fogRef.current || effectRef.current) return;
          const createFog = (vantaModule.default ?? vantaModule) as VantaFogFactory;
          effectRef.current = createFog({
            el: fogRef.current,
            THREE,
            highlightColor: 0xeaf2f8,
            midtoneColor: 0xcfe0ed,
            lowlightColor: 0xa8c4da,
            baseColor: 0xf5f8fa,
            blurFactor: 0.62,
            speed: 0.55,
            zoom: 0.85,
            mouseControls: false,
            touchControls: false,
            gyroControls: false,
            minHeight: 200,
            minWidth: 200,
          });
        })
        .catch(() => {
          destroyFog();
        });
    }, 180);

    return () => {
      cancelled = true;
      if (startTimer !== undefined) window.clearTimeout(startTimer);
      destroyFog();
    };
  }, [canAnimate, destroyFog]);

  return (
    <div className="site-background" aria-hidden="true">
      <div className="site-background-image" />
      <div ref={fogRef} className="site-background-fog" />
    </div>
  );
}
