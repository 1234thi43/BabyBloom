import type { FC } from 'react'
import styles from './Footer.module.css'

const PHONE_DISPLAY = '+375 (29) 796-52-76'
const PHONE_HREF = 'tel:+375297965276'
const EMAIL = 'natashabystrova082@gmail.com'

const Footer: FC = () => {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.brandColumn}>
          <div className={styles.socialIcons} aria-label="Социальные сети Baby Bloom">
            <a
              className={styles.socialLink}
              href="https://www.instagram.com/natalia_bystrova_?igsh=MTkwbDdrdWdnMmR3Yg=="
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Instagram"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5a4.25 4.25 0 0 0 4.25 4.25h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5a4.25 4.25 0 0 0-4.25-4.25h-8.5Zm9.1 2.1a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z" />
              </svg>
            </a>
            <a
              className={styles.socialLink}
              href="https://t.me/"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Telegram"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M20.67 3.31c.9-.35 1.84.42 1.64 1.36l-2.8 13.18c-.2.94-1.27 1.36-2.06.8l-3.7-2.62-1.88 1.82c-.72.69-1.91.27-2.03-.73l-.43-3.57-3.09-2.24c-.88-.64-.75-2 .24-2.47l14.11-6.53Zm-10.2 9.74-.22 1.87.98-.95 6.67-6.46a.75.75 0 0 0-.9-1.18l-8.22 4.09c-.25.13-.28.48-.05.65l1.74 1.26Z" />
              </svg>
            </a>
          </div>
          <span className={styles.copyright}>© {year} Baby Bloom. Все права защищены.</span>
        </div>
        <div className={styles.authorColumn}>
          <span className={styles.socialTitle}>Фотограф Наталья Быстрова</span>
          <div className={styles.contacts}>
            <a className={styles.contactLink} href={PHONE_HREF}>
              {PHONE_DISPLAY}
            </a>
            <a className={styles.contactLink} href={`mailto:${EMAIL}`}>
              {EMAIL}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

