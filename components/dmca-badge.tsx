'use client';

import {useEffect,useRef,useState} from 'react';
import Script from 'next/script';

const status='https://www.dmca.com/Protection/Status.aspx?ID=efc009b7-5a66-4722-ae89-90125f5330eb';
const badge='https://images.dmca.com/Badges/dmca-badge-w250-5x1-07.png?ID=efc009b7-5a66-4722-ae89-90125f5330eb';

export default function DmcaBadge(){
  const anchor=useRef<HTMLAnchorElement>(null);
  const [visible,setVisible]=useState(false);
  useEffect(()=>{
    const node=anchor.current;
    if(!node)return;
    // Load the third-party helper only near the footer, after initial content.
    const observer=new IntersectionObserver(entries=>{
      if(entries.some(entry=>entry.isIntersecting)){setVisible(true);observer.disconnect();}
    },{rootMargin:'200px'});
    observer.observe(node);
    return ()=>observer.disconnect();
  },[]);
  return <>
    <a ref={anchor} href={status} title="DMCA.com Protection Status" className="dmca-badge pao-dmca-badge" target="_blank" rel="noopener noreferrer">
      {/* DMCA hosts this fixed-size external badge; no image optimizer is needed. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={badge} alt="DMCA.com Protection Status" width={125} height={25} loading="lazy" decoding="async"/>
    </a>
    {visible&&<Script id="dmca-badge-helper" src="https://images.dmca.com/Badges/DMCABadgeHelper.min.js" strategy="lazyOnload"/>}
  </>;
}
