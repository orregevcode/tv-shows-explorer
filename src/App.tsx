// App: the top component. It shows the NavBar on every page,
// and decides which page to show for each address.
import { Route, Routes } from 'react-router'
import { useShows } from './hooks/useShows'
import NavBar from './components/NavBar/NavBar'
import HomePage from './pages/HomePage/HomePage'
import ShowDetailsPage from './pages/ShowDetailsPage/ShowDetailsPage'
import FavoritesPage from './pages/FavoritesPage/FavoritesPage'
import StatsPage from './pages/StatsPage/StatsPage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'

const App = () => {
  // Load all the shows ONCE here, because more than one page needs them (list, favorites, stats).
  // Props drilling: the shows are passed down through props, App → HomePage → ShowList → ShowCard.
  // At this size that is fine. In a bigger app, React Context could stop passing props through every level.
  const { shows, isLoading, error } = useShows()

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
          element={<HomePage shows={shows} isLoading={isLoading} error={error} />}
        />
        <Route path="/shows/:id" element={<ShowDetailsPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
