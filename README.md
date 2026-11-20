# Interactive Portfolio

[![CI](https://github.com/sravani551/Digital-Profile/actions/workflows/ci.yml/badge.svg)](https://github.com/sravani551/Digital-Profile/actions/workflows/ci.yml)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38BDF8)

My personal portfolio: an interactive resume with an experience timeline, a skills graph and an
AI assistant that answers questions about my background.

## Highlights

- **Next.js 14 App Router** with TypeScript and Tailwind CSS; static pages plus edge API routes
- **AI chat assistant** (`/api/chat`): an edge function that builds a system prompt from structured
  resume data and calls an LLM through OpenRouter. The endpoint is public and spends a paid key, so
  it accepts only user/assistant turns, keeps the last 12 and caps each at 2,000 characters
  (client-supplied system prompts are dropped)
- **Single source of truth**: all content lives in `src/data/resume-data.ts`; the UI and the
  assistant both read from it
- **Dynamic Open Graph image** generated at `/og-image.png` for link previews
- Animations with Framer Motion; icons from Lucide

## Project structure

```
src/
  app/
    page.tsx              landing page
    api/chat/route.ts     AI assistant endpoint
    og-image.png/route.tsx  generated social preview image
  components/             Hero, Experience timeline, Skills graph, Chat widget, Navigation
  data/resume-data.ts     profile, experience, skills, certifications
```

## Run locally

```bash
npm ci
cp .env.example .env.local   # add OPENROUTER_API_KEY to enable the chat assistant
npm run dev                  # http://localhost:3000
```

Without an API key the site works normally and the assistant replies that it isn't configured.

## Quality

`npm run lint` and `npm run build` (type checking) run in GitHub Actions on every push and pull request.
