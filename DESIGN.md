---
name: Kinetix
description: Marketing site for an experimental, compiled, statically-typed systems language
colors:
  void: "#05050A"
  terminal-surface: "#0D0D14"
  signal-white: "#F0F4F8"
  slate-mist: "#8B9BB4"
  terminal-cyan: "#00F0FF"
  deep-violet: "#7000FF"
  status-green: "#27C93F"
  status-amber: "#FFBD2E"
  status-red: "#FF5F56"
typography:
  display:
    fontFamily: "Inter, -apple-system, sans-serif"
    fontSize: "clamp(2.75rem, 6vw, 4.25rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Inter, -apple-system, sans-serif"
    fontSize: "clamp(1.75rem, 3vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Inter, -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Inter, -apple-system, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "normal"
  mono:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.95rem"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "normal"
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  pill: "20px"
spacing:
  xs: "0.5rem"
  sm: "1rem"
  md: "2rem"
  lg: "4rem"
  xl: "8rem"
components:
  button-primary:
    backgroundColor: "{colors.terminal-cyan}"
    textColor: "{colors.void}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "1rem 1.75rem"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.signal-white}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "1rem 1.75rem"
  badge:
    backgroundColor: "transparent"
    textColor: "{colors.slate-mist}"
    typography: "{typography.mono}"
    rounded: "{rounded.pill}"
    padding: "0.4rem 1rem"
  card-flat:
    backgroundColor: "{colors.terminal-surface}"
    textColor: "{colors.signal-white}"
    rounded: "{rounded.md}"
    padding: "2rem"
---

# Design System: Kinetix

## 1. Overview

**Creative North Star: "The Living Terminal"**

The site reads as a terminal session that's actually running, not a marketing template pretending to be technical. The code showcase in the hero is the credibility anchor — the single genuinely "elevated" surface on the page — and everything else (typography, spacing, the roadmap's real percentages) is built to feel like output from the same machine, not decoration bolted onto a SaaS shell. This explicitly rejects the previous build's approach: gradient-clipped headline text on the logo, hero title, and every section heading; frosted-glass panels on nearly every card and container regardless of whether anything is actually "elevated"; ambient blurred color blobs as pure atmosphere. Vibrancy now comes from restraint — cyan and violet stay in the palette and stay strong where they appear, but they appear on purpose, in one or two places, instead of by default everywhere.

**Key Characteristics:**
- Monospace (JetBrains Mono) carries more weight than before — not just code, but badges, labels, and the version string — reinforcing "terminal," not just "dev tool with a code snippet."
- Exactly one surface on the page gets glass/blur treatment: the code showcase. Every other card and panel is flat.
- Cyan and violet are preserved as a pair but rationed: the hero badge, the primary CTA, and the code syntax highlighting carry them; section headings and feature cards do not.
- Solid, opaque color communicates meaning (status green/amber/red for roadmap phases) instead of translucency communicating "premium."

## 2. Colors

A near-black terminal void with two reserved accent signals (cyan, violet) and a status trio (green/amber/red) doing the semantic work the roadmap needs.

### Primary
- **Terminal Cyan** (#00F0FF): the site's one true action color — primary button fill, active nav/language-switch state, the "Pre-Release" badge glow, in-code keyword/number highlighting. If cyan appears, something is either interactive or true right now.

### Secondary
- **Deep Violet** (#7000FF): reserved for exactly one placement — the hero's ambient glow and the primary CTA's gradient edge. Not used on headings, logos, or section titles anymore.

### Tertiary
- **Status Green** (#27C93F): "done"/100% roadmap states and completed milestone markers.
- **Status Amber** (#FFBD2E): the "Pre-Release" / in-progress signal, window-dot yellow.
- **Status Red** (#FF5F56): window-dot red only; not used as a UI status color (no error states on this site).

### Neutral
- **Void** (#05050A): page background.
- **Terminal Surface** (#0D0D14): the one elevated surface (code showcase) and, flat, every card/panel background.
- **Signal White** (#F0F4F8): primary text, headings.
- **Slate Mist** (#8B9BB4): secondary text, captions, inactive nav links.

### Named Rules
**The One Elevated Surface Rule.** Glass/blur (`backdrop-filter: blur(...)` + translucent background) is permitted on exactly one element on the page: the hero code showcase. Feature cards, roadmap panels, and the mobile nav overlay are flat surfaces with a solid background and a 1px border.

**The Rationed Accent Rule.** Cyan and violet together appear in at most two page regions (hero badge/CTA/code, and nothing else). Section headings, feature-card icons, and body copy use Signal White or Slate Mist, never a gradient clip.

## 3. Typography

**Display Font:** Inter (with -apple-system, sans-serif fallback)
**Body Font:** Inter (same family, lighter weights)
**Label/Mono Font:** JetBrains Mono

**Character:** Inter carries the confident, legible display/body work; JetBrains Mono is elevated beyond the code block into badges, the version tag, and nav micro-labels, so the "terminal" personality shows up outside the hero too.

### Hierarchy
- **Display** (700, `clamp(2.75rem, 6vw, 4.25rem)`, 1.1 line-height, -0.03em tracking): the H1 only. Solid Signal White — no gradient clip.
- **Headline** (700, `clamp(1.75rem, 3vw, 2.25rem)`, 1.2 line-height, -0.02em tracking): section titles (Features, Project Status, Changelog). Solid Signal White, left-aligned where the old design centered them, to read as terminal output rather than a poster.
- **Body** (400, 1rem, 1.6 line-height): paragraph copy, capped at ~65ch on the hero subtitle and feature descriptions.
- **Label** (600, 0.9rem): nav links, button text.
- **Mono** (400/700, 0.95rem, 1.7 line-height): code block, badges, version string, milestone status markers.

### Named Rules
**The No-Gradient-Text Rule.** No `background-clip: text`. Every heading, logo, and label is a solid, single color. Emphasis comes from weight and size, never a fill trick.

## 4. Elevation

Flat by default; blur is a single reserved effect, not a system. The nav bar keeps a functional blur (it's a fixed overlay above scrolling content, so the blur is legibility, not decoration) and the code showcase keeps its glass treatment as the one deliberately "elevated" object on the page. Feature cards and roadmap panels move to flat terminal-surface backgrounds with a 1px border; depth on hover comes from a border-color shift and a small upward translate, not a shadow.

### Shadow Vocabulary
- **cta-glow** (`box-shadow: 0 10px 30px rgba(0, 240, 255, 0.25)`): primary button only, on hover.
- **code-elevation** (`box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5)`): the hero code showcase, at rest.

### Named Rules
**The Flat-By-Default Rule.** Every card and panel outside the hero is flat: solid `terminal-surface` background, 1px `signal-white` @ 8% border, no blur, no shadow at rest.

## 5. Components

### Buttons
- **Shape:** 8px radius (`rounded.sm`) — down from the previous 12px, tighter and more "tool," less "app."
- **Primary:** solid Terminal Cyan fill, Void text, 600-weight label. Hover: `cta-glow` shadow + 2px upward translate. This is the only button using color as fill; it is the CTA.
- **Secondary:** transparent background, 1px Signal-White-at-16% border, Signal White text. Hover: border brightens to full Signal White, no fill change.

### Cards (Feature grid)
- **Corner Style:** 12px radius (`rounded.md`).
- **Background:** solid Terminal Surface (#0D0D14) — no glass.
- **Border:** 1px Signal White @ 8%.
- **Hover:** border brightens to Signal White @ 20%, 4px upward translate. No background blur, no glow.
- **Icon:** kept as a single solid-color glyph, not colored per-card (avoids the "identical rainbow icon grid" tell).

### Code Showcase (signature component)
The one glass surface on the page: `background: var(--terminal-surface)` with `backdrop-filter: blur(20px)`, 1px border, `code-elevation` shadow. Window chrome (traffic-light dots) unchanged — it's the one place decoration is earned, because it's genuinely a floating "window" over the page.

### Navigation
- Fixed, blurred (functional, not decorative — content scrolls beneath it), Signal White logo text (no gradient), Slate Mist inactive links brightening to Signal White on hover, Terminal Cyan for the active language-switch state only.
- Mobile: flat (not glass) full-height panel sliding in from the right; blur removed here too, replaced with a solid Void-at-95% background, since a mobile menu is rarely visible behind scrolling content anyway.

### Roadmap / Progress
- Progress bars: flat track (`rgba(255,255,255,0.05)`), fill in Status Green when complete, Terminal Cyan when in-progress (replacing the previous cyan-violet gradient fill) — the fill color now directly encodes status rather than being decorative.
- Milestone list: unchanged marker/timeline structure, decorative glass removed from the surrounding panel.

## 6. Do's and Don'ts

### Do:
- **Do** use Terminal Cyan as the single accent for anything interactive or currently-true (buttons, active states, in-progress status).
- **Do** keep the code showcase as the only glass/blur surface on the page — it earns the effect by genuinely floating above the layout.
- **Do** use solid Signal White for every heading and logo mark.
- **Do** let JetBrains Mono carry badges, the version tag, and status labels, not just the code block.

### Don't:
- **Don't** use `background-clip: text` gradients on the logo, hero title, or section titles — flat, single-color type only.
- **Don't** apply `backdrop-filter` / translucent glass backgrounds to feature cards, roadmap panels, or the mobile nav — those are flat surfaces with a 1px border.
- **Don't** use ambient blurred color "blobs" as page-background atmosphere.
- **Don't** color feature-card icons in a rainbow rotation — one restrained glyph treatment for all four.
- **Don't** reintroduce a second accent gradient on the progress-bar fill; fill color communicates status (green = done, cyan = active), not decoration.
