import type { FC } from 'react'
import { useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Lightbox.module.css'

interface LightboxProps {
  images: string[]
  currentIndex: number
  onClose: () => void
  onChangeIndex: (index: number) => void
}

const SWIPE_THRESHOLD = 50

const Lightbox: FC<LightboxProps> = ({
  images,
  currentIndex,
  onClose,
  onChangeIndex,
}) => {
  const touchStartX = useRef<number | null>(null)
  const total = images.length

  const goPrev = useCallback(() => {
    onChangeIndex(currentIndex > 0 ? currentIndex - 1 : total - 1)
  }, [currentIndex, total, onChangeIndex])

  const goNext = useCallback(() => {
    onChangeIndex(currentIndex < total - 1 ? currentIndex + 1 : 0)
  }, [currentIndex, total, onChangeIndex])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowLeft':
          goPrev()
          break
        case 'ArrowRight':
          goNext()
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose, goPrev, goNext])

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }, [])

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartX.current === null) return

      const deltaX = e.changedTouches[0].clientX - touchStartX.current
      touchStartX.current = null

      if (Math.abs(deltaX) < SWIPE_THRESHOLD) return

      if (deltaX > 0) {
        goPrev()
      } else {
        goNext()
      }
    },
    [goPrev, goNext],
  )

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose()
    },
    [onClose],
  )

  return createPortal(
    <motion.div
      className={styles.overlay}
      onClick={handleOverlayClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      role="dialog"
      aria-modal="true"
      aria-label={`Фото ${currentIndex + 1} из ${total}`}
    >
      <button
        type="button"
        className={styles.closeBtn}
        onClick={onClose}
        aria-label="Закрыть"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {total > 1 && (
        <button
          type="button"
          className={`${styles.navBtn} ${styles.navBtnPrev}`}
          onClick={goPrev}
          aria-label="Предыдущее фото"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      )}

      <AnimatePresence mode="wait">
        <motion.img
          key={images[currentIndex]}
          src={images[currentIndex]}
          alt={`Фото ${currentIndex + 1} из ${total}`}
          className={styles.image}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          draggable={false}
        />
      </AnimatePresence>

      {total > 1 && (
        <button
          type="button"
          className={`${styles.navBtn} ${styles.navBtnNext}`}
          onClick={goNext}
          aria-label="Следующее фото"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      )}

      {total > 1 && (
        <div className={styles.counter}>
          {currentIndex + 1} / {total}
        </div>
      )}
    </motion.div>,
    document.body,
  )
}

export default Lightbox
