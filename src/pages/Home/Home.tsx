import type { FC } from 'react'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import GalleryPreview from '../../components/sections/GalleryPreview'
import styles from './Home.module.css'

const statsItems = [
  { value: '500+', label: 'Съёмок проведено' },
  { value: '8', label: 'Лет опыта' },
  { value: '100%', label: 'Довольных семей' },
] as const

const Home: FC = () => {
  const heroRef = useRef<HTMLElement | null>(null)
  const statsRef = useRef<HTMLElement | null>(null)
  const isHeroInView = useInView(heroRef, {
    amount: 0.4,
    once: true,
  })
  const isStatsInView = useInView(statsRef, {
    amount: 0.5,
    once: true,
  })

  return (
    <div className={styles.page}>
      <section
        ref={heroRef}
        className={styles.hero}
        aria-labelledby="hero-title"
      >
        <motion.div
          className={styles.heroGlass}
          initial={{ opacity: 0, y: 12 }}
          animate={
            isHeroInView
              ? { opacity: 1, y: 0 }
              : undefined
          }
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.h1
            id="hero-title"
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 10 }}
            animate={
              isHeroInView ? { opacity: 1, y: 0 } : undefined
            }
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            Фотостудия Baby Bloom
          </motion.h1>
          <motion.div
            className={styles.heroLine}
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            animate={
              isHeroInView ? { scaleX: 1 } : undefined
            }
            transition={{
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.2,
            }}
          />
          <motion.p
            className={styles.heroSubtitle}
            initial={{ opacity: 0, y: 8 }}
            animate={
              isHeroInView ? { opacity: 1, y: 0 } : undefined
            }
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
          >
            Нежные истории первых дней жизни
          </motion.p>

          <div className={styles.heroImageWrap}>
            <motion.img
              src="https://images.pexels.com/photos/3933272/pexels-photo-3933272.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Новорожденный малыш в уютной студийной съёмке"
              loading="lazy"
              className={styles.heroImage}
              initial={{ scale: 1.05, opacity: 0 }}
              animate={isHeroInView ? { scale: 1, opacity: 1 } : undefined}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            />
          </div>

          <div className={styles.heroActions}>
            <a
              href="#portfolio"
              className={styles.heroButtonPrimary}
            >
              Посмотреть портфолио
            </a>
            <a
              href="/contacts"
              className={styles.heroButtonGhost}
            >
              Записаться на съёмку
            </a>
          </div>
        </motion.div>
      </section>

      <section
        ref={statsRef}
        className={styles.statsStrip}
        aria-label="Наши достижения"
      >
        <div className={styles.statsStripInner}>
          {statsItems.map((item, index) => (
            <motion.div
              key={item.label}
              className={styles.statsCard}
              initial={{ opacity: 0, y: 16 }}
              animate={
                isStatsInView ? { opacity: 1, y: 0 } : undefined
              }
              transition={{
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
                delay: index * 0.1,
              }}
            >
              <span className={styles.statsNumber}>{item.value}</span>
              <span className={styles.statsLabel}>{item.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      <GalleryPreview />
    </div>
  )
}

export default Home
