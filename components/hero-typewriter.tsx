'use client';

import type { CSSProperties } from 'react';
import { useContentValue } from '@/components/site-content';

function TypedText({ text, start, speed, gradient = false }: { text: string; start: number; speed: number; gradient?: boolean }) {
  let index = 0;
  return text.normalize('NFC').split(/(\s+)/).map((word, wordIndex) => <span className={/^\s+$/.test(word) ? 'typing-space' : 'typing-word'} key={wordIndex}>{Array.from(word).map(char => {
    const position = index++;
    return <span className={`typing-char${gradient ? ' text-gradient' : ''}`} key={position} style={{ '--char-delay': `${start + position * speed}ms` } as CSSProperties}>{char}</span>;
  })}</span>);
}

export default function HeroTypewriter() {
  const prefix = useContentValue('trang-chu.copy.2');
  const brand = useContentValue('trang-chu.copy.3');
  const tagline = useContentValue('trang-chu.copy.4');
  const ending = useContentValue('trang-chu.copy.5');
  // Bound the full sequence in every locale; CSS starts before hydration.
  const titleLength = Array.from((prefix + brand).normalize('NFC')).length;
  const titleSpeed = Math.min(24, 300 / Math.max(titleLength, 1));
  const subtitleLength = Array.from((tagline + ending).normalize('NFC')).length;
  const subtitleSpeed = Math.min(11, 550 / Math.max(subtitleLength, 1));
  const subtitleStart = 40 + titleLength * titleSpeed + 80;
  return <div className="hero-typing" key={prefix + brand + tagline + ending}>
    <h1 id="hero-title" aria-label={prefix + brand}><span aria-hidden="true"><span data-edit-field="trang-chu.copy.2"><TypedText text={prefix} start={40} speed={titleSpeed}/></span><span data-edit-field="trang-chu.copy.3"><TypedText text={brand} start={40 + Array.from(prefix.normalize('NFC')).length * titleSpeed} speed={titleSpeed} gradient/></span></span></h1>
    <p className="hero-tagline"><span className="typing-accessible">{tagline + ending}</span><span aria-hidden="true"><span data-edit-field="trang-chu.copy.4"><TypedText text={tagline} start={subtitleStart} speed={subtitleSpeed}/></span><span data-edit-field="trang-chu.copy.5"><TypedText text={ending} start={subtitleStart + Array.from(tagline.normalize('NFC')).length * subtitleSpeed} speed={subtitleSpeed}/></span></span></p>
  </div>;
}
