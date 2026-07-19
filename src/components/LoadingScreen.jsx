import React, { useEffect, useState } from "react";
import { Dumbbell } from "lucide-react";

/**
 * Shows once per page load, then fades out. Respects reduced-motion users
 * by skipping straight to the content.
 */
export default function LoadingScreen({ onDone, minDuration = 1400 }) {
  const [fading, setFading] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const total = prefersReducedMotion ? 0 : minDuration;

    const fadeTimer = window.setTimeout(() => setFading(true), total);
    const hideTimer = window.setTimeout(() => {
      setHidden(true);
      onDone && onDone();
    }, total + (prefersReducedMotion ? 0 : 500));

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(hideTimer);
    };
  }, [minDuration, onDone]);

  if (hidden) return null;

  return (
    <div className={`loading-screen${fading ? " fade-out" : ""}`} role="status" aria-live="polite">
      <div className="loading-badge">
        <Dumbbell size={26} color="#000" strokeWidth={2.5} />
      </div>
      <div className="display loading-word">
        IRON<span>EDGE</span>
      </div>
      <div className="loading-caption">Loading...</div>
      <div className="loading-bar"><span /></div>
    </div>
  );
}
