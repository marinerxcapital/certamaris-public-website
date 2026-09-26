"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

/**
 * Landing-page hero media. Derived from the owner-supplied vessel footage by
 * `scripts/media/build-hero-media.ps1`; do not hand-edit the files in
 * public/media/.
 *
 * Load discipline:
 *  - The server render is the poster still only, so first paint and the LCP
 *    candidate are a ~57 KB WebP. The loop is attached after hydration and never
 *    blocks first render.
 *  - Skipped entirely (poster stays) for prefers-reduced-motion, Save-Data, an
 *    effective 2G connection, or a rejected autoplay. The poster is a deliberate
 *    complete state, not a fallback defect.
 *  - Always muted, looping, inline, and without native controls.
 */

const DESKTOP_SRC = "/media/certamaris-vessel-hero-2026-09.mp4";
const MOBILE_SRC = "/media/certamaris-vessel-hero-2026-09-mobile.mp4";
const POSTER_WEBP = "/media/certamaris-vessel-hero-2026-09-poster.webp";
const POSTER_JPG = "/media/certamaris-vessel-hero-2026-09-poster.jpg";

const MOBILE_QUERY = "(max-width: 767px)";

type NetworkInformation = {
  saveData?: boolean;
  effectiveType?: string;
};

export function HeroVesselFilm() {
  const reduced = usePrefersReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (reduced) {
      setSrc(null);
      return;
    }
    const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
    if (connection?.saveData) return;
    if (typeof connection?.effectiveType === "string" && /(^|-)2g$/.test(connection.effectiveType)) {
      return;
    }
    setSrc(window.matchMedia(MOBILE_QUERY).matches ? MOBILE_SRC : DESKTOP_SRC);
  }, [reduced]);

  useEffect(() => {
    if (!src) return;
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    const attempt = video.play();
    if (attempt && typeof attempt.then === "function") {
      attempt.catch(() => setPlaying(false));
    }
  }, [src]);

  const handlePlaying = useCallback(() => setPlaying(true), []);
  const handleError = useCallback(() => setPlaying(false), []);

  return (
    <div className="hero-film" data-live={playing ? "true" : "false"}>
      <img
        className="hero-film__poster"
        src={POSTER_WEBP}
        alt=""
        width={1280}
        height={720}
        decoding="async"
        fetchPriority="high"
      />
      {src ? (
        <video
          ref={videoRef}
          className="hero-film__video"
          poster={POSTER_JPG}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          disablePictureInPicture
          tabIndex={-1}
          aria-hidden="true"
          onPlaying={handlePlaying}
          onError={handleError}
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : null}
      <span className="hero-film__scrim" aria-hidden="true" />
    </div>
  );
}
