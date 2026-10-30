import { Link } from 'react-router-dom'
import './NotFound.css'
export function NotFound() {
  return (
    <section className="container section not-found">
      <p className="eyebrow">404 / Страница не найдена</p>
      <h1>
        Вернёмся
        <br />к главному.
      </h1>
      <Link to="/" className="button">
        На главную
      </Link>
    </section>
  )
}
