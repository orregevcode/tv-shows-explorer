import { Route, Routes } from 'react-router'
import { useShows } from './hooks/useShows'
import NavBar from './components/NavBar/NavBar'
import HomePage from './pages/HomePage/HomePage'
import ShowDetailsPage from './pages/ShowDetailsPage/ShowDetailsPage'
import FavoritesPage from './pages/FavoritesPage/FavoritesPage'
import StatsPage from './pages/StatsPage/StatsPage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'

const App = () => {

  // there is some props drilling in  here i pass the shows down in component 
  const { shows, isLoading, error } = useShows()

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
