import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import type { GitHubRepo } from '../../types'
import styles from './GitHub.module.scss'

// ── Replace with your GitHub username ──────────────
const GITHUB_USERNAME = 'torvalds'

const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178c6', JavaScript: '#f1e05a', Python: '#3572A5',
  Rust: '#dea584', Go: '#00ADD8', CSS: '#563d7c', HTML: '#e34c26', C: '#555555',
}

export default function GitHub() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!inView) return
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=stars&per_page=12&type=public`)
      .then(r => { if (!r.ok) throw new Error(`GitHub API ${r.status}`); return r.json() })
      .then((data: GitHubRepo[]) => { setRepos(data.filter(r => !r.fork).slice(0, 9)); setLoading(false) })
      .catch(e => { setError(e.message); setLoading(false) })
  }, [inView])

  return (
    <section className="section" id="github" ref={ref}>
      <div className="container">
        <motion.p className="section-label" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>Open Source</motion.p>
        <motion.h2 className="section-title" initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}>
          GitHub <span className="gradient-text">Repos</span>
        </motion.h2>
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}>
          <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noopener noreferrer" className={styles.profileLink}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
            @{GITHUB_USERNAME}
          </a>
        </motion.div>

        {loading && <div className={styles.skelGrid}>{Array.from({ length: 6 }).map((_, i) => <div key={i} className={styles.skel} />)}</div>}
        {error && <div className={styles.error}><span>⚠️</span><p>{error}</p><small>GitHub API rate limit may apply. Add a personal token for more requests.</small></div>}

        {!loading && !error && (
          <div className={styles.grid}>
            {repos.map((repo, i) => (
              <motion.a key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer" className={styles.card}
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.07 }} whileHover={{ y: -4 }}>
                <div className={styles.repoName}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
                  {repo.name}
                </div>
                <p className={styles.desc}>{repo.description || 'No description.'}</p>
                {repo.topics.length > 0 && (
                  <div className={styles.topics}>{repo.topics.slice(0, 3).map(t => <span key={t} className={styles.topic}>{t}</span>)}</div>
                )}
                <div className={styles.meta}>
                  {repo.language && (
                    <span className={styles.lang}>
                      <span className={styles.langDot} style={{ background: LANG_COLORS[repo.language] || '#888' }} />
                      {repo.language}
                    </span>
                  )}
                  <span className={styles.stat}>★ {repo.stargazers_count}</span>
                  <span className={styles.stat}>⑂ {repo.forks_count}</span>
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
