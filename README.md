# Singh Creative Studio

A responsive, cinematic portfolio experience for Mukesh Singh. Built with React, TypeScript, Vite, Three.js and GSAP.

## Run locally

```sh
npm install
npm run dev
```

Production build: `npm run build` (output in `dist/`).

## Owner configuration

- **WhatsApp enquiries:** set `whatsappNumber` in `src/config.ts` to the full international number using digits only (country code included). Until configured, the enquiry form validates input and clearly explains that nothing was sent; it does not show a false success state.
- **Portfolio:** update `src/data/projects.ts` and the project artwork styles in `src/styles.css`. Existing projects are explicitly demonstration concepts, not client commissions. Add real project imagery/video only when supplied and update labels accordingly.
- **Founder portrait:** replace the labelled portrait placeholder in `src/App.tsx` with an approved photograph.
- **Founder profile:** update the editable introduction and practice copy in the Founder section when confirmed details are available.
- No email, WhatsApp number, client names, testimonials, awards, years of experience, or software expertise have been invented.

## Experience notes

- The introductory journey is scroll-led rather than a blocking preloader; **Skip Intro** jumps straight to work.
- Hero and portal artwork use interactive, real-time Three.js geometry. Below-fold Three.js scenes initialize only when approaching the viewport. A CSS fallback orb is shown if WebGL setup fails.
- Sound is off by default. The opt-in toggle creates a quiet synthesized ambient tone using Web Audio after a user gesture.
- Project cards open keyboard-dismissible details. Demo artwork is CSS-drawn and is not represented as client work or as video.
- Animations respect `prefers-reduced-motion`; particle counts and pixel ratio are reduced on mobile.

## Contact configuration

There is no backend in this project. Configure the WhatsApp number in `src/config.ts` to make the form open a prefilled enquiry in WhatsApp. Visitors review and send it in WhatsApp; the site does not claim the request has been delivered.
