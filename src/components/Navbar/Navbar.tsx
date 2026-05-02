import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'
import styles from './Navbar.module.scss'

const NAV_ITEMS = ['About', 'Skills', 'Experience', 'Projects', 'GitHub', 'Contact']

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <motion.nav
      className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className={styles.inner}>
        <motion.div
          className={styles.logo}
          whileHover={{ scale: 1.04 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <span className={styles.mark}>&lt;</span>dev<span className={styles.accent}>.</span><span className={styles.mark}>/&gt;</span>
        </motion.div>

        <ul className={styles.links}>
          {NAV_ITEMS.map((item, i) => (
            <motion.li key={item} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.07 }}>
              <button onClick={() => scrollTo(item)} className={styles.link}>
                <span className={styles.num}>0{i + 1}.</span>{item}
              </button>
            </motion.li>
          ))}
        </ul>

        <div className={styles.actions}>
          <motion.button className={styles.themeBtn} onClick={toggleTheme} whileTap={{ scale: 0.9 }} aria-label="Toggle theme">
            <AnimatePresence mode="wait">
              <motion.span key={theme} initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.2 }}>
                {theme === 'dark' ? '☀️' : '🌙'}
              </motion.span>
            </AnimatePresence>
          </motion.button>

          <button className={`${styles.burger} ${menuOpen ? styles.open : ''}`} onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div className={styles.mobile} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
            {NAV_ITEMS.map((item, i) => (
              <motion.button key={item} onClick={() => scrollTo(item)} className={styles.mobileLink}
                initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.05 }}>
                <span className={styles.num}>0{i + 1}.</span> {item}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
