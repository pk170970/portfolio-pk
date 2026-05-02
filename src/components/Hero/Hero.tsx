import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import { useTheme } from '../../context/ThemeContext'
import styles from './Hero.module.scss'

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const animRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 1000)
    camera.position.z = 3

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(canvas.clientWidth, canvas.clientHeight)

    const isDark = theme === 'dark'

    // Particles
    const count = 2800
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 1.5 + Math.random() * 3
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
    }
    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const pMat = new THREE.PointsMaterial({ size: 0.015, color: isDark ? 0x6366f1 : 0x8b5cf6, transparent: true, opacity: isDark ? 0.7 : 0.5, sizeAttenuation: true })
    const particles = new THREE.Points(pGeo, pMat)
    scene.add(particles)

    // Torus knot
    const torusGeo = new THREE.TorusKnotGeometry(0.65, 0.22, 200, 32, 2, 3)
    const torusMat = new THREE.MeshStandardMaterial({ color: isDark ? 0x6366f1 : 0x8b5cf6, emissive: isDark ? 0x3730a3 : 0x6d28d9, emissiveIntensity: 0.4, metalness: 0.9, roughness: 0.1 })
    const torus = new THREE.Mesh(torusGeo, torusMat)
    scene.add(torus)

    const wireMat = new THREE.MeshBasicMaterial({ color: isDark ? 0x818cf8 : 0xa78bfa, wireframe: true, transparent: true, opacity: isDark ? 0.08 : 0.06 })
    const wire = new THREE.Mesh(torusGeo, wireMat)
    scene.add(wire)

    // Ring
    const ringGeo = new THREE.TorusGeometry(1.4, 0.005, 16, 200)
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x6366f1, transparent: true, opacity: isDark ? 0.3 : 0.2 })
    const ring = new THREE.Mesh(ringGeo, ringMat)
    ring.rotation.x = Math.PI / 2.5
    scene.add(ring)

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.3))
    const pl1 = new THREE.PointLight(0x6366f1, 3, 10)
    pl1.position.set(2, 2, 2)
    scene.add(pl1)
    const pl2 = new THREE.PointLight(isDark ? 0x818cf8 : 0xc4b5fd, 2, 8)
    pl2.position.set(-2, -1, 1)
    scene.add(pl2)

    let mouseX = 0, mouseY = 0
    const onMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 1.2
      mouseY = (e.clientY / window.innerHeight - 0.5) * 1.2
    }
    window.addEventListener('mousemove', onMouse)

    const onResize = () => {
      if (!canvas) return
      camera.aspect = canvas.clientWidth / canvas.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    }
    window.addEventListener('resize', onResize)

    let t = 0
    const animate = () => {
      t += 0.008
      torus.rotation.x = t * 0.4 + mouseY * 0.4
      torus.rotation.y = t * 0.6 + mouseX * 0.4
      wire.rotation.copy(torus.rotation)
      particles.rotation.y = t * 0.05 + mouseX * 0.08
      particles.rotation.x = mouseY * 0.06
      ring.rotation.z = t * 0.2
      camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05
      camera.position.y += (-mouseY * 0.5 - camera.position.y) * 0.05
      camera.lookAt(scene.position)
      renderer.render(scene, camera)
      animRef.current = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(animRef.current)
      renderer.dispose()
    }
  }, [theme])

  return (
    <section className={styles.hero} id="home">
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.content}>
        <motion.div className={styles.text} initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}>
          <motion.p className={styles.greeting} variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}>
            <span className={styles.wave}>👋</span> Hello, I'm
          </motion.p>
          <motion.h1 className={styles.name} variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}>
            Pratyush Kesarwani
          </motion.h1>
          <motion.div className={styles.roleWrap} variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}>
            <span className={styles.rolePrefix}>I build </span>
            <span className={styles.roleText}>beautiful interfaces</span>
            <span className={styles.cursor} />
          </motion.div>
          <motion.p className={styles.bio} variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}>
            Frontend Developer crafting pixel-perfect, performant web experiences with modern React, TypeScript, and a passion for creative UI.
          </motion.p>
          <motion.div className={styles.cta} variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}>
            <motion.button className={styles.btnPrimary} whileHover={{ scale: 1.04, boxShadow: '0 0 32px var(--accent-glow)' }} whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
              View Projects
            </motion.button>
            <motion.button className={styles.btnSecondary} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Get In Touch
            </motion.button>
          </motion.div>
          <motion.div className={styles.socials} variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}>
            {[{ label: 'GitHub', href: 'https://github.com' }, { label: 'LinkedIn', href: '#' }, { label: 'Twitter', href: '#' }].map(s => (
              <motion.a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className={styles.socialLink} whileHover={{ y: -3 }}>
                {s.label}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
      <motion.div className={styles.scrollHint} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
        <div className={styles.dot} />
        <span>Scroll</span>
      </motion.div>
    </section>
  )
}
