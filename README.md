# Singh Creative Studio — Blogger XML theme

This repository now contains a self-contained Blogger theme at **`singh-creative-studio-blogger.xml`**. It is an XML document for Blogger's Theme Editor, not an HTML preview or a React app. It needs no React, TypeScript, Vite, npm install, Node runtime, build step, or separately hosted application.

## Install in Blogger

1. Open Blogger Dashboard → **Theme** → open the menu beside **Customize** → **Edit HTML**.
2. Back up/download your current theme first.
3. Replace the Theme Editor contents with the complete contents of `singh-creative-studio-blogger.xml` and save.
4. Open your blog on a phone and desktop to check the layout, navigation, contact handoff, and any external libraries permitted by your settings.

The XML was parsed locally for well-formedness and the inline JavaScript was checked with Node's syntax checker. This project has **not** been installed or tested on an actual Blogger account; save it in Blogger and check its Theme Editor validation before publishing.

## Owner-editable settings

At the beginning of the inline JavaScript near the bottom of the XML, edit `STUDIO_CONFIG`:

- Studio name and founder name
- `whatsapp`: digits only, international country code included (for example `919876543210`)
- `email`: optional email address
- `instagram` and `behance`: replace the sample `YOUR_HANDLE` URLs with the studio's real profiles

The project list is the `PROJECTS` array directly below it. Replace titles, categories, descriptions and process notes with verified project details. Set `image` to an externally hosted image URL and `video` to an externally hosted video URL when actual, approved assets exist. Both are empty for the demonstration concepts. Video playback is only shown for projects with a configured video URL. Use an HTTPS host that allows public embedding/hotlinking and provides stable URLs.

The founder portrait is an explicitly labelled CSS placeholder. Replace it with an approved, publicly hosted image before presenting it as Mukesh Singh's portrait. The founder intro and practice text are editable in the XML body. No client names, testimonials, awards, experience, qualifications, or software expertise have been fabricated.

## External resources and limitations

- Space Grotesk and DM Mono load from Google Fonts; local system-font fallbacks are provided.
- Three.js r128 loads from cdnjs to enhance the opening and portal with interactive 3D. If the library or WebGL is unavailable, CSS artwork remains and the rest of the site stays usable. The theme does not rely on 3D to display its content.
- No audio autoplays. The opt-in sound control synthesizes a quiet tone in the browser with Web Audio.
- Contact has no server-side backend. With a WhatsApp number configured, the validated form opens a prefilled WhatsApp draft; visitors still need to review and send it. If only an email is configured, it opens a mail draft. If neither is configured, a clear message says that the enquiry was not sent.
- Portfolio images and videos need public HTTPS hosting. Blogger's built-in Studio Journal widget can display posts written in the Blogger dashboard.
