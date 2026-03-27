import type { FC, SVGProps } from 'react'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import styles from './Contacts.module.css'

const PHONE_DISPLAY = '+375 (29) 796-52-76'
const PHONE_HREF = 'tel:+375297965276'
const EMAIL = 'natashabystrova082@gmail.com'
const EMAIL_HREF = `mailto:${EMAIL}`
const INSTAGRAM_HREF = 'https://www.instagram.com/natalia_bystrova_?igsh=MTkwbDdrdWdnMmR3Yg=='

interface ContactMethod {
  id: 'instagram' | 'phone' | 'email'
  title: string
  subtitle: string
  hint: string
  href: string
  accent: string
  isInteractive?: boolean
  external?: boolean
}

const CONTACT_METHODS: ContactMethod[] = [
  {
    id: 'instagram',
    title: 'Написать в Instagram',
    subtitle: 'Самый быстрый и удобный старт',
    hint: 'Идеально, если хотите быстро обсудить дату и формат съёмки.',
    href: INSTAGRAM_HREF,
    accent: 'Главный способ связи',
    isInteractive: true,
    external: true,
  },
  {
    id: 'phone',
    title: PHONE_DISPLAY,
    subtitle: 'Быстрый звонок без переписки',
    hint: 'Если нужно оперативно выбрать ближайшую дату.',
    href: PHONE_HREF,
    accent: 'Быстрый контакт',
    isInteractive: false,
  },
  {
    id: 'email',
    title: EMAIL,
    subtitle: 'Для спокойного подробного запроса',
    hint: 'Когда удобнее отправить все пожелания одним письмом.',
    href: EMAIL_HREF,
    accent: 'Для подробного запроса',
    isInteractive: true,
  },
]

const VIEW_TRANSITION = {
  duration: 0.55,
  ease: [0.16, 1, 0.3, 1] as const,
}

const InstagramIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...props}>
    <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5a4.25 4.25 0 0 0 4.25 4.25h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5a4.25 4.25 0 0 0-4.25-4.25h-8.5Zm9.1 2.1a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z" />
  </svg>
)

const PhoneIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...props}>
    <path d="M6.62 3.5A2.62 2.62 0 0 0 4 6.12c0 7.66 6.22 13.88 13.88 13.88a2.62 2.62 0 0 0 2.62-2.62v-2.14c0-.75-.52-1.4-1.25-1.56l-3.45-.78a1.62 1.62 0 0 0-1.57.48l-.84.9a12 12 0 0 1-5.3-5.3l.9-.84c.4-.38.58-.93.48-1.47l-.78-3.55A1.6 1.6 0 0 0 7.13 3.5H6.62Z" />
  </svg>
)

const MailIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...props}>
    <path d="M4.75 4A2.75 2.75 0 0 0 2 6.75v10.5A2.75 2.75 0 0 0 4.75 20h14.5A2.75 2.75 0 0 0 22 17.25V6.75A2.75 2.75 0 0 0 19.25 4H4.75Zm0 1.5h14.5c.37 0 .71.14.98.37l-7.1 5.83a1.75 1.75 0 0 1-2.22 0L3.77 5.87c.27-.23.61-.37.98-.37Zm-1.25 2.08 6.46 5.3a3.25 3.25 0 0 0 4.08 0l6.46-5.3v9.67c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25V7.58Z" />
  </svg>
)

const renderMethodIcon = (id: ContactMethod['id']) => {
  switch (id) {
    case 'instagram':
      return <InstagramIcon className={styles.methodIconSvg} />
    case 'phone':
      return <PhoneIcon className={styles.methodIconSvg} />
    case 'email':
      return <MailIcon className={styles.methodIconSvg} />
  }
}

const Contacts: FC = () => {
  const heroRef = useRef<HTMLElement | null>(null)
  const methodsRef = useRef<HTMLElement | null>(null)
  const isHeroInView = useInView(heroRef, { amount: 0.3, once: true })
  const isMethodsInView = useInView(methodsRef, { amount: 0.2, once: true })

  return (
    <div className={styles.page}>
      <section ref={heroRef} className={styles.hero} aria-labelledby="contacts-title">
        <motion.div
          className={styles.heroGlass}
          initial={{ opacity: 0, y: 16 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : undefined}
          transition={VIEW_TRANSITION}
        >
          <div className={styles.heroContent}>
            <div className={styles.heroLead}>
              <motion.div
                className={styles.heroBadge}
                initial={{ opacity: 0, y: 10 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : undefined}
                transition={{ ...VIEW_TRANSITION, delay: 0.08 }}
              >
                Контакты Baby Bloom
              </motion.div>

              <motion.h1
                id="contacts-title"
                className={styles.title}
                initial={{ opacity: 0, y: 10 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : undefined}
                transition={{ ...VIEW_TRANSITION, delay: 0.12 }}
              >
                Выберите удобный способ связи и быстро запишитесь на съёмку
              </motion.h1>
            </div>

            <motion.div
              className={styles.heroDivider}
              aria-hidden="true"
              initial={{ opacity: 0, scaleY: 0.7 }}
              animate={isHeroInView ? { opacity: 1, scaleY: 1 } : undefined}
              transition={{ ...VIEW_TRANSITION, delay: 0.16 }}
            />

            <div className={styles.heroAside}>
              <motion.p
                className={styles.subtitle}
                initial={{ opacity: 0, y: 10 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : undefined}
                transition={{ ...VIEW_TRANSITION, delay: 0.18 }}
              >
                Без длинных анкет и лишних шагов: напишите, позвоните или отправьте письмо,
                а детали съёмки мы согласуем лично.
              </motion.p>

              <motion.div
                className={styles.actions}
                initial={{ opacity: 0, y: 10 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : undefined}
                transition={{ ...VIEW_TRANSITION, delay: 0.24 }}
              >
                <a
                  className={`${styles.button} ${styles.buttonPrimary}`}
                  href={INSTAGRAM_HREF}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Написать в Instagram
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      <section
        ref={methodsRef}
        className={styles.section}
        aria-labelledby="contact-methods-title"
      >
        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 14 }}
          animate={isMethodsInView ? { opacity: 1, y: 0 } : undefined}
          transition={VIEW_TRANSITION}
        >
          <span className={styles.sectionEyebrow}>Быстрые способы связи</span>
          <h2 id="contact-methods-title" className={styles.sectionTitle}>
            Три простых способа связаться
          </h2>
        </motion.div>

        <div className={styles.methodsGrid}>
          {CONTACT_METHODS.map((method, index) => (
            method.isInteractive ? (
              <motion.a
                key={method.id}
                className={styles.methodCard}
                href={method.href}
                target={method.external ? '_blank' : undefined}
                rel={method.external ? 'noreferrer noopener' : undefined}
                initial={{ opacity: 0, y: 18 }}
                animate={isMethodsInView ? { opacity: 1, y: 0 } : undefined}
                transition={{ ...VIEW_TRANSITION, delay: index * 0.08 }}
              >
                <span className={styles.methodAccent}>{method.accent}</span>
                <span className={styles.methodIcon}>{renderMethodIcon(method.id)}</span>
                <strong className={styles.methodTitle}>{method.title}</strong>
                <span className={styles.methodSubtitle}>{method.subtitle}</span>
                <span className={styles.methodHint}>{method.hint}</span>
              </motion.a>
            ) : (
              <motion.div
                key={method.id}
                className={`${styles.methodCard} ${styles.methodCardStatic}`}
                initial={{ opacity: 0, y: 18 }}
                animate={isMethodsInView ? { opacity: 1, y: 0 } : undefined}
                transition={{ ...VIEW_TRANSITION, delay: index * 0.08 }}
              >
                <span className={styles.methodAccent}>{method.accent}</span>
                <span className={styles.methodIcon}>{renderMethodIcon(method.id)}</span>
                <strong className={styles.methodTitle}>{method.title}</strong>
                <span className={styles.methodSubtitle}>{method.subtitle}</span>
                <span className={styles.methodHint}>{method.hint}</span>
              </motion.div>
            )
          ))}
        </div>
      </section>
    </div>
  )
}

export default Contacts
