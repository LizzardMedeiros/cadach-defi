import './App.css'
import { useState } from 'react'
import Header from './components/Header'
import Home from './pages/Home/index.jsx'
import Footer from './components/Footer'
import TokensPage from './pages/TokensPage/index.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  const [signer, setSigner] = useState()

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white">
        <Header setSigner={setSigner} signer={signer} />
        <main>
          <Routes>
            <Route path="/" element={<Home signer={signer} />} />
            <Route path="/tokens" element={<TokensPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

  


export default App

