import type { FC } from 'react'
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import styles from './GalleryPreview.module.css'

interface GalleryItem {
  src: string
  category: 'newborn' | 'family' | 'studio'
}

const GALLERY_ITEMS: GalleryItem[] = [
  { src: '/images/gallery/photo-1.webp', category: 'newborn' },
  { src: '/images/gallery/photo-2.webp', category: 'family' },
  { src: '/images/gallery/photo-3.webp', category: 'studio' },
  { src: '/images/gallery/photo-4.webp', category: 'newborn' },
  { src: '/images/gallery/photo-5.webp', category: 'family' },
  { src: '/images/gallery/photo-6.webp', category: 'studio' },
]

const CELL_CLASSES = [
  styles.cell1,
  styles.cell2,
  styles.cell3,
  styles.cell4,
  styles.cell5,
  styles.cell6,
] as const

const GalleryPreview: FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const isInView = useInView(sectionRef, { amount: 0.2, once: true })
  const [failedIndices, setFailedIndices] = useState<Set<number>>(new Set())
  const [isExpanded, setIsExpanded] = useState(false)

  const handleImageError = (index: number) => {
    setFailedIndices((prev) => new Set(prev).add(index))
  }

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="gallery-preview-title"
    >
      <div className={styles.inner}>

        <div className={styles.headingBlock}>
          <motion.h2
            id="gallery-preview-title"
            className={styles.title}
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          >
            ПОРТФОЛИО
          </motion.h2>
          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.14 }}
          >
            Каждая съёмка — это история вашей семьи
          </motion.p>
        </div>

        <div
          className={`${styles.gridWrapper} ${isExpanded ? styles.gridWrapperExpanded : ''}`}
        >
          <div className={styles.grid}>
            {GALLERY_ITEMS.map((item, index) => (
              <motion.div
                key={`${item.src}-${index}`}
                className={`${styles.cell} ${CELL_CLASSES[index]}`}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : undefined}
                transition={{
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.2 + index * 0.08,
                }}
              >
                {failedIndices.has(index) ? (
                  <div className={styles.cellPlaceholder} aria-hidden="true" />
                ) : (
                  <img
                    src={item.src}
                    alt={`Работа из категории ${item.category}`}
                    className={styles.cellImage}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    onError={() => handleImageError(index)}
                  />
                )}
              </motion.div>
            ))}
          </div>
          <button
            type="button"
            className={styles.expandTrigger}
            onClick={() => setIsExpanded(true)}
            aria-expanded={isExpanded}
          >
            Показать ещё
          </button>
        </div>

        <motion.a
          href="/portfolio"
          className={styles.pill}
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.62,
          }}
        >
          Смотреть все работы →
        </motion.a>
      </div>
    </section>
  )
}

export default GalleryPreview
