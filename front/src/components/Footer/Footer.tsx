import { Link } from 'react-router-dom'
import { navigation, site } from '../../data/site'
import './Footer.css'
export function Footer() {
  return (
    <footer className="footer panel">
      <div className="container">
        <div className="footer-top">
          <Link to="/" className="brand footer-brand" aria-label="Константин Вдовенко — главная">
            <img className="brand-mark" src="/brand/vdovenko.svg" alt="" width="68" height="68" />
            <span className="brand-name">
              <span>Константин</span>
              <strong>Вдовенко</strong>
              <small>АДВОКАТ · УГОЛОВНЫЕ ДЕЛА</small>
            </span>
          </Link>
          <nav aria-label="Навигация в подвале">
            {navigation.map((item) => (
              <Link key={item.to} to={item.to}>
                {item.label}
              </Link>
            ))}
          </nav>
          <p className="footer-note">
            Уголовные дела.
            <br />
            Консультации.
            <br />
            Работа по делу.
          </p>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
          <span>Частная адвокатская практика</span>
        </div>
      </div>
    </footer>
  )
}
