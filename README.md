# FoodMate AI

FoodMate AI — это учебный full-stack проект для групповой работы. Это мини-сервис доставки еды по Алматы: пользователь может посмотреть реальные рестораны, отфильтровать их по кухне и времени доставки, выбрать блюда, добавить их в корзину, указать адрес и создать тестовый заказ.

Проект работает и без AI: основной функционал — каталог ресторанов, меню, фильтры, корзина и оформление заказа. AI-ассистент добавлен как улучшение UX: он помогает подобрать ресторан или блюдо по бюджету, кухне и предпочтениям пользователя.

## Что умеет проект

- Показывает каталог из 50 ресторанов Алматы.
- У каждого ресторана есть кухня, район, рейтинг, примерное время доставки, теги, меню и ссылка на источник.
- Можно фильтровать рестораны по кухне, городу и максимальному времени доставки.
- Можно добавлять блюда в корзину.
- После нажатия `Create order` открывается окно с формой доставки.
- Заказ создаётся только после заполнения адреса.
- AI-ассистент отвечает на запросы пользователя и возвращает список использованных tools.
- Backend отдаёт REST API для ресторанов, заказов и AI-рекомендаций.
- Есть автотесты для логики AI-tools и пользовательского flow.

## Данные

В каталоге используются 50 реальных заведений Алматы. Меню и цены указаны примерно, на основе публичных страниц меню, ресторанных списков и delivery/listing-источников. В карточке каждого ресторана есть ссылка `Menu source`.

Примеры ресторанов:

- NAVAT
- Sandyq
- Дареджани
- Ocean Basket
- TomYumBar
- Korean House
- Coffee BOOM
- Rumi
- Baharat
- Bauyrdaq Qazaq Fast-food
- Beefeater
- Manga Sushi
- Tyubeteika
- Chechil
- Nuala
- SEVEN
- Vista
- Alasha
- Bosphorus
- Auyl
- Cafe Alma
- Fika
- Sumo-San
- La Pasta
- Roni Pizza
- Degirmen
- Dubai Mandi
- BAO Sushi & Noodles
- Мёндон
- Ата донер

## AI-функционал

AI-ассистент не является обычным GPT-чатом “на всё”. Он использует backend tools:

- `searchRestaurants` — поиск ресторанов по кухне, городу и времени доставки.
- `recommendDishes` — подбор блюд по бюджету и предпочтениям.
- `buildBudgetPlan` — план заказа по бюджету и количеству людей.

Ответ AI возвращает:

- текст рекомендации;
- список `toolsUsed`;
- подходящие блюда.

Это закрывает требование проекта: AI должен использовать tools/MCP/sub-agents, а не просто отвечать текстом.

## Стек

- React + Vite — frontend.
- Express — backend REST API.
- JSON — локальное хранилище данных.
- Vitest + Testing Library — автотесты.
- Lucide React — иконки.
- Vercel — deploy frontend + serverless API.

## Запуск локально

```bash
npm install
npm run dev
```

Frontend: http://localhost:5173  
Backend: http://localhost:4000

## Deploy и GitHub

Production deploy: https://foodmate-eta.vercel.app

GitHub repository: https://github.com/Aldibek/foodmate-ai

## API

```http
GET /api/health
```

Проверка состояния backend.

```http
GET /api/restaurants?cuisine=all&city=all&maxDelivery=60
```

Получить список ресторанов с фильтрами.

```http
GET /api/restaurants/:id
```

Получить один ресторан по ID.

```http
POST /api/orders
```

Создать тестовый заказ. Адрес обязателен.

```http
POST /api/ai/recommend
```

Получить AI-рекомендацию по сообщению пользователя.

```http
POST /api/ai/budget-plan
```

Получить план заказа по бюджету.

## Как оформить заказ

1. Выбрать ресторан.
2. Добавить блюда в корзину.
3. Нажать `Create order`.
4. В появившемся окне заполнить имя, телефон, адрес и комментарий курьеру.
5. Нажать `Confirm order`.

Если адрес не заполнен, backend не принимает заказ.

## Проверки

```bash
npm run lint
npm test
npm run build
npm audit
```

## Структура проекта

```text
src/
  components/
  lib/
  App.jsx
  main.jsx
  styles.css
server/
  index.js
  agentTools.js
data/
  restaurants.json
ai-rules/
tests/
```

## Роли команды

- Frontend Developer — интерфейс, компоненты, фильтры, корзина, форма заказа.
- Backend Developer — API, данные ресторанов, endpoint заказов.
- AI Engineer — tools для AI-ассистента и логика рекомендаций.
- QA Engineer & Workflow Master — тесты, документация, workflow evidence.

## Definition of Done

- GitHub репозиторий есть.
- Deploy есть.
- README.md есть.
- WORKFLOW.md есть.
- `ai-rules/*.md` для ролей есть.
- AI использует tools.
- Есть автотесты.
- Есть история коммитов.
