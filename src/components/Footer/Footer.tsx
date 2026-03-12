import type { FC } from 'react'
import styles from './Footer.module.css'

const Footer: FC = () => {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <span>© {year} Baby Bloom. Все права защищены.</span>
        <span>Случайный слоган про рост и развитие.</span>
      </div>
    </footer>
  )
}

export default Footer

