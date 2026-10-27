# PAO OS — Hostinger static release

Source commit: dd602b74d41375ef96db68d6bd97703421b763da

Hostinger: select branch **hostinger-static**, framework **Other / static frontend**, Node.js **24.x**, build script **build**, output directory **dist**. No environment variables, Next.js compiler or server entry file are required.

This branch contains the precompiled website. Edit source on main, run npm run build:hostinger there, then package a new release with scripts/package-hostinger-static.mjs and publish the generated files to this branch. Do not edit generated dist files. The local editor is excluded.

Build checks the SHA-256 integrity of every static file. Third-party notices are included in dist/third-party-notices/.
