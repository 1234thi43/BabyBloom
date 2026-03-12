import type { FC } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import Portfolio from './pages/Portfolio/Portfolio'
import Info from './pages/Info/Info'
import Contacts from './pages/Contacts/Contacts'

const App: FC = () => {
  return (
    <div className="appLayout">
      <Header />
      <main className="appMain">
        <div className="appContainer">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/info" element={<Info />} />
            <Route path="/contacts" element={<Contacts />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
