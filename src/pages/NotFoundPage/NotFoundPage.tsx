// NotFoundPage (*): shown for any address that isn't a real page
// (the <Route path="*"> in App). It has a link back to the list.
import { Link } from 'react-router'
import styles from './NotFoundPage.module.css'

// Link changes the address without reloading the page, so the app keeps its state.
const NotFoundPage = () => {
  return (
    <main className={styles.notFoundPage}>
      <h1 className={styles.title}>Page not found</h1>
      <p className={styles.message}>That address does not exist.</p>
      <Link to="/" className={styles.backLink}>
        Back to list
      </Link>
    </main>
  )
}

export default NotFoundPage
