# PAO website performance — 2026-10-26

The owner's public PageSpeed report at 18:03 GMT+7 returned mobile performance
64, accessibility 100, best practices 100 and SEO 100. Mobile LCP was 3.0 s,
TBT 1,790 ms, CLS 0.001. Its desktop report timed out. The local automated
request to the public domain returned HTTP 403, so it is not a valid performance
measurement. No new production PageSpeed score is claimed here.

## Changes

- Load the Crystalized Ball code and initialize its WebGL shaders only when the
  knowledge widget approaches the viewport (250 px margin). Keep all controls,
  node labels and layout in the initial HTML. The original shader/color remains.
- Serve 384/512/768/1000 px AVIF artwork with responsive WebP fallback. The mobile
  512 px AVIF is 44,063 bytes versus the former mobile WebP's 120,422 bytes.
  Default images use these variants; custom editor uploads retain their own URL.
- Re-encode the 200 px logo: 8,744 bytes versus 18,994 bytes. Preserve originals.
- Preload the same local Manrope Latin, Latin Extended and Vietnamese fonts from
  versioned URLs. Retain the original Unicode ranges and license.
- Reveal newly typed characters directly, without rebuilding every character
  through React state every 35 ms. Preserve title-then-subtitle timing.
- Include the visible locale code in language-switcher accessible labels.
- Keep the approved social-sharing cover unchanged. Regeneration is scoped to
  `scripts/prepare-performance-assets.mjs`, not the older social-cover script.

## Local measurements

Lighthouse 13.5.0, headless Edge, GPU enabled, same machine and audit settings
before/after. Desktop: 1440×900, 40 ms RTT, 10,240 Kbps, CPU multiplier 1.
Mobile: Lighthouse default mobile simulation. Local HTTP does not reproduce
Hostinger, CDN, international network latency or real-user devices.

| Metric | Before | Final |
| --- | ---: | ---: |
| Desktop performance | 66 | 96 |
| Desktop LCP | 1.27 s | 0.78 s |
| Desktop TBT | 858 ms | 149 ms |
| Mobile performance | 56 | 73 median (67–77) |
| Mobile LCP | 4.53 s | 3.52 s median |
| Mobile TBT | 1,726 ms | 681 ms median |
| Mobile CLS | 0 | 0 |
| Accessibility / best practices / SEO | 100 / 100 / 100 | 100 / 100 / 100 |

Final mobile samples: `final-local-mobile`, `final-repeat-mobile`,
`verified-final-mobile`. Desktop final: `verified-final-desktop`. A desktop run
named `final-local-desktop` overlapped a build and is excluded. An intermediate
WebP-only candidate scored mobile 83 / desktop 99; these are not final scores.
The final AVIF candidate trades smaller network payload for different decode
cost. Shared-machine variation remains substantial; these are lab estimates.
Full JSON and HTML reports are retained outside the repository in the task's
`pao-speed-audit` folder.

## Verification and remaining work

- Production static export and TypeScript build passed; lint passed.
- Browser: all title/subtitle characters become visible; VI/EN/ZH images load;
  no horizontal overflow at 390 px and 1440 px. No crystal canvas at the hero;
  one canvas after navigating to knowledge. Pause and group selection work.
  FINANCE still expands Budget/Reports/Performance labels.
- Build release integrity, six localized home/privacy routes, sole hotline and
  approved Open Graph artwork are checked before publishing.
- Public editor remains excluded; local editor remains available.
- Hostinger currently supplies a seven-day cache TTL. This deployment-level
  header is not changed by a static source edit. Review its cache policy after
  deployment, then rerun PageSpeed on the public domain. Framework legacy JS,
  some unused React code and render-blocking CSS remain optimization opportunities.
