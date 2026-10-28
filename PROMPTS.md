# יומן פרומפטים

## 2026-10-29

**00:22 · Cursor**

> why the page is not load after i use broser router

**00:24 · Cursor**

> make in the folder of arcitecture i gone 10 changes per commit so it be esay to review

**00:53 · my note (Task 3)**

- The Task 3 code came from Claude Code in a separate chat outside the project folder, so those prompts were not logged here.
- I pasted `api/tvmaze.ts`, `hooks/useShows.ts` and `hooks/useShow.ts` myself. Claude wrote the other 5 files into the repo.
- Checked: `npm run build` and `npm run lint` pass, 240 shows load, "Loading show..." appears, `/shows/abc` shows "Show not found", no console errors.
- Problems found while testing: `/shows/abc` stayed on "Loading..." forever, because `Number('abc')` is `NaN` and `NaN !== NaN`. Fixed with `Number.isInteger`. The linter warned about `setState` inside `useEffect`, fixed by storing the id together with the result in `useShow`.
- Still to check myself: DevTools Network set to Offline shows the error message.

**01:11 · Cursor**

> Read docs/architecture.md and the code in src. Write PRD.md for this app: who it is for, why it exists, the pages (list, details, favorites, stats, 404), and what the user sees on each one. Add 5 acceptance lines in the format “When I…, I see…”. Link to docs/architecture.md at the end. No code changes

**01:12 · Cursor**

> Write tasks.md with up to 12 tasks in build order, following the table at the end of docs/architecture.md. Mark tasks 1–3 as done. Every task gets a “Done when:” line I can check in the browser or terminal. No code changes

**01:38 · my note (PRD fix, Tasks 4–5)**

- Cursor ran out of credits, so the PRD/tasks review fixes and Tasks 4 and 5 were done with Claude Code in a separate chat outside the project folder. Those prompts were not logged here.
- PRD and tasks: after reviewing them, fixed 4 things: a search acceptance line, `test:ui` and at least 5 tests in Task 4, tests and the API in the README task, and a new Task 12 "Final check".
- Task 4: installed Vitest 5.0.5 and `@vitest/ui`, added the `test` and `test:ui` scripts, and wrote 7 functions in `utils/shows.ts` with 18 tests. Claude checked: `npm test` passes 18/18, and `npm run test:ui` shows 18 pass. To make sure the tests catch bugs, it broke `filterShows` and `toggleId` on purpose, 3 tests failed, then it restored the file.
- Task 5: added `SearchBar` and `GenreFilter`, with `query` and `genre` state in `HomePage`. Claude checked: "BREAK" shows only Breaking Bad, "BREAK" + Comedy shows "No shows found.", Anime shows 4 shows, phone width works, no console errors.
