"use client";
import { useEffect, useState } from "react";

export function EditorialMotion() {
  const [paused, setPaused] = useState(true);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setReduced(query.matches);
      let preference: string | null = null;
      try {
        preference = localStorage.getItem("cm.editorial.motion");
      } catch {
        /* Storage may be disabled. */
      }
      setPaused(query.matches || preference === "paused");
    };
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);
  return (
    <>
      <div
        className="cm-decoration"
        aria-hidden="true"
        data-motion={paused ? "paused" : "running"}
      >
        {[0, 1, 2, 3, 4].map((n) => (
          <span key={n} className={`cm-block cm-block-${n}`} />
        ))}
      </div>
      <button
        className="cm-motion-control"
        type="button"
        disabled={reduced}
        onClick={() => {
          const next = !paused;
          setPaused(next);
          try {
            localStorage.setItem(
              "cm.editorial.motion",
              next ? "paused" : "running",
            );
          } catch {
            /* Preference remains in memory. */
          }
        }}
      >
        {reduced ? "Reduced motion" : paused ? "Resume motion" : "Pause motion"}
      </button>
    </>
  );
}
