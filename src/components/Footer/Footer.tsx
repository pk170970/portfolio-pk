import { motion } from 'framer-motion'
import styles from './Footer.module.scss'

const LINKS = ['About', 'Skills', 'Experience', 'Projects', 'GitHub', 'Contact']

export default function Footer() {
  const year = new Date().getFullYear()
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className={styles.footer}>
      <div className={styles.topLine} />
      <div className="container">
        <div className={styles.inner}>
          <div>
            <div className={styles.logo} onClick={scrollTop}>
              <span className={styles.mark}>&lt;</span>dev<span className={styles.accent}>.</span><span className={styles.mark}>/&gt;</span>
            </div>
            <p className={styles.tagline}>React · TypeScript · Three.js · AWS S3</p>
          </div>
          <div className={styles.links}>
            {LINKS.map(l => (
              <button key={l} className={styles.link} onClick={() => document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}>{l}</button>
            ))}
          </div>
          <motion.button className={styles.toTop} onClick={scrollTop} whileHover={{ y: -4 }} whileTap={{ scale: 0.9 }} aria-label="Back to top">↑</motion.button>
        </div>
        <div className={styles.bottom}>
          <p>© {year} Pratyush Kesarwani. All rights reserved.</p>
          <p className={styles.love}>Designed &amp; built with ♥</p>
        </div>
      </div>
    </footer>
  )
}
