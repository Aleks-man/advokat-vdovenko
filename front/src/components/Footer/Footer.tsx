import { Link } from 'react-router-dom'
import { navigation, site } from '../../data/site'
import './Footer.css'
export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <Link to="/" className="footer-name">
            Константин
            <br />
            Вдовенко<span>Адвокат по уголовным делам</span>
          </Link>
          <nav aria-label="Навигация в подвале">
            {navigation.map((item) => (
              <Link key={item.to} to={item.to}>
                {item.label}
              </Link>
            ))}
          </nav>
          <p className="footer-note">
            Внимание к обстоятельствам.
            <br />
            Уважение к человеку.
            <br />
            Последовательность в защите.
          </p>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
          <span>Концепция сайта · тексты подлежат согласованию</span>
        </div>
      </div>
    </footer>
  )
}
