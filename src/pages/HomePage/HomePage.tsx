// HomePage (/): the list of all the shows, with a search box and a genre filter.
import { useState } from 'react'
import type { Show } from '../../types/show'
import { ALL_GENRES, filterShows, getGenres } from '../../utils/shows'//export logic function from utils 
import SearchBar from '../../components/SearchBar/SearchBar'
import GenreFilter from '../../components/GenreFilter/GenreFilter'
import ShowList from '../../components/ShowList/ShowList'
import StatusMessage from '../../components/StatusMessage/StatusMessage'
import styles from './HomePage.module.css'

interface HomePageProps {
  shows: Show[]
  isLoading: boolean
  error: string | null
  favoriteIds: number[]
  onToggleFavorite: (id: number) => void
}

const HomePage = ({ shows, isLoading, error, favoriteIds, onToggleFavorite }: HomePageProps) => {//getting the props
  // Only this page uses the search text and the genre, so their state lives here and not in App.
  // (State goes in the lowest component that needs it.)
  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState(ALL_GENRES)

 

  // Import reusable business logic functions from utils.
// getGenres extracts the available genres.
// filterShows filters the shows by search text and selected genre.
  const genres = getGenres(shows)
  const filteredShows = filterShows(shows, query, genre)

  // const genres1 = getGenres(shows);
  // console.log(genres);

  // 3 states on the screen: loading, error, or the data.
  const renderContent = () => {
    if (isLoading) {
      return <StatusMessage type="loading" message="Loading shows..." />
    }
    if (error) {
      return <StatusMessage type="error" message={error} />
    }
    // onChange={setQuery}: SearchBar calls setQuery(newText) on every key press →
    // HomePage re-renders → filterShows runs again → ShowList gets the new, shorter list.
    return (
      <>
      
        <div className={styles.toolbar}>
          <SearchBar value={query} onChange={setQuery} />
          <GenreFilter genres={genres} value={genre} onChange={setGenre} />
        </div>
        <p className={styles.count}>
          Showing {filteredShows.length} of {shows.length} shows
        </p>
        <ShowList
          shows={filteredShows}
          favoriteIds={favoriteIds}
          onToggleFavorite={onToggleFavorite}
        />
      </>
    )
  }

  return (
    <main className={styles.homePage}>
      <h1 className={styles.title}>TV Shows</h1>
      {renderContent()}
    </main>
  )
}

export default HomePage
