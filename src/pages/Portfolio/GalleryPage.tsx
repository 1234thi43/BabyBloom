import type { FC } from 'react'
import { useRef, useState, useCallback } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import manifest from 'virtual:gallery-manifest'
import { getCategoryBySlug } from '../../data/galleryConfig'
import Lightbox from '../../components/ui/Lightbox/Lightbox'
import styles from './GalleryPage.module.css'

const GalleryPage: FC = () => {
  const { category } = useParams<{ category: string }>()
  const galleryRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(galleryRef, { amount: 0.05, once: true })
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set())

  const cat = category ? getCategoryBySlug(category) : undefined
  const images = category ? (manifest[category] ?? []) : []

  const handleImageError = useCallback((index: number) => {
    setFailedImages((prev) => new Set(prev).add(index))
  }, [])

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index)
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null)
  }, [])

  if (!cat) {
    return <Navigate to="/portfolio" replace />
  }

  return (
    <>
      <motion.h2
        className={styles.title}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {cat.title}
      </motion.h2>

      {images.length === 0 ? (
        <motion.p
          className={styles.empty}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          Фотографии скоро появятся
        </motion.p>
      ) : (
        <div ref={galleryRef} className={styles.masonry}>
          {images.map((src, index) => (
            <motion.button
              key={src}
              type="button"
              className={styles.item}
              onClick={() => openLightbox(index)}
              aria-label={`Открыть фото ${index + 1} из ${images.length}`}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : undefined}
              transition={{
                duration: 0.45,
                ease: [0.16, 1, 0.3, 1],
                delay: Math.min(index * 0.04, 0.6),
              }}
            >
              {failedImages.has(index) ? (
                <div className={styles.placeholder} aria-hidden="true" />
              ) : (
                <img
                  src={src}
                  alt={`${cat.title} — фото ${index + 1}`}
                  className={styles.image}
                  loading={index < 4 ? 'eager' : 'lazy'}
                  onError={() => handleImageError(index)}
                />
              )}
            </motion.button>
          ))}
        </div>
      )}

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onChangeIndex={setLightboxIndex}
        />
      )}
    </>
  )
}

export default GalleryPage
