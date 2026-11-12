// ShowList: gets an array of shows in props, and shows a ShowCard for each one.
import type { Show } from '../../types/show'
import ShowCard from '../ShowCard/ShowCard'
import styles from './ShowList.module.css'

// favoriteIds and onToggleFavorite only pass through ShowList on their way to each ShowCard
// (props drilling: App → page → ShowList → ShowCard).
interface ShowListProps {
  shows: Show[]
  favoriteIds: number[]
  onToggleFavorite: (id: number) => void
}

const ShowList = ({ shows, favoriteIds, onToggleFavorite }: ShowListProps) => {
  // No shows (for example the search found nothing): show a message instead of an empty list.
  if (shows.length === 0) {
    return <p className={styles.empty}>No shows found.</p>
  }

  // map() turns every show into an <li> with a ShowCard inside.
  // key={show.id} lets React tell the items apart when the list changes (for example after a search).
  // A key must be unique and stable, and the id from the API is both.
  return (
    <ul className={styles.showList}>
      {shows.map((show) => (
        <li key={show.id}>
          <ShowCard
            show={show}
            isFavorite={favoriteIds.includes(show.id)}
            onToggleFavorite={onToggleFavorite}
          />
        </li>
      ))}
    </ul>
  )
}

export default ShowList