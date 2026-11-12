// App: the top component. It shows the NavBar on every page,
// and decides which page to show for each address.
import { Route, Routes } from 'react-router'
import { useShows } from './hooks/useShows'
import { useFavorites } from './hooks/useFavorites'
import NavBar from './components/NavBar/NavBar'
import HomePage from './pages/HomePage/HomePage'
import ShowDetailsPage from './pages/ShowDetailsPage/ShowDetailsPage'
import FavoritesPage from './pages/FavoritesPage/FavoritesPage'
import StatsPage from './pages/StatsPage/StatsPage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'

const App = () => {
  // Props drilling: the shows are passed down through props, App → HomePage → ShowList → ShowCard.
  const { shows, isLoading, error } = useShows()
  // The favorites live here too, because 3 pages need them (list, details, favorites).
  // If each page called useFavorites by itself, each one would get its own separate copy.
  const { favoriteIds, toggleFavorite } = useFavorites()

  // <> </> is a Fragment: it groups NavBar and Routes without adding an extra <div> to the page.
  // <Routes> looks at the address and shows the first <Route> whose path matches.
  // :id in "/shows/:id" is a parameter: the details page reads it with useParams().
  // path="*" matches every other address, so a wrong address shows the 404 page.
  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              shows={shows}
              isLoading={isLoading}
              error={error}
              favoriteIds={favoriteIds}
              onToggleFavorite={toggleFavorite}
            />
          }//passing the props
        />
        <Route
          path="/shows/:id"
          element={<ShowDetailsPage favoriteIds={favoriteIds} onToggleFavorite={toggleFavorite} />}
        />
        <Route
          path="/favorites"
          element={
            <FavoritesPage
              shows={shows}
              isLoading={isLoading}
              error={error}
              favoriteIds={favoriteIds}
              onToggleFavorite={toggleFavorite}
            />
          }
        />
        <Route
          path="/stats"
          element={<StatsPage shows={shows} isLoading={isLoading} error={error} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
