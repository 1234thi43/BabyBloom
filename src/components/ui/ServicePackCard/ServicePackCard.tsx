import type { FC } from 'react'
import { motion } from 'framer-motion'
import type { ServicePack } from '../../../data/servicesConfig'
import styles from './ServicePackCard.module.css'

interface ServicePackCardProps {
  pack: ServicePack
  index: number
  isInView: boolean
}

const ServicePackCard: FC<ServicePackCardProps> = ({ pack, index, isInView }) => {
  return (
    <motion.article
      className={`${styles.card} ${pack.popular ? styles.cardPopular : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={{
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.12 + index * 0.08,
      }}
    >
      {pack.popular && (
        <span className={styles.badge}>Популярное</span>
      )}

      <div className={styles.imageWrap}>
        <img
          src={pack.image}
          alt={`Фотосессия: ${pack.title}`}
          loading="lazy"
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{pack.title}</h3>
        <p className={styles.price}>{pack.price}</p>

        <ul className={styles.features}>
          {pack.features.map((feature) => (
            <li key={feature} className={styles.featureItem}>
              {feature}
            </li>
          ))}
        </ul>

        <a href="/contacts" className={styles.button}>
          Записаться
        </a>
      </div>
    </motion.article>
  )
}

export default ServicePackCard
