// NavBar: תפריט ניווט עם NavLink לכל עמוד
import { NavLink } from 'react-router'
import styles from './NavBar.module.css'

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
