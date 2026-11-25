"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./EditorialHome.module.css";

const motionKey = "cm.homepage.vessel-motion";
const mobileMedia = "(max-width: 700px)";

export function HomeVessel({ children }: { children: ReactNode }) {
  const frame = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const inView = useRef(false);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setReduced(preference.matches);
    syncPreference();
    preference.addEventListener("change", syncPreference);
    try {
      setPaused(localStorage.getItem(motionKey) === "paused");
    } catch {
      // Motion controls also work with storage disabled.
    }
    return () => preference.removeEventListener("change", syncPreference);
  }, []);

  useEffect(() => {
    const media = video.current;
    const target = frame.current;
    if (!media || !target || paused || reduced || !available) return;

    let ready = document.readyState === "complete";
    let startFrame = 0;
    function sync() {
      if (!media) return;
      if (!inView.current || document.hidden) {
        media.pause();
        return;
      }
      if (!ready) return;

      cancelAnimationFrame(startFrame);
      startFrame = requestAnimationFrame(() => {
        if (!inView.current || document.hidden) return;
        if (!media.hasAttribute("src")) {
          const size = matchMedia(mobileMedia).matches ? "-mobile" : "";
          media.src = `/homepage-motion/bridge-daylight-loop${size}.mp4`;
        }
        media.play().catch(() => {
          // A rejected autoplay request leaves the still and manual control available.
        });
      });
    }
    function afterLoad() {
      ready = true;
      sync();
    }
    const observer = new IntersectionObserver(([entry]) => {
      inView.current = entry.isIntersecting && entry.intersectionRatio >= 0.1;
      sync();
    }, { threshold: 0.1 });
    observer.observe(target);
    window.addEventListener("load", afterLoad, { once: true });
    document.addEventListener("visibilitychange", sync);

    return () => {
      inView.current = false;
      observer.disconnect();
      window.removeEventListener("load", afterLoad);
      document.removeEventListener("visibilitychange", sync);
      cancelAnimationFrame(startFrame);
      media.pause();
    };
  }, [paused, reduced, available]);

  function toggleMotion() {
    const media = video.current;
    if (!media) return;
    const next = !paused && (playing || !media.paused);
    setPaused(next);
    try {
      localStorage.setItem(motionKey, next ? "paused" : "running");
    } catch {
      // The current page keeps the visitor’s choice.
    }
    if (next) {
      media.pause();
    } else {
      // Keep the user gesture when autoplay is blocked.
      if (!media.hasAttribute("src")) {
        const size = matchMedia(mobileMedia).matches ? "-mobile" : "";
        media.src = `/homepage-motion/bridge-daylight-loop${size}.mp4`;
      }
      media.play().catch(() => {});
    }
  }

  return (
    <>
      <div ref={frame} className={styles.media} aria-hidden="true">
        <picture>
          <source media={mobileMedia} srcSet="/homepage-motion/bridge-daylight-mobile.webp" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/homepage-motion/bridge-daylight.webp" alt="" width={1536} height={1024} fetchPriority="high" />
        </picture>
        <video
          ref={video}
          muted
          loop
          playsInline
          preload="none"
          tabIndex={-1}
          data-playing={playing && !reduced}
          onPlaying={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onError={() => {
            setPlaying(false);
            setAvailable(false);
          }}
        />
      </div>
      <div
        className={styles.heroContent}
        data-home-motion={paused || reduced ? "paused" : "running"}
      >
        {children}
        <div className={`${styles.shell} ${styles.heroControls}`}>
          {available && !reduced && (
            <button type="button" className={styles.motionControl} onClick={toggleMotion}>
              <span aria-hidden="true">{playing ? "Ⅱ" : "▷"}</span>
              {playing ? "Pause motion" : "Resume motion"}
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export function HomeActionPanel({ children }: { children: ReactNode }) {
  const panel = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  return (
    <>
      <button
        ref={trigger}
        type="button"
        className={styles.inspect}
        aria-haspopup="dialog"
        aria-controls="home-action-panel"
        onClick={() => panel.current?.showModal()}
      >
        Why is this still open? <span aria-hidden="true">+</span>
      </button>
      <dialog
        ref={panel}
        id="home-action-panel"
        className={styles.panel}
        aria-labelledby="home-record-title"
        onClose={() => trigger.current?.focus({ preventScroll: true })}
      >
        <div className={styles.panelInner}>
          <div className={styles.panelBar}>
            <span className={styles.demo}>Demo data</span>
            <button type="button" className={styles.close} aria-label="Close record" onClick={() => panel.current?.close()}>
              <span aria-hidden="true">×</span>
            </button>
          </div>
          {children}
        </div>
      </dialog>
    </>
  );
}
