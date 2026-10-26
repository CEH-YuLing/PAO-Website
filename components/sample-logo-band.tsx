'use client';

import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { Pause, Play } from 'lucide-react';
import { useT } from './site-language';

const words = ['Lập kế hoạch', 'Sáng tạo', 'Học hỏi', 'Tự động hoá', 'Theo dõi', 'Kết nối', 'Bảo vệ', 'Đơn giản hoá', 'Cá nhân hoá', 'Phối hợp', 'Tổ chức', 'Phát triển'];

export default function TextMarqueeBand() {
  const t = useT();
  const [paused, setPaused] = useState(false), [dragging, setDragging] = useState(false);
  const track = useRef<HTMLDivElement>(null), group = useRef<HTMLUListElement>(null);
  const offset = useRef(0), drag = useRef<{ x: number; offset: number; width: number } | null>(null);
  useEffect(() => {
    const list = group.current, row = track.current;
    if (!list || !row) return;
    let width = 0;
    const measure = () => {
      const next = list.getBoundingClientRect().width;
      if (!next || next === width) return;
      width = next;
      row.style.setProperty('--marquee-period', `${width}px`);
      row.style.setProperty('--marquee-duration', `${width / 55}s`);
      row.dataset.ready = 'true';
    };
    const observer = new ResizeObserver(measure);
    observer.observe(list); measure();
    return () => observer.disconnect();
  }, []);
  function down(event: PointerEvent<HTMLDivElement>) {
    if (event.button !== 0 || !group.current) return;
    drag.current = { x: event.clientX, offset: offset.current, width: group.current.getBoundingClientRect().width };
    event.currentTarget.setPointerCapture(event.pointerId); setDragging(true);
  }
  function move(event: PointerEvent<HTMLDivElement>) {
    const current = drag.current;
    if (!current || !current.width) return;
    offset.current = (current.offset + event.clientX - current.x) % current.width;
    track.current?.style.setProperty('--marquee-shift', `${offset.current}px`);
  }
  function up() { drag.current = null; setDragging(false); }
  return <div className="logo-band text-marquee-band"><div className="logo-band-inner">
    <div className="text-marquee-viewport" role="group" aria-label={t('Dòng chữ chuyển động về năng lực PAO')} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}>
      <div ref={track} className="text-marquee-track" data-paused={paused || dragging}>
        {Array.from({ length: 4 }, (_, copy) => <ul ref={copy === 0 ? group : undefined} className="text-marquee-group" key={copy} aria-hidden={copy !== 0 ? true : undefined}>{words.map(word => <li key={word}><span className="marquee-word">{t(word)}</span></li>)}</ul>)}
      </div>
    </div>
    <button className="logo-band-pause" aria-label={paused ? t('Tiếp tục dòng chữ') : t('Tạm dừng dòng chữ')} aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? <Play size={14}/> : <Pause size={14}/>}</button>
  </div></div>;
}
