'use client';

import {useT} from './site-language';
import CrystalMemory from './crystal-memory';
import DetailedAgentMap from './detailed-agent-map';
import { useContentCollection } from './site-content';

import { Grip, Minus, Move, Plus, RotateCcw } from 'lucide-react';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { graphNodes as baseGraphNodes } from '@/lib/content';
import { FeatureIcon } from './icons';

export function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let disposed = false;
    let cancelAnimation: (() => void) | undefined;
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      observer.disconnect();
      void import('motion/mini').then(({ animate }) => {
        if (disposed || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const controls = animate(element, { opacity: [0, 1], transform: ['translateY(14px)', 'translateY(0px)'] }, { duration: .5, delay, ease: 'easeOut' });
        cancelAnimation = () => controls.stop();
      });
    }, { rootMargin: '0px 0px -30px 0px' });
    observer.observe(element);
    return () => { disposed = true; observer.disconnect(); cancelAnimation?.(); };
  }, [delay]);
  return <div ref={ref} className={className}>{children}</div>;
}

export { default as Navbar } from './site-header';

export function AgentTeam() { return <DetailedAgentMap />; }

export function KnowledgeGraph() {
  const t=useT();
  const graphNodes = useContentCollection('graphNodes', baseGraphNodes);
  const [selected, setSelected] = useState('knowledge');
  const [zoom, setZoom] = useState(1);
  const [panEnabled, setPanEnabled] = useState(false);
  const [resetKey,setResetKey]=useState(0);
  const node = graphNodes.find(n => n.id === selected) ?? graphNodes[3];
  const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
  function reset() { setZoom(1);setResetKey(k=>k+1); }
  return <div className="graph-widget"><div className="graph-top"><span><span className="status-dot" />PAO KNOWLEDGE GRAPH <small>{t("NGỮ CẢNH DOANH NGHIỆP")}</small></span><div className="graph-controls"><button aria-label={t("Thu nhỏ sơ đồ")} onClick={() => setZoom(z => clamp(z - .2, .6, 1.8))} disabled={zoom <= .61}><Minus size={16} /></button><output aria-label={t("Mức phóng to")}>{Math.round(zoom * 100)}%</output><button aria-label={t("Phóng to sơ đồ")} onClick={() => setZoom(z => clamp(z + .2, .6, 1.8))} disabled={zoom >= 1.79}><Plus size={16} /></button><button aria-label={t("Đặt lại góc nhìn")} onClick={reset}><RotateCcw size={15} /></button><button className={panEnabled ? 'active' : ''} aria-label={panEnabled ? t("Tắt kéo sơ đồ") : t("Bật kéo sơ đồ")} aria-pressed={panEnabled} onClick={() => setPanEnabled(!panEnabled)}><Move size={16} /></button></div></div><div className="graph-body"><div className={`graph-canvas ${panEnabled ? 'can-pan' : ''}`}><CrystalMemory key={resetKey} nodes={graphNodes} selected={selected} onSelect={setSelected} zoom={zoom} panEnabled={panEnabled}/><span className="graph-hint"><Grip size={12} />{panEnabled ? t("Kéo nền để di chuyển sơ đồ") : t("Chọn một nút để khám phá")}</span></div><aside className="graph-detail" aria-live="polite"><span className="eyebrow">{t("KẾT NỐI NGỮ CẢNH")}</span><span className="icon-box"><FeatureIcon name={['projects', 'tasks', 'agents', 'knowledge', 'customers', 'marketing', 'operations', 'reports'].indexOf(selected) === 3 ? 'brain' : 'network'} /></span><h3>{node.title}</h3><p data-edit-field={`graphNodes.${graphNodes.indexOf(node)}.detail`}>{node.detail}</p><div className="graph-detail-connection"><span className="status-dot" />{t("Kết nối với PAO")}</div><small>{t("Khám phá những nhóm tri thức và mối liên hệ trong công việc.")}</small></aside></div><div className="graph-node-picker" aria-label={t("Chọn nhóm tri thức")}>{graphNodes.map(n => <button key={n.id} aria-pressed={selected === n.id} onClick={() => setSelected(n.id)}>{n.title}</button>)}</div></div>;
}
