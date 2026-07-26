"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Full-bleed hero background video (CertaMaris "fog" atmosphere plate).
 * - Autoplays muted, looped, playsinline.
 * - Renders the static poster only when the user has prefers-reduced-motion,
 *   on very slow connections (saveData), or before the video is ready.
 * - Never blocks text/CTA rendering: this component is purely decorative
 *   and marked aria-hidden.
 */
export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [allowMotion, setAllowMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const saveData = Boolean(connection?.saveData);
    setAllowMotion(!media.matches && !saveData);

    const handleChange = (event: MediaQueryListEvent) => setAllowMotion(!event.matches && !saveData);
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (allowMotion && videoRef.current) {
      videoRef.current.play().catch(() => {
        /* Autoplay can be blocked by the browser; the poster remains visible. */
      });
    }
  }, [allowMotion]);

  return (
    <div className="hero-video-frame" aria-hidden="true">
      <img
        src="/video/hero-fog-poster.webp"
        alt=""
        className="hero-video-poster"
        style={{ opacity: allowMotion ? 0 : 1 }}
      />
      {allowMotion && (
        <video
          ref={videoRef}
          className="hero-video-el"
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          poster="/video/hero-fog-poster.webp"
        >
          <source src="/video/hero-fog.webm" type="video/webm" />
          <source src="/video/hero-fog.mp4" type="video/mp4" />
        </video>
      )}
      <div className="hero-glow" />
      <div className="hero-video-scrim" />
    </div>
  );
}
