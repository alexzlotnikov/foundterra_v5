
# Complete Design System Overhaul: Dark Premium Aesthetic

## Overview
Transform the entire Foundterra website from a light glassmorphism design to a dark, ultra-premium "obsidian void" aesthetic with refractive glass, glowing purple accents, and cinematic motion -- while preserving all existing text, content, and links exactly as they are.

## Phase 1: Foundation (CSS Variables, Fonts, Global Styles)

### 1.1 Typography Setup
- Add Google Fonts imports for **Inter** (body) and **JetBrains Mono** (data/numbers)
- Add a serif font via Google Fonts: **Playfair Display** (closest available alternative to PP Editorial New / Ogg, which are paid fonts)
- Register font families in Tailwind config: `font-serif`, `font-mono`, `font-body`

### 1.2 CSS Variables Overhaul (`src/index.css`)
- Background: `#050507` (obsidian)
- Foreground: near-white `#E8E8ED`
- Primary/brand: `#6366F1` (Foundterra Purple)
- Card surfaces: `rgba(255,255,255,0.03)` with `blur(24px)`
- Remove light mode entirely -- the site becomes dark-only
- Update all gradient variables to use purple glows on dark backgrounds
- Glass effects: heavier blur, purple-tinted borders (`rgba(99,102,241,0.15)`)
- New CSS utilities: `.glass-panel`, `.glow-border`, `.text-mono`, `.text-serif`

### 1.3 Tailwind Config (`tailwind.config.ts`)
- Add new font families
- Add custom keyframes: `glow-pulse`, `float-heavy`, `fade-up-heavy` with high-damping easing
- Update color tokens

## Phase 2: Pre-Loader Component

### 2.1 New Component: `src/components/PreLoader.tsx`
- Full-screen obsidian overlay
- Centered JetBrains Mono counter ticking from `00.0%` to `100.0%`
- On completion: horizontal purple line strikes across screen, then the overlay fades/splits to reveal content
- State managed in `Index.tsx` -- show preloader on first visit, then reveal page

## Phase 3: Section Redesigns (All Components)

### 3.1 Header (`Header.tsx`)
- Dark glass nav: `rgba(5,5,7,0.85)` with `backdrop-blur(20px)`
- 1px bottom border with subtle purple gradient
- Logo text uses serif font
- CTA button: pill-shaped dark glass with purple glow on hover

### 3.2 Hero (`Hero.tsx`)
- Remove all floating card/icon decorations
- Add cursor-following purple mesh gradient on the background (via `onMouseMove` + CSS radial gradient)
- Central content wrapped in a large frosted glass card with 1px gradient border
- Card tilts subtly on mouse move (CSS `perspective` + `transform: rotateX/rotateY`)
- Headline in serif font, subtitle in Inter
- CTA button: dark glass pill with inner purple glow on hover
- Keep express link below

### 3.3 ImageCarousel (`ImageCarousel.tsx`)
- Darken wrapper, add subtle purple ambient glow behind images
- Images get a slight glass-border treatment

### 3.4 Problem Section (`Problem.tsx`)
- Restyle as the "Agitation" section with dark cards
- Cards: dark refractive glass with purple glow borders on hover
- Icons get subtle purple glow backgrounds instead of gradient fills

### 3.5 About Section (`About.tsx`)
- Dark glass cards with purple accent borders
- Icons with purple glow

### 3.6 Packages (`Packages.tsx`)
- Dark glass cards on obsidian background
- Popular card: stronger purple glow ring
- Price numbers in JetBrains Mono
- Duration text in mono font
- Check marks use purple glow instead of green

### 3.7 EntryPoints (`EntryPoints.tsx`)
- Dark glass cards, price in mono font
- Purple-glowing icon containers

### 3.8 Process (`Process.tsx`)
- Vertical timeline line becomes a glowing purple line
- Step circles: dark glass with purple glow border
- Step cards: dark refractive glass panels
- Step numbers in JetBrains Mono

### 3.9 InvestorPerspective (`InvestorPerspective.tsx`)
- Founder photo: apply CSS `grayscale(1)` + `contrast(1.2)` for moody B&W
- Add subtle CSS noise/grain overlay on the photo
- Asymmetric layout: photo left, content right
- Quote in serif font
- Venture logos get subtle brightness treatment for dark bg

### 3.10 Resources (`Resources.tsx`)
- Dark glass cards with purple accents

### 3.11 FAQ (`FAQ.tsx`)
- Dark background, glass-bordered accordion items
- Purple accent on expand indicator

### 3.12 FinalCTA (`FinalCTA.tsx`)
- Large serif headline
- Dark glass card
- Terminal-style email input aesthetic (optional, since it links to Calendly)
- Blinking purple cursor decoration

### 3.13 Footer (`Footer.tsx`)
- Near-invisible grid lines background (`rgba(255,255,255,0.03)`)
- Minimal, dark aesthetic
- Purple accent on hover states
- Logo in white/light treatment

## Phase 4: Button Variants (`button.tsx`)
- `hero` variant: dark glass with purple inner glow on hover, pill-shaped (`rounded-full`)
- `outline` variant: 1px purple/white gradient border, transparent fill
- All buttons get smooth, heavy transitions (`cubic-bezier(0.4, 0, 0.2, 1)`)

## Phase 5: Motion and Polish
- All `animate-slide-up` and `animate-fade-in` updated with heavier, smoother easing curves
- Card hover effects: subtle scale + purple glow intensification
- Smooth scroll behavior preserved

## Files to Create
- `src/components/PreLoader.tsx`

## Files to Modify
- `src/index.css` (complete variable + utility overhaul)
- `tailwind.config.ts` (fonts, keyframes, colors)
- `src/components/Header.tsx`
- `src/components/Hero.tsx`
- `src/components/ImageCarousel.tsx`
- `src/components/Problem.tsx`
- `src/components/About.tsx`
- `src/components/Packages.tsx`
- `src/components/EntryPoints.tsx`
- `src/components/Process.tsx`
- `src/components/InvestorPerspective.tsx`
- `src/components/Resources.tsx`
- `src/components/FAQ.tsx`
- `src/components/FinalCTA.tsx`
- `src/components/Footer.tsx`
- `src/components/ui/button.tsx`
- `src/pages/Index.tsx`

## Scope Limitations
- **Horizontal scroll for Process**: Will be implemented as a standard vertical layout with glass panels rather than true horizontal scroll hijacking, which causes accessibility and mobile issues. Can be iterated on later.
- **"Tear-down scanner" laser**: Will be simplified to a visual treatment on the Problem section cards rather than an interactive scroll-driven before/after, since there are no amateur deck images to scan. Can iterate later.
- **Fonts**: Using Playfair Display (free) instead of PP Editorial New / Ogg (paid). Can swap later if you purchase those fonts.
- **Three.js**: Not needed -- the 3D card tilt will use pure CSS transforms with JS mouse tracking, which is lighter and more performant.

## Technical Notes
- No content, text, or links will be changed
- All language/RTL support preserved
- Mobile responsiveness maintained throughout
- The preloader uses `sessionStorage` to only show once per session
