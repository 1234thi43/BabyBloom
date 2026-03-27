import type { FC } from 'react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { SERVICE_CATEGORIES } from '../../data/servicesConfig'
import styles from './ServicesIndex.module.css'

const ServicesIndex: FC = () => {
  const gridRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(gridRef, { amount: 0.15, once: true })

  return (
    <div ref={gridRef} className={styles.grid}>
      {SERVICE_CATEGORIES.map((cat, index) => (
        <motion.div
          key={cat.slug}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.1 + index * 0.1,
          }}
        >
          <Link
            to={`/services/${cat.slug}`}
            className={styles.card}
            aria-label={`Открыть пакеты: ${cat.title}`}
          >
            <img
              src={cat.coverImage}
              alt={cat.title}
              className={styles.cardImage}
              loading={index < 2 ? 'eager' : 'lazy'}
            />

            <div className={styles.cardOverlay}>
              <h2 className={styles.cardTitle}>{cat.title}</h2>
              <p className={styles.cardDescription}>{cat.description}</p>
              <span className={styles.cardCount}>
                {cat.packs.length} {cat.packs.length === 1 ? 'пакет' : cat.packs.length < 5 ? 'пакета' : 'пакетов'}
              </span>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}

export default ServicesIndex
