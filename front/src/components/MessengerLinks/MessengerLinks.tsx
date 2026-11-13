import viberIcon from '../../assets/icons/viber.svg'
import whatsappIcon from '../../assets/icons/whatsapp.svg'
import telegramIcon from '../../assets/icons/telegram.svg'
import { contactLinks } from '../../data/contacts'
import './MessengerLinks.css'

export function MessengerLinks({ showLabels = false }: { showLabels?: boolean }) {
  const messengers = [
    {
      name: 'Viber',
      icon: viberIcon,
      kind: 'viber',
      href: contactLinks.viber,
    },
    {
      name: 'WhatsApp',
      icon: whatsappIcon,
      kind: 'whatsapp',
      href: contactLinks.whatsapp,
    },
    {
      name: 'Telegram',
      icon: telegramIcon,
      kind: 'telegram',
      href: contactLinks.telegram,
    },
  ]

  return (
    <div
      className={`messenger-links${showLabels ? ' messenger-links--labeled' : ''}`}
      role="group"
      aria-label="Связаться в мессенджерах"
    >
      {messengers.map((messenger) => (
        <a
          key={messenger.kind}
          className="messenger-link"
          href={messenger.href}
          aria-label={`Написать в ${messenger.name}`}
          title={messenger.name}
          target={messenger.kind === 'viber' ? undefined : '_blank'}
          rel={messenger.kind === 'viber' ? undefined : 'noopener noreferrer'}
        >
          {showLabels && <span className="messenger-label">{messenger.name}</span>}
          <span
            className="messenger-icon"
            style={{
              maskImage: `url("${messenger.icon}")`,
              WebkitMaskImage: `url("${messenger.icon}")`,
            }}
            aria-hidden="true"
          />
        </a>
      ))}
    </div>
  )
}
