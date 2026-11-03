// NavBar: the menu at the top of every page (App shows it above <Routes>).
import { NavLink } from 'react-router'
import styles from './NavBar.module.css'

// NavLink is like Link, but it knows whether its address is the current page.
// className can be a function: NavLink calls it with { isActive } and uses the class name it returns,
// so the current page gets the extra isActive style.
// end: Home is active only on exactly "/", and not on every address that starts with "/".
const NavBar = () => {
  return (
    <nav className={styles.navBar}>
      <NavLink to="/" className={styles.brand} end>
        TV Shows
      </NavLink>
      <ul className={styles.links}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.isActive}` : styles.link
            }
            end
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.isActive}` : styles.link
            }
          >
            Favorites
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/stats"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.isActive}` : styles.link
            }
          >
            Stats
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar
