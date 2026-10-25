'use client';
import {useT} from './site-language';

import { useState } from 'react';
import { Pause, Play } from 'lucide-react';
import LogoLoop from './logo-loop';

const words = [
  'Lập kế hoạch', 'Sáng tạo', 'Học hỏi', 'Tự động hoá',
  'Theo dõi', 'Kết nối', 'Bảo vệ', 'Đơn giản hoá',
  'Cá nhân hoá', 'Phối hợp', 'Tổ chức', 'Phát triển',
];

export default function TextMarqueeBand() {
  const t=useT();
  const items=words.map(word=>({node:<span className="marquee-word">{t(word)}</span>}));
  const [paused, setPaused] = useState(false);
  return <div className="logo-band text-marquee-band"><div className="logo-band-inner">
    <LogoLoop
      logos={items}
      speed={paused ? 0 : 55}
      hoverSpeed={0}
      direction="left"
      logoHeight={20}
      gap={56}
      layout="line"
      fadeOut
      fadeOutWidth={0.06}
      draggable
      ariaLabel={t("Dòng chữ chuyển động về năng lực PAO")}
      className="text-marquee-loop"
    />
    <button className="logo-band-pause" aria-label={paused ? t("Tiếp tục dòng chữ") : t("Tạm dừng dòng chữ")} aria-pressed={paused} title={paused ? t("Tiếp tục dòng chữ") : t("Tạm dừng dòng chữ")} onClick={() => setPaused(!paused)}>{paused ? <Play size={14} /> : <Pause size={14} />}</button>
  </div></div>;
}