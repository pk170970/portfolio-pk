import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import styles from './Experience.module.scss'

const EXPERIENCES = [
  {
    company: 'Stripe', role: 'Senior Frontend Engineer', period: '2022 — Present', location: 'San Francisco, CA',
    points: ['Led redesign of the Stripe Dashboard, improving performance by 40%.', 'Built a component library used by 15+ product teams with React + TypeScript.', 'Implemented real-time data visualization with D3.js and WebSockets.'],
    tech: ['React', 'TypeScript', 'D3.js', 'GraphQL'],
  },
  {
    company: 'Vercel', role: 'Frontend Developer', period: '2020 — 2022', location: 'Remote',
    points: ['Contributed to the Vercel Analytics dashboard and deployment preview UI.', 'Reduced bundle size by 35% through code splitting and tree-shaking.', 'Mentored 3 junior developers through pair programming sessions.'],
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Zustand'],
  },
  {
    company: 'Shopify', role: 'Frontend Developer', period: '2018 — 2020', location: 'Ottawa, Canada',
    points: ['Built merchant-facing features for the Shopify Admin using React.', 'Achieved WCAG 2.1 AA compliance across 8 core product surfaces.', 'Developed an internal theming engine with CSS custom properties.'],
    tech: ['React', 'JavaScript', 'Ruby on Rails', 'Polaris'],
  },
]

export default function Experience() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section className="section" id="experience" ref={ref}>
      <div className="container">
        <motion.p className="section-label" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>Career</motion.p>
        <motion.h2 className="section-title" initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}>
          Work <span className="gradient-text">Experience</span>
        </motion.h2>
        <div className={styles.timeline}>
          {EXPERIENCES.map((exp, i) => (
            <motion.div key={exp.company} className={styles.item} initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}>
              <div className={styles.dot} />
              <div className={styles.card}>
                <div className={styles.header}>
                  <div>
                    <h3 className={styles.role}>{exp.role}</h3>
                    <p className={styles.company}>{exp.company} · <span>{exp.location}</span></p>
                  </div>
                  <span className={styles.period}>{exp.period}</span>
                </div>
                <ul className={styles.points}>
                  {exp.points.map(p => <li key={p}>{p}</li>)}
                </ul>
                <div className={styles.techs}>
                  {exp.tech.map(t => <span key={t} className={styles.tech}>{t}</span>)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
