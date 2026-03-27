import { type FC, useState, useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { NavLink } from 'react-router-dom'
import styles from './Header.module.css'

const navLinkClass = ({ isActive }: { isActive: boolean }, base: string) =>
  isActive ? `${base} ${styles.navLinkActive}` : base

const MenuLinks: FC<{ onNavigate: () => void }> = ({ onNavigate }) => (
  <>
    <NavLink to="/" className={(opt) => navLinkClass(opt, styles.navLink)} onClick={onNavigate}>
      Главная
    </NavLink>
    <NavLink to="/portfolio" className={(opt) => navLinkClass(opt, styles.navLink)} onClick={onNavigate}>
      Портфолио
    </NavLink>
    <NavLink to="/info" className={(opt) => navLinkClass(opt, styles.navLink)} onClick={onNavigate}>
      Услуги и стоимость
    </NavLink>
    <NavLink to="/contacts" className={(opt) => navLinkClass(opt, styles.navLink)} onClick={onNavigate}>
      Контакты
    </NavLink>
  </>
)

const LOGO_SRC = '/images/logo/baby-bloom-logo-without-background.png'

const LogoIcon: FC = () => (
  <img
    className={styles.logoIcon}
    src={LOGO_SRC}
    alt=""
    loading="lazy"
    decoding="async"
  />
)

const Header: FC = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

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
        <nav className={`${styles.nav} ${styles.navDesktop}`} aria-hidden={false}>
          <MenuLinks onNavigate={closeMenu} />
        </nav>
        {createPortal(
          <nav
            className={`${styles.navOverlay} ${menuOpen ? styles.navOpen : ''}`}
            aria-hidden={!menuOpen}
          >
            <MenuLinks onNavigate={closeMenu} />
          </nav>,
          document.body
        )}
      </div>
    </header>
  )
}

export default Header

