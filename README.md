# TV Shows Explorer

A React + TypeScript app for browsing TV shows from the free [TVmaze API](https://www.tvmaze.com/api).
You can search and filter 240 shows, open any show to see its details, save favorites that are still there after a refresh, and see simple stats about all the shows.

Final project for course 2883 (front-end development). Front-end only: no server and no database.

## What the app does

| Page | Address | What you can do there |
|---|---|---|
| Home | `/` | Browse 240 shows, search by name, filter by genre, and click ♡ to save a show |
| Details | `/shows/:id` | See the poster, rating, genres, status, premiere date, airing days, language and summary, and save the show with ♡ |
| Favorites | `/favorites` | See the shows you saved, and remove one with ♥. They are saved in the browser (`localStorage`) |
| Stats | `/stats` | See the number of shows, the average rating, the 5 highest-rated shows, and how many shows there are in each genre |
| 404 | any other address | A "Page not found" message with a link back to the list |

Every page that loads data shows a loading message while it waits, and an error message if the network fails.

## The API

The data comes from [TVmaze](https://www.tvmaze.com/api). It is free and doesn't need an API key.

| Request | Used for |
|---|---|
| `GET https://api.tvmaze.com/shows` | The list of 240 shows (home, favorites and stats pages) |
| `GET https://api.tvmaze.com/shows/:id` | One show (details page) |

## How to run it

You need [Node.js](https://nodejs.org) 22.22 or newer (the project was built with Node 24) and npm.

```bash
git clone https://github.com/orregevcode/tv-shows-explorer.git
cd tv-shows-explorer
npm install
npm run dev
```

Then open the address Vite prints in the terminal (usually http://localhost:5173).

## How to run the tests

```bash
npm test          # runs all the tests once in the terminal
npm run test:ui   # opens the Vitest UI in the browser
```

There are 25 unit tests in `src/utils/shows.test.ts`, written with [Vitest](https://vitest.dev).
They test the app's logic: search and genre filter, the genre list, removing HTML from the summary, the airing schedule text, the stats (genre counts, average rating, top rated) and the favorites.

## Other scripts

| Command | What it does |
|---|---|
| `npm run build` | Checks the TypeScript types and builds the app into `dist/` |
| `npm run preview` | Serves the built app from `dist/` |
| `npm run lint` | Checks the code with Oxlint |

## Built with

- [React 19](https://react.dev) and [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vite.dev) for the dev server and the build
- [React Router](https://reactrouter.com) for the pages and addresses
- [Vitest](https://vitest.dev) and Vitest UI for the tests
- CSS Modules for the styles (one `.module.css` file next to each component)

## Project structure

```
src/
├── api/          the fetch calls to TVmaze
├── hooks/        useShows, useShow, useFavorites (state + useEffect)
├── utils/        pure logic functions, and their tests
├── components/   NavBar, ShowList, ShowCard, SearchBar, GenreFilter, FavoriteButton, StatusMessage
├── pages/        HomePage, ShowDetailsPage, FavoritesPage, StatsPage, NotFoundPage
└── types/        the Show type
```

## Project documents

- [PRD.md](PRD.md): who the app is for, the pages, and the acceptance lines
- [tasks.md](tasks.md): the tasks in build order, each with a "Done when" line
- [docs/architecture.md](docs/architecture.md): the folders, naming rules, where the state lives and how the data flows
- [PROMPTS.md](PROMPTS.md): the log of prompts sent to the coding agent
