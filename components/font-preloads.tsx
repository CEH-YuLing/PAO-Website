'use client';

import { preload } from 'react-dom';

export default function FontPreloads() {
  for (const subset of ['latin', 'vietnamese']) {
    preload(`/fonts/manrope-${subset}-wght-normal-5.3.0.woff2`, {
      as: 'font', type: 'font/woff2', crossOrigin: 'anonymous',
    });
  }
  return null;
}
