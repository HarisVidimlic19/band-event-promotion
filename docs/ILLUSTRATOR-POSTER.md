# Sto Posto — Illustrator poster walkthrough

A landscape teaser for the New Year celebration welcoming 2027. Use the original photographs and editable vector masks; keep the people’s appearance intact. The design has the three musicians on the right and the announcement on the left.

## 1. Open the ready-made file

Open the supplied SVG using **File → Open** in Illustrator. Do not place the entire poster as one flat PNG if you want to edit it. Install the included fonts if Illustrator reports missing fonts, then reopen the SVG. Save a working copy as **Adobe Illustrator (.ai)**. An SVG is the editable interchange file; it is not a native .ai file until you save it in Illustrator.

The photo data is embedded. The clipping paths hide the photo backgrounds, while the original photo pixels remain inside each group. Text stays editable. Keep a spare copy before experimenting.

## 2. Start from your originals instead

1. **File → New:** 1920 × 1080 pixels, landscape, RGB. Use this for the landscape Facebook teaser. For a feed portrait, create a separate 1080 × 1350 artboard and rearrange the design; do not stretch it.
2. In **Window → Layers**, create Background, Musicians, Text and Originals. Put a dark charcoal rectangle on Background and lock it.
3. **File → Place:** select each of the three original JPEGs. Keep a duplicate on a hidden, locked Originals layer. Work on one musician at a time.
4. Leave roughly the left 40% for text. Keep each face clear, and scale each entire photo/mask group with its proportions locked.

## 3. Extract a musician manually

1. Select the photo, then zoom to around 200–400%. Lock other photos temporarily so you do not select the wrong one.
2. Choose **Pen (P)**. Set Fill to None and use a thin bright stroke while drawing. Trace the outside of the musician **and instrument**, including hands. Click for a corner, click-and-drag for a curve. Close the path by returning to the first point.
3. Select the outline. Use **Object → Arrange → Bring to Front**. Select only that outline and its photo, then **Object → Clipping Mask → Make** (**Ctrl+7** on Windows; **Cmd+7** on Mac).
4. To refine the outline, use **Object → Clipping Mask → Edit Mask**, then **Direct Selection (A)** to move anchor points and curve handles. The mask hides the background; it does not erase or repaint the original.
5. For an enclosed gap such as between an arm and torso, draw a closed interior path as well. Combine the outer and interior paths with **Object → Compound Path → Make** before clipping. Use the even-odd fill rule in Attributes if the hole fills unexpectedly.

Do not use Image Trace for these portraits: it turns photographs into vector shapes and changes their appearance. A cutout can remain a high-resolution photograph inside a vector clipping mask.

## 4. Faster background removal

Current Illustrator offers **Remove Background** when an image is selected, on the Contextual Task Bar or in **Properties → Quick Actions**. Preserve a duplicate first; the output replaces the selected image. This is an AI-assisted option, and the singer’s image contains several people, so inspect what it retains. If the feature is absent in your version, the manual clipping-mask method above works without it.

If Photoshop is part of your subscription, use Select Subject (or manually select the intended person) → Select and Mask → refine the hair edge → Output to Layer Mask. Save the PSD with transparency, then place it in Illustrator. Avoid Generative Fill/Expand if you want to preserve the original people and instruments.

## 5. What to watch for in your three photos

| Photo | Keep / remove |
| --- | --- |
| Accordion — IMG-20260409-WA0033.jpg | Keep both hands and the whole accordion/bellows outline. Exclude the keyboard and stage gear behind him. You only need the outside silhouette, not every bellows fold. |
| Vocalist — 52ff9d40-4143-4e81-b6dc-0fef59111472.jpg | Keep the central singer, his microphone and both hands. Exclude other performers and the audience. His purple light is part of the original photo. |
| Bass — IMG-20260409-WA0031.jpg | Keep the bass neck/headstock. The music stand overlaps part of his body/instrument: a mask cannot recover what the camera did not capture. Retain that overlap or place it behind the vocalist. |

The supplied masks are editable first-pass silhouettes. Inspect hair, fingers and microphone edges at 100% before a final large print. A dark background and a waist/thigh-up layout make the original lighting differences and lower-body stage clutter less distracting. Do not mirror the photos; instrument lettering and playing orientation would reverse.

## 6. Arrange the poster

Put the accordion player behind-left within the right-hand group, the vocalist slightly forward in the middle, and the bassist behind-right. Keep every face unobscured. Use **Object → Arrange** to change overlaps. Group each musician with their mask before moving/scaling.

Use charcoal (#101210), ivory (#F1EEE5) and warm gold (#E7C56A). Keep decorative arcs and glows behind the people. Make the band name and 2027 the largest elements. Leave generous space around the wording.

Use the corrected Bosnian copy:

**Sto Posto Live Band**

**Najbolji doček Nove 2027. godine**

**Uskoro više informacija**

“Najbolji” is one word; “doček” and “više” include diacritics. This welcomes 2027 on the evening of December 31, 2026. No venue, time, price or ticket link has been supplied, so keep those off the teaser.

## 7. Save and export

Save the editable master as .ai with live text, embedded photographs and masks intact. Keep an unoutlined version for future text changes. For Facebook, use **File → Export → Export for Screens**, select the artboard, PNG, 1× for a 1920 × 1080 result. Preview the export on your phone so the small information line remains readable. Do not convert an RGB social image to CMYK just for posting online.

A real print poster needs a separate printer-approved page size, bleed and resolution check. The supplied landscape file is a digital promotional graphic, not a certified press-ready print file.

## Official Adobe references

- [Remove Background](https://helpx.adobe.com/illustrator/desktop/use-generative-ai/remove-background-from-images.html)
- [Create clipping masks](https://helpx.adobe.com/illustrator/desktop/manage-objects/edit-objects/hide-parts-of-objects-with-clipping-masks.html)
- [Edit clipping masks](https://helpx.adobe.com/illustrator/desktop/manage-objects/edit-objects/edit-clipping-masks.html)
- [Pen tool](https://helpx.adobe.com/illustrator/using/tool-techniques/pen-tool.html)
- [Compound paths](https://helpx.adobe.com/illustrator/desktop/manage-objects/reshape-transform-objects/create-compound-paths.html)
- [Photoshop hair selections](https://www.adobe.com/learn/photoshop/web/select-hair)
