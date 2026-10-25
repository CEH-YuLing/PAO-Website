'use client';

import { useEffect, useState } from 'react';
import { useContentValue } from '@/components/site-content';

function TypedText({ text, start, speed, elapsed, gradient = false }: { text: string; start: number; speed: number; elapsed: number; gradient?: boolean }) {
  let index = 0;
  return text.normalize('NFC').split(/(\s+)/).map((word, wordIndex) => <span className={/^\s+$/.test(word) ? 'typing-space' : 'typing-word'} key={wordIndex}>{Array.from(word).map(char => {
    const position = index++;
    const visible = elapsed >= start + position * speed;
    return <span className={`typing-char${gradient ? ' text-gradient' : ''}`} key={position} style={{ visibility: visible ? 'visible' : 'hidden' }}>{char}</span>;
  })}</span>);
}

export default function HeroTypewriter() {
  const prefix = useContentValue('trang-chu.copy.2');
  const brand = useContentValue('trang-chu.copy.3');
  const tagline = useContentValue('trang-chu.copy.4');
  const ending = useContentValue('trang-chu.copy.5');
  const titleLength = Array.from((prefix + brand).normalize('NFC')).length;
  const subtitleStart = 200 + titleLength * 75 + 250;
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const ready = window.setTimeout(() => setElapsed(Infinity), 0);
      return () => window.clearTimeout(ready);
    }
    const started = performance.now();
    const total = subtitleStart + Array.from((tagline + ending).normalize('NFC')).length * 42 + 100;
    const timer = window.setInterval(() => {
      const now = performance.now() - started;
      setElapsed(now >= total ? Infinity : now);
      if (now >= total) window.clearInterval(timer);
    }, 35);
    return () => window.clearInterval(timer);
  }, [prefix, brand, tagline, ending, subtitleStart]);
  return <div className="hero-typing" key={prefix + brand + tagline + ending}>
    <h1 id="hero-title" aria-label={prefix + brand}><span aria-hidden="true"><span data-edit-field="trang-chu.copy.2"><TypedText text={prefix} start={200} speed={75} elapsed={elapsed}/></span><span data-edit-field="trang-chu.copy.3"><TypedText text={brand} start={200 + Array.from(prefix.normalize('NFC')).length * 75} speed={75} elapsed={elapsed} gradient/></span></span></h1>
    <p className="hero-tagline"><span className="typing-accessible">{tagline + ending}</span><span aria-hidden="true"><span data-edit-field="trang-chu.copy.4"><TypedText text={tagline} start={subtitleStart} speed={42} elapsed={elapsed}/></span><span data-edit-field="trang-chu.copy.5"><TypedText text={ending} start={subtitleStart + Array.from(tagline.normalize('NFC')).length * 42} speed={42} elapsed={elapsed}/></span></span></p>
  </div>;
}
