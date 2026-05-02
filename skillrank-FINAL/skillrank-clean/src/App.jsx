import React, { useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import HowItWorks from './pages/HowItWorks.jsx'
import ForWorkers from './pages/ForWorkers.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Demo from './demo/Demo.jsx'

export default function App() {
  const [page, setPage] = useState('home')

  const navigate = (p) => {
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const pages = { home: Home, howitworks: HowItWorks, forworkers: ForWorkers, about: About, contact: Contact, demo: Demo }
  const PageComponent = pages[page] || Home

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar navigate={navigate} current={page} />
      <main style={{ flex: 1 }}>
        <PageComponent navigate={navigate} />
      </main>
      <Footer navigate={navigate} />
    </div>
  )
}
