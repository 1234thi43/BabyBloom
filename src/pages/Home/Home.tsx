import type { FC } from 'react'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import GalleryPreview from '../../components/sections/GalleryPreview'
import { SERVICE_CATEGORIES, type ServiceCategoryConfig } from '../../data/servicesConfig'
import styles from './Home.module.css'

const statsItems = [
  { value: '500+', label: 'Съёмок проведено' },
  { value: '8', label: 'Лет опыта' },
  { value: '100%', label: 'Довольных семей' },
] as const

const STUDIO_FEATURES = [
  {
    id: 'comfort',
    title: 'Комфорт и безопасность',
    description:
      'Тёплая температура, стерильные текстили и продуманные позы — малыш всегда в надёжных руках.',
  },
  {
    id: 'light',
    title: 'Профессиональный свет',
    description:
      'Мягкий студийный свет и большие окна создают естественные оттенки кожи без резких теней.',
  },
  {
    id: 'props',
    title: 'Большой выбор реквизита',
    description:
      'Коллекция пледов, корзинок, фонов и аксессуаров, которые подбираются под вашу историю и стиль.',
  },
  {
    id: 'family',
    title: 'Простор для семьи',
    description:
      'Удобная зона ожидания, место для переодевания и совместных кадров с родителями и старшими детьми.',
  },
] as const

interface ServiceCardCopy {
  badge: string
  teaser: string
}

interface ServiceHighlight {
  slug: string
  title: string
  price: string
  image: string
  badge: string
  teaser: string
}

const SERVICE_CARD_COPY: Record<string, ServiceCardCopy> = {
  newborn: {
    badge: 'Первые дни жизни',
    teaser: 'Нежная съёмка малыша в безопасной и тёплой студии.',
  },
  'less-than-one-year': {
    badge: '1-11 месяцев',
    teaser: 'Живые эмоции, любимые улыбки и бережная съёмка всей семьи.',
  },
  'one-year': {
    badge: 'Первый день рождения',
    teaser: 'Праздничные кадры, торт, шары и яркие эмоции в одном пакете.',
  },
  familys: {
    badge: 'Тёплые семейные истории',
    teaser: 'Кадры для двоих, с детьми или в ожидании малыша без лишней суеты.',
  },
}

function extractPriceValue(price: string): number {
  const normalizedPrice = Number.parseInt(price.replace(/[^\d]/g, ''), 10)

  return Number.isNaN(normalizedPrice) ? Number.MAX_SAFE_INTEGER : normalizedPrice
}

function getStartingPrice(category: ServiceCategoryConfig): string {
  const lowestPack = category.packs.reduce((lowestPricePack, currentPack) => {
    return extractPriceValue(currentPack.price) < extractPriceValue(lowestPricePack.price)
      ? currentPack
      : lowestPricePack
  })

  return `от ${lowestPack.price}`
}

const SERVICE_HIGHLIGHTS: ServiceHighlight[] = SERVICE_CATEGORIES.map((category) => {
  const cardCopy = SERVICE_CARD_COPY[category.slug] ?? {
    badge: 'Пакеты и цены',
    teaser: category.description,
  }

  return {
    slug: category.slug,
    title: category.title,
    price: getStartingPrice(category),
    image: category.coverImage,
    badge: cardCopy.badge,
    teaser: cardCopy.teaser,
  }
})

const Home: FC = () => {
  const heroRef = useRef<HTMLElement | null>(null)
  const statsRef = useRef<HTMLElement | null>(null)
  const studioRef = useRef<HTMLElement | null>(null)
  const servicesRef = useRef<HTMLElement | null>(null)
  const isHeroInView = useInView(heroRef, {
    amount: 0.4,
    once: true,
  })
  const isStatsInView = useInView(statsRef, {
    amount: 0.5,
    once: true,
  })
  const isStudioInView = useInView(studioRef, {
    amount: 0.4,
    once: true,
  })
  const isServicesInView = useInView(servicesRef, {
    amount: 0.2,
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
              src="/images/banner/banner.webp"
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

      <section ref={statsRef} className={styles.statsStrip} aria-label="Наши достижения">
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

      <section
        ref={studioRef}
        className={styles.studioSection}
        aria-labelledby="studio-title"
      >
        <motion.div
          className={styles.studioGlass}
          initial={{ opacity: 0, y: 24 }}
          animate={isStudioInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.studioInner}>
            <motion.header
              className={styles.studioHeader}
              initial={{ opacity: 0, y: 12 }}
              animate={isStudioInView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
            >
              <h2 id="studio-title" className={styles.studioTitle}>
                Собственная фотостудия для самых важных моментов
              </h2>
              <p className={styles.studioIntro}>
                Отдельное тёплое пространство, где всё создано для спокойной и безопасной съёмки малышей и семей.
              </p>
            </motion.header>

            <ul className={styles.studioList} role="list">
              {STUDIO_FEATURES.map((feature, index) => (
                <motion.li
                  key={feature.id}
                  className={styles.studioItem}
                  initial={{ opacity: 0, y: 14 }}
                  animate={isStudioInView ? { opacity: 1, y: 0 } : undefined}
                  transition={{
                    duration: 0.45,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.14 + index * 0.06,
                  }}
                >
                  <h3 className={styles.studioItemTitle}>{feature.title}</h3>
                  <p className={styles.studioItemText}>{feature.description}</p>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </section>

      <section
        ref={servicesRef}
        className={styles.servicesSection}
        aria-labelledby="services-title"
      >
        <div className={styles.servicesInner}>
          <motion.div
            className={styles.servicesHeader}
            initial={{ opacity: 0, y: 12 }}
            animate={isServicesInView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className={styles.servicesEyebrow}>
              {SERVICE_HIGHLIGHTS.length} направления съёмки
            </span>
            <h2 id="services-title" className={styles.servicesTitle}>
              Виды съёмок
            </h2>
            <p className={styles.servicesSubtitle}>
              Выберите формат, который подходит вашей семье, и сразу перейдите к пакетам и
              стоимости.
            </p>
            <p className={styles.servicesLead}>
              На странице услуг вас ждут подробные пакеты, примеры съёмок и актуальные цены.
            </p>
          </motion.div>

          <ul className={styles.servicesGrid} role="list">
            {SERVICE_HIGHLIGHTS.map((item, index) => (
              <motion.li
                key={item.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={isServicesInView ? { opacity: 1, y: 0 } : undefined}
                transition={{
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.12 + index * 0.08,
                }}
              >
                <Link to={`/services/${item.slug}`} className={styles.serviceCard}>
                  <div className={styles.serviceCardImageWrap}>
                    <img
                      src={item.image}
                      alt={`${item.title} фотосессия Baby Bloom`}
                      loading="lazy"
                      className={styles.serviceCardImage}
                    />
                  </div>
                  <div className={styles.serviceCardContent}>
                    <div className={styles.servicesMeta}>
                      <span className={styles.servicesMetaText}>{item.badge}</span>
                      <span className={styles.serviceCardPrice}>{item.price}</span>
                    </div>
                    <h3 className={styles.serviceCardTitle}>{item.title}</h3>
                    <p className={styles.serviceCardDescription}>{item.teaser}</p>
                    <span className={styles.serviceCardCta}>
                      Смотреть пакет
                      <span className={styles.serviceCardArrow} aria-hidden="true">
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              </motion.li>
            ))}
          </ul>

          <motion.div
            className={styles.servicesFooter}
            initial={{ opacity: 0, y: 12 }}
            animate={isServicesInView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          >
            <Link to="/services" className={styles.servicesButton}>
              Смотреть все пакеты и цены
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home
