// HomePage (/): רשימה + חיפוש + סינון לפי ז'אנר. ה-state של query ו-genre נמצא כאן
import type { Show } from '../../types/show'
import ShowList from '../../components/ShowList/ShowList'
import StatusMessage from '../../components/StatusMessage/StatusMessage'
import styles from './HomePage.module.css'

interface HomePageProps {
  shows: Show[]
  isLoading: boolean
  error: string | null
}

const HomePage = ({ shows, isLoading, error }: HomePageProps) => {
  // שלושה מצבים: טוען, שגיאה, יש מידע
  const renderContent = () => {
    if (isLoading) {
      return <StatusMessage type="loading" message="Loading shows..." />
    }
    if (error) {
      return <StatusMessage type="error" message={error} />
    }
    return <ShowList shows={shows} />
  }

  return (
    <main className={styles.homePage}>
      <h1 className={styles.title}>TV Shows</h1>
      {renderContent()}
    </main>
  )
}

export default HomePage
