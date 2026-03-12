import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Header/Header.module.css'

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.logo}>Baby Bloom</div>
        <nav className={styles.nav}>
          <NavLink
            to="/"
            className={({ isActive }: { isActive: boolean }) =>
              isActive
                ? `${styles.navLink} ${styles.navLinkActive}`
                : styles.navLink
            }
          >
            Главная
          </NavLink>
          <NavLink
            to="/portfolio"
            className={({ isActive }: { isActive: boolean }) =>
              isActive
                ? `${styles.navLink} ${styles.navLinkActive}`
                : styles.navLink
            }
          >
            Портфолио
          </NavLink>
          <NavLink
            to="/info"
            className={({ isActive }: { isActive: boolean }) =>
              isActive
                ? `${styles.navLink} ${styles.navLinkActive}`
                : styles.navLink
            }
          >
            Инфо
          </NavLink>
          <NavLink
            to="/contacts"
            className={({ isActive }: { isActive: boolean }) =>
              isActive
                ? `${styles.navLink} ${styles.navLinkActive}`
                : styles.navLink
            }
          >
            Контакты
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Header

