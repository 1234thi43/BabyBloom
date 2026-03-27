import type { FC } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import PortfolioLayout from './pages/Portfolio/PortfolioLayout'
import PortfolioIndex from './pages/Portfolio/PortfolioIndex'
import GalleryPage from './pages/Portfolio/GalleryPage'
import ServicesLayout from './pages/Services/ServicesLayout'
import ServicesIndex from './pages/Services/ServicesIndex'
import ServiceCategory from './pages/Services/ServiceCategory'
import Contacts from './pages/Contacts/Contacts'

const App: FC = () => {
  return (
    <div className="appLayout">
      <Header />
      <main className="appMain">
        <div className="appContainer">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<PortfolioLayout />}>
              <Route index element={<PortfolioIndex />} />
              <Route path=":category" element={<GalleryPage />} />
            </Route>
            <Route path="/services" element={<ServicesLayout />}>
              <Route index element={<ServicesIndex />} />
              <Route path=":category" element={<ServiceCategory />} />
            </Route>
            <Route path="/contacts" element={<Contacts />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
