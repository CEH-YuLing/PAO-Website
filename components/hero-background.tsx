'use client';

import { lazy, Suspense, useEffect, useState, useSyncExternalStore } from 'react';

import { useContentValue } from './site-content';

const GhostFibers = lazy(() => import('./ghost-fibers'));

function subscribeViewport(callback: () => void) {
  const query = window.matchMedia('(max-width: 767px)');
  query.addEventListener('change', callback);
  return () => query.removeEventListener('change', callback);
}
function isCompact() { return window.matchMedia('(max-width: 767px)').matches; }
function subscribeMotion(callback: () => void) {
  const query = window.matchMedia('(prefers-reduced-motion: reduce)');
  query.addEventListener('change', callback);
  return () => query.removeEventListener('change', callback);
}
function isReduced() { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; }
function serverSnapshot() { return false; }

export default function HeroBackground() {
  const mode = useContentValue("background.mode");
  const speed = Number(useContentValue("background.speed"));
  const opacity = Number(useContentValue("background.opacity"));
  const glow = useContentValue("background.glow");
  const line = useContentValue("background.line");
  const secondary = useContentValue("background.secondary");
  const compact = useSyncExternalStore(subscribeViewport, isCompact, serverSnapshot);
  const reduced = useSyncExternalStore(subscribeMotion, isReduced, serverSnapshot);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Keep the initial content and mascot ahead of decorative GPU work.
    const timeout = window.setTimeout(() => setReady(true), 1400);
    return () => window.clearTimeout(timeout);
  }, []);

  return <div className="hero-ghost-background" style={{ opacity: compact ? Math.min(opacity, 0.5) : opacity }} aria-hidden="true" data-motion={reduced ? 'reduced' : 'enabled'} data-quality={compact ? 'mobile' : 'desktop'}>
    {ready && !reduced && !compact && mode === "ghost" && <Suspense fallback={null}><GhostFibers
      glowColor={glow}
      lineColor={line}
      secondaryColor={secondary}
      gradient="across"
      speed={speed}
      scale={1.15}
      rotation={18}
      rollSpeed={0.08}
      layers={compact ? 1 : 2}
      threads={compact ? 12 : 30}
      density={compact ? 0.25 : 0.4}
      fiberStyle="lines"
      volume={0.65}
      spread={1.15}
      thickness={compact ? 0.9 : 1}
      waves={1.1}
      twist={1.15}
      flow={0.18}
      depthOfField={0.65}
      particles={compact ? 0 : 0.12}
      sparkle={0.15}
      glow={compact ? 0 : 0.4}
      brightness={0.8}
      vignette={0.55}
      grain={0.015}
      mouseInteraction={!compact}
      hoverEffect="focus"
      mouseStrength={0.35}
      pulseOnClick={false}
      intro={false}
      dpr={compact ? 0.55 : 0.85}
    /></Suspense>}
  </div>;
}
