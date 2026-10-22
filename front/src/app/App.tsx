import { Route, Routes } from 'react-router-dom'
import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer/Footer'
import { Home } from '../pages/Home/Home'
export function App() { return <><Header/><main><Routes><Route path="/" element={<Home/>}/><Route path="*" element={<div className="container section"><h1>Раздел в подготовке</h1></div>}/></Routes></main><Footer/></> }
