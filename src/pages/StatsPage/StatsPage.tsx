// StatsPage (/stats): will show how many shows are in each genre, the average rating and the top 5.
// For now it's only a title. The real content comes in task 9 (countByGenre, averageRating, topRated).
import styles from './StatsPage.module.css'

const StatsPage = () => {
  return (
    <main className={styles.statsPage}>
      <h1 className={styles.title}>Stats</h1>
      <p className={styles.message}>Statistics will show up here later.</p>
    </main>
  )
}

export default StatsPage
