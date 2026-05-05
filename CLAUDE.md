# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # dev server with Turbopack
pnpm build      # production build with Turbopack
pnpm start      # start production server
pnpm lint       # ESLint
```

No test suite configured.

## Architecture

**Next.js 16 App Router** — React 19, Tailwind CSS v4, TypeScript.

### Data → Section → Page pattern

Content lives in `data/sections/*Data.tsx` files (typed, exported constants). Section components in `components/sections/` consume this data as props. Pages in `app/` import both and compose the layout — no server-side fetching; all data is static.

```
data/sections/heroSliderData.ts   →  components/sections/HeroSlider.tsx  →  app/page.tsx
```

Multiple visual variants exist for most sections (e.g. `WhyChooseUs`, `WhyChooseUs2`…`WhyChooseUs5`). Each home variant (`app/home-2/` through `app/home-8/`) assembles a different combination.

### Custom Web Components

Interactive UI (sliders, sticky header, drawer menu, search modal, counter, accordion, video modal) is implemented as custom HTML elements registered via web components. They're declared in `custom-elements.d.ts` so JSX accepts them. Component wrappers (e.g. `StickyHeader.tsx`, `DrawerMenu.tsx`, `HeroSlider.tsx`) render these custom elements with data passed as attributes/props.

### Styling

Global styles are in `styles/global.css`. Feature-specific CSS files (`styles/header.css`, `styles/hero-slider.css`, etc.) are imported where needed — not via Tailwind `@layer` but as direct CSS imports. Fonts (Inter, Poppins) are loaded via `next/font/google` in `libs/fonts.ts` and applied as CSS variables.

### Contact API

`app/api/contact/route.ts` — POST endpoint using Nodemailer. Requires env vars:

```
EMAIL_USER=
EMAIL_PASS=    # Gmail app password
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
```

### Path aliases

`@/` maps to the project root (configured in `tsconfig.json`).

### Önemli bilgiler
npm/npx/pnpm gibi herhangi bir komutta sandbox dışı onay almalısın. 