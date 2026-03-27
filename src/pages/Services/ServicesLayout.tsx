import type { FC } from 'react'
import { useRef } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { SERVICE_CATEGORIES } from '../../data/servicesConfig'
import styles from './ServicesLayout.module.css'

const ServicesLayout: FC = () => {
  const headerRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(headerRef, { amount: 0.3, once: true })
  const location = useLocation()
  const isIndex = location.pathname === '/services'

  return (
    <section className={styles.section}>
      <div ref={headerRef} className={styles.header}>
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          Услуги и стоимость
        </motion.h1>

        {isIndex && (
          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          >
            Выберите направление съёмки — и подберите пакет под ваши пожелания и бюджет
          </motion.p>
        )}

        {!isIndex && (
          <motion.nav
            className={styles.nav}
            aria-label="Категории услуг"
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            {SERVICE_CATEGORIES.map((cat) => (
              <NavLink
                key={cat.slug}
                to={`/services/${cat.slug}`}
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

export default ServicesLayout
