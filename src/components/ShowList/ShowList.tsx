// ShowList: מקבל shows ב-props ומציג ShowCard לכל אחת עם map ו-key={show.id}
import type { Show } from '../../types/show'
import ShowCard from '../ShowCard/ShowCard'
import styles from './ShowList.module.css'

interface ShowListProps {
  shows: Show[]
}

const ShowList = ({ shows }: ShowListProps) => {
  if (shows.length === 0) {
    return <p className={styles.empty}>No shows found.</p>
  }

  return (
    <ul className={styles.showList}>
      {shows.map((show) => (
        <li key={show.id}>
          <ShowCard show={show} />
        </li>
      ))}
    </ul>
  )
}

export default ShowList