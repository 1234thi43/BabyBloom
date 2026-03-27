import type { FC } from 'react'
import { useRef } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { getServiceCategoryBySlug } from '../../data/servicesConfig'
import ServicePackCard from '../../components/ui/ServicePackCard/ServicePackCard'
import styles from './ServiceCategory.module.css'

const ServiceCategory: FC = () => {
  const { category } = useParams<{ category: string }>()
  const gridRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(gridRef, { amount: 0.1, once: true })

  const categoryData = category ? getServiceCategoryBySlug(category) : undefined

  if (!categoryData) {
    return <Navigate to="/services" replace />
  }

  return (
    <div className={styles.wrapper}>
      <motion.div
        className={styles.categoryHeader}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className={styles.categoryTitle}>{categoryData.title}</h2>
        <p className={styles.categoryDescription}>{categoryData.description}</p>
      </motion.div>

      <div
        ref={gridRef}
        className={styles.grid}
        data-count={categoryData.packs.length}
      >
        {categoryData.packs.map((pack, index) => (
          <ServicePackCard
            key={pack.id}
            pack={pack}
            index={index}
            isInView={isInView}
          />
        ))}
      </div>
    </div>
  )
}

export default ServiceCategory
