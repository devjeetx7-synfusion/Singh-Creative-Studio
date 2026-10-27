# Singh Creative Studio — Blogger XML theme

The complete Blogger theme is **`singh-creative-studio-blogger.xml`**. This remains a Blogger XML project: no React, JSX, TypeScript, Vite, npm install, Node runtime, or build step is needed to install or run it.

## Install

1. In Blogger Dashboard, go to **Theme** → menu beside **Customize** → **Edit HTML**.
2. Back up the current theme.
3. Replace the Theme Editor contents with the complete XML file and save.
4. Check the blog on a phone and desktop; the theme enables Blogger responsive mode with `b:responsive='true'` and includes a width=device-width viewport declaration.

The previous theme already declared a viewport and had media queries, so the mobile issue was not simply a missing viewport. Its root HTML did not enable Blogger responsive mode. The update adds that Blogger setting and replaces the fixed multi-section opening with a viewport-filling, safe-area-aware storyboard and explicit responsive layouts.

## Experience

The eight-scene story is the first view. Next, Back, Skip Story, Replay Story, keyboard arrows, Escape, and touch swipes are implemented. The website is inert and visually hidden behind the story until the visitor skips or completes it. With JavaScript disabled, a `noscript` fallback shows the website instead. The story can be replayed from the site navigation.

Three.js r128 is loaded asynchronously from cdnjs for genuine 3D geometry, lights, particles, camera movement and scene transitions. It is a progressive enhancement; controls and CSS visual fallbacks remain available if WebGL or the CDN fails. Reduced-motion preferences disable continuous 3D animation.

## Owner-editable content

At the start of the inline script near the end of the XML, edit `STUDIO_CONFIG`:

- Studio and founder names
- `whatsapp`: digits only with international country code (example format `919876543210`)
- Optional `email`
- `instagram` and `behance`: replace `YOUR_HANDLE` with real profile URLs

Update project titles, categories, descriptions and process notes in the `PROJECTS` array. Add actual, approved public HTTPS URLs to `image` and `video`; video controls appear only when a video URL is supplied. Until real work is provided, the existing pieces are labelled demonstration concepts, not client work. Replace the labelled founder portrait placeholder with an approved publicly hosted photo, and edit the founder introduction, creative vision, skills and software text only with confirmed details.

The Blogger Studio Journal widget remains in the theme and can show posts authored through the Blogger dashboard.

## External requirements and verification

- Space Grotesk and DM Mono are loaded from Google Fonts, with system font fallbacks.
- Project images and videos need stable, publicly accessible HTTPS hosting that permits embedding.
- Contact has no backend. A configured WhatsApp number opens a prefilled WhatsApp draft; visitors must review and send it. An email-only configuration opens a mail draft. With neither configured, the form states that details were not sent.
- The XML structure and inline JavaScript are validated locally, and a temporary DOM-based test exercised scene navigation, skip/replay, project filtering/details, and mobile-menu actions. I could not run a real browser/device viewport test or install this in an actual Blogger account, so visual measurements at the requested screen widths and Blogger Theme Editor save still need owner-side verification.
