import { Route, Routes } from 'react-router-dom'
import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer/Footer'
import { Home } from '../pages/Home/Home'
import { Practice } from '../pages/Practice/Practice'
import { Approach } from '../pages/Approach/Approach'
import { Contacts } from '../pages/Contacts/Contacts'
import { NotFound } from '../pages/NotFound/NotFound'
import { RouteEffects } from './RouteEffects'
export function App() {
  return <><a href="#main-content" className="skip-link">Перейти к содержимому</a><Header/><RouteEffects/><main id="main-content" tabIndex={-1}><Routes><Route path="/" element={<Home/>}/><Route path="/practice" element={<Practice/>}/><Route path="/approach" element={<Approach/>}/><Route path="/contacts" element={<Contacts/>}/><Route path="*" element={<NotFound/>}/></Routes></main><Footer/></>
}
