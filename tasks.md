# Tasks

Build order from the table at the end of [docs/architecture.md](docs/architecture.md). One task at a time.

## 1. List from local JSON — done

`types/show.ts`, `data/sample-shows.json`, `ShowList/`, `ShowCard/`, `HomePage/`

**Done when:** On `/` I see a grid of show cards, each with poster (or no-image), name, rating, and genres.

## 2. Routing — done

`main.tsx`, `App.tsx`, `NavBar/`, `ShowDetailsPage/`, `NotFoundPage/`

**Done when:** Clicking a card opens `/shows/:id` without a full reload, Home / Favorites / Stats in the nav mark the current page, and a fake URL such as `/nope` shows “Page not found” with a link back to the list.

## 3. Real fetch, loading, and error — done

`api/tvmaze.ts`, `hooks/useShows.ts`, `hooks/useShow.ts`, `StatusMessage/`

**Done when:** Home shows “Loading shows...” then about 240 cards; a details page shows “Loading show...”; `/shows/abc` shows “Show not found”; with the network offline I see the error message. `npm run build` and `npm run lint` pass.

## 4. Vitest

`utils/shows.ts`, `utils/shows.test.ts`, `package.json` (`test`, `test:ui`)

**Done when:** `npm test` runs and passes for `filterShows`, `stripHtml`, `averageRating`, `topRated`, and `toggleId`.

## 5. Search and filter

`SearchBar/`, `GenreFilter/`, `HomePage/`

**Done when:** On `/` I can type a name and pick a genre; the list shrinks to matches (case-insensitive), and a query with no matches shows the empty message.

## 6. Full details page

`ShowDetailsPage/`, `stripHtml`

**Done when:** On `/shows/:id` I see summary as plain text (no HTML tags) plus schedule / air days, along with image, genres, and rating.

## 7. Favorites hook and button

`hooks/useFavorites.ts`, `FavoriteButton/`, `App.tsx`

**Done when:** On a card and on the details page I can toggle a favorite; the heart state updates immediately.

## 8. Favorites page

`FavoritesPage/`

**Done when:** `/favorites` lists only shows I marked; I can remove one there; after refresh the remaining favorites are still there. An empty list shows “No favorites yet.”

## 9. Stats

`StatsPage/`, `countByGenre`, `averageRating`, `topRated`

**Done when:** `/stats` shows a count per genre, an average rating that ignores nulls, and the five highest-rated shows.

## 10. Layout and narrow screen

All `.module.css` files, `index.css`

**Done when:** Home, details, favorites, and stats look usable at a wide desktop width and at a phone-width viewport (cards wrap, nav stays readable, no horizontal overflow).

## 11. README

`README.md`

**Done when:** `README.md` says what the app is, how to install, and how to run `npm run dev` (and tests if they exist).
