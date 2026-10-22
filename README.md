# Константин Вдовенко — сайт адвоката

React + TypeScript + Vite; Node.js + Express; задел для PostgreSQL. Node.js 20.19+ или 22.12+.

## Запуск

```sh
npm ci
npm run dev
```

Frontend: http://127.0.0.1:5173. API: http://127.0.0.1:3001/api/health.

```sh
npm run typecheck
npm test
npm run build
```

## Структура

- `front/src/app` — маршруты и каркас
- `front/src/components` — компоненты с отдельными CSS
- `front/src/pages` — страницы с отдельными CSS
- `front/src/data` — редактируемый контент
- `front/src/styles` — токены и базовые стили
- `back/src/routes`, `config`, `db` — API, настройки и PostgreSQL

API запускается без базы. Для будущих функций скопировать `back/.env.example` в `back/.env` и задать DATABASE_URL. Миграции и админка будут добавляться вместе с конкретными требованиями. Фронтенд не отправляет и не хранит обращения.

## Git

Основная ветка — main. Задача: `git switch -c feat/task-name`, реализация и проверки, коммит, `git switch main`, `git merge --no-ff feat/task-name`, `git branch -d feat/task-name`. Для командной работы — pull request перед слиянием.

## Перед публикацией

Уточнить контакты, регион, сведения об адвокатском статусе, фактические направления работы и согласовать все тексты. Контент сейчас — концепция на основе имени и специализации; неподтверждённые контакты не подставлены. При размещении SPA настроить fallback на index.html, API проксировать отдельно. `front/dist` — статическая сборка; Express — отдельный процесс.
