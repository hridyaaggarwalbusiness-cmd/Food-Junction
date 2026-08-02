import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Highlights from './components/Highlights'
import About from './components/About'
import Gallery from './components/Gallery'
import Contact from './components/Contact'
import CtaBand from './components/CtaBand'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Highlights />
        <About />
        <Gallery />
        <Contact />
        <CtaBand />
      </main>
      <Footer />
    </>
  )
}

export default App
