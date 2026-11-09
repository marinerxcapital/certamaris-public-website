"use client";

import { useEffect, useRef } from "react";

const VIDEO_SRC = "/videos/certamaris-hero-demo.mp4";
const POSTER_SRC = "/videos/certamaris-hero-poster.jpg";

/**
 * Autoplaying product media for the homepage hero.
 *
 * The video is intentionally a showcase surface rather than a player: it has
 * no controls, audio track, or interaction affordance. A poster keeps the
 * frame stable while the browser fetches the small, fast-start MP4.
 */
export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotionPreference = () => {
      if (reducedMotion.matches) {
        video.pause();
        video.currentTime = 0;
      } else if (video.paused) {
        void video.play().catch(() => {
          // Autoplay can still be blocked by a browser policy; the poster is
          // the intentional fallback and keeps the hero usable.
        });
      }
    };

    syncMotionPreference();
    reducedMotion.addEventListener("change", syncMotionPreference);
    return () =>
      reducedMotion.removeEventListener("change", syncMotionPreference);
  }, []);

  return (
    <figure className="hero-video-frame">
      <div className="hero-video-chrome" aria-hidden="true">
        <span className="hero-video-status" />
        <span>PRODUCT DEMO</span>
        <span className="hero-video-divider" />
        <span className="hero-video-platform">CertaMaris Platform</span>
        <span className="hero-video-context">
          Maritime cyber readiness in action
        </span>
      </div>
      <video
        ref={videoRef}
        className="hero-video"
        src={VIDEO_SRC}
        poster={POSTER_SRC}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        disablePictureInPicture
        controls={false}
        controlsList="nodownload noplaybackrate noremoteplayback"
        aria-label="CertaMaris maritime cyber readiness product demonstration"
      />
      <figcaption className="sr-only">
        CertaMaris platform demonstration showing maritime cyber readiness
        across a vessel fleet.
      </figcaption>
    </figure>
  );
}
