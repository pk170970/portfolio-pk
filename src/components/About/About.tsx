import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import styles from './About.module.scss'

const FACTS = [
  { num: '5+', label: 'Years Experience' },
  { num: '40+', label: 'Projects Built' },
  { num: '12+', label: 'Happy Clients' },
  { num: '∞', label: 'Lines of Code' },
]

const TAGS = ['React', 'TypeScript', 'Next.js', 'Three.js', 'Node.js', 'AWS']

export default function About() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })

  return (
    <section className="section" id="about" ref={ref}>
      <div className="container">
        <div className={styles.grid}>
          <motion.div className={styles.left} initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }}>
            <p className="section-label">About Me</p>
            <h2 className="section-title">Crafting digital<br /><span className="gradient-text">experiences</span></h2>
            <p className={styles.bio}>I'm Pratyush Kesarwani, a Frontend Developer with 5+ years of experience building high-performance, accessible web applications. I specialize in React, TypeScript, and modern CSS — bridging the gap between design and engineering.</p>
            <p className={styles.bio}>When I'm not shipping features, I'm exploring 3D graphics with Three.js, contributing to open source, or mentoring aspiring developers. I believe great software is as much about empathy as it is about code.</p>
            <div className={styles.tags}>
              {TAGS.map(t => <span key={t} className={styles.tag}>{t}</span>)}
            </div>
          </motion.div>

          <motion.div className={styles.right} initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.15 }}>
            <div className={styles.avatarWrap}>
              <div className={styles.avatar}><span>AC</span></div>
              <div className={styles.ring1} />
              <div className={styles.ring2} />
            </div>
            <div className={styles.facts}>
              {FACTS.map(f => (
                <div key={f.label} className={styles.fact}>
                  <span className={styles.factNum}>{f.num}</span>
                  <span className={styles.factLabel}>{f.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
