# chibu.dev

My personal portfolio as a design engineer, featuring my experience and case studies for Medibridge, Knowledge CI and Bulk Airtime.

**Live website:** [chibu.dev](https://chibu.dev)

## Stack

- Next.js 16 and React 19
- TypeScript and Tailwind CSS 4
- Inter 4.1, self-hosted from the [creator's official distribution](https://rsms.me/inter/), with its license in `assets/fonts/inter/`
- Motion for interactions and scroll reveals
- Vercel hosting and Web Analytics
- Bun for package management and scripts
- Oxlint and Oxfmt for linting and formatting

Pages are prerendered at build time. Theme preferences, the clock, image previews, and the case-study sections menu run in the browser. The sections menu reads its saved preference after hydration so it appears in the correct state.

With JavaScript disabled, the site keeps readable content, CSS theme switching, a selectable email address, expandable section navigation, full-size image links, and native video controls.

## For AI agents

The site is set up so agents can read and use it without scraping the page.

- `/llms.txt` gives a markdown summary, the case studies, contact links and the resume.
- Requests with `Accept: text/markdown` get markdown: `/` returns the same summary, and unknown paths return a markdown 404. `/index.md` serves the summary to any client.
- The homepage includes `Person` JSON-LD with work, skills and profile links.
- `/.well-known/agent-skills/index.json` lists one skill, `about-chibuike`, with a SHA-256 digest of its `SKILL.md`.
- `public/webmcp.js` registers two WebMCP tools in browsers that support `navigator.modelContext`: `get_profile` returns the summary, and `draft_email` opens an email draft for the visitor to send.

## Run locally

Install [Bun](https://bun.sh), then clone the repository:

```sh
git clone https://github.com/Chibuike-web/chibu.dev.git
cd chibu.dev
bun install
bun run dev
```

Open [localhost:3000](http://localhost:3000). If that port is occupied, Next.js prints the available port in the terminal.

## Checks and production build

```sh
bun run lint
bun run format:check
bun run typecheck
bun run build
```

To preview the production build locally:

```sh
bun run start
```

To format the project, run `bun run format`.

## Project structure

| Path          | Contents                                                          |
| ------------- | ----------------------------------------------------------------- |
| `app/`        | Homepage, case studies, metadata, agent routes, and global styles |
| `components/` | Page sections, navigation, themes, motion, and image previews     |
| `hooks/`      | Shared browser behavior                                           |
| `assets/`     | Project thumbnails and case-study images                          |
| `public/`     | Images, videos, the resume PDF, and the WebMCP script             |

## Deployment

Vercel deploys pushes to `main` to [chibu.dev](https://chibu.dev). Commit dependency changes with `bun.lock` so local and deployed installs stay consistent.
