# gearout-web

The GearOut marketing site: plain HTML and CSS, no framework, no build step, published from
`main` on GitHub Pages, the same way the other SIM DAD product sites are built.

Nothing here is public yet. Publishing waits on the gate in the messaging source
(`gearout-v2-plan/marketing/00-messaging.md`): the SIUE technology-transfer license executed
and the consent to name SIUE as the reference deployment.

## Pages

| File | Purpose |
|---|---|
| `index.html` | Value line, what it does by role, three proof points, pricing summary, buyer questions |
| `pricing.html` | The centerpiece: software tiers, delivery options, worked totals, what is not on the sheet |
| `install.html` | The one command, what the installer asks, the four delivery options |
| `security.html` | Architecture, identity, data protection, what is not claimed, documents available on request |
| `accessibility.html` | WCAG 2.1 AA target, VPAT status, the DOJ Title II date, what a tester can check |
| `compare.html` | The field comparison with its sources |
| `privacy.html` | What this site collects (an aggregate daily count) and a pointer to the product's data-flow statement |

Shared: `css/site.css` (palette and contrast ratios in the header comment), `js/site.js`
(nav toggle and the page counter), `images/wordmark.svg`, `images/flow.svg`.

## Publish

1. Create the repository `SIM-DAD/gearout-web` (public) and push this folder to `main`.
2. Settings, Pages: deploy from a branch, `main`, root. `.nojekyll` is present so Pages serves
   the files as they are.
3. Register the product domain, then substitute the placeholder (see below) and set the same
   name in `CNAME`. In DNS, point the apex at the four GitHub Pages A records and `www` at
   `sim-dad.github.io`, then turn on "Enforce HTTPS" once the certificate is issued.
4. Add `"gearout"` to the `SITES` allow-list in the page-counter worker
   (`C:\pythia\work\simdad-hits\worker.js`, deployed as `simdad-hits.ap-493.workers.dev`) and
   redeploy it; until then the worker drops this site's beacons. The beacon posts JSON
   `{ "site": "gearout", "path": "<pathname>" }` to `/hit`, which is the shape the worker reads.

## Placeholders to substitute before publishing

| Placeholder | Where | Replace with |
|---|---|---|
| `[gearout-domain]` | `CNAME`, `robots.txt`, `sitemap.xml` | the registered product domain |
| `[owner to set: sales email]` | every `mailto:` link and the contact lines | the sales address |
| `[owner to set: contact email]` | `privacy.html` | the privacy contact address |
| `[owner to set: asset cap in 2.0]` | `pricing.html` | the Starter asset cap |
| `[owner to set: what Campus adds beyond Department in 2.0, ...]` | `pricing.html` | the Campus definition |
| `[owner to set: which of these, if any, are tier-limited]` | `pricing.html` | tier limits, or delete the sentence |
| `[owner to set: support hours and response target]` | `pricing.html` | the support terms |
| `[owner to set]` (training, connectors, multi-year) | `pricing.html` | the terms, or delete the line |
| `[owner to confirm: license executed]` | every footer | delete the bracket once the license is executed, or remove the sentence |
| `[owner to confirm consent]` | every footer | delete the bracket once SIUE consents, or remove the reference-deployment line |

Placeholders render with a dashed yellow box (`.placeholder`) so none can slip into a
published page unnoticed. Search for `[owner` before every publish.

## Checks before a push

- `grep -rn "\xe2\x80\x94" *.html` returns nothing (no em dashes).
- Every page parses with Python's `html.parser` and has exactly one `h1`.
- Every internal link resolves to a file in this folder.
- `grep -rn "\[owner" *.html` lists only placeholders you intend to leave for that publish.
