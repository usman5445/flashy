# Flashy — Flashcard Generator

A flashcard app built with React, Redux Toolkit, Formik, React Router and Tailwind CSS. Flashcard data is persisted in `localStorage`.

## Features

- **Create Flashcard** — group title, optional image and description, plus multiple terms (term, definition, optional image). Add/remove term rows and click the edit icon to jump straight into editing a term.
- **My Flashcards** — grid of all saved flashcards with term count and a link to details.
- **Flashcard Details** — title and description on top, term list on the left, term details in the centre with carousel arrows, and a share modal with copy-to-clipboard.

## Getting started

```bash
npm install
npm run dev
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |
| `npm test` | Run the test suite once |
| `npm run test:watch` | Run tests in watch mode |

## Tests

Component and Redux tests use Vitest, React Testing Library and `@testing-library/jest-dom`. Test files live next to the code they cover:

- `src/redux/cardSlice.test.js`
- `src/pages/CreateCard.test.jsx`
- `src/pages/MyCards.test.jsx`
- `src/pages/MyCardDetails.test.jsx`

## Routes

| Path | Page |
|---|---|
| `/` | Create Flashcard |
| `/my-cards` | My Flashcards |
| `/my-cards/:id` | Flashcard Details |

## Deployment

The repository includes `vercel.json` with an SPA rewrite so client-side routes work on refresh.

1. Install the Vercel CLI (once): `npm i -g vercel`
2. From the project root run: `vercel` (first deploy) then `vercel --prod`
3. Or import the GitHub repo at [vercel.com/new](https://vercel.com/new) — Vercel auto-detects Vite (`npm run build`, output `dist`).

After deploying, add the live URL here:

```
Live URL: <add after deployment>
```

## Project structure

```
src/
├── components/      # Shared UI (Navbar)
├── pages/           # CreateCard, MyCards, MyCardDetails (+ tests)
├── redux/           # Redux Toolkit slice, store and localStorage sync
├── tests/           # Test setup and render helpers
├── assets/
├── App.jsx
└── main.jsx         # Router and Redux Provider
```
