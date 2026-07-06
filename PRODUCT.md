# Product

## Register

brand

## Users

Developers and language enthusiasts discovering Kinetix through GitHub, social links, or word of mouth — technically literate, comparing it against other systems languages (Rust, Zig, Go) and skeptical of hype. They land here to answer three questions fast: what is this language, how far along is it really, and where do I go to try it (docs / install / repo). Secondary audience: the student author's own portfolio/reference use, since the project is explicitly presented as an AI-assisted learning project.

## Product Purpose

Marketing/showcase site for the Kinetix programming language (compiled, statically typed, systems-level, built as an AI-assisted student project). It exists to communicate what the language does, show real code, give an honest read on project maturity (via the phased roadmap and changelog), and route visitors to the Documentation site, the install page, or the GitHub repository. Success = a visitor understands the language's core pitch in one scroll and knows the current build status without digging.

## Brand Personality

Vibrant but essential. Energetic, confident, technically credible — the current dark theme and cyan/purple accent pairing are the established identity and should be preserved, but the current implementation over-decorates: glass-panel cards on nearly every surface, gradient-clipped text on the logo/hero/section headings, glowing blob backgrounds. The personality should read as "a serious, currently-in-motion systems project," not "generic SaaS template." Energy should come from one confident accent treatment and real code/data (the roadmap, the code showcase), not from repeated decorative chrome.

## Anti-references

- Generic dark SaaS/glassmorphism template look: frosted-glass cards on every section, gradient-clipped headline text, blurred color blobs as ambient decoration — all present in the current build and explicitly to be reduced, not amplified.
- Identical feature-card grids with icon + heading + text as the only content pattern.
- Tiny uppercase tracked "eyebrow" labels or numbered section markers (01/02/03) used as reflexive scaffolding.

## Design Principles

- One confident accent, used deliberately — not glass/gradient decoration repeated on every section.
- Real code and real project status (the roadmap, the changelog) are the credibility mechanism; typography and data presentation carry more weight than ornamental chrome.
- Motion supports scanning and hierarchy (balanced scroll reveals, light hero parallax, considered hover states) — never decoration for its own sake, and never at the cost of `prefers-reduced-motion` users.
- Honesty about maturity: the project is pre-release and experimental; the design should read as transparent about progress (phased roadmap, versioned changelog) rather than oversold.

## Accessibility & Inclusion

WCAG AA baseline: body text contrast ≥4.5:1, visible focus states, full `prefers-reduced-motion` alternatives for every animation, bilingual EN/IT support (already present via `data-en`/`data-it` attributes) preserved.
