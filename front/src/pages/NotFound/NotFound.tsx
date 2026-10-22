import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
export function NotFound() { return <section className="container section"><p className="eyebrow">404 / Страница не найдена</p><h1 style={{ marginBlock: '30px' }}>Вернёмся<br/>к главному.</h1><Link to="/" className="button">На главную <ArrowUpRight size={18}/></Link></section> }
