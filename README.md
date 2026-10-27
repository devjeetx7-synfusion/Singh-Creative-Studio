# Singh Creative Studio — Blogger XML theme

The complete theme is **`singh-creative-studio-blogger.xml`**. This is still a direct-install Blogger XML theme; no React app, npm dependencies, build step, or separate hosting project is required.

## Install

1. In Blogger Dashboard, open **Theme** → the menu beside **Customize** → **Edit HTML**.
2. Back up the current theme.
3. Replace the Theme Editor contents with the full XML file and save.
4. Verify the saved theme in Blogger and check it on phone and desktop. The theme uses Blogger responsive mode, a device-width viewport, fluid layouts, and safe-area padding.

## Mobile layout refinements

The existing light editorial system is retained. The mobile hero now uses fluid heading sizes and tighter vertical rhythm, keeps the comma attached to “MASTERPIECE,” moves the CTA into a larger touch target, and adds a slow, reduced-motion-aware float to the CSS gradient sphere. The mobile header uses a readable wordmark, a 44px Explore Work link, a 44px Skip Intro control in the cinematic overlay, and a 46px menu button. The menu constrains its height, locks background scrolling while open, closes on Escape/outside click/navigation, and restores scroll when dismissed. Fluid CSS targets narrow phones through tablets without a separate design for each width.

## Automatic intro

A bright, four-scene opening plays automatically for about **14.8 seconds** (3.1 + 4 + 4.1 + 3.6 seconds), then fades into the regular site. It moves from an abstract spark, to an owner-photo portrait sequence, to concept art for the creative disciplines, and finally to a text-only brand reveal. It uses no autoplay audio. **Skip Intro** is available throughout, and Replay Intro is available from the site navigation and final scene.

The completion flag is stored in `sessionStorage` as `scs-cinematic-intro-complete`, so the intro does not run again during same-tab navigation or reloads in that browser session. Replay remains available at any time. If browser storage is blocked, the intro still runs and fades into the site, but the browser may show it again on later page loads.

Reduced-motion preferences disable the decorative movement and use an immediate/static progress indicator; the automatic scene timing and Skip Intro remain available. Three.js is an optional, asynchronously loaded visual enhancement. If the CDN, WebGL, or image requests fail, the text and CSS artwork/portrait placeholders remain available. Portrait failures leave the explicit placeholder visible.

## Owner-editable content

At the start of the inline script near the end of the XML, edit `STUDIO_CONFIG`:

- `name` and `founder`
- `portraitImages`: add one or more **owner-approved, publicly reachable HTTPS image URLs**, for example `portraitImages:['https://example.com/mukesh-portrait-1.jpg','https://example.com/mukesh-portrait-2.jpg']`. Keep the supplied empty strings until the real owner-approved photographs are ready. The first usable URL is also used in the regular About section. Images are naturally cropped with `object-fit: cover`; adjust the `object-position` values in the portrait CSS if needed.
- `portraitAlt`: provide appropriate alt text for the actual supplied photos.
- `whatsapp`: digits only with international country code (for example, `919876543210`); optional `email`.
- `instagram` and `behance`: add confirmed HTTPS profile URLs. These links stay hidden until configured.

No founder photo is included in this repository. The theme therefore shows a labelled illustration placeholder, not a fabricated photograph. Do not add personal history, credentials, awards, client projects, or contact details without owner confirmation.

Update the `PROJECTS` array to replace demonstration concepts with confirmed portfolio work. Set a real public HTTPS `image` or `video` URL only when the owner has supplied the approved asset. Existing visual tiles are concept artwork; they are not animation videos and must not be presented as client work. The Blogger Studio Journal widget remains available for posts published through Blogger.

## Integrations and contact behavior

- Space Grotesk and DM Mono are requested from Google Fonts, with system fallbacks.
- Three.js r128 is requested from cdnjs only for optional WebGL artwork; CDN failure does not prevent the site from working.
- Contact has no backend. A configured WhatsApp number opens a prefilled draft that the visitor must review and send. Email-only configuration opens a mail draft. With neither configured, the form clearly states that no details were sent.
- The site's optional ambient sound is off by default and can only be started by an explicit user action; the intro itself is silent.

## Verification status

XML parsing, JavaScript syntax checking, CSS parsing, and DOM interaction tests cover the four-scene timing, automatic reveal, skip/replay, session behavior, hidden-tab pause/resume, project modal, reduced-motion timing, silent default, and mobile-menu opening/closing, focus, and scroll locking. Actual rendered layout measurements at the requested widths/orientations, real-device performance, and installation/save in a Blogger account have **not** been performed in this environment; verify them in a browser and Blogger before publishing.
