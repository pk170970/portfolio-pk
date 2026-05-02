import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Skills from './components/Skills/Skills'
import Experience from './components/Experience/Experience'
import Projects from './components/Projects/Projects'
import GitHub from './components/GitHub/GitHub'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import './styles/global.scss'

export default function App() {
  return (
    <ThemeProvider>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <GitHub />
        <Contact />
      </main>
      <Footer />
    </ThemeProvider>
  )
}
