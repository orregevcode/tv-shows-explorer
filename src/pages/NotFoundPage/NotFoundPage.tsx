// NotFoundPage (*): כתובת שלא קיימת + קישור חזרה לרשימה
import { Link } from 'react-router'
import styles from './NotFoundPage.module.css'

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
