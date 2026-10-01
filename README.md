# Felina Doungel — Personal Archive

A cinematic, interactive portfolio for **Felina Doungel** — student · creative · human-first, Bengaluru, India.

It is intentionally built as a small personal archive rather than a conventional résumé. The visual system is monochrome editorial type, chrome hardware, a 2000s digicam, physical paper, and carefully isolated WebGL moments.

## Run locally

```bash
npm install
npm run dev
```

The Vite development server is configured to bind to `0.0.0.0`, which is convenient for a LAN/device preview.

```bash
npm run build
npm run preview
```

`npm run build` type-checks then creates a static Vite build in `dist/`. It is ready to deploy to Vercel with the default Vite preset (build command `npm run build`, output directory `dist`).

## Included experiences

- **Classic laptop boot loader** — an actual CC0 [Poly Haven Classic Laptop](https://polyhaven.com/a/classic_laptop) 1K glTF model, a compact terminal sequence, visible Skip control, static fallback, and a timeout. The loader is removed after it ends and repeat visits skip it during the same browser session.
- **Liquid Chrome hero** — copied React Bits `LiquidChrome` source using OGL, configured for dark silver movement and pointer/touch input.
- **True Focus** — copied React Bits `TrueFocus` source, used deliberately once for the role line.
- **Physics ID** — copied React Bits `Lanyard` source with the original `card.glb`, `lanyard.png`, React Three Fiber, Drei, Meshline, and React Three Rapier. The front/back ID faces are local replaceable SVGs. It unmounts shortly after leaving the hero.
- **Memory archive** — an accessible keyboard, tap, swipe, and autoplay digital camera interface. It uses explicitly labelled placeholder frames, not stock photographs presented as Felina’s memories.
- **SignBridge feature** — the official Aceternity `@aceternity/macbook-scroll` registry component added with Shadcn (`npx shadcn@latest add @aceternity/macbook-scroll`) and adapted with the SignBridge visual and links.
- **Portrait** — copied React Bits `DitherVeil` source, loaded only near the About section. The local portrait was sourced from Felina’s referenced SignBridge team page.
- **Note** — copied React Bits `PaperCrumple` source. Hold, drag, release, touch, and keyboard interaction are supported; the component keeps its own image fallback when WebGL cannot initialise.

## Architecture

```text
src/
├── components/
│   ├── loader/          # 3D Classic Laptop intro + fallback
│   ├── hero/            # Liquid Chrome and lazy physics lanyard
│   ├── archive/         # digicam, gallery controls, modal
│   ├── projects/        # SignBridge / MacBook Scroll
│   ├── about/           # Dither Veil + lazy Paper Crumple
│   ├── reactbits/       # source copies from React Bits
│   ├── ui/              # official Aceternity registry source
│   └── layout/
├── data/                # easy-to-edit portfolio and memory data
├── hooks/               # viewport, mobile, reduced-motion hooks
└── App.tsx

public/
├── assets/laptop/       # Poly Haven 1K glTF and fallback image
├── assets/lanyard/      # React Bits card model, strap, face textures
├── photos/              # portrait + intentionally labelled memory placeholders
├── projects/            # SignBridge visual
└── notes/               # replaceable printed-note texture
```

## Updating content

### Memory camera

Edit `src/data/memories.ts`. Replace each `src` with a compressed local WebP or AVIF in `public/photos/`, and update the `alt`, date, and caption together. The defaults are intentionally marked as placeholders.

### ID card

Replace these local face assets while retaining the same portrait layout/ratio if possible:

- `public/assets/lanyard/felina-card-front.svg`
- `public/assets/lanyard/felina-card-back.svg`

They are passed into the real Lanyard component as `frontImage` and `backImage`.

### Portrait and paper note

- Replace `public/photos/felina-portrait.webp` with an appropriately licensed portrait (keep the filename or update `About.tsx`).
- Replace `public/notes/note-front.svg` with a PNG/SVG note texture (and update `About.tsx` if the path changes).

### Copy and links

Core identity and external links live in `src/data/portfolio.ts`. Placeholder biography copy is in `src/components/about/About.tsx` and should only be expanded with confirmed facts.

## Performance approach

There are multiple GPU-forward moments, so they are not left running together:

- The loader unmounts completely after the transition.
- Lanyard is dynamically imported and unmounts after the hero scroll threshold.
- Dither Veil and Paper Crumple are dynamically imported only near the About section.
- Dither Veil owns an intersection observer and releases its OGL WebGL context on unmount.
- Liquid Chrome is rendered only while the hero is near viewport.
- The lanyard uses a lower DPR/time step on mobile (from the published component); the loader caps DPR at 1.35.
- The Classic Laptop is the 1K model/texture variant, not a high-resolution download.

## Accessibility and input

- Semantic headings, labelled controls, descriptive image alt text, visible focus states, and a Skip-to-content link are included.
- The camera handles arrow keys, Escape, Space playback toggle, screen tap, large physical controls, and touch swipe.
- Lanyard supports pointer dragging; it is isolated to the hero and turns off before subsequent content.
- Dither Veil supports pointer and touch reveal. Paper Crumple has its source component’s accessible hold/keyboard fallback.
- `prefers-reduced-motion` reduces automatic motion, disables liquid pointer animation, and turns off Dither wandering/burst effects without removing the important static content.

## Credits / sources

- [Existing Felina portfolio](https://felina-one.vercel.app/)
- [Felina on Instagram](https://www.instagram.com/h.doungelll/)
- [Poly Haven Classic Laptop](https://polyhaven.com/a/classic_laptop) — CC0, using the 1K glTF
- [React Bits — Liquid Chrome](https://www.reactbits.dev/backgrounds/liquid-chrome)
- [React Bits — True Focus](https://www.reactbits.dev/text-animations/true-focus)
- [React Bits — Lanyard](https://www.reactbits.dev/components/lanyard)
- [React Bits — Dither Veil](https://www.reactbits.dev/animations/dither-veil)
- [React Bits — Paper Crumple](https://www.reactbits.dev/micro/paper-crumple)
- [Aceternity — MacBook Scroll](https://ui.aceternity.com/components/macbook-scroll)
- [SignBridge live project](https://sign-bridge-plum-eta.vercel.app/) and [GitHub](https://github.com/paul-idhant/SignBridge)
- [Idhant’s portfolio](https://idhant-mu.vercel.app/)
