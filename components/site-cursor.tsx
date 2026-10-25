'use client';

import { lazy, Suspense, useEffect, useState, useSyncExternalStore } from 'react';
import { usePathname } from 'next/navigation';

const GlowCursor = lazy(() => import('./glow-cursor'));
const media = '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)';
function subscribe(callback: () => void) {
  const query = window.matchMedia(media);
  query.addEventListener('change', callback);
  return () => query.removeEventListener('change', callback);
}
function snapshot() { return window.matchMedia(media).matches; }
function serverSnapshot() { return false; }

export default function SiteCursor() {
  const pathname = usePathname();
  const supported = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const [activated, setActivated] = useState(false);
  useEffect(() => {
    if (!supported || pathname.startsWith('/editor') || new URLSearchParams(location.search).has('__pao_preview')) return;
    const start = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
      setActivated(true);
      window.removeEventListener('pointermove', start);
    };
    window.addEventListener('pointermove', start, { passive: true });
    return () => window.removeEventListener('pointermove', start);
  }, [supported, pathname]);

  if (!supported || !activated || pathname.startsWith('/editor')) return null;
  return <div className="site-cursor-layer" aria-hidden="true">
    <Suspense fallback={null}><GlowCursor
      color="#73EDFF"
      secondaryColor="#1672FF"
      intensity={0.9}
      trailWidth={4}
      linger={0.7}
      glow={0.7}
      hotspot={0.35}
      followSpeed={0.75}
      grain={0}
      clickBurst={false}
      quality="low"
      maxDevicePixelRatio={0.75}
      blendMode="screen"
    /></Suspense>
  </div>;
}
