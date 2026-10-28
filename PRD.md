# PRD · TV Shows Explorer

TV Shows Explorer is a small web app for browsing TV series from [TVmaze](https://www.tvmaze.com/api). It is for people who want a quick way to scan a catalog, open one show, keep a personal list, and see simple stats — without an account.

It exists so a visitor can explore shows in the browser: search and filter the list, read details, mark favorites that survive a refresh, and glance at genre counts and ratings. Data comes from TVmaze (no API key). There is no login.

Navigation sits on every page: **Home**, **Favorites**, and **Stats**. The current page is marked in the bar.

## Pages

### List — `/`

The home page is the catalog.

While shows load, the user sees **Loading shows...**. If the request fails, they see an error and can try again after checking the connection.

When data is in, they see a grid of cards: poster (or a no-image placeholder), name, rating, and genres. They can search by name and filter by genre; the list updates to matching shows, or an empty message if nothing matches. Clicking a card opens that show’s details.

### Details — `/shows/:id`

This page is one show.

While it loads, the user sees **Loading show...**. If the network fails, they see an error. If the id is missing or not a real show, they see **Show not found**.

When the show loads, they see poster (or no-image), name, genres, rating, summary (plain text, not HTML tags), and schedule/air days, plus a way back to the list. They can add or remove the show from favorites here.

### Favorites — `/favorites`

This page is the user’s saved shows.

If they have none, they see that the list is empty. If they have some, they see the same card layout as home, only those shows. They can remove a favorite from here. Favorites are stored in the browser (`localStorage`) so they remain after refresh.

### Stats — `/stats`

This page is a snapshot of the catalog: how many shows per genre, the average rating (shows with no rating are skipped), and the five highest-rated shows.

### 404 — any other address

This page is for a URL that is not list, details, favorites, or stats. The user sees that the page was not found, and a link back to the list.

## Acceptance

- When I open the home page, I see a loading message and then a list of show cards with poster, name, rating, and genres.
- When I click a show card, I see that show’s details page (image, genres, rating, summary, schedule) without a full page reload.
- When I mark a show as a favorite and open Favorites, I see that show on the list; after I refresh, I still see it.
- When I open Stats, I see genre counts, an average rating, and the five top-rated shows.
- When I open an address that is not a real page, I see a not-found message and a link back to the list.

How the app is built (folders, state, data flow) is in [docs/architecture.md](docs/architecture.md).
