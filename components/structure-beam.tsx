'use client';

/* Animated gradient technique adapted from UI Layouts Animated Beam.
 * https://github.com/ui-layouts/uilayouts/blob/main/apps/ui-layout/components/ui/animated-beam.tsx
 * Copyright (c) 2024 UI LAYOUT — MIT. License: /third-party-notices/ui-layouts.txt.
 * PAO uses existing SVG coordinates and native SVG animation, without a motion runtime.
 */
import {useId} from 'react';

type Props={from:{x:number;y:number};to:{x:number;y:number};d?:string;color?:string;width?:number;opacity?:number;duration?:number;phase?:number;active?:boolean};
export default function StructureBeam({from,to,d,color='#44d4ff',width=1.4,opacity=.5,duration=3.6,phase=0,active=false}:Props){
 const id='pao-beam-'+useId().replace(/:/g,'');
 const dx=to.x-from.x,dy=to.y-from.y,path=d??`M${from.x} ${from.y} L${to.x} ${to.y}`;
 return <g className="structure-beam" aria-hidden="true" pointerEvents="none">
  <path d={path} fill="none" stroke={color} strokeWidth={width} strokeOpacity={opacity} strokeLinecap="round"/>
  <path className="structure-beam-light" d={path} fill="none" stroke={`url(#${id})`} strokeWidth={active?width*2.6:width*2.1} strokeLinecap="round"/>
  <defs><linearGradient id={id} gradientUnits="userSpaceOnUse" x1={from.x-dx*.55} y1={from.y-dy*.55} x2={from.x} y2={from.y}>
   <stop offset="0%" stopColor={color} stopOpacity="0"/><stop offset="30%" stopColor={color} stopOpacity=".5"/><stop offset="68%" stopColor="#dcfaff"/><stop offset="83%" stopColor="#52d9ff" stopOpacity=".9"/><stop offset="100%" stopColor={color} stopOpacity="0"/>
   <animateTransform attributeName="gradientTransform" type="translate" from={`${-dx*.25} ${-dy*.25}`} to={`${dx*1.55} ${dy*1.55}`} dur={`${duration}s`} begin={`${-phase}s`} repeatCount="indefinite"/>
  </linearGradient></defs>
 </g>;
}
