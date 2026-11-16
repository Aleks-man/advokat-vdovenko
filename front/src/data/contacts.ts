import { site } from './site'

const phone = site.phone.replace(/[^+\d]/g, '')
const phoneDigits = phone.replace(/\D/g, '')

export const contactLinks = {
  phone: 'tel:' + phone,
  email: 'mailto:' + site.email,
  map: 'https://yandex.ru/maps/?text=' + encodeURIComponent(site.city + ', ' + site.address),
  viber: 'viber://chat?number=' + encodeURIComponent(phone),
  whatsapp: 'https://wa.me/' + phoneDigits,
  telegram: 'https://t.me/+' + phoneDigits,
}
