import { practiceAreas } from '../../data/site'
import { ContactBanner } from '../../components/ContactBanner/ContactBanner'
import './Practice.css'
export function Practice() {
  return <><section className="page-intro container"><p className="eyebrow">01 / Уголовная защита</p><h1>Обстоятельства разные.<br/><em>Внимание — неизменно.</em></h1><p>Уголовные дела — специализация Константина Вдовенко. Ниже — возможные этапы работы, которые можно обсудить при личном обращении.</p></section><section className="container practice-stages">{practiceAreas.map(area => <article className="practice-stage" id={`stage-${area.number}`} key={area.number}><span className="eyebrow">Этап / {area.number}</span><div><h2>{area.title}</h2><p>{area.description}</p><p>{area.detail}</p></div></article>)}</section><div className="container content-disclaimer">Перечень направлений — предварительная структура сайта. Фактический объём практики и возможность участия в конкретном деле необходимо подтвердить с адвокатом.</div><ContactBanner/></>
}
