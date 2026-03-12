import type { FC } from 'react'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import styles from './Home.module.css'

const Home: FC = () => {
  const heroRef = useRef<HTMLElement | null>(null)
  const isHeroInView = useInView(heroRef, {
    amount: 0.4,
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
        id="portfolio"
        className={styles.portfolioSection}
      >
        <h2 className={styles.portfolioTitle}>
          Портфолио
        </h2>
        <p className={styles.portfolioText}>
          Здесь в будущем появятся лучшие кадры с наших съёмок новорождённых,
          беременных и семейных фотосессий.
        </p>
      </section>
    </div>
  )
}

export default Home
