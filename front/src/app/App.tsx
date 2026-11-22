import { routes, legacyRoutes } from '../data/routes'
import { PageScrollbar } from '../components/PageScrollbar/PageScrollbar'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer/Footer'
import { Home } from '../pages/Home/Home'
import { Practice } from '../pages/Practice/Practice'
import { AboutPage } from '../pages/About/About'
import { Contacts } from '../pages/Contacts/Contacts'
import { NotFound } from '../pages/NotFound/NotFound'
import { RouteEffects } from './RouteEffects'
export function App() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Перейти к содержимому
      </a>
      <Header />
      <RouteEffects />
      <main id="main-content" tabIndex={-1}>
        <Routes>
          <Route path={routes.home.path} element={<Home />} />
          <Route path={routes.practice.path} element={<Practice />} />
          <Route path={routes.about.path} element={<AboutPage />} />
          <Route
            path={legacyRoutes.approach}
            element={<Navigate to={routes.about.path} replace />}
          />
          <Route path={routes.contacts.path} element={<Contacts />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <PageScrollbar />
    </>
  )
}
