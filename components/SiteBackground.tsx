"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type * as ThreeNamespace from "three";

type VantaEffect = {
  destroy: () => void;
  resize?: () => void;
};

type VantaNetFactory = (options: {
  el: HTMLElement;
  THREE: typeof ThreeNamespace;
  color: number;
  backgroundColor: number;
  points: number;
  maxDistance: number;
  spacing: number;
  showDots: boolean;
  mouseControls: boolean;
  touchControls: boolean;
  gyroControls: boolean;
  minHeight: number;
  minWidth: number;
}) => VantaEffect;

export function SiteBackground() {
  const netRef = useRef<HTMLDivElement>(null);
  const effectRef = useRef<VantaEffect | null>(null);
  const [canAnimate, setCanAnimate] = useState(false);

  const destroyNet = useCallback(() => {
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

    if (!canAnimate || !netRef.current) {
      destroyNet();
      return undefined;
    }

    startTimer = window.setTimeout(() => {
      Promise.all([import("three"), import("vanta/dist/vanta.net.min")])
        .then(([THREE, vantaModule]) => {
          if (cancelled || !netRef.current || effectRef.current) return;
          const createNet = (vantaModule.default ?? vantaModule) as VantaNetFactory;
          effectRef.current = createNet({
            el: netRef.current,
            THREE,
            color: 0x1c5f8f,
            backgroundColor: 0xf5f8fa,
            points: 8,
            maxDistance: 22,
            spacing: 18,
            showDots: true,
            mouseControls: false,
            touchControls: false,
            gyroControls: false,
            minHeight: 200,
            minWidth: 200,
          });
        })
        .catch(() => {
          destroyNet();
        });
    }, 180);

    return () => {
      cancelled = true;
      if (startTimer !== undefined) window.clearTimeout(startTimer);
      destroyNet();
    };
  }, [canAnimate, destroyNet]);

  return (
    <div className="site-background" aria-hidden="true">
      <div className="site-background-image" />
      <div ref={netRef} className="site-background-net" />
    </div>
  );
}
