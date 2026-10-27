'use client';

import {preload} from 'react-dom';
import {useContentValue} from './site-content';

export default function HeroImagePreload(){
  const image=useContentValue('images.hero');
  if(image==='/images/pao-hologram.webp'){
    // Match the first picture source exactly so only the selected AVIF is fetched.
    preload('/images/pao-hologram-v2-512.avif',{
      as:'image',type:'image/avif',fetchPriority:'high',
      imageSrcSet:'/images/pao-hologram-v2-384.avif 384w, /images/pao-hologram-v2-400.avif 400w, /images/pao-hologram-v2-512.avif 512w, /images/pao-hologram-v2-768.avif 768w, /images/pao-hologram-v2-1000.avif 1000w',
      imageSizes:'(max-width: 420px) 64vw, (max-width: 699px) 284px, (max-width: 1000px) 36vw, 395px'
    });
  }else if(image&&!image.startsWith('data:')){
    preload(image,{as:'image',fetchPriority:'high'});
  }
  return null;
}
