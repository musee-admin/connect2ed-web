# Link2Ed Website

Marketing website for [Link2Ed](https://link2ed.in), a purpose-built platform connecting school psychology, special education teams, counsellors, therapists, parents, and school leadership in one structured workflow.

Built with [Next.js](https://nextjs.org/) (static export) and hosted on [Vercel](https://vercel.com).

## Tech Stack

- **Framework:** Next.js 15 (Pages Router)
- **UI:** React 19, CSS Modules
- **Content:** Markdown with YAML frontmatter (`frontmatter-markdown-loader`)
- **SEO:** Custom `<Seo>` component with JSON-LD schema
- **Linting:** ESLint + Prettier
- **Sitemap:** `next-sitemap`

## Getting Started

```bash
npm install
npm run dev
```

Opens at [http://localhost:3200](http://localhost:3200).

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server on port 3200 |
| `npm run build` | Build static export to `out/` |
| `npm run lint` | Run ESLint |
| `npm run format:fix` | Format code with Prettier |

## Project Structure

```
├── components/       # Reusable UI components (Layout, SiteHeader, Seo, etc.)
├── content/pages/    # Page content as Markdown + frontmatter
├── lib/              # Utility modules (e.g. JSON-LD schema)
├── pages/            # Next.js page routes (file-system routing)
├── public/           # Static assets (images, fonts, etc.)
├── sections/         # Page section components rendered from markdown
└── global/           # Global styles
```

### Adding a Page

1. Create a Markdown file in `content/pages/` with frontmatter (`seo`, `sections`)
2. Create a corresponding page in `pages/` importing the markdown attributes
3. Add the route to `NAV_LINKS` in `components/SiteHeader.jsx`

## License

ISC
