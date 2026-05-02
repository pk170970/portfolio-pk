import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Contact.module.scss'

const INFO = [
  { icon: '✉', label: 'Email', value: 'alex@example.com', href: 'mailto:alex@example.com' },
  { icon: '📍', label: 'Location', value: 'San Francisco, CA', href: null },
  { icon: '🟢', label: 'Status', value: 'Open to opportunities', href: null },
]

interface Form { name: string; email: string; subject: string; message: string }

export default function Contact() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const [form, setForm] = useState<Form>({ name: '', email: '', subject: '', message: '' })
  const [focused, setFocused] = useState<keyof Form | null>(null)
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  const change = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    await new Promise(r => setTimeout(r, 1500))
    setSending(false)
    setSent(true)
  }

  const floating = (k: keyof Form) => focused === k || form[k].length > 0

  return (
    <section className={`section ${styles.section}`} id="contact" ref={ref}>
      <div className="container">
        <motion.p className="section-label" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>Get In Touch</motion.p>
        <motion.h2 className="section-title" initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}>
          Let's <span className="gradient-text">Connect</span>
        </motion.h2>

        <div className={styles.grid}>
          <motion.div initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}>
            <p className={styles.lead}>I'm always open to discussing new projects, creative ideas or opportunities to be part of something great.</p>
            <div className={styles.infoCards}>
              {INFO.map(item => (
                <div key={item.label} className={styles.infoCard}>
                  <div className={styles.infoIcon}>{item.icon}</div>
                  <div>
                    <p className={styles.infoLabel}>{item.label}</p>
                    {item.href ? <a href={item.href} className={styles.infoValue}>{item.value}</a> : <p className={styles.infoValue}>{item.value}</p>}
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.socials}>
              {['GitHub', 'LinkedIn', 'Twitter', 'Dribbble'].map(s => (
                <motion.a key={s} href="#" className={styles.socialBtn} whileHover={{ y: -3 }}>{s}</motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div className={styles.formCard} initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.35 }}>
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div key="ok" className={styles.success} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', damping: 20 }}>
                  <div className={styles.checkIcon}>✓</div>
                  <h3>Message Sent!</h3>
                  <p>Thanks for reaching out. I'll reply within 24 hours.</p>
                  <button className={styles.again} onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }) }}>Send Another</button>
                </motion.div>
              ) : (
                <motion.form key="form" className={styles.form} onSubmit={submit} exit={{ opacity: 0 }}>
                  <div className={styles.row}>
                    {(['name', 'email'] as const).map(k => (
                      <div key={k} className={`${styles.field} ${floating(k) ? styles.up : ''}`}>
                        <input id={k} type={k === 'email' ? 'email' : 'text'} value={form[k]} required onChange={change(k)} onFocus={() => setFocused(k)} onBlur={() => setFocused(null)} className={styles.input} />
                        <label htmlFor={k} className={styles.label}>{k === 'name' ? 'Your Name' : 'Email Address'}</label>
                      </div>
                    ))}
                  </div>
                  <div className={`${styles.field} ${floating('subject') ? styles.up : ''}`}>
                    <input id="subject" type="text" value={form.subject} required onChange={change('subject')} onFocus={() => setFocused('subject')} onBlur={() => setFocused(null)} className={styles.input} />
                    <label htmlFor="subject" className={styles.label}>Subject</label>
                  </div>
                  <div className={`${styles.field} ${floating('message') ? styles.up : ''}`}>
                    <textarea id="message" rows={5} value={form.message} required onChange={change('message')} onFocus={() => setFocused('message')} onBlur={() => setFocused(null)} className={`${styles.input} ${styles.ta}`} />
                    <label htmlFor="message" className={`${styles.label} ${styles.taLabel}`}>Your Message</label>
                  </div>
                  <motion.button type="submit" className={styles.sendBtn} disabled={sending} whileHover={!sending ? { scale: 1.02 } : {}} whileTap={!sending ? { scale: 0.98 } : {}}>
                    {sending ? <span className={styles.spinner} /> : <>Send Message <span>→</span></>}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
