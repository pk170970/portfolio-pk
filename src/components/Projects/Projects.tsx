import { useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import styles from './Projects.module.scss'

const PROJECTS = [
  { title: 'Aurora Design System', description: 'A full-featured React component library with 50+ components, dark/light modes, and auto-generated Storybook docs.', tech: ['React', 'TypeScript', 'Storybook', 'Rollup'], github: 'https://github.com', live: '#', featured: true },
  { title: 'DataForge Dashboard', description: 'Real-time analytics platform with WebSocket-powered live charts, drag-and-drop widgets, and custom D3.js visualizations.', tech: ['Next.js', 'D3.js', 'WebSockets', 'PostgreSQL'], github: 'https://github.com', live: '#', featured: true },
  { title: '3D Solar System', description: 'Interactive Three.js simulation of the solar system with realistic orbital mechanics and procedural texture maps.', tech: ['Three.js', 'TypeScript', 'GLSL', 'Vite'], github: 'https://github.com', live: '#', featured: false },
  { title: 'Collabify', description: 'Real-time collaborative whiteboard with multi-cursor support, built with CRDTs for conflict-free synchronization.', tech: ['React', 'Yjs', 'Hocuspocus', 'Canvas API'], github: 'https://github.com', live: '#', featured: false },
  { title: 'Pulse CMS', description: 'Headless CMS with a visual drag-and-drop page builder, supporting rich text, media, and custom block types.', tech: ['Next.js', 'Prisma', 'TipTap', 'AWS S3'], github: 'https://github.com', live: '#', featured: false },
  { title: 'DevMetrics CLI', description: 'Terminal dashboard showing git commit heatmaps, PR analytics, and code review metrics across repos.', tech: ['Node.js', 'Ink', 'GitHub API', 'D3'], github: 'https://github.com', live: '#', featured: false },
]

function GitHubIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
}

function ExternalIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
}

function ProjectCard({ project, delay }: { project: typeof PROJECTS[0]; delay: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState('')
  const [glow, setGlow] = useState({ x: 50, y: 50 })

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setTransform(`perspective(800px) rotateX(${((y / rect.height) - 0.5) * 16}deg) rotateY(${((x / rect.width) - 0.5) * -16}deg) translateZ(10px)`)
    setGlow({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 })
  }

  return (
    <motion.div
      ref={cardRef}
      className={`${styles.card} ${project.featured ? styles.featured : ''}`}
      onMouseMove={onMouseMove}
      onMouseLeave={() => setTransform('')}
      style={{ transform, transition: transform ? 'none' : 'transform 0.5s ease' }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      <div className={styles.glowLayer} style={{ background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, var(--accent-glow) 0%, transparent 60%)` }} />
      <div className={styles.cardTop}>
        <div className={styles.iconBox}>⬡</div>
        <div className={styles.cardLinks}>
          <a href={project.github} target="_blank" rel="noopener noreferrer" className={styles.cardLink}><GitHubIcon /></a>
          <a href={project.live} target="_blank" rel="noopener noreferrer" className={styles.cardLink}><ExternalIcon /></a>
        </div>
      </div>
      <h3 className={styles.title}>{project.title}</h3>
      <p className={styles.desc}>{project.description}</p>
      <div className={styles.techs}>
        {project.tech.map(t => <span key={t} className={styles.tech}>{t}</span>)}
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })

  return (
    <section className={`section ${styles.section}`} id="projects" ref={ref}>
      <div className="container">
        <motion.p className="section-label" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>Work</motion.p>
        <motion.h2 className="section-title" initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}>
          Featured <span className="gradient-text">Projects</span>
        </motion.h2>
        {inView && (
          <div className={styles.grid}>
            {PROJECTS.map((p, i) => <ProjectCard key={p.title} project={p} delay={i * 0.1} />)}
          </div>
        )}
      </div>
    </section>
  )
}
