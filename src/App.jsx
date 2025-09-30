import './App.css'
import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import RiskCategories from './components/RiskCategories'
import FeaturedProducts from './components/FeaturedProducts'
import Footer from './components/Footer'

function App() {
  const [signer, setSigner] = useState()

  return (
    <div className="min-h-screen bg-white">
      <Header setSigner={setSigner} signer={signer} />
      <main>
        <Hero />
        <RiskCategories />
        <FeaturedProducts signer={signer} />
      </main>
      <Footer />
    </div>
  )
}

export default App

