# Origin Health

A premium, responsive primary-care and wellness landing page built in the existing React + Vite project. The design uses DM Sans, Instrument Serif, muted sage, deep teal, warm ivory, generous whitespace, and locally hosted licensed photography.

## Local development

```sh
npm install
npm run dev
```

```sh
npm run build
npm run preview
```

Use a Node.js version supported by Vite 8 (Node 22.12+ is supported). Tailwind CSS uses the current official Vite integration: `tailwindcss` and `@tailwindcss/vite`, the `tailwindcss()` Vite plugin, and `@import 'tailwindcss'` in the CSS entry. No legacy PostCSS configuration is needed. See the [official Tailwind Vite guide](https://tailwindcss.com/docs/installation/using-vite).

## Folder structure

```text
origin-health/
  index.html                   Title, metadata, and app entry
  public/brand/                 Unmodified official Origin Health logo
  public/licenses/             Distributed font and icon license notices
  src/
    App.jsx                    Landing-page sections and dialog state
    App.css                    Editorial layouts and responsive styles
    index.css                  Tailwind import, fonts, theme, global styles
    main.jsx                   React entry point
    components/
      UI.jsx                   Wordmark, shared demo CTA, button, and eyebrow
      Header.jsx               Sticky navigation and mobile disclosure
      Dialogs.jsx              Accessible dialogs and validated demo form
    hooks/useScrollReveal.js   Progressive, accessible section entrances
    data/services.js           Shared service and detail copy
    assets/images/
      calm-consultation*.jpg   Responsive hero consultation photography
      care-consultation*.jpg   Preserved earlier photography
      wellness-coast*.jpg      Responsive wellness photography
      LICENSES.md              Photo sources, credits, license information
  tests/landing.spec.js        Responsive, accessibility, interaction tests
  playwright.config.js         Browser test configuration
  vite.config.js               React and official Tailwind Vite plugins
```

Existing unrelated files and unused starter assets are preserved.

## Experience and accessibility

Sticky navigation, keyboard-accessible mobile menu, skip link, visible focus states, hero, benefits strip, service detail dialogs, editorial wellness section, care philosophy, appointment CTA, and footer. Responsive layouts target 375px, 768px, 1024px, and 1440px, with intermediate breakpoints.

Native modal dialogs support focus containment, Escape dismissal, backdrop dismissal, and scroll locking. The form includes associated labels, inline errors, first-invalid-field focus, required name/email validation, optional future-date validation, and a clear completion state. Fonts are self-hosted; images have responsive sources, dimensions, hero priority, and lazy loading below the fold. Reduced-motion preferences are respected.

## Demo boundaries and privacy

Booking is **not live**. The form requests example information only and does not ask for symptoms, medical history, or other sensitive health information. Submission prevents the browser's default action. There is no backend, email integration, network submission, analytics, cookies, or browser storage added by this application. Values live only in component state and are cleared on completion or dismissal. Completing the demo does not reserve a time, book an appointment, or send a message.

Service descriptions illustrate the concept and are not confirmed operational services, medical advice, clinical guarantees, or credential claims. No testimonials, medical credentials, statistics, or certifications are fabricated. Confirm actual services, availability, and booking infrastructure before launch.

## Licensed assets

Photography is licensed under the Pexels License and stored locally. Credits, original URLs, and license links are in `src/assets/images/LICENSES.md`. Stock models are not identified as actual patients or staff. Fonts use the SIL Open Font License; Lucide uses the ISC license. The original license notices are included in `public/licenses/` and copied to the production build.

## Verification

```sh
npm run build
npm run test:e2e
```

Tests use locally installed Microsoft Edge, via Playwright's `msedge` channel. If Edge is unavailable, install a Playwright browser and update `channel` in `playwright.config.js`. Tests run against a temporary Vite production preview and check all four requested widths, image loading, horizontal overflow, WCAG accessibility through axe, keyboard navigation, focus containment/restoration, service dialogs, form errors, local-only completion, and cleared form state. Screenshots are written under `test-results/`. The preview server is stopped by Playwright after the run.

The production output is written to `dist/`. Nothing has been deployed.

## Official brand identity

The header and footer both use `/brand/origin-health-logo.png`, an unchanged copy of the supplied 1536 x 1024 PNG. The source and project file have matching SHA-256 hashes. No filters, recoloring, redrawing, image transforms, or resampling have been applied to the asset. A CSS frame excludes excess outer blank canvas while retaining all logo artwork and its proportions. Responsive display widths keep the mark clear on desktop, tablet, and mobile. The same original file is used for the favicon.

The palette is informed by sampled logo pixels: deep olive `#404A35`, sage `#969876`, and a warm ivory foundation `#FDFBF7`. Instrument Serif echoes the logo's elegant letterforms; DM Sans keeps navigation and body copy readable. Deep teal buttons (`#244C4B`), readable slate copy (`#263B42`), and muted sage surfaces harmonize with the original olive mark and warm ivory canvas. The logo display is approximately 18% smaller than the earlier design, with its original aspect ratio and colors preserved. The source logo contains subtle texture, so individual pixel colors vary slightly.

## Visual refinement

Primary body copy remains 16px across breakpoints, with 14px supporting copy and comfortable line heights. Desktop navigation is 14px. The compact header balances the original logo with the appointment action. A calmer, responsive consultation image replaces the earlier hero photo, with a separate caption and focal points tailored to wide and narrow screens.

Primary Care has a prominent deep teal feature card; the supporting services use spacious editorial rows with larger icons, titles, and actions. Italic headings are reserved for the hero and wellness section. The approach and final appointment sections use simpler compositions. Existing navigation, service dialogs, privacy controls, and local-only appointment validation remain intact.

## Usability fixes

Appointment entry points use the shared `AppointmentButton` with an explicit demo label; the hero also explains that booking is not live. The demo form's apostrophes are valid UTF-8. Service summaries now explain the existing care concepts, and the approach section outlines an illustrative first visit without presenting unconfirmed services as operational facts.

The featured Primary Care card includes its existing service topics and uses content-driven height. On mobile, the hero uses a more compact headline, spacing, and photograph while retaining 16px body copy and 14px supporting text. Browser checks cover the demo labels, corrected form text, and mobile-menu booking in addition to the existing responsive, accessibility, navigation, and validation checks.

## Subtle motion

The hero enters with a short stagger, selected sections reveal once with a 12px rise, and dialogs open with a brief fade. Pointer users get a 2px button lift and a slight wellness-photo zoom. Motion uses native CSS and browser APIs, with no added dependencies. The official logo remains still.

Content is visible by default. Section reveals skip keyboard-focused content, cancel when focus moves inside, and stop immediately if reduced motion is enabled. Reduced-motion preferences disable the new entrances and hover movement.
