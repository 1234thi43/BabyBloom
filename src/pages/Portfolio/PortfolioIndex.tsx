import type { FC } from 'react'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import manifest from 'virtual:gallery-manifest'
import { GALLERY_CATEGORIES } from '../../data/galleryConfig'
import styles from './PortfolioIndex.module.css'

const PortfolioIndex: FC = () => {
  const gridRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(gridRef, { amount: 0.15, once: true })
  const [failedCovers, setFailedCovers] = useState<Set<string>>(new Set())

  const handleCoverError = (slug: string) => {
    setFailedCovers((prev) => new Set(prev).add(slug))
  }

  return (
    <div ref={gridRef} className={styles.grid}>
      {GALLERY_CATEGORIES.map((cat, index) => {
        const images = manifest[cat.slug] ?? []
        const coverSrc = images[0]

        return (
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
              to={`/portfolio/${cat.slug}`}
              className={styles.card}
              aria-label={`Открыть галерею: ${cat.title}`}
            >
              {coverSrc && !failedCovers.has(cat.slug) ? (
                <img
                  src={coverSrc}
                  alt={cat.title}
                  className={styles.cardImage}
                  loading={index < 2 ? 'eager' : 'lazy'}
                  onError={() => handleCoverError(cat.slug)}
                />
              ) : (
                <div className={styles.cardPlaceholder} aria-hidden="true" />
              )}

              <div className={styles.cardOverlay}>
                <h2 className={styles.cardTitle}>{cat.title}</h2>
                <p className={styles.cardDescription}>{cat.description}</p>
                {images.length > 0 && (
                  <span className={styles.cardCount}>
                    {images.length} фото
                  </span>
                )}
              </div>
            </Link>
          </motion.div>
        )
      })}
    </div>
  )
}

export default PortfolioIndex
