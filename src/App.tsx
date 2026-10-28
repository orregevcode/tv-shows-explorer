import { Route, Routes } from 'react-router'
import type { Show } from './types/show'
import sampleShows from './data/sample-shows.json'
import NavBar from './components/NavBar/NavBar'
import HomePage from './pages/HomePage/HomePage'
import ShowDetailsPage from './pages/ShowDetailsPage/ShowDetailsPage'
import FavoritesPage from './pages/FavoritesPage/FavoritesPage'
import StatsPage from './pages/StatsPage/StatsPage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'

// משימה 1: המידע מגיע מקובץ מקומי. במשימה 3 השורה הזו תוחלף ב-useShows()
const shows: Show[] = sampleShows

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage shows={shows} />} />
        <Route path="/shows/:id" element={<ShowDetailsPage shows={shows} />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App