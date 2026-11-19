import './ContactAside.css'

export function ContactAside() {
  return (
    <aside className="contact-aside">
      <p className="eyebrow">Перед обращением</p>
      <h2>
        Договоримся <em>о встрече</em>
      </h2>
      <p>
        В первом сообщении коротко опишите ситуацию. Если уже назначен допрос или заседание, укажите
        дату — это поможет понять, сколько времени есть до встречи.
      </p>
      <div className="contact-aside-note">
        О времени и месте встречи договоримся заранее.
        <br />
        Если планируете приехать, сначала подтвердите запись.
      </div>
    </aside>
  )
}
