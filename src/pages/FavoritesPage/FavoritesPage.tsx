// FavoritesPage (/favorites): will show the shows the user saved as favorites.
// For now it's only a title. The real content comes in task 8.
import styles from './FavoritesPage.module.css'

const FavoritesPage = () => {
  return (
    <main className={styles.favoritesPage}>
      <h1 className={styles.title}>Favorites</h1>
      <p className={styles.message}>No favorites yet.</p>
    </main>
  )
}

export default FavoritesPage
