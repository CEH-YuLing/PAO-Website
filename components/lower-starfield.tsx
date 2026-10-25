'use client';

import { useEffect, useRef } from 'react';

type Star = { x: number; y: number; z: number; phase: number; size: number; tint: number };

// Original Canvas 2D starfield. No React Bits Pro source, shaders or assets are used.
export default function LowerStarfield() {
  const layerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const layer = layerRef.current;
    const canvas = canvasRef.current;
    const boundary = document.querySelector('.logo-band');
    const surface = layer?.closest('.home-surface');
    const context = canvas?.getContext('2d', { alpha: true });
    if (!layer || !canvas || !context || !boundary || !surface) return;
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const touch = matchMedia('(pointer: coarse)');
    const preview = new URLSearchParams(location.search).has('__pao_preview');
    let width = 0;
    let height = 0;
    let ratio = 1;
    let stars: Star[] = [];
    let reduced = motion.matches;
    let compact = touch.matches || preview;
    let visible = false;
    let disposed = false;
    let raf = 0;
    let scrollRaf = 0;
    let last = 0;
    let time = 0;
    let seed = 82413;
    const random = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
    const status = (value: string) => { if (layer.dataset.starfieldState !== value) layer.dataset.starfieldState = value; };
    function reset(star: Star, initial = false) {
      star.x = (random() * 2 - 1) * width / Math.max(height, 1);
      star.y = random() * 2 - 1;
      star.z = initial ? 0.18 + random() * 1.9 : 1.6 + random() * 0.4;
      star.phase = random() * Math.PI * 2;
      star.size = 0.35 + random() * 0.6;
      star.tint = random();
    }
    function paint(dt: number) {
      if (!context) return;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, width, height);
      const focal = height * 0.6;
      const cx = width * 0.5 + Math.sin(time * 0.1) * width * 0.012;
      const cy = height * 0.47 + Math.cos(time * 0.08) * height * 0.012;
      for (const star of stars) {
        const previousZ = star.z;
        star.z -= dt * 0.11;
        if (star.z < 0.12) { reset(star); continue; }
        const x = cx + star.x * focal / star.z;
        const y = cy + star.y * focal / star.z;
        if (x < -20 || x > width + 20 || y < -20 || y > height + 20) { if (star.z < 0.9) reset(star); continue; }
        const twinkle = 0.66 + Math.sin(time * 1.05 + star.phase) * 0.34;
        const depth = Math.min(1, 1 / (star.z * 1.25));
        const alpha = (0.17 + depth * 0.52) * twinkle;
        const size = Math.min(1.75, star.size / star.z);
        const rgb = star.tint > 0.6 ? '194,232,255' : star.tint > 0.25 ? '114,195,255' : '230,242,255';
        context.fillStyle = `rgba(${rgb},${alpha})`;
        context.beginPath();
        context.arc(x, y, Math.max(0.35, size), 0, Math.PI * 2);
        context.fill();
        if (star.tint > 0.84 && depth > 0.65) {
          context.strokeStyle = `rgba(${rgb},${alpha * 0.35})`;
          context.lineWidth = 0.65;
          context.beginPath();
          context.moveTo(x - size * 3.3, y); context.lineTo(x + size * 3.3, y);
          context.moveTo(x, y - size * 3.3); context.lineTo(x, y + size * 3.3);
          context.stroke();
        }
        if (dt > 0 && star.z < 0.65) {
          const px = cx + star.x * focal / previousZ;
          const py = cy + star.y * focal / previousZ;
          context.strokeStyle = `rgba(${rgb},${alpha * 0.38})`;
          context.lineWidth = Math.max(0.4, size * 0.55);
          context.beginPath();context.moveTo(px, py);context.lineTo(x, y);context.stroke();
        }
      }
    }
    function frame(now: number) {
      raf = 0;
      if (disposed || !visible || document.hidden) return;
      if (reduced) { paint(0); status('static'); return; }
      const interval = 1000 / (compact ? 16 : 24);
      if (last && now - last < interval) { raf = requestAnimationFrame(frame); return; }
      const dt = last ? Math.min((now - last) / 1000, 0.08) : 0;
      last = now;
      time += dt;
      paint(dt);
      status('running');
      raf = requestAnimationFrame(frame);
    }
    function wake() { if (!raf && visible && !disposed && !document.hidden) raf = requestAnimationFrame(frame); }
    function syncBoundary() {
      scrollRaf = 0;
      if (!layer || !boundary) return;
      const top = Math.max(0, Math.min(height, boundary.getBoundingClientRect().bottom));
      layer.style.setProperty('--lower-bg-clip', `${Math.round(top)}px`);
      const next = top < height;
      if (next !== visible) { visible = next; last = 0; }
      if (!visible || document.hidden) { cancelAnimationFrame(raf); raf = 0; status(document.hidden ? 'paused' : 'above-boundary'); }
      else wake();
    }
    function resize() {
      if (!canvas || !layer) return;
      const nextWidth = document.documentElement.clientWidth;
      const nextHeight = window.innerHeight;
      const wanted = compact ? 110 : 250;
      if (nextWidth !== width || nextHeight !== height || stars.length !== wanted) {
        width = Math.max(1, nextWidth);height = Math.max(1, nextHeight);
        ratio = Math.min(devicePixelRatio || 1, compact ? 0.7 : 0.85, 1280 / Math.max(width, height));
        canvas.width = Math.max(1, Math.round(width * ratio));canvas.height = Math.max(1, Math.round(height * ratio));
        seed = 82413;
        stars = Array.from({length:wanted},()=>{const star = {} as Star;reset(star,true);return star;});
        layer.dataset.starCount = String(wanted);
        last = 0;paint(0);
      }
      syncBoundary();
    }
    const onScroll = () => { if (!scrollRaf) scrollRaf = requestAnimationFrame(syncBoundary); };
    const onMedia = () => {
      reduced = motion.matches;compact = touch.matches || preview;
      cancelAnimationFrame(raf);raf = 0;last = 0;resize();
    };
    const onVisibility = () => { last = 0;syncBoundary(); };
    const observer = new ResizeObserver(resize);
    observer.observe(boundary);observer.observe(surface);
    window.addEventListener('scroll',onScroll,{passive:true});
    window.addEventListener('resize',resize,{passive:true});
    document.addEventListener('visibilitychange',onVisibility);
    motion.addEventListener('change',onMedia);touch.addEventListener('change',onMedia);
    resize();
    return () => {
      disposed = true;cancelAnimationFrame(raf);cancelAnimationFrame(scrollRaf);observer.disconnect();
      window.removeEventListener('scroll',onScroll);window.removeEventListener('resize',resize);
      document.removeEventListener('visibilitychange',onVisibility);
      motion.removeEventListener('change',onMedia);touch.removeEventListener('change',onMedia);
    };
  }, []);
  return <div ref={layerRef} className="lower-page-background" aria-hidden="true"><canvas ref={canvasRef} /></div>;
}
