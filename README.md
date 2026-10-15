# gearout-web

The GearOut product site: plain HTML and CSS, no framework, no build step, published from
`main` on GitHub Pages the same way the other SIM DAD product sites are. Domain: gearout.app
(registered at Cloudflare, 2026-10-06).

## Pages

| File | Purpose |
|---|---|
| `index.html` | What it is, who it is for, how it works in four steps, a described sample desk, the three tiers and two delivery options, buyer questions, early access |
| `beta/index.html` | The early-access request form, posting to the shared SIM DAD beta worker with `product=gearout` (noindex) |
| `eula.html` | License terms, a summary; the full agreements are sent with every quote |
| `privacy.html` | What the site collects, what the form does with an address, where an installation's data goes |

Shared: `css/site.css` (palette and measured contrast ratios in the header comment),
`img/logo.svg`, `img/social-share.png`.

## Sources of record

- Prices: `comms/press-2026-08/release-4-gearout-launch.md` (ratified 2026-09-18). The site names the
  Managed and Self-hosted options only; the appliance price waits on the support and liability boundary
  and the carrier confirmation named in that file.
- Feature claims: the GearOut 2.0 docs on branch `v2/phase1` (`docs/help/`, `docs/install.md`,
  `docs/sso.md`, `docs/compliance/hosting-and-data-flow.md`, `docs/legal/`).
- The two sentences about the university: OTMIR consent under license 8.13, 2026-09-29
  (`otmir-gearout/8-13-consent-2026-09-29.md`). Nothing else about the university appears on the site:
  no department, no people, no logo, no screenshot.

## Publish

1. Create the repository `SIM-DAD/gearout-web` (public) and push `main`.
2. Settings, Pages: deploy from a branch, `main`, root. `.nojekyll` is present.
3. Settings, Pages, custom domain: `gearout.app`. DNS is at Cloudflare: a CNAME for `www` to
   `sim-dad.github.io` and the four GitHub Pages A records on the apex (or a CNAME-flattened apex),
   proxy off until the certificate is issued, then "Enforce HTTPS".
4. Add `https://gearout.app` to the beta worker's CORS origins (`simdad-checkout`) and `"gearout"` to
   the `SITES` allow-list of the page-counter worker (`simdad-hits`); until then the worker drops this
   site's beacons and the form's POST is refused by the browser.

## Checks before a push

- `python "C:/pythia/tools/prose_lint.py" --links index.html beta/index.html eula.html privacy.html` at 0 FAIL.
- `python "C:/pythia/tools/web_qa.py" <files> --widths 390,768,1440 --dark` clean, screenshots read.
- No em dashes, every page parses, exactly one `h1` per page, every internal link resolves.
