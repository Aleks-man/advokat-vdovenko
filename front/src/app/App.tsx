import { Route, Routes } from 'react-router-dom'
import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer/Footer'
export function App() { return <><Header/><main><Routes><Route path="*" element={<div className="container section"><h1>Константин Вдовенко</h1><p>Адвокат по уголовным делам</p></div>}/></Routes></main><Footer/></> }
