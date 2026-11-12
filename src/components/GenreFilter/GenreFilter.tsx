
// GenreFilter: the genre menu on the home page. It receives genres, value and onChange through props.
// Like SearchBar, it's a controlled component: the selected genre lives in HomePage's state.

import { ALL_GENRES } from '../../utils/shows'
import styles from './GenreFilter.module.css'

interface GenreFilterProps {
  genres: string[]
  value: string
  onChange: (genre: string) => void
}

// We use const because we don't need to reassign the GenreFilter variable.
// React can still call the component again on every render with updated props.

// This is the GenreFilter dropdown used to select a favorite genre.
// I use key because React needs a unique key for each element when rendering a list.
// Without a key, React will show a warning in the console and may have difficulty tracking list elements.

// I'm passing the onChange function because the parent component (HomePage)
// needs to know when the user selects a different genre.
// The parent owns the state, and the child (GenreFilter) notifies the parent about changes.
//Here, const prevents  from replacing the function. 
//GenreFilter = AnotherComponent // Error
const GenreFilter = ({ genres, value, onChange }: GenreFilterProps) => {
  return (
    <label className={styles.genreFilter}>
      <span className={styles.label}>Genre</span>

      <select
        className={styles.select}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        // The browser/React calls this event handler when the user changes the dropdown.
        // Inside the handler, we call the onChange function received from HomePage.
        // This sends the selected genre to the parent and updates its state.
        // When the state changes, React re-renders HomePage and its child components.
      >
        <option value={ALL_GENRES}>All genres</option>

        {genres.map((genre) => (
          // We use genre as the key because each genre has a unique value.
          // React uses keys to identify list elements between renders.
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
    </label>
  )
}

export default GenreFilter
