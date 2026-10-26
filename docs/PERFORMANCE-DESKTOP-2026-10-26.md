# Desktop PageSpeed follow-up — 2026-10-26

Public report: https://pagespeed.web.dev/analysis/https-pao-os-com/z4vv67c5v9?form_factor=desktop
(18:59 GMT+7). Performance 66; FCP 0.4 s, LCP 0.6 s, TBT 23,550 ms,
CLS 0; accessibility / best practices / SEO all 100. The bottleneck was sustained
graphics/compositing work rather than first-content loading.

## Changes

- Ghost Fibers keeps its animated rendering on hardware GPUs. Known software
  renderers use an original static blue fiber SVG, before compiling multipass
  shaders. This is graphics-capability detection, without user-agent or audit
  detection. Unknown GPUs use the normal effect with an adaptive frame budget.
- Three persistently slow frames freeze decorative motion at its current image;
  a single slow frame or return from a backgrounded tab does not trigger this.
- The starfield waits for a useful area below the word strip to be visible,
  avoiding painting an entire canvas for a few exposed pixels at the fold.
- The same 12 marquee words move as one CSS track. Pause, hover, reduced motion
  and pointer dragging remain available; per-item JS animation work is removed.
- A 400 px hero variant fits the desktop display: AVIF 31,446 bytes versus
  44,063 bytes for the prior 512 px variant. Existing responsive fallbacks remain.
- Same-page links scroll without adding a fragment to the address bar. Mobile
  navigation closes first; keyboard activation moves focus to the destination.
  Real page links, external links, telephone/email and modified clicks stay native.
  Existing inbound fragment links remain valid.

## Verification

Lighthouse 13.5.0, Edge headless, 1440×900, simulated desktop network 40 ms /
10,240 Kbps, CPU multiplier 1. Software-graphics stress test launches with
`--disable-gpu --enable-unsafe-swiftshader` for both before and after.

The pre-fix local run reproduced sustained blocking (TBT 26,244 ms). It did not
reach stable idle within the load deadline, so its overall score is not presented
as an authoritative baseline. The starfield-only candidate did not resolve the
main bottleneck and is retained as failed diagnostic evidence. A shortened trace
run hit a protocol timeout and is invalid for category-score comparison.

The final completed run (`desktop-report-accepted-desktop`, no runtime error or
warnings) measured performance **99**, accessibility **100**, best practices
**100**, SEO **100**, FCP **407 ms**, LCP **738 ms**, TBT **27 ms**, CLS **0**.
These are local lab results, not a new public PageSpeed score. Full JSON/HTML and
the diagnostic trace remain in this task's `pao-speed-audit` folder.

Build/static export/TypeScript, lint and seven focused tests passed. Browser
verification covered clean URL scrolling on desktop/mobile, keyboard focus,
mobile menu closure, the privacy route and its section links, all 12 words and
the pause control. The appearance experiment remains rolled back. The approved
social image and localized pages are preserved.

Remaining opportunities: Hostinger's seven-day cache headers, some framework
legacy/unused JS and logo image compression. None is represented as fixed by
these source changes. Re-run the public report after Hostinger deploys the release.
