import type { FC } from 'react'
import { useRef } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { GALLERY_CATEGORIES } from '../../data/galleryConfig'
import styles from './PortfolioLayout.module.css'

const PortfolioLayout: FC = () => {
  const headerRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(headerRef, { amount: 0.3, once: true })
  const location = useLocation()
  const isIndex = location.pathname === '/portfolio'

  return (
    <section className={styles.section}>
      <div ref={headerRef} className={styles.header}>
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          ПОРТФОЛИО
        </motion.h1>

        {!isIndex && (
          <motion.nav
            className={styles.nav}
            aria-label="Категории портфолио"
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            {GALLERY_CATEGORIES.map((cat) => (
              <NavLink
                key={cat.slug}
                to={`/portfolio/${cat.slug}`}
                className={({ isActive }) =>
                  `${styles.pill} ${isActive ? styles.pillActive : ''}`
                }
              >
                {cat.title}
              </NavLink>
            ))}
          </motion.nav>
        )}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          className={styles.content}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
    </section>
  )
}

export default PortfolioLayout
