import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import styles from './Skills.module.scss'

const SKILLS: Record<string, { name: string; level: number }[]> = {
  Frontend: [
    { name: 'React / Next.js', level: 95 },
    { name: 'TypeScript', level: 90 },
    { name: 'CSS / SCSS', level: 92 },
    { name: 'Three.js / WebGL', level: 75 },
  ],
  'Backend & Tools': [
    { name: 'Node.js / Express', level: 78 },
    { name: 'Git / CI/CD', level: 88 },
    { name: 'AWS / Vercel', level: 80 },
    { name: 'GraphQL / REST', level: 85 },
  ],
  Testing: [
    { name: 'Jest / Vitest', level: 82 },
    { name: 'Cypress / Playwright', level: 76 },
    { name: 'Storybook', level: 70 },
    { name: 'Accessibility (WCAG)', level: 88 },
  ],
}

export default function Skills() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section className={`section ${styles.section}`} id="skills" ref={ref}>
      <div className="container">
        <motion.p className="section-label" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>Expertise</motion.p>
        <motion.h2 className="section-title" initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}>
          My <span className="gradient-text">Skills</span>
        </motion.h2>
        <div className={styles.grid}>
          {Object.entries(SKILLS).map(([cat, skills], ci) => (
            <motion.div key={cat} className={styles.card} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 + ci * 0.12 }}>
              <h3 className={styles.catTitle}>{cat}</h3>
              {skills.map((s, i) => (
                <div key={s.name} className={styles.bar}>
                  <div className={styles.barHeader}>
                    <span className={styles.barName}>{s.name}</span>
                    <span className={styles.barVal}>{s.level}%</span>
                  </div>
                  <div className={styles.track}>
                    <motion.div className={styles.fill} initial={{ width: 0 }} animate={inView ? { width: `${s.level}%` } : {}} transition={{ duration: 1, delay: 0.4 + ci * 0.12 + i * 0.08 }} />
                  </div>
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
