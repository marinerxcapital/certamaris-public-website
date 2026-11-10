"use client";

import { useEffect, useRef, useState } from "react";

const VIDEO_SRC = "/videos/certamaris-hero-demo.mp4";
const POSTER_SRC = "/videos/certamaris-hero-poster.jpg";
const VIDEO_IDLE_TIMEOUT_MS = 1200;

/**
 * Autoplaying product media for the homepage hero.
 *
 * The video is intentionally a showcase surface rather than a player: it has
 * no controls, audio track, or interaction affordance. A poster keeps the
 * frame stable while the browser fetches the small, fast-start MP4.
 */
export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoEnabled, setVideoEnabled] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const saveData = Boolean(
      (navigator as Navigator & { connection?: { saveData?: boolean } })
        .connection?.saveData,
    );
    let idleId: number | undefined;
    let timeoutId: number | undefined;

    const enableVideo = () => {
      if (!reducedMotion.matches && !saveData) setVideoEnabled(true);
    };

    const scheduleVideo = () => {
      if (reducedMotion.matches || saveData) return;
      const requestIdle = (
        window as Window & {
          requestIdleCallback?: (
            callback: () => void,
            options?: { timeout: number },
          ) => number;
        }
      ).requestIdleCallback;
      if (requestIdle) {
        idleId = requestIdle(enableVideo, {
          timeout: VIDEO_IDLE_TIMEOUT_MS,
        });
      } else {
        timeoutId = window.setTimeout(enableVideo, VIDEO_IDLE_TIMEOUT_MS);
      }
    };

    const onMotionPreferenceChange = () => {
      if (reducedMotion.matches) {
        setVideoEnabled(false);
      } else {
        scheduleVideo();
      }
    };

    scheduleVideo();
    reducedMotion.addEventListener("change", onMotionPreferenceChange);
    return () => {
      reducedMotion.removeEventListener("change", onMotionPreferenceChange);
      const cancelIdle = (
        window as Window & {
          cancelIdleCallback?: (id: number) => void;
        }
      ).cancelIdleCallback;
      if (idleId !== undefined && cancelIdle) {
        cancelIdle(idleId);
      }
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoEnabled) return;
    void video.play().catch(() => {
      // Autoplay can still be blocked by a browser policy; the poster is the
      // intentional fallback and keeps the hero usable.
    });
  }, [videoEnabled]);

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
      <div className="hero-video-stage">
        <img
          className="hero-video-poster"
          src={POSTER_SRC}
          alt=""
          width={1600}
          height={900}
          fetchPriority="high"
          decoding="async"
        />
        {videoEnabled ? (
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
        ) : null}
      </div>
      <figcaption className="sr-only">
        CertaMaris platform demonstration showing maritime cyber readiness
        across a vessel fleet.
      </figcaption>
    </figure>
  );
}
