# Deploy to Cloudflare

Use **Workers Static Assets with GitHub integration** for this website. The ready-to-serve files are already in `dist/`; there is no frontend compilation step. The build command below validates them before deployment.

## Repository and branch

- GitHub repository: `HarisVidimlic19/band-event-promotion`
- Production branch: **`main`**
- Project root: the repository root

The original website pull request has been merged into `main`. Merge the desired revision before deploying it. Pushes to Cloudflare's selected production branch will update the deployed site; keep feature work in preview branches until it is ready.

## Wrangler configuration

The repository root includes `wrangler.jsonc` with this minimal configuration:

```json
{
  "name": "sto-posto-live-band",
  "compatibility_date": "2026-11-03",
  "workers_dev": true,
  "assets": {
    "directory": "./dist"
  }
}
```

No `main` script or assets binding is needed for this assets-only Worker. The Cloudflare Worker name must match `name` in this file. Only `dist/` is uploaded as public website content; documentation, tests, and repository configuration remain outside the asset directory.

## Connect GitHub and deploy

1. Sign in to the intended Cloudflare account and open **Workers & Pages → Create application → GitHub**.
2. Authorize Cloudflare's GitHub integration for `HarisVidimlic19/band-event-promotion`. If the private repository is missing, update the GitHub application's repository access rather than making the repository public.
3. Select the repository and configure these values:

| Setting | Value |
| --- | --- |
| Worker/project name | `sto-posto-live-band` |
| Production Git branch | `main` |
| Root directory | Repository root; leave the field blank if root is the default |
| Build command | `npm run check && npm test` |
| Deploy command | `npx wrangler deploy` |
| Website asset directory | `./dist`, set in `wrangler.jsonc` |
| Application variables/secrets | None required for the current static website |

4. Select **Save and Deploy** and inspect the build/deployment logs. The check and test commands must succeed before the deploy command runs.
5. Open the actual `workers.dev` address returned by Cloudflare. Its account-specific hostname cannot be determined from the repository name alone.
6. In **Settings → Build → Branch control**, confirm the production branch is still `main`. Leave preview builds disabled until needed, or enable them to review future work on other branches.

Cloudflare normally creates the deployment API token for Workers Builds. Do not add that token to the repository or to public website configuration. This frontend needs Node 20+ for checks; it has no application dependencies to install.

A private GitHub repository does not make the deployed website private. The `workers.dev` site is a public production test unless access control is separately configured.

## Hostname-dependent metadata

After Cloudflare assigns the real hostname, update the absolute `og:image` URL in `dist/index.html` to the deployed origin followed by `/assets/social-card.png`. It must not continue pointing to the old `chatgpt.site` deployment. Use the final production hostname again if a custom domain is connected later.

The CSS, JavaScript, fonts, and artwork use relative paths and do not need hostname changes. Language selection uses browser storage. Contact links remain unpublished until verified band contact details are supplied; hosting it on Cloudflare does not create a mail or payment backend.

## Verify the production test

- Open the root page over HTTPS and check that artwork and local fonts load.
- Switch Bosnian/English, test the mobile menu, and inspect both upcoming and past event tabs.
- Confirm there are no ticket purchase buttons while the event list is empty.
- Open a past event and confirm it links to its source without offering a ticket purchase.
- Open and close a photo, then check the ticket FAQ.
- Open `/assets/social-card.png` on the new hostname and verify the Open Graph image uses that same production origin.
- Check the browser console and network panel for missing assets or references to the previous host.

The website still has no live events, payment processing, admission-ticket issuance, or published contact details. Add verified content and connect the ticket provider using [TICKETING.md](TICKETING.md) when those details are available.

## Pages alternative

If an existing Cloudflare Pages project is preferred, it can serve the same `dist/` directory. Import the repository with production branch `main`, framework preset **None**, repository root, build command `npm run check && npm test`, and build output directory **`dist`**. Pages uses these dashboard settings instead of the Worker deployment command above. There is no reason to create both hosting projects for this site.

## Official references

- [Workers Git integration and import](https://developers.cloudflare.com/workers/ci-cd/builds/)
- [Workers build and deploy settings](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/)
- [Production branch controls](https://developers.cloudflare.com/workers/ci-cd/builds/build-branches/)
- [Static Assets configuration](https://developers.cloudflare.com/workers/static-assets/binding/)
- [Wrangler configuration](https://developers.cloudflare.com/workers/wrangler/configuration/)
- [Pages static HTML alternative](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/)
