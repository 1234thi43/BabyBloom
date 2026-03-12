import { type FC, useState, useCallback } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Header.module.css'

const LogoIcon: FC = () => (
  <svg
    className={styles.logoIcon}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <circle cx="20" cy="22" r="10" fill="#C9A882" opacity="0.9" />
    <ellipse cx="20" cy="14" rx="6" ry="8" fill="#E8DDD0" />
    <circle cx="18" cy="12" r="1.5" fill="#8C7B6E" />
    <circle cx="22" cy="12" r="1.5" fill="#8C7B6E" />
    <path d="M17 18 Q20 16 23 18" stroke="#8C7B6E" strokeWidth="1" fill="none" strokeLinecap="round" />
  </svg>
)

const Header: FC = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.logo}>
          <LogoIcon />
          <span className={styles.logoText}>Baby Bloom</span>
        </div>
        <button
          type="button"
          className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={menuOpen}
        >
          <span className={styles.burgerLine} />
          <span className={styles.burgerLine} />
          <span className={styles.burgerLine} />
        </button>
        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`} aria-hidden={!menuOpen}>
          <NavLink
            to="/"
            className={({ isActive }: { isActive: boolean }) =>
              isActive
                ? `${styles.navLink} ${styles.navLinkActive}`
                : styles.navLink
            }
            onClick={closeMenu}
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
            onClick={closeMenu}
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
            onClick={closeMenu}
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
            onClick={closeMenu}
          >
            Контакты
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Header

