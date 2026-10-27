// HomePage (/): רשימה + חיפוש + סינון לפי ז'אנר. ה-state של query ו-genre נמצא כאן
import type { Show } from '../../types/show'
import ShowList from '../../components/ShowList/ShowList'
import styles from './HomePage.module.css'

interface HomePageProps {
  shows: Show[]
}

const HomePage = ({ shows }: HomePageProps) => {
  return (
    <main className={styles.homePage}>
      <h1 className={styles.title}>TV Shows</h1>
      <ShowList shows={shows} />
    </main>
  )
}

export default HomePage