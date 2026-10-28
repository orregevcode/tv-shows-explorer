// SearchBar: שדה חיפוש. מקבל value ו-onChange ב-props
import styles from './SearchBar.module.css'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

// controlled input: הערך מגיע מה-state של ההורה, וכל הקלדה מעדכנת אותו דרך onChange
const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <label className={styles.searchBar}>
      <span className={styles.label}>Search</span>
      <input
        className={styles.input}
        type="search"
        placeholder="Search by name..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  )
}

export default SearchBar
