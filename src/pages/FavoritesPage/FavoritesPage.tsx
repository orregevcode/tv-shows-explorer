// FavoritesPage (/favorites): הסדרות שסומנו כמועדפות
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
