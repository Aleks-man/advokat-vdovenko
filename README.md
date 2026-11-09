# Константин Вдовенко — сайт адвоката

Сайт-визитка Константина Вдовенко, адвоката по уголовным делам. Четыре страницы: главная, уголовная защита, обо мне и контакты.

Использую React и TypeScript для интерфейса, Vite для разработки и сборки. Маршруты — React Router, иконки — Lucide. Крупные заголовки и имя набраны Georgia, подзаголовки — Manrope, основной текст — Onest. Manrope и Onest загружаются локально; Georgia — системный шрифт. Вёрстка адаптирована для компьютеров, планшетов и телефонов.

## Запуск

Нужен Node.js 20.19+ или 22.12+.

```sh
npm ci
npm run dev
```

Сайт открывается на http://127.0.0.1:5173, API — на http://127.0.0.1:3001/api/health. Оба приложения запускаются из корня через npm workspaces.

## Структура

```text
front/src/
  app/          — маршрутизация
  components/   — общие блоки и их стили
  pages/        — страницы
  data/         — контакты, навигация, направления работы
  styles/       — шрифты, общие стили и переменные

back/src/
  config/       — переменные окружения
  db/           — подключение PostgreSQL
  routes/       — маршруты API

tests/browser/  — браузерные проверки
```

Контакты и навигацию редактирую в `front/src/data/site.ts`, порядок работы — в `front/src/data/workSteps.ts`, направления защиты — в `front/src/data/practice.ts`, вопросы и ответы — в `front/src/data/faq.ts`, полезные заметки — в `front/src/data/usefulMaterials.ts`. Цвета и размеры — в `front/src/styles/tokens.css`, подключение шрифтов — в `front/src/styles/fonts.css`.

Общий логотип с именем — `front/src/components/Brand/`. Контактные ссылки формируются в `front/src/data/contacts.ts` из данных `site.ts`. Стили общих блоков лежат рядом с компонентами; глобальные правила — в `styles/`.

## Проверки

```sh
npm run typecheck
npm test
npm run test:browser
npm run build
npm run format:check
```

Для форматирования — `npm run format`. Браузерные тесты используют Google Chrome; настройки находятся в `playwright.config.ts`. Скриншоты сохраняются в `artifacts/`, каталог исключён из Git.

## API и база данных

Сервер работает на Express и TypeScript. Сейчас доступен health endpoint; для запуска PostgreSQL не требуется. Настройки подключения к базе — в `back/.env`, образец — `back/.env.example`. Подключение использует `DATABASE_URL`.

## Публикация

```sh
npm run build
```

Фронтенд собирается в `front/dist`. На хостинге нужен fallback на `index.html` для маршрутов React Router. API запускается отдельным процессом.

Перед публикацией заменю презентационные телефон, почту и адрес в `front/src/data/site.ts` на рабочие контакты и согласую тексты с Константином.

Биография и факты для блока «Обо мне» — в "front/src/data/about.ts". Сейчас там вымышленные сведения для презентации; перед публикацией заменю их данными Константина.
