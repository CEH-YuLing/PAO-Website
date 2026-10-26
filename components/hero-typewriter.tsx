'use client';

import { useEffect, useRef } from 'react';
import { useContentValue } from '@/components/site-content';

function TypedText({ text, start, speed, gradient = false }: { text: string; start: number; speed: number; gradient?: boolean }) {
  let index = 0;
  return text.normalize('NFC').split(/(\s+)/).map((word, wordIndex) => <span className={/^\s+$/.test(word) ? 'typing-space' : 'typing-word'} key={wordIndex}>{Array.from(word).map(char => {
    const position = index++;
    return <span className={`typing-char${gradient ? ' text-gradient' : ''}`} key={position} data-typing-at={start + position * speed} style={{ visibility: 'hidden' }}>{char}</span>;
  })}</span>);
}

export default function HeroTypewriter() {
  const prefix = useContentValue('trang-chu.copy.2');
  const brand = useContentValue('trang-chu.copy.3');
  const tagline = useContentValue('trang-chu.copy.4');
  const ending = useContentValue('trang-chu.copy.5');
  const titleLength = Array.from((prefix + brand).normalize('NFC')).length;
  const subtitleStart = 200 + titleLength * 75 + 250;
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const characters = Array.from(container.current?.querySelectorAll<HTMLElement>('[data-typing-at]') ?? []);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      characters.forEach(character => { character.style.visibility = 'visible'; });
      return;
    }
    const started = performance.now();
    let index = 0;
    let timer: number;
    // Reveal only newly typed characters, without rebuilding all spans every 35 ms.
    const tick = () => {
      const elapsed = performance.now() - started;
      while (index < characters.length && Number(characters[index].dataset.typingAt) <= elapsed) {
        characters[index++].style.visibility = 'visible';
      }
      if (index < characters.length) timer = window.setTimeout(tick, Math.max(1, Number(characters[index].dataset.typingAt) - elapsed));
    };
    tick();
    return () => window.clearTimeout(timer);
  }, [prefix, brand, tagline, ending, subtitleStart]);
  return <div ref={container} className="hero-typing" key={prefix + brand + tagline + ending}>
    <h1 id="hero-title" aria-label={prefix + brand}><span aria-hidden="true"><span data-edit-field="trang-chu.copy.2"><TypedText text={prefix} start={200} speed={75}/></span><span data-edit-field="trang-chu.copy.3"><TypedText text={brand} start={200 + Array.from(prefix.normalize('NFC')).length * 75} speed={75} gradient/></span></span></h1>
    <p className="hero-tagline"><span className="typing-accessible">{tagline + ending}</span><span aria-hidden="true"><span data-edit-field="trang-chu.copy.4"><TypedText text={tagline} start={subtitleStart} speed={42}/></span><span data-edit-field="trang-chu.copy.5"><TypedText text={ending} start={subtitleStart + Array.from(tagline.normalize('NFC')).length * 42} speed={42}/></span></span></p>
  </div>;
}
