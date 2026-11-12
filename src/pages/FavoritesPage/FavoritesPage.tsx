// FavoritesPage (/favorites): the shows the user saved with the ♡ button.
// The ids are saved in localStorage (useFavorites), so they are still here after a refresh.
import { Link } from 'react-router'
import type { Show } from '../../types/show'
import { getFavoriteShows } from '../../utils/shows'
import ShowList from '../../components/ShowList/ShowList'
import StatusMessage from '../../components/StatusMessage/StatusMessage'
import styles from './FavoritesPage.module.css'

// The shows come from useShows and the favorites from useFavorites. Both are called in App.
interface FavoritesPageProps {
  shows: Show[]
  isLoading: boolean
  error: string | null
  favoriteIds: number[]
  onToggleFavorite: (id: number) => void
}

const FavoritesPage = ({ shows, isLoading, error, favoriteIds, onToggleFavorite }: FavoritesPageProps) => {
  // Not state: worked out on every render from the full list and the saved ids.
  // Clicking ♥ here removes the id → App re-renders → this list gets shorter right away.
  const favoriteShows = getFavoriteShows(shows, favoriteIds)

  // 4 states: loading, error, no favorites yet, or the list.
  const renderContent = () => {
    if (isLoading) {
      return <StatusMessage type="loading" message="Loading favorites..." />
    }
    if (error) {
      return <StatusMessage type="error" message={error} />
    }
    if (favoriteShows.length === 0) {
      return (
        <div className={styles.empty}>
          <p className={styles.message}>No favorites yet. Click the ♡ on a show to save it here.</p>
          <Link to="/" className={styles.browseLink}>
            Browse shows
          </Link>
        </div>
      )
    }
    return (
      <>
        <p className={styles.message}>
          {favoriteShows.length} saved {favoriteShows.length === 1 ? 'show' : 'shows'}. Click ♥ to remove one.
        </p>
        <ShowList shows={favoriteShows} favoriteIds={favoriteIds} onToggleFavorite={onToggleFavorite} />
      </>
    )
  }

  return (
    <main className={styles.favoritesPage}>
      <h1 className={styles.title}>Favorites</h1>
      {renderContent()}
    </main>
  )
}

export default FavoritesPage
