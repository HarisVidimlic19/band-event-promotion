# Website photo refresh — 14 November 2026

The supplied `Pics_for_website.zip` contained three individual portraits and a previous group montage. The group image was rebuilt with the built-in image-generation tool, using the individual portraits as identity references and the montage as a style reference. This is an AI-assisted promotional composite, not a documentary group photograph. Review likenesses with the band before using it in print.

## Assets and placement

| Asset | Pixels | Use |
| --- | --- | --- |
| `sto-posto-group.webp` | 1672 × 941 | Desktop homepage hero |
| `sto-posto-group-960.webp` | 960 × 540 | Responsive hero source |
| `accordion-portrait.webp` | 1024 × 1046 | Band gallery and full-image viewer |
| `vocals-portrait.webp` | 880 × 1198 | Band gallery and full-image viewer |
| `bass-portrait.webp` | 624 × 1277 | Band gallery and full-image viewer |

All assets live in `dist/assets/band/`. The individual images were converted to WebP without retouching. The generated PNG master is delivered separately in the conversation. The tool returned 1672 × 941 pixels despite the larger size requested in the prompt; no 4K or recovered camera detail is claimed. Earlier site photos remain in the repository.

## Generation prompt

```text
Use case: compositing, identity-preserve.
Asset type: polished photographic band publicity image for the official Sto Posto Live Band website.
Inputs: Image 1 is the previous low-quality group montage and a black-and-gold stylistic/layout reference ONLY; do not use its redrawn faces. Image 2 is the bassist's identity, clothing, bass guitar and hand-position reference. Image 3 is the vocalist's exact face, hair, beard and patterned black jacket reference. Image 4 is the accordion player's exact identity, clothing, pose and instrument reference.
Rebuild the group photograph from these three individual portraits, with maximum photographic detail and clean professional finish. Accordion player on the left, vocalist in the center slightly forward, bassist on the right. Keep each man's recognizable real facial structure, apparent age, skin texture, hairstyle, physique, outfit and expression from his own individual photo; the bassist may keep his relaxed nearly closed eyes. Do not substitute the earlier montage's modified facial features. Bring up the underexposed accordion player to match the others using believable soft studio lighting. Preserve the complete accordion including bellows and buttons, preserve both hands, and preserve the bass from body to headstock.
Composition: wide 16:9 landscape group portrait, roughly thigh-up, all three faces and instruments entirely within frame, generous 8% breathing room around outer heads and bass headstock. Natural relative proportions, vocalist not oversized. Each musician distinctly visible without obstructing important instrument details. Grounded, cohesive realistic studio portrait rather than plastic illustrated cutouts.
Background: elegant deep charcoal to black with subtle warm amber stage spotlights from the top corners and a few restrained sweeping gold light trails far behind the musicians, inspired by image 1. Less busy than that reference. Soft realistic shadows and natural edge transitions. No coloured neon body outlines, no halo cutout borders, no excessive glitter. Retain crisp facial detail without oversharpening or waxy skin.
NO lettering, NO band name, NO logos or other added text. The website will provide accessible sharp typography separately. No extra people, no extra instruments, no invented fingers. Output the highest available resolution, ideally 3840 x 2160 pixels.
```

