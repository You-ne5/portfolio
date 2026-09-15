# Portfolio configuration guide

Everything you see on the site comes from the files in **`src/content/`**. You never need to touch the components to change text, add a project, or hide a section.

## 1. Quick start

```bash
npm run dev     # local preview at http://localhost:3000 (hot reloads when you edit content)
npm run build   # production build — run this before pushing to catch content mistakes
```

**Deploying:** the site is hosted on Vercel. Commit your changes and `git push`, and Vercel rebuilds and publishes it in about a minute. If the build fails, Vercel keeps the previous version online and shows the error in the deployment logs.

## 2. Where things live

| File | Controls |
| --- | --- |
| `src/content/site.ts` | Site name, URL, SEO/social metadata, favicon, default theme, **section on/off switches**, footer |
| `src/content/nav.ts` | Top navigation bar: logo text, section links, Contact button |
| `src/content/hero.ts` | Status badge, name, role, tagline, buttons, CV, stats, hero illustration |
| `src/content/quote.ts` | The quote shown right below the hero |
| `src/content/about.ts` | About heading, bio, portrait, focus chips |
| `src/content/skills.ts` | Skill categories and the skills in each |
| `src/content/experience.ts` | Timeline entries |
| `src/content/projects.ts` | Project cards |
| `src/content/projects/<slug>.md` | Long-form project details pages |
| `src/content/languages.ts` | Spoken languages |
| `src/content/contact.ts` | Contact heading and links |
| `public/` | Images, CV, icons, favicon, social preview image |

These files don't need editing: `src/content/types.ts` (field definitions) and `src/content/index.ts`.

Your editor autocompletes field names and underlines mistakes in red. Hover over a field to see what it expects.

## 3. Site settings (`site.ts`)

```ts
name: "Younes Mohammedi",
url: "https://your-domain.com",          // your real Vercel URL or custom domain
meta: {
  title: "Younes Mohammedi — Junior Software Developer", // browser tab + Google result title
  titleTemplate: "%s | Younes Mohammedi",                // used on project pages ("%s" = project title)
  description: "…",                                     // Google snippet + link previews
  ogImage: "/og.png",                                    // link preview image, 1200×630, in public/
  favicon: "/favicon.ico",                               // replace public/favicon.ico or point to another file
  keywords: ["…"],
},
theme: { default: "dark" },   // "dark" | "light" | "system" for first-time visitors
footer: {
  copyright: "All rights reserved. Built with precision.", // shown after "© 2026 Younes Mohammedi."
  note: "UTC+1 • Crafting Robust Software",                // the part after the last "•" is highlighted
},
```

The theme toggle remembers each visitor's choice. `theme.default` only applies to someone who has never clicked it.

## 4. Showing and hiding sections

```ts
sections: {
  hero: true,
  quote: true,
  about: true,
  skills: true,
  experience: false,   // ← hidden
  projects: true,
  languages: true,
  contact: true,
},
```

- Section backgrounds keep alternating automatically when you hide one.
- A section with an empty list (no projects, no languages…) is hidden automatically too.
- If `projects` is hidden, the "View My Work" button (which points to `#projects`) disappears and project detail pages are not built.

### Background patterns

About, Skills, Experience, Projects, Languages and Contact can each show an animated red texture behind their content. Add a `background` line to that section's content file:

```ts
background: { pattern: "grid", intensity: "medium", speed: 1 },
```

| Field | Values | Default |
| --- | --- | --- |
| `pattern` | `"grid"` (squares with blinking cells), `"lines"` (sliding diagonal stripes), `"scanlines"` (CRT lines with a sweeping band), `"dots"` (dot matrix with a passing wave), `"none"` | — |
| `intensity` | `"subtle"`, `"medium"`, `"strong"` | `"medium"` |
| `speed` | multiplier: `0.5` = half, `2` = double (must be > 0 and ≤ 10) | `1` |

- Remove the line, or use `pattern: "none"`, to turn the texture off.
- Patterns fade out toward the section's edges, and are a bit softer in light mode.
- Visitors with "reduce motion" turned on see the pattern without animation.
- Patterns are pure CSS: tweak their colors, sizes and timings in the "Section background patterns" block of `src/app/globals.css`.

## 5. Section reference

Text fields accept any string. `?` means optional: delete the line to remove that element from the page.

### Navigation bar (`nav.ts`)

```ts
logo: "younes",                                  // shown top-left as "> younes_" (blinking cursor)
links: [
  { label: "About", href: "#about" },            // "#section" scrolls to a section; full URLs work too
  { label: "Projects", href: "#projects" },
],
cta: { label: "Contact", href: "#contact" },     // button next to the theme toggle; remove to hide it
```

- Links (and the button) pointing to a hidden section are removed automatically.
- Section links also work from project pages: they go back to the home page and jump to that section.
- On phones the links are hidden to save space; the logo, button, and theme toggle stay.

### Hero (`hero.ts`)

```ts
status: { label: "System Online • Ready for Deploy", pulse: true }, // remove to hide the badge
name: "Younes Mohammedi",
role: "Junior Software Developer",
tagline: "…",
primaryCta: { label: "View My Work", href: "#projects" },  // href: "#section-id", a URL, or a /public file
cv: { href: "/cv.pdf", label: "Download CV" },             // remove to hide the button
email: { address: "you@example.com", label: "Email me" },  // email card at the bottom-right, above the quote; remove to hide
stats: [
  { value: "4+", label: "Years of experience" },           // 1–4 stats fit best
],
illustration: {                                            // animated ASCII planet card
  enabled: true,                                            // false hides the card; the text uses the full width
  speed: 1,                                                 // 0.5 = half speed, 2 = double (must be > 0 and ≤ 10)
  stars: true,                                              // twinkling stars behind the planet
  mouseTilt: true,                                          // tilts toward the mouse on desktop
  chips: ["cluster: active", "lat: 14ms"],                  // [top-left, bottom-right] labels; "" hides one
},
```

The planet animation pauses when it's scrolled out of view or the tab is hidden, and shows a still frame to visitors who have "reduce motion" turned on. Its shape and characters live in `src/lib/ascii-planet.ts` if you ever want to tweak the drawing itself.

Section ids you can link to with `#`: `quote`, `about`, `skills`, `experience`, `projects`, `languages`, `contact`.

### Quote (`quote.ts`)

```ts
text: "Coding is to programming what typing is to writing",
author: "Leslie Lamport",   // optional — remove to show the quote alone
rain: true,                 // falling katakana "terminal rain" behind the quote; false turns it off
rainSpeed: 1,               // 0.5 = half speed, 2 = double (must be > 0 and ≤ 10)
```

The rain pauses when it's scrolled out of view or the tab is hidden, and shows a still frame to visitors with "reduce motion" turned on.

It shares the hero's background, so hiding it with `sections.quote: false` doesn't change the colors of the sections below.

### About (`about.ts`)

```ts
heading: { eyebrow: "About me", title: "Engineering precision & practical execution" },
bio: "One paragraph…",                                // or ["Paragraph 1…", "Paragraph 2…"]
portrait: { src: "/images/portrait.jpg", alt: "Portrait of Younes Mohammedi" },
focus: [
  { label: "Mobile & Desktop (Flutter)", icon: Smartphone },  // icons: see section 8
],
```

### Skills (`skills.ts`)

Add a skill to an existing category:

```ts
{ name: "Docker", icon: "docker" },
```

Add a new category:

```ts
{
  name: "Cloud",
  description: "Hosting and infrastructure",
  items: [
    { name: "Vercel", icon: "vercel" },
    { name: "AWS" },                      // no icon → letter tile "A"
  ],
},
```

Optional `color: "#FF9900"` overrides the icon's brand color.

### Experience (`experience.ts`)

Entries appear in the order written, so put the newest first.

```ts
{
  company: "Unigo",
  companyUrl: "https://unigo.example",    // optional — makes the company name a link
  role: "Mobile Developer",
  period: "Sept 2025 – Feb 2026",         // free text
  location: "Algiers, Algeria",           // optional
  highlights: ["Did X…", "Built Y…"],
},
```

### Projects (`projects.ts`)

```ts
{
  title: "Unigo Carpool",
  category: "Mobile App",
  summary: "Short description shown on the card.",
  tags: ["Flutter", "Bloc", "Firebase"],
  image: { src: "/projects/unigo/cover.png", alt: "Unigo home screen" }, // optional, 16:9
  link: "https://github.com/You-ne5/unigo",                               // optional — the ↗ arrow
  details: "unigo",                                                        // optional — see section 9
},
```

- **With `details`:** the whole card is clickable and opens `/projects/unigo`.
- **With `link`:** the ↗ arrow opens that URL in a new tab.
- **With neither:** the card is display-only.

### Spoken languages (`languages.ts`)

```ts
{ name: "German", nativeName: "Deutsch", level: "beginner" },
```

- `level` sets the badge style:
  - `"native"`: filled accent
  - `"fluent"`: accent tint
  - `"intermediate"`
  - `"beginner"`: muted
- Add `levelLabel: "B1"` to change the badge text but keep the style.

### Contact (`contact.ts`)

```ts
{ label: "Discord Profile", href: "https://discord.com/users/<your-user-id>", icon: "discord" },
```

- `href` must start with `https://`, `http://`, `mailto:` or `tel:`.
- Web links open in a new tab.
- Contact icons always use the text color, turning accent on hover.
- **Your Discord user ID:** in Discord, Settings → Advanced → enable Developer Mode, then right-click your name → Copy User ID.

## 6. Images

Put image files in `public/`, and reference them **from the site root** (leave out `public`):

| Image | Suggested file | Ratio | Config |
| --- | --- | --- | --- |
| Hero illustration | `public/images/hero.png` | 1:1 (≥ 880px) | `hero.illustration.image` |
| Portrait | `public/images/portrait.jpg` | 1:1 (≥ 512px) | `about.portrait` |
| Project cover | `public/projects/<slug>/cover.png` | 16:9 (≥ 1280×720) | `projects.items[].image` |
| Social preview | `public/og.png` | 1200×630 | `site.meta.ogImage` |

- The content files already contain commented-out image lines. Drop the file in place, then remove the `//`.
- Until an image is set, a placeholder shows the path where it should go.
- Images are resized and converted to modern formats automatically, so a normal PNG or JPG is fine.
- **If a path is wrong, the build fails** with a message naming the missing file. A broken image never goes live.

## 7. CV

1. Put your file at `public/cv.pdf`.
2. In `hero.ts`, uncomment `cv: { href: "/cv.pdf", label: "Download CV" }`.

To replace the CV later, overwrite `public/cv.pdf` and push.

## 8. Icons

`icon` accepts three kinds of value.

**1. Brand icon by slug** (most skills):
- Search on <https://simpleicons.org>. The slug is the last part of the icon's URL, in lowercase with no spaces (`gnubash`, `googlecloud`, `nextdotjs`…).
- The brand color is used automatically. If that color would be unreadable (for example, black GitHub on the dark theme), the icon switches to the text color in that theme.
- An unknown slug **fails the build** with a hint.
- Some brands aren't in Simple Icons for trademark reasons: LinkedIn, Java, VS Code, Microsoft, Oracle, Google Workspace. Alternatives: Java → `openjdk`, Google Workspace → `google`, or a custom SVG / lucide icon.

**2. Custom SVG file:**
```ts
{ name: "LinkedIn", icon: "/icons/linkedin.svg" }
```
- Use a single-color SVG with a square viewBox (e.g. 24×24), placed in `public/icons/`. It is used as a shape and painted in the text color (or `color` if set).

**3. Lucide icon** (generic, non-brand icons such as Mail, Database, Smartphone):
```ts
import { Database } from "lucide-react";   // top of the content file
{ name: "SQL", icon: Database }
```
- Browse names at <https://lucide.dev/icons> (the name in PascalCase: `code-xml` becomes `CodeXml`).

**No icon:** leave `icon` out and a small tile with the first letter is shown.

## 9. Project details pages

1. Create `src/content/projects/<slug>.md`. The slug is lowercase with dashes, e.g. `esi-archive.md`.
2. Add `details: "<slug>"` to that project in `projects.ts`.
3. Put screenshots in `public/projects/<slug>/`.

What the page shows:
- **From `projects.ts`:** the back link, category, title, summary, tags, the "Visit project" button (from `link`) and the cover image.
- **From the `.md` file:** the body.

Markdown tips:
- Start headings at `##`, because the project title is already the page's main heading.
- Image paths are relative to the project's folder: `![Home screen](home.png)` loads `public/projects/<slug>/home.png`. Absolute paths (`/images/x.png`) and full URLs also work.
- GitHub-flavored Markdown works: tables, task lists, ~~strikethrough~~ and autolinks.
- Raw HTML is not rendered, so HTML comments (`<!-- … -->`) are safe for notes.
- If a referenced image or the `.md` file is missing, the build fails.

## 10. Theme colors

Colors are defined once in `src/app/globals.css`:
- `:root, [data-theme="light"]` holds the light palette.
- `[data-theme="dark"]` holds the dark palette.

Tokens:

| Token | Used for |
| --- | --- |
| `--canvas` / `--canvas-alt` | Alternating section backgrounds |
| `--surface` | Cards and chips |
| `--line` | Borders and dividers |
| `--fg` / `--muted` | Main and secondary text |
| `--accent` / `--accent-hover` | Crimson highlights and buttons |
| `--glow-opacity` | Strength of the red background glows |

If you change `--surface`, update `CHIP_SURFACE` in `src/lib/theme.ts` to match. That's what the icon contrast check compares against.

**Fonts** are loaded in `src/app/layout.tsx` and mapped in the same `@theme inline` block:

| Token | Font | Used for |
| --- | --- | --- |
| `--font-display` | VT323 | Name, role, section titles, stat numbers, project and experience titles |
| `--font-sans` / `--font-mono` | JetBrains Mono | Everything else, including the ASCII planet |

The ASCII planet's grid is sized for JetBrains Mono's character width, so keep it on that font.

## 11. Troubleshooting

When the content has a mistake, `npm run build` (and the dev server) stops with a list like:

```
Content validation failed:
  - skills.categories[3] "Tools".items[2] "VS Code".icon: unknown Simple Icons slug "vscode". …
  - about.portrait.src: file "/images/portait.jpg" not found (expected public/images/portait.jpg)
  - projects.items[1] "Unigo Carpool".details: markdown file src/content/projects/unigo.md does not exist
```

Each line gives the exact location. Common causes:
- **`file … not found`:** a typo in the path, a wrong extension (`.jpg` vs `.png`), or the file isn't in `public/`.
- **`unknown Simple Icons slug`:** search the brand on simpleicons.org, or use a custom SVG or lucide icon.
- **Type errors** (`Type '"expert"' is not assignable…`): the field only accepts specific values; hover it in your editor to see them.
- **Warnings** (the build still passes): a `.md` file no project uses, or more than 4 hero stats.
