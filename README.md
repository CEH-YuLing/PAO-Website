# PAO OS — Hostinger static release

Source commit: a5c6def1b3e9bc60897b426311c6637668d5dfa7

Hostinger: select branch **hostinger-static**, framework **Other / static frontend**, Node.js **24.x**, build script **build**, output directory **dist**. No environment variables, Next.js compiler or server entry file are required.

This branch contains the precompiled website. Edit source on main, run npm run build:hostinger there, then package a new release with scripts/package-hostinger-static.mjs and publish the generated files to this branch. Do not edit generated dist files. The local editor is excluded.

Build checks the SHA-256 integrity of every static file. Third-party notices are included in dist/third-party-notices/.
